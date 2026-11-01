import path from 'node:path';
import { RESULTS_DIR } from '../model/paths.ts';
import {
  isGenerationResult,
  isPlayResult,
  type GenerationResult,
  type PlayResult,
} from '../model/results.ts';
import type { ComponentName, Source } from '../model/types.ts';
import { ResultStore, type StoredResult } from './store.ts';

export const playStore = (): ResultStore<PlayResult> =>
  new ResultStore(path.join(RESULTS_DIR, 'plays'), isPlayResult);

export const generationStore = (): ResultStore<GenerationResult> =>
  new ResultStore(path.join(RESULTS_DIR, 'generation'), isGenerationResult);

/** The key a component's result for one source is stored under, in either store. */
export const resultKey = (component: ComponentName, source: Source): string =>
  `${component}.${source}`;

/** current: recorded against the inputs as they are now; stale: the inputs have changed since. */
export type Freshness = 'missing' | 'stale' | 'current';

export function freshnessOf<T>(
  stored: StoredResult<T> | undefined,
  currentHash: string
): Freshness {
  if (!stored) return 'missing';
  return stored.inputHash === currentHash ? 'current' : 'stale';
}
