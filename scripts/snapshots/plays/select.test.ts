import assert from 'node:assert/strict';
import test from 'node:test';
import type { PlayResult } from '../model/results.ts';
import { wantsRun } from './select.ts';

const stored = (status: PlayResult['status'], inputHash = 'h') => ({
  inputHash,
  recordedAt: 't',
  result: { status, attempts: 1, durationMs: 1, consoleErrors: [] },
});

test('without filters everything runs, recorded or not', () => {
  assert.equal(
    wantsRun({}, undefined, () => 'h'),
    true
  );
  assert.equal(
    wantsRun({}, stored('pass'), () => 'h'),
    true
  );
});

test('changed selects plays that were never recorded or whose inputs changed', () => {
  assert.equal(
    wantsRun({ changed: true }, undefined, () => 'h'),
    true
  );
  assert.equal(
    wantsRun({ changed: true }, stored('pass', 'old'), () => 'new'),
    true
  );
  assert.equal(
    wantsRun({ changed: true }, stored('pass'), () => 'h'),
    false
  );
});

test('failed selects plays whose last result failed or errored, current or not', () => {
  assert.equal(
    wantsRun({ failed: true }, stored('fail'), () => 'h'),
    true
  );
  assert.equal(
    wantsRun({ failed: true }, stored('error', 'old'), () => 'new'),
    true
  );
  assert.equal(
    wantsRun({ failed: true }, stored('flaky'), () => 'h'),
    false
  );
  assert.equal(
    wantsRun({ failed: true }, undefined, () => 'h'),
    false
  );
});

test('both filters together select a play that satisfies either', () => {
  const both = { changed: true, failed: true };
  assert.equal(
    wantsRun(both, stored('fail'), () => 'h'),
    true
  );
  assert.equal(
    wantsRun(both, stored('pass', 'old'), () => 'new'),
    true
  );
  assert.equal(
    wantsRun(both, stored('pass'), () => 'h'),
    false
  );
});
