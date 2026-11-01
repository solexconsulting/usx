import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { listComponents } from './model/catalog.ts';
import { snapshotPath } from './model/paths.ts';
import { SOURCES } from './model/types.ts';
import { parseSnapshot, serializeSnapshot } from './snapshotFile.ts';

test('serializes headings, blank-line separated, with a trailing newline', () => {
  const text = serializeSnapshot([
    { title: 'Default', html: '<p>one</p>' },
    { title: 'Tom & Jerry', html: '<p>two</p>' },
  ]);
  assert.equal(
    text,
    [
      '<h3 class="site-preview-heading">Default</h3>',
      '<p>one</p>',
      '',
      '<h3 class="site-preview-heading">Tom &amp; Jerry</h3>',
      '<p>two</p>',
      '',
    ].join('\n')
  );
});

test('an empty snapshot serializes to an empty file and parses back to no sections', () => {
  assert.equal(serializeSnapshot([]), '');
  assert.deepEqual(parseSnapshot(''), []);
  assert.deepEqual(parseSnapshot('\n'), []);
});

test('parse inverts serialize, decoding titles and trimming bodies', () => {
  const sections = [
    { title: 'Tom & Jerry <3', html: '<div>\n  <b>x</b>\n</div>' },
    { title: 'Second', html: '' },
  ];
  assert.deepEqual(parseSnapshot(serializeSnapshot(sections)), sections);
});

test('rejects content before the first heading and unclosed headings', () => {
  assert.throws(
    () => parseSnapshot('<p>stray</p>\n<h3 class="site-preview-heading">A</h3>'),
    /before the first heading/
  );
  assert.throws(() => parseSnapshot('<h3 class="site-preview-heading">A'), /never closed/);
});

test('every committed snapshot survives a parse and serialize round trip unchanged', () => {
  for (const component of listComponents()) {
    for (const source of SOURCES) {
      const file = snapshotPath(component, source);
      if (!fs.existsSync(file)) continue;
      const text = fs.readFileSync(file, 'utf8');
      assert.equal(
        serializeSnapshot(parseSnapshot(text)),
        text,
        `${path.relative(process.cwd(), file)} does not round-trip`
      );
    }
  }
});
