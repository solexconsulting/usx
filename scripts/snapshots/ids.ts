import { applyEdits, attributeValue, elementsOf, parseMarkup, type TextEdit } from './html.ts';

/**
 * Sections of a snapshot share one page, and the React and Django snapshots share a Storybook page
 * too, so every id is namespaced per source ("react-", "django-"). This module is the single place
 * that knows which attributes carry ids; rendering adds the namespace and comparison removes it.
 */

/** Attributes whose value is a whitespace-separated list of ids defined elsewhere. */
const ID_REFERENCE_ATTRIBUTES: ReadonlySet<string> = new Set([
  'for',
  'form',
  'list',
  'headers',
  'popovertarget',
  'commandfor',
  'data-usx-popover-close',
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-details',
  'aria-errormessage',
  'aria-flowto',
  'aria-labelledby',
  'aria-owns',
]);

export interface IdentifierRewrite {
  /** Applied to names that are defined by the attribute itself (id, and group names). */
  readonly define: (name: string) => string;
  /** Applied to each id an attribute points at. */
  readonly refer: (id: string) => string;
}

/**
 * The attribute's value with `rewrite` applied to its identifiers, or undefined when the attribute
 * carries none. Lists of ids are returned one space apart, since whitespace between ids has no meaning.
 */
export function rewriteAttribute(
  tagName: string,
  name: string,
  value: string,
  rewrite: IdentifierRewrite
): string | undefined {
  if (name === 'id' && value !== '') return rewrite.define(value);
  if (name === 'name' && tagName === 'details' && value !== '') return rewrite.define(value);
  if (ID_REFERENCE_ATTRIBUTES.has(name))
    return value.split(/\s+/).filter(Boolean).map(rewrite.refer).join(' ');
  if (name === 'href' && value.startsWith('#') && value.length > 1)
    return `#${rewrite.refer(value.slice(1))}`;
  if (name === 'data-main-content-selector' && /^#[A-Za-z][\w-]*$/.test(value))
    return `#${rewrite.refer(value.slice(1))}`;
  return undefined;
}

/** Adds `prefix` to every id and group name, and to references that point at an id in `ids`. */
export function namespaceRewrite(prefix: string, ids: ReadonlySet<string>): IdentifierRewrite {
  return {
    define: (name) => `${prefix}${name}`,
    refer: (id) => (ids.has(id) ? `${prefix}${id}` : id),
  };
}

export function stripNamespaceRewrite(prefix: string): IdentifierRewrite {
  const strip = (value: string): string =>
    value.startsWith(prefix) ? value.slice(prefix.length) : value;
  return { define: strip, refer: strip };
}

/** Every id defined in `html`, in document order and including repeats. */
export function collectIds(html: string): string[] {
  const ids: string[] = [];
  for (const element of elementsOf(parseMarkup(html))) {
    const id = attributeValue(element, 'id');
    if (id) ids.push(id);
  }
  return ids;
}

/** The values that occur more than once, each reported once. */
export function findDuplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

const escapeAttribute = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

/**
 * `html` with `rewrite` applied to its identifier attributes. Only those attributes are touched:
 * every other character of the markup is preserved exactly.
 */
export function rewriteIdentifiers(html: string, rewrite: IdentifierRewrite): string {
  const edits: TextEdit[] = [];
  for (const element of elementsOf(parseMarkup(html))) {
    for (const attribute of element.attrs) {
      const value = rewriteAttribute(element.tagName, attribute.name, attribute.value, rewrite);
      if (value === undefined || value === attribute.value) continue;
      const location = element.sourceCodeLocation?.attrs?.[attribute.name];
      if (!location)
        throw new Error(`No source location for ${attribute.name} on <${element.tagName}>.`);
      const written = html.slice(
        location.startOffset,
        location.startOffset + attribute.name.length
      );
      edits.push({
        start: location.startOffset,
        end: location.endOffset,
        text: `${written}="${escapeAttribute(value)}"`,
      });
    }
  }
  return applyEdits(html, edits);
}
