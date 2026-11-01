import assert from 'node:assert/strict';
import test from 'node:test';
import { applyEdits, attributeValue, elementsOf, parseMarkup, textContent } from './html.ts';

test('applyEdits replaces spans, in any order, preserving the rest', () => {
  assert.equal(
    applyEdits('0123456789', [
      { start: 6, end: 8, text: 'X' },
      { start: 1, end: 3, text: 'YY' },
      { start: 5, end: 5, text: '|' },
    ]),
    '0YY34|5X89'
  );
  assert.equal(applyEdits('abc', []), 'abc');
});

test('applyEdits rejects overlapping edits', () => {
  assert.throws(
    () =>
      applyEdits('0123456789', [
        { start: 1, end: 5, text: '' },
        { start: 3, end: 6, text: '' },
      ]),
    RangeError
  );
});

test('elementsOf walks in document order and enters templates', () => {
  const tags = [
    ...elementsOf(parseMarkup('<div><p></p><template><b></b></template></div><i></i>')),
  ].map((element) => element.tagName);
  assert.deepEqual(tags, ['div', 'p', 'template', 'b', 'i']);
});

test('attributeValue reads decoded attributes; textContent decodes text', () => {
  const [element] = [...elementsOf(parseMarkup('<a title="a &amp; b">x &lt; y<b>z</b></a>'))];
  assert.ok(element);
  assert.equal(attributeValue(element, 'title'), 'a & b');
  assert.equal(attributeValue(element, 'missing'), undefined);
  assert.equal(textContent(element), 'x < yz');
});
