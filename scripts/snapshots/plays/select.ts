import type { PlayResult } from '../model/results.ts';
import type { StoredResult } from '../results/store.ts';
import { freshnessOf } from '../results/stores.ts';

export interface RunFilters {
  /** Only plays never recorded or recorded before their inputs last changed. */
  readonly changed?: boolean;
  /** Only plays whose last result was a failure or an error. */
  readonly failed?: boolean;
}

/** With no filters every play runs; with several, a play runs if it satisfies any of them. */
export function wantsRun(
  filters: RunFilters,
  stored: StoredResult<PlayResult> | undefined,
  currentHash: () => string
): boolean {
  if (!filters.changed && !filters.failed) return true;
  const changed = filters.changed === true && freshnessOf(stored, currentHash()) !== 'current';
  const failed =
    filters.failed === true &&
    (stored?.result.status === 'fail' || stored?.result.status === 'error');
  return changed || failed;
}
