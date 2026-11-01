export type PlayStatus = 'pass' | 'flaky' | 'fail' | 'error';

const PLAY_STATUSES: readonly PlayStatus[] = ['pass', 'flaky', 'fail', 'error'];

/** An error the page logged while its play ran, with how often. */
export interface ConsoleError {
  readonly message: string;
  /** Where it came from; for a failed request, the URL that failed. */
  readonly url?: string;
  readonly count: number;
}

/**
 * pass: passed first time; flaky: failed, then passed on a retry; fail: Storybook reported a failing
 * play or story; error: no answer was obtained (navigation failed or the play never finished).
 * `message` says why a play failed, or for a flaky one why its first attempt did.
 */
export interface PlayResult {
  readonly status: PlayStatus;
  readonly attempts: number;
  readonly durationMs: number;
  readonly message?: string;
  readonly consoleErrors: readonly ConsoleError[];
  /** Matcher calls in the play, present only when counted. */
  readonly assertions?: number;
  /** The most recent different status of an earlier run, so a regression can be seen. */
  readonly previousStatus?: PlayStatus;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isPlayStatus = (value: unknown): value is PlayStatus =>
  PLAY_STATUSES.some((status) => status === value);

const isConsoleError = (value: unknown): value is ConsoleError =>
  isRecord(value) &&
  typeof value.message === 'string' &&
  typeof value.count === 'number' &&
  (value.url === undefined || typeof value.url === 'string');

export function isPlayResult(value: unknown): value is PlayResult {
  return (
    isRecord(value) &&
    isPlayStatus(value.status) &&
    typeof value.attempts === 'number' &&
    typeof value.durationMs === 'number' &&
    (value.message === undefined || typeof value.message === 'string') &&
    Array.isArray(value.consoleErrors) &&
    value.consoleErrors.every(isConsoleError) &&
    (value.assertions === undefined || typeof value.assertions === 'number') &&
    (value.previousStatus === undefined || isPlayStatus(value.previousStatus))
  );
}

/** What the last attempt to render a snapshot did. */
export interface GenerationResult {
  readonly status: 'written' | 'unchanged' | 'failed';
  readonly sectionCount?: number;
  /** Problems that did not stop the snapshot being written, such as ids used twice. */
  readonly warnings: readonly string[];
  /** Why generation failed. */
  readonly message?: string;
}

const GENERATION_STATUSES: readonly GenerationResult['status'][] = [
  'written',
  'unchanged',
  'failed',
];

export function isGenerationResult(value: unknown): value is GenerationResult {
  return (
    isRecord(value) &&
    GENERATION_STATUSES.some((status) => status === value.status) &&
    (value.sectionCount === undefined || typeof value.sectionCount === 'number') &&
    Array.isArray(value.warnings) &&
    value.warnings.every((warning) => typeof warning === 'string') &&
    (value.message === undefined || typeof value.message === 'string')
  );
}
