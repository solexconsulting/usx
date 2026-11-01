import assert from 'node:assert/strict';
import test from 'node:test';
import type { PlayResult } from '../model/results.ts';
import type { Attempt } from './attempt.ts';
import { executePlay, withHistory } from './execute.ts';

const attempt = (status: Attempt['status'], extra: Partial<Attempt> = {}): Attempt => ({
  status,
  durationMs: 100,
  consoleErrors: [],
  ...extra,
});

const sequence = (...attempts: Attempt[]): (() => Promise<Attempt>) => {
  let next = 0;
  return async () => attempts[Math.min(next++, attempts.length - 1)] as Attempt;
};

test('a play that passes first time is a pass with one attempt', async () => {
  const result = await executePlay(sequence(attempt('pass', { assertions: 3 })), 2);
  assert.deepEqual(result, {
    status: 'pass',
    attempts: 1,
    durationMs: 100,
    consoleErrors: [],
    assertions: 3,
  });
});

test('a play that passes only after a failure is flaky', async () => {
  const result = await executePlay(sequence(attempt('fail', { message: 'x' }), attempt('pass')), 1);
  assert.equal(result.status, 'flaky');
  assert.equal(result.attempts, 2);
  assert.equal(result.message, 'x');
});

test('a play that keeps failing reports the last failure after every allowed attempt', async () => {
  let runs = 0;
  const result = await executePlay(
    async () => attempt('fail', { message: `failure ${++runs}` }),
    2
  );
  assert.equal(runs, 3);
  assert.deepEqual([result.status, result.attempts, result.message], ['fail', 3, 'failure 3']);
});

test('with no retries a failure is reported at once', async () => {
  const result = await executePlay(sequence(attempt('error', { message: 'timed out' })), 0);
  assert.deepEqual([result.status, result.attempts], ['error', 1]);
});

const result = (
  status: PlayResult['status'],
  previousStatus?: PlayResult['status']
): PlayResult => ({
  status,
  attempts: 1,
  durationMs: 1,
  consoleErrors: [],
  ...(previousStatus ? { previousStatus } : {}),
});

test('history records the status a changed result replaced', () => {
  assert.equal(withHistory(result('fail'), result('pass')).previousStatus, 'pass');
  assert.equal(withHistory(result('pass'), result('fail')).previousStatus, 'fail');
});

test('history carries an earlier status through repeated results', () => {
  assert.equal(withHistory(result('fail'), result('fail', 'pass')).previousStatus, 'pass');
});

test('the first result and unchanged results have no history', () => {
  assert.equal(withHistory(result('pass'), undefined).previousStatus, undefined);
  assert.equal(withHistory(result('pass'), result('pass')).previousStatus, undefined);
});
