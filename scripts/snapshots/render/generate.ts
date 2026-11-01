import { renderToStaticMarkup } from 'react-dom/server';
import { UserError } from '../errors.ts';
import { collectIds, findDuplicates, namespaceRewrite, rewriteIdentifiers } from '../ids.ts';
import { storiesFile } from '../model/catalog.ts';
import { snapshotPath } from '../model/paths.ts';
import type { ComponentName, Section, Source } from '../model/types.ts';
import { SOURCE_LABELS } from '../model/types.ts';
import { serializeSnapshot } from '../snapshotFile.ts';
import type { PageRenderer } from './django/renderer.ts';
import { formatHtml, protectWhitespace } from './format.ts';
import type { StoryRuntime } from './runtime.ts';
import { createStoryElement, listStories } from './stories.ts';

export interface GeneratedSnapshot {
  /** The complete, formatted file content. */
  readonly text: string;
  readonly sectionCount: number;
  readonly warnings: readonly string[];
}

/** Renders every story of a component's React or Django stories file to markup. */
async function renderSections(
  runtime: StoryRuntime,
  component: ComponentName,
  source: Source,
  renderPage: PageRenderer
): Promise<Section[]> {
  const file = storiesFile(component, SOURCE_LABELS[source]);
  const stories = listStories(file);
  if (stories.length === 0) throw new UserError(`No stories found in ${file}.`);
  const module = await runtime.load(file);

  const sections: Section[] = [];
  for (const { exportName, name } of stories) {
    const element = createStoryElement(module, exportName);
    const render = (): string => renderToStaticMarkup(element);
    const html = await renderPage(render);
    // A second render finds output that varies between runs, such as ids made from Math.random().
    if ((await renderPage(render)) !== html)
      throw new UserError(
        `Story "${name}" renders differently each time, so it cannot be snapshotted.`
      );
    sections.push({ title: name, html: protectWhitespace(html) });
  }
  return sections;
}

/**
 * Sections share a page, so every id gets the source's namespace. Ids repeated across sections stay
 * repeated, which is invalid on one page, so they are reported as a warning.
 */
function namespaceSections(
  source: Source,
  sections: readonly Section[]
): { sections: Section[]; warnings: string[] } {
  const ids = sections.flatMap((section) => collectIds(section.html));
  const duplicates = findDuplicates(ids);
  const rewrite = namespaceRewrite(`${source}-`, new Set(ids));
  return {
    sections: sections.map(({ title, html }) => ({
      title,
      html: rewriteIdentifiers(html, rewrite),
    })),
    warnings: duplicates.length
      ? [`ids used by more than one element: ${duplicates.join(', ')}`]
      : [],
  };
}

export async function generateSnapshot(
  runtime: StoryRuntime,
  component: ComponentName,
  source: Source,
  renderPage: PageRenderer
): Promise<GeneratedSnapshot> {
  const rendered = await renderSections(runtime, component, source, renderPage);
  const { sections, warnings } = namespaceSections(source, rendered);
  const formatted = await formatHtml(serializeSnapshot(sections), snapshotPath(component, source));
  return {
    text: formatted.text,
    sectionCount: sections.length,
    warnings: formatted.warning ? [...warnings, formatted.warning] : warnings,
  };
}
