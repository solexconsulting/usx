import { parseArgs } from 'node:util';
import { loadExpectations } from '../compare/expectations.ts';
import { writeFileAtomic } from '../fs.ts';
import { listComponents, listStoryComponents } from '../model/catalog.ts';
import { parityInputHash } from '../parity/inputs.ts';
import { REPORT_PATH } from '../model/paths.ts';
import { generationInputHash, playInputHash } from '../plays/inputs.ts';
import { loadStoryIndex, type IndexEntry } from '../plays/storyIndex.ts';
import { buildReport } from '../report/build.ts';
import type { Report } from '../report/schema.ts';
import { generationStore, playStore, parityStore, resultKey } from '../results/stores.ts';
import { readSnapshot } from '../snapshotStore.ts';
import type { Command } from './command.ts';

/** Builds the report from the committed snapshots and recorded results, and writes it for the Storybook page. */
export async function writeReport(storybookUrl: string | undefined): Promise<Report> {
  const index: IndexEntry[] | undefined = storybookUrl
    ? await loadStoryIndex(storybookUrl)
    : undefined;
  const plays = playStore();
  const generations = generationStore();
  const parity = parityStore();
  const storyComponents = new Set(listStoryComponents());
  const report = buildReport({
    components: listComponents(),
    expectations: loadExpectations(),
    readSnapshot,
    readPlay: (component, source) =>
      storyComponents.has(component) ? plays.read(resultKey(component, source)) : undefined,
    readGeneration: (component, source) =>
      storyComponents.has(component) ? generations.read(resultKey(component, source)) : undefined,
    playInputHash,
    generationInputHash,
    readParity: (component) => parity.read(component),
    parityInputHash: parityInputHash(),
    index,
    now: new Date(),
  });
  writeFileAtomic(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

export const report: Command = {
  name: 'report',
  summary: 'Rebuild the report shown in Storybook from the snapshots and recorded results.',
  usage: 'report [--storybook-url <url>]',
  async run(argv, write) {
    const { values } = parseArgs({
      args: [...argv],
      options: { 'storybook-url': { type: 'string' } },
    });
    const storybookUrl = (values['storybook-url'] ?? process.env.STORYBOOK_URL ?? '').replace(
      /\/$/,
      ''
    );
    const built = await writeReport(storybookUrl || undefined);
    write(`Wrote ${REPORT_PATH} (${built.components.length} components).\n`);
    return 0;
  },
};
