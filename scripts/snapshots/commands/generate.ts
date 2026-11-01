import { parseArgs } from 'node:util';
import { UserError } from '../errors.ts';
import { listComponents, requireComponents } from '../model/catalog.ts';
import { SOURCES, SOURCE_LABELS, type ComponentName, type Source } from '../model/types.ts';
import { createDjangoClient } from '../render/django/client.ts';
import { createDjangoRenderer, type PageRenderer } from '../render/django/renderer.ts';
import { generateSnapshot } from '../render/generate.ts';
import { createStoryRuntime } from '../render/runtime.ts';
import { generationInputHash } from '../plays/inputs.ts';
import type { GenerationResult } from '../model/results.ts';
import { generationStore, resultKey } from '../results/stores.ts';
import { writeSnapshotText } from '../snapshotStore.ts';
import type { Command } from './command.ts';

const OPTIONS = {
  all: { type: 'boolean' },
  source: { type: 'string' },
  'django-url': { type: 'string' },
} as const;

function chooseSources(requested: string | undefined): readonly Source[] {
  if (requested === undefined || requested === 'both') return SOURCES;
  const source = SOURCES.find((candidate) => candidate === requested);
  if (!source) throw new UserError('--source must be "react", "django" or "both".');
  return [source];
}

export const generate: Command = {
  name: 'generate',
  summary: 'Render the React and Django stories to the committed snapshot files.',
  usage: 'generate <component...>|--all [--source react|django|both] [--django-url <url>]',
  async run(argv, write) {
    const { values, positionals } = parseArgs({
      args: [...argv],
      options: OPTIONS,
      allowPositionals: true,
    });
    if (!values.all && positionals.length === 0)
      throw new UserError('Name at least one component, or pass --all.');
    if (values.all && positionals.length)
      throw new UserError('Pass component names or --all, not both.');
    const components: ComponentName[] = values.all
      ? listComponents()
      : requireComponents(positionals);
    const sources = chooseSources(values.source);

    const djangoUrl = values['django-url'] ?? process.env.DJANGO_RENDER_URL;
    if (sources.includes('django') && !djangoUrl)
      throw new UserError(
        'Django snapshots need --django-url or the DJANGO_RENDER_URL environment variable.'
      );

    const runtime = await createStoryRuntime();
    try {
      const renderers = new Map<Source, () => Promise<PageRenderer>>([
        ['react', async () => (render) => Promise.resolve(render())],
        ['django', () => createDjangoRenderer(runtime, createDjangoClient(djangoUrl ?? ''))],
      ]);

      const store = generationStore();
      const record = (component: ComponentName, source: Source, result: GenerationResult): void =>
        store.write(resultKey(component, source), {
          inputHash: generationInputHash(component, source),
          recordedAt: new Date().toISOString(),
          result,
        });

      let failures = 0;
      for (const component of components) {
        for (const source of sources) {
          const label = `${component} (${SOURCE_LABELS[source]})`;
          try {
            const renderPage = await (renderers.get(source) as () => Promise<PageRenderer>)();
            const snapshot = await generateSnapshot(runtime, component, source, renderPage);
            const outcome = writeSnapshotText(component, source, snapshot.text);
            record(component, source, {
              status: outcome,
              sectionCount: snapshot.sectionCount,
              warnings: snapshot.warnings,
            });
            write(`${outcome.padEnd(9)} ${label}, ${snapshot.sectionCount} sections\n`);
            for (const warning of snapshot.warnings) write(`          warning: ${warning}\n`);
          } catch (error) {
            if (!(error instanceof UserError)) throw error;
            failures++;
            record(component, source, { status: 'failed', warnings: [], message: error.message });
            write(`FAILED    ${label}: ${error.message}\n`);
          }
        }
      }
      write(`${components.length * sources.length - failures} succeeded, ${failures} failed.\n`);
      return failures === 0 ? 0 : 1;
    } finally {
      await runtime.close();
    }
  },
};
