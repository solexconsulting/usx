import { isElement, isTemplate, parseMarkup, type Element, type ParentNode } from '../html.ts';
import { stripNamespaceRewrite, rewriteAttribute, type IdentifierRewrite } from '../ids.ts';
import type { Source } from '../model/types.ts';

/**
 * Reduces markup to one token per line so React and Django output can be compared structurally.
 * The rules below are deliberate, because the two renderers legitimately differ in these ways:
 *   - the id namespace ("react-" / "django-") is removed;
 *   - attribute order, quoting, entity style and whitespace between tags are not significant;
 *   - comments, <script> elements and inline on* handlers are dropped (React attaches behavior in JS);
 *   - class order, a leading "./", "../" or "/" on asset paths, empty value="" and hidden="hidden" are normalized.
 */
export interface NormalizeOptions {
  readonly source: Source;
  readonly ignoreAttributes: ReadonlySet<string>;
}

const VOID_ELEMENTS: ReadonlySet<string> = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);

const HTML_WHITESPACE = /[ \t\n\r\f]+/g;
const INLINE_HANDLER = /^on[a-z]+$/;
// Protocol-relative URLs (//host/x) keep their slashes.
const LEADING_RELATIVE_PATH = /^(?!\/\/)(?:\.{0,2}\/)+(?=[^/#])/;

const collapseWhitespace = (text: string): string => text.replace(HTML_WHITESPACE, ' ').trim();
const stripRelativePrefix = (path: string): string => path.replace(LEADING_RELATIVE_PATH, '');

function canonicalValue(
  tagName: string,
  name: string,
  value: string,
  rewrite: IdentifierRewrite
): string | undefined {
  const identifier = rewriteAttribute(tagName, name, value, rewrite);
  if (identifier !== undefined) return identifier;
  switch (name) {
    case 'class':
      return value.split(HTML_WHITESPACE).filter(Boolean).sort().join(' ');
    case 'href':
    case 'src':
      return stripRelativePrefix(value);
    case 'srcset':
      return value
        .split(',')
        .map((candidate) => stripRelativePrefix(candidate.trim()))
        .join(', ');
    case 'value':
      return value === '' ? undefined : value;
    default:
      return value;
  }
}

function canonicalAttributes(
  element: Element,
  ignored: ReadonlySet<string>,
  rewrite: IdentifierRewrite
): string[] {
  const attributes: string[] = [];
  for (const attribute of element.attrs) {
    const name = attribute.prefix ? `${attribute.prefix}:${attribute.name}` : attribute.name;
    if (ignored.has(name) || INLINE_HANDLER.test(name)) continue;
    const value = canonicalValue(element.tagName, name, attribute.value, rewrite);
    if (value === undefined) continue;
    // A bare attribute and name="name" (hidden="hidden") are the same boolean attribute.
    attributes.push(value === '' || value === name ? name : `${name}="${value}"`);
  }
  return attributes.sort();
}

export function normalizeMarkup(html: string, options: NormalizeOptions): string[] {
  const lines: string[] = [];
  const rewrite = stripNamespaceRewrite(`${options.source}-`);

  const visitChildren = (parent: ParentNode): void => {
    for (const node of parent.childNodes) {
      if (isElement(node)) visitElement(node);
      else if ('value' in node) {
        const text = collapseWhitespace(node.value);
        if (text) lines.push(text);
      }
    }
  };

  const visitElement = (element: Element): void => {
    if (element.tagName === 'script') return;
    const attributes = canonicalAttributes(element, options.ignoreAttributes, rewrite);
    lines.push(`<${[element.tagName, ...attributes].join(' ')}>`);
    visitChildren(element);
    if (isTemplate(element)) visitChildren(element.content);
    if (!VOID_ELEMENTS.has(element.tagName)) lines.push(`</${element.tagName}>`);
  };

  visitChildren(parseMarkup(html));
  return lines;
}
