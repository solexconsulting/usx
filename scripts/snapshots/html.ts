import { parseFragment, type DefaultTreeAdapterMap } from 'parse5';

export type Element = DefaultTreeAdapterMap['element'];
export type ParentNode = DefaultTreeAdapterMap['parentNode'];
export type ChildNode = DefaultTreeAdapterMap['childNode'];
export type Template = DefaultTreeAdapterMap['template'];

/** Parses markup as the body of a document, recording where every element and attribute sits in `html`. */
export function parseMarkup(html: string): DefaultTreeAdapterMap['documentFragment'] {
  return parseFragment(html, { sourceCodeLocationInfo: true });
}

export const isElement = (node: ChildNode): node is Element => 'tagName' in node;

export const isTemplate = (element: Element): element is Template =>
  element.tagName === 'template' && 'content' in element;

/** Every element below `parent` in document order, including the contents of <template>. */
export function* elementsOf(parent: ParentNode): Generator<Element> {
  for (const child of parent.childNodes) {
    if (!isElement(child)) continue;
    yield child;
    yield* elementsOf(child);
    if (isTemplate(child)) yield* elementsOf(child.content);
  }
}

export function attributeValue(element: Element, name: string): string | undefined {
  return element.attrs.find((attribute) => attribute.name === name)?.value;
}

/** The decoded text of all text nodes below `parent`. */
export function textContent(parent: ParentNode): string {
  return parent.childNodes
    .map((child) => {
      if ('value' in child && child.nodeName === '#text') return child.value;
      return 'childNodes' in child ? textContent(child) : '';
    })
    .join('');
}

export interface TextEdit {
  readonly start: number;
  readonly end: number;
  readonly text: string;
}

/** Replaces each [start, end) span of `source` with its text. Edits must not overlap. */
export function applyEdits(source: string, edits: readonly TextEdit[]): string {
  const ordered = [...edits].sort((a, b) => b.start - a.start);
  let result = source;
  let limit = source.length;
  for (const edit of ordered) {
    if (edit.end > limit) throw new RangeError('Text edits overlap.');
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
    limit = edit.start;
  }
  return result;
}
