import type { PlayResult, PlayStatus } from '../model/results.ts';
import type { Attempt } from './attempt.ts';

/**
 * The outcome of running a play up to `1 + retries` times, stopping at the first pass. Passing only
 * after a failure is reported as flaky, so intermittent plays are visible instead of hidden or noisy.
 */
export async function executePlay(
  runAttempt: () => Promise<Attempt>,
  retries: number
): Promise<PlayResult> {
  let firstFailure: Attempt | undefined;
  let last: Attempt | undefined;
  for (let attempts = 1; attempts <= 1 + retries; attempts++) {
    last = await runAttempt();
    if (last.status === 'pass')
      return attempts === 1
        ? toResult(last, 'pass', 1, undefined)
        : toResult(last, 'flaky', attempts, firstFailure?.message);
    firstFailure ??= last;
  }
  const final = last as Attempt;
  return toResult(final, final.status, 1 + retries, final.message);
}

/** `message` is why the play failed; for a flaky play, why its first attempt did. */
function toResult(
  attempt: Attempt,
  status: PlayStatus,
  attempts: number,
  message: string | undefined
): PlayResult {
  return {
    status,
    attempts,
    durationMs: attempt.durationMs,
    ...(message === undefined ? {} : { message }),
    consoleErrors: attempt.consoleErrors,
    ...(attempt.assertions === undefined ? {} : { assertions: attempt.assertions }),
  };
}

/** Remembers the last different status of the result it replaces, so a regression can be seen. */
export function withHistory(next: PlayResult, existing: PlayResult | undefined): PlayResult {
  if (!existing) return next;
  const previousStatus =
    existing.status === next.status ? existing.previousStatus : existing.status;
  return previousStatus === undefined ? next : { ...next, previousStatus };
}
