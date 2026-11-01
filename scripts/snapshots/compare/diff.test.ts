import assert from 'node:assert/strict';
import test from 'node:test';
import { collapseUnchanged, diffLines } from './diff.ts';

const summary = (before: string[], after: string[]): string[] =>
  diffLines(before, after).map(
    ({ kind, text }) => `${{ same: ' ', removed: '-', added: '+' }[kind]}${text}`
  );

test('identical input is all unchanged lines', () => {
  assert.deepEqual(summary(['a', 'b'], ['a', 'b']), [' a', ' b']);
});

test('reports additions, removals and replacements in order', () => {
  assert.deepEqual(summary(['a', 'b', 'c'], ['a', 'c']), [' a', '-b', ' c']);
  assert.deepEqual(summary(['a', 'c'], ['a', 'b', 'c']), [' a', '+b', ' c']);
  assert.deepEqual(summary(['a', 'x', 'c'], ['a', 'y', 'c']), [' a', '-x', '+y', ' c']);
});

test('handles empty sides', () => {
  assert.deepEqual(summary([], ['a']), ['+a']);
  assert.deepEqual(summary(['a'], []), ['-a']);
  assert.deepEqual(summary([], []), []);
});

test('finds the longest common subsequence in the changed middle', () => {
  assert.deepEqual(summary(['<', 'p', 'q', 'r', '>'], ['<', 'q', 'x', 'r', '>']), [
    ' <',
    '-p',
    ' q',
    '+x',
    ' r',
    ' >',
  ]);
});

test('collapseUnchanged keeps context around changes and counts what it drops', () => {
  const diff = diffLines(
    ['1', '2', '3', '4', '5', '6', '7', '8'],
    ['1', '2', '3', '4', 'X', '6', '7', '8']
  );
  assert.deepEqual(
    collapseUnchanged(diff, 1).map((entry) =>
      entry.kind === 'gap' ? `gap ${entry.count}` : entry.text
    ),
    ['gap 3', '4', '5', 'X', '6', 'gap 2']
  );
});

test('collapseUnchanged of an unchanged diff is a single gap', () => {
  assert.deepEqual(collapseUnchanged(diffLines(['a', 'b'], ['a', 'b']), 3), [
    { kind: 'gap', count: 2 },
  ]);
  assert.deepEqual(collapseUnchanged([], 3), []);
});
