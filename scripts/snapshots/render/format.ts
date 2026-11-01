import * as prettier from 'prettier';
import { applyEdits, elementsOf, attributeValue, parseMarkup, type TextEdit } from '../html.ts';

/** Elements styled with white-space: pre-wrap, whose text Prettier must not re-wrap. */
const WHITESPACE_SENSITIVE_CLASSES: ReadonlySet<string> = new Set(['usx-details__text']);

/** Marks whitespace-sensitive elements so Prettier leaves them as rendered. */
export function protectWhitespace(html: string): string {
  const edits: TextEdit[] = [];
  for (const element of elementsOf(parseMarkup(html))) {
    const classes = attributeValue(element, 'class')?.split(/\s+/) ?? [];
    const start = element.sourceCodeLocation?.startOffset;
    if (start !== undefined && classes.some((name) => WHITESPACE_SENSITIVE_CLASSES.has(name)))
      edits.push({ start, end: start, text: '<!-- prettier-ignore -->' });
  }
  return applyEdits(html, edits);
}

export interface FormattedText {
  readonly text: string;
  /** Set when Prettier rejected the markup and `text` is the unformatted input. */
  readonly warning?: string;
}

/** Remove indentation from blank lines, except where pre-wrap makes that whitespace visible. */
export function trimBlankLineWhitespace(html: string): string {
  const protectedRanges = [...elementsOf(parseMarkup(html))]
    .filter((element) =>
      attributeValue(element, 'class')
        ?.split(/\s+/)
        .some((name) => WHITESPACE_SENSITIVE_CLASSES.has(name))
    )
    .flatMap((element) => {
      const location = element.sourceCodeLocation;
      return location ? [{ start: location.startOffset, end: location.endOffset }] : [];
    });
  const edits: TextEdit[] = [];
  for (const match of html.matchAll(/^[\t ]+$/gm)) {
    const start = match.index;
    if (protectedRanges.some((range) => range.start <= start && start < range.end)) continue;
    edits.push({ start, end: start + match[0].length, text: '' });
  }
  return applyEdits(html, edits);
}

/**
 * Formats with the repository's Prettier configuration. Markup Prettier cannot parse (for example a
 * block element inside <p>) is returned as given, with a warning, because the snapshot is still correct.
 */
export async function formatHtml(text: string, configFor: string): Promise<FormattedText> {
  const config = (await prettier.resolveConfig(configFor)) ?? {};
  try {
    return {
      text: trimBlankLineWhitespace(await prettier.format(text, { ...config, parser: 'html' })),
    };
  } catch (error) {
    const reason =
      error instanceof Error ? (error.message.split('\n')[0] ?? 'unknown error') : String(error);
    return { text, warning: `not formatted: ${reason}` };
  }
}
