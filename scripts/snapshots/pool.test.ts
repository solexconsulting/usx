import assert from 'node:assert/strict';
import test from 'node:test';
import { mapConcurrent } from './pool.ts';

const pause = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

test('results keep input order regardless of completion order', async () => {
  const results = await mapConcurrent([30, 1, 15], 3, async (delay) => {
    await pause(delay);
    return delay;
  });
  assert.deepEqual(results, [30, 1, 15]);
});

test('never runs more than the limit at once', async () => {
  let running = 0;
  let peak = 0;
  await mapConcurrent([1, 2, 3, 4, 5, 6], 2, async () => {
    running++;
    peak = Math.max(peak, running);
    await pause(5);
    running--;
  });
  assert.equal(peak, 2);
});

test('an empty list resolves to an empty list', async () => {
  assert.deepEqual(await mapConcurrent([], 4, async () => 1), []);
});

test('rethrows the first failure and starts no further tasks', async () => {
  const started: number[] = [];
  await assert.rejects(
    mapConcurrent([1, 2, 3, 4, 5], 1, async (item) => {
      started.push(item);
      if (item === 2) throw new Error('boom');
    }),
    /boom/
  );
  assert.deepEqual(started, [1, 2]);
});

test('rejects an invalid limit', async () => {
  await assert.rejects(
    mapConcurrent([1], 0, async () => 1),
    RangeError
  );
  await assert.rejects(
    mapConcurrent([1], 1.5, async () => 1),
    RangeError
  );
});
