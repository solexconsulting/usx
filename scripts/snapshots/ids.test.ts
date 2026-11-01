import assert from 'node:assert/strict';
import test from 'node:test';
import {
  collectIds,
  findDuplicates,
  namespaceRewrite,
  rewriteIdentifiers,
  stripNamespaceRewrite,
} from './ids.ts';

const namespace = (html: string, ids: string[]): string =>
  rewriteIdentifiers(html, namespaceRewrite('react-', new Set(ids)));

test('prefixes ids and references that point at known ids', () => {
  const html = '<label for="name">N</label><input id="name" aria-describedby="hint other" />';
  assert.equal(
    namespace(html, ['name', 'hint']),
    '<label for="react-name">N</label><input id="react-name" aria-describedby="react-hint other" />'
  );
});

test('leaves references to unknown ids alone', () => {
  const html =
    '<a href="#top">Top</a><use href="#icon"></use><div aria-controls="elsewhere"></div>';
  assert.equal(namespace(html, ['present']), html);
});

test('prefixes fragment links and details group names', () => {
  const html = '<a href="#panel">Go</a><details name="group"><summary>S</summary></details>';
  assert.equal(
    namespace(html, ['panel']),
    '<a href="#react-panel">Go</a><details name="react-group"><summary>S</summary></details>'
  );
});

test('keeps in-page navigation selectors pointed at namespaced content', () => {
  const html = '<aside data-main-content-selector="#region"></aside><div id="region"></div>';
  const rewritten = namespace(html, ['region']);
  assert.equal(
    rewritten,
    '<aside data-main-content-selector="#react-region"></aside><div id="react-region"></div>'
  );
  assert.equal(rewriteIdentifiers(rewritten, stripNamespaceRewrite('react-')), html);
});

test('does not treat name on other elements as an identifier', () => {
  const html = '<input name="query" id="q">';
  assert.equal(namespace(html, ['q']), '<input name="query" id="react-q">');
});

test('preserves every character outside the rewritten attributes', () => {
  const html = '<p  class=\'a\'\n   id="x">&amp; &#x27;quoted&#x27;</p>\n<br/>';
  assert.equal(
    namespace(html, ['x']),
    '<p  class=\'a\'\n   id="react-x">&amp; &#x27;quoted&#x27;</p>\n<br/>'
  );
});

test('rewrites single-quoted and unquoted attributes', () => {
  assert.equal(namespace("<i id='a'></i>", ['a']), '<i id="react-a"></i>');
  assert.equal(namespace('<i id=a></i>', ['a']), '<i id="react-a"></i>');
});

test('lists of ids are written one space apart, even when no id changes', () => {
  assert.equal(
    namespace('<i aria-owns=" a \n b ">', ['a', 'b']),
    '<i aria-owns="react-a react-b">'
  );
  assert.equal(namespace('<i aria-owns="x  y ">', []), '<i aria-owns="x y">');
});

test('reaches into template contents', () => {
  assert.equal(
    namespace('<template><b id="t"></b></template>', ['t']),
    '<template><b id="react-t"></b></template>'
  );
});

test('ignores an empty id', () => {
  assert.equal(namespace('<i id=""></i>', []), '<i id=""></i>');
});

test('stripNamespaceRewrite undoes namespacing for the matching source only', () => {
  const html = '<label for="react-a">A</label><input id="react-a"><i id="django-b">';
  assert.equal(
    rewriteIdentifiers(html, stripNamespaceRewrite('react-')),
    '<label for="a">A</label><input id="a"><i id="django-b">'
  );
});

test('collectIds lists ids in document order including repeats; findDuplicates reports each once', () => {
  const ids = collectIds('<i id="a"></i><b id="b"><u id="a"></u><s id="a"></s></b>');
  assert.deepEqual(ids, ['a', 'b', 'a', 'a']);
  assert.deepEqual(findDuplicates(ids), ['a']);
  assert.deepEqual(findDuplicates(['x', 'y']), []);
});
