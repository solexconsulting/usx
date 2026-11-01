import { UserError } from './errors.ts';
import { parseMarkup, textContent } from './html.ts';
import type { Section } from './model/types.ts';

const HEADING_OPEN = '<h3 class="site-preview-heading">';
const HEADING_CLOSE = '</h3>';

const escapeText = (text: string): string =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/**
 * The snapshot file format: each section is a heading line followed by its markup, with a blank line
 * between sections. This is the only module that knows it; the HTML stories rely on the headings.
 * Formatting the result is the caller's job (see render/format.ts).
 */
export function serializeSnapshot(sections: readonly Section[]): string {
  if (sections.length === 0) return '';
  const blocks = sections.map((section) => {
    const heading = `${HEADING_OPEN}${escapeText(section.title)}${HEADING_CLOSE}`;
    return section.html === '' ? heading : `${heading}\n${section.html}`;
  });
  return `${blocks.join('\n\n')}\n`;
}

export function parseSnapshot(text: string): Section[] {
  const [preamble = '', ...chunks] = text.split(HEADING_OPEN);
  if (preamble.trim() !== '')
    throw new UserError(
      `Snapshot content before the first heading: "${preamble.trim().slice(0, 40)}".`
    );
  return chunks.map((chunk) => {
    const end = chunk.indexOf(HEADING_CLOSE);
    if (end === -1)
      throw new UserError(`Snapshot heading is never closed: "${chunk.slice(0, 40)}".`);
    return {
      title: textContent(parseMarkup(chunk.slice(0, end))),
      html: chunk.slice(end + HEADING_CLOSE.length).trim(),
    };
  });
}
