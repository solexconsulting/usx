import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeMarkup } from './normalize.ts';

const normalize = (html: string, source: 'react' | 'django' = 'react', ignore: string[] = []) =>
  normalizeMarkup(html, { source, ignoreAttributes: new Set(ignore) });

test('emits one line per tag and text, with void elements opened only', () => {
  assert.deepEqual(normalize('<p>Hello <b>there</b><br>!</p>'), [
    '<p>',
    'Hello',
    '<b>',
    'there',
    '</b>',
    '<br>',
    '!',
    '</p>',
  ]);
});

test('attribute order, quoting and entity style do not matter', () => {
  assert.deepEqual(
    normalize('<a href="x" title=\'a &amp; b\'>t</a>'),
    normalize('<a title="a &#38; b" href=x>t</a>')
  );
});

test('whitespace between tags and inside text is collapsed', () => {
  assert.deepEqual(normalize('<p>\n  a\n  b  </p>\n\n<p>c</p>'), [
    '<p>',
    'a b',
    '</p>',
    '<p>',
    'c',
    '</p>',
  ]);
});

test('non-breaking spaces are kept because they are not HTML whitespace', () => {
  assert.deepEqual(normalize('<p>a&nbsp;b</p>'), ['<p>', 'a\u00a0b', '</p>']);
});

test('comments, scripts and inline handlers are dropped', () => {
  assert.deepEqual(
    normalize('<!-- c --><button onclick="go()" type="button">x</button><script>alert(1)</script>'),
    ['<button type="button">', 'x', '</button>']
  );
});

test('self-closed and explicitly closed svg elements are the same', () => {
  assert.deepEqual(
    normalize('<svg><path d="M0"/></svg>'),
    normalize('<svg><path d="M0"></path></svg>')
  );
});

test('classes are compared as a sorted set of tokens', () => {
  assert.deepEqual(normalize('<i class="b  a"></i>'), normalize('<i class="a b"></i>'));
});

test('boolean attributes are the same bare or spelled out, and empty value is dropped', () => {
  assert.deepEqual(normalize('<i hidden="hidden"></i>'), normalize('<i hidden></i>'));
  assert.deepEqual(normalize('<input value="">'), normalize('<input>'));
  assert.deepEqual(normalize('<input value="0">'), ['<input value="0">']);
});

test('asset paths are compared without a leading ./, ../ or /', () => {
  assert.deepEqual(normalize('<use href="/img/a.svg#x">'), normalize('<use href="img/a.svg#x">'));
  assert.deepEqual(normalize('<img src="./a.png">'), normalize('<img src="a.png">'));
  assert.deepEqual(normalize('<img src="../../a.png">'), normalize('<img src="a.png">'));
  assert.deepEqual(
    normalize('<img srcset="./a.png 1x, ./b.png 2x">'),
    normalize('<img srcset="a.png 1x, b.png 2x">')
  );
  assert.deepEqual(normalize('<a href="//example.com">'), ['<a href="//example.com">', '</a>']);
});

test("only the snapshot's own id namespace is removed", () => {
  const html = '<label for="react-a">x</label><input id="react-a"><i id="django-a">';
  assert.deepEqual(normalize(html, 'react'), [
    '<label for="a">',
    'x',
    '</label>',
    '<input id="a">',
    '<i id="django-a">',
    '</i>',
  ]);
  assert.deepEqual(normalize('<a href="#django-p">', 'django'), ['<a href="#p">', '</a>']);
});

test('named attributes can be ignored', () => {
  assert.deepEqual(normalize('<a href="/x" id="y">', 'react', ['href']), ['<a id="y">', '</a>']);
});

test('template contents are included', () => {
  assert.deepEqual(normalize('<template><b>x</b></template>'), [
    '<template>',
    '<b>',
    'x',
    '</b>',
    '</template>',
  ]);
});
