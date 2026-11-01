import assert from 'node:assert/strict';
import test from 'node:test';
import { formatHtml, protectWhitespace, trimBlankLineWhitespace } from './format.ts';

test('protectWhitespace marks only whitespace-sensitive elements', () => {
  assert.equal(
    protectWhitespace('<div><p class="a usx-details__text">x</p><p class="b">y</p></div>'),
    '<div><!-- prettier-ignore --><p class="a usx-details__text">x</p><p class="b">y</p></div>'
  );
  assert.equal(protectWhitespace('<p>plain</p>'), '<p>plain</p>');
});

test('formatHtml formats valid markup', async () => {
  const result = await formatHtml('<div><p>a</p></div>', `${process.cwd()}/x.html`);
  assert.equal(result.warning, undefined);
  assert.equal(result.text, '<div><p>a</p></div>\n');
});

test('blank-line cleanup preserves whitespace inside pre-wrap text', () => {
  const html = '<div>\n  \n<p class="usx-details__text">\n  \nText\n</p>\n  \n</div>';
  assert.equal(
    trimBlankLineWhitespace(html),
    '<div>\n\n<p class="usx-details__text">\n  \nText\n</p>\n\n</div>'
  );
});

test('formatHtml returns markup Prettier rejects unchanged, with a warning', async () => {
  const result = await formatHtml('<div></p></div>', `${process.cwd()}/x.html`);
  assert.equal(result.text, '<div></p></div>');
  assert.match(result.warning ?? '', /^not formatted: /);
});
