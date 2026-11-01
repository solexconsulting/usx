import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { ResultStore } from './store.ts';

const isCount = (value: unknown): value is { count: number } =>
  typeof value === 'object' &&
  value !== null &&
  'count' in value &&
  typeof value.count === 'number';

const withStore =
  (run: (store: ResultStore<{ count: number }>, directory: string) => void) => () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'result-store-'));
    try {
      run(new ResultStore(directory, isCount), directory);
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  };

test(
  'reads back what was written',
  withStore((store) => {
    const stored = {
      inputHash: 'abc',
      recordedAt: '2026-01-01T00:00:00.000Z',
      result: { count: 3 },
    };
    store.write('button.react', stored);
    assert.deepEqual(store.read('button.react'), stored);
  })
);

test(
  'a missing key reads as undefined',
  withStore((store) => {
    assert.equal(store.read('button.react'), undefined);
  })
);

test(
  'creates the directory on first write and leaves no temporary file',
  withStore((store, directory) => {
    const nested = path.join(directory, 'nested');
    new ResultStore(nested, isCount).write('a', {
      inputHash: 'h',
      recordedAt: 't',
      result: { count: 1 },
    });
    assert.deepEqual(fs.readdirSync(nested), ['a.json']);
    assert.equal(store.read('a'), undefined);
  })
);

test(
  'rejects unparseable and malformed files with a helpful message',
  withStore((store, directory) => {
    fs.writeFileSync(path.join(directory, 'broken.json'), '{ nope');
    assert.throws(() => store.read('broken'), /broken\.json is not valid JSON/);
    fs.writeFileSync(
      path.join(directory, 'wrong.json'),
      JSON.stringify({ inputHash: 'h', recordedAt: 't', result: { count: 'x' } })
    );
    assert.throws(() => store.read('wrong'), /wrong\.json is not a valid result file/);
  })
);

test(
  'rejects keys that could escape the directory',
  withStore((store) => {
    assert.throws(() => store.read('../outside'), RangeError);
    assert.throws(() => store.read(''), RangeError);
  })
);
