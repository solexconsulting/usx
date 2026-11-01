import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { isPlayResult } from '../model/results.ts';
import { freshnessOf } from '../results/stores.ts';
import { generationInputFiles, hashFiles, listFiles, playInputFiles } from './inputs.ts';
import { cleanMessage } from './text.ts';

const withDirectory = (run: (directory: string) => void) => () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'inputs-'));
  try {
    run(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
};

test(
  'listFiles is recursive and sorted, skips node_modules, and tolerates a missing root',
  withDirectory((directory) => {
    fs.mkdirSync(path.join(directory, 'b', 'node_modules'), { recursive: true });
    fs.writeFileSync(path.join(directory, 'b', 'node_modules', 'ignored.js'), '');
    fs.writeFileSync(path.join(directory, 'b', 'two.js'), '');
    fs.writeFileSync(path.join(directory, 'a.js'), '');
    assert.deepEqual(
      listFiles(directory).map((file) => path.relative(directory, file)),
      ['a.js', path.join('b', 'two.js')]
    );
    assert.deepEqual(listFiles(path.join(directory, 'missing')), []);
    assert.deepEqual(listFiles(path.join(directory, 'a.js')), [path.join(directory, 'a.js')]);
  })
);

test(
  'hashFiles changes with content and path, not with the order files are given',
  withDirectory((directory) => {
    const a = path.join(directory, 'a.txt');
    const b = path.join(directory, 'b.txt');
    fs.writeFileSync(a, 'one');
    fs.writeFileSync(b, 'two');
    const before = hashFiles([a, b]);
    assert.equal(hashFiles([b, a]), before);
    fs.writeFileSync(a, 'changed');
    assert.notEqual(hashFiles([a, b]), before);
  })
);

test('play inputs include the stories, the component and only the source’s own snapshot', () => {
  const files = playInputFiles('carousel', 'react').map((file) => path.basename(file));
  assert.ok(files.includes('Carousel.HTML.stories.jsx'));
  assert.ok(files.includes('Carousel.tsx'));
  assert.ok(files.includes('carousel.react-snapshot.html'));
  assert.ok(!files.includes('carousel.django-snapshot.html'));
});

test('Django snapshot inputs include co-located story templates', () => {
  const django = generationInputFiles('clickable', 'django').map((file) => path.basename(file));
  const react = generationInputFiles('clickable', 'react').map((file) => path.basename(file));
  assert.ok(django.includes('story-single.html'));
  assert.ok(!react.includes('story-single.html'));
});

test('freshness compares the stored hash with the current one', () => {
  const stored = {
    inputHash: 'a',
    recordedAt: 't',
    result: { status: 'pass', attempts: 1, durationMs: 1, consoleErrors: [] },
  } as const;
  assert.equal(freshnessOf(undefined, 'a'), 'missing');
  assert.equal(freshnessOf(stored, 'a'), 'current');
  assert.equal(freshnessOf(stored, 'b'), 'stale');
});

test('isPlayResult accepts valid results and rejects malformed ones', () => {
  const valid = {
    status: 'flaky',
    attempts: 2,
    durationMs: 5,
    consoleErrors: [{ message: 'm', count: 1 }],
    previousStatus: 'fail',
  };
  assert.equal(isPlayResult(valid), true);
  assert.equal(isPlayResult({ ...valid, status: 'passed' }), false);
  assert.equal(isPlayResult({ ...valid, consoleErrors: [{ message: 1 }] }), false);
  assert.equal(isPlayResult(null), false);
});

test('cleanMessage strips colour codes, collapses whitespace and truncates', () => {
  assert.equal(cleanMessage('\u001b[31mred\u001b[0m   text\n\nhere'), 'red text here');
  assert.equal(cleanMessage('abcdef', 3), 'abc');
});
