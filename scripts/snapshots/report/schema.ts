/**
 * The contract between the snapshot tooling, which writes reports/snapshot-report.json, and the
 * Storybook report page, which reads it. Both sides import this file.
 */
import type { ComponentComparison, ComponentStatus, SectionStatus } from '../compare/compare.ts';
import type { GenerationResult, PlayResult } from '../model/results.ts';
import type { ComponentName, Source } from '../model/types.ts';

/** Bump when the shape changes; the page refuses a report of another version. */
export const REPORT_VERSION = 1;

/** current: recorded against the inputs as they are now; stale: the inputs have changed since. */
export type ReportFreshness = 'current' | 'stale';

export type PlayReport =
  /** The component has no "All Variants" story for this source. */
  | { readonly state: 'no-story' }
  | { readonly state: 'no-play'; readonly storyId: string }
  /** Storybook was not consulted, so it is unknown whether there is a play. */
  | { readonly state: 'unknown' }
  | { readonly state: 'not-run'; readonly storyId?: string }
  | {
      readonly state: 'ran';
      readonly storyId?: string;
      readonly freshness: ReportFreshness;
      readonly recordedAt: string;
      readonly result: PlayResult;
    };

export type GenerationReport =
  | { readonly state: 'not-recorded' }
  | {
      readonly state: 'recorded';
      readonly freshness: ReportFreshness;
      readonly recordedAt: string;
      readonly result: GenerationResult;
    };

export interface ComponentReport {
  readonly name: ComponentName;
  readonly comparison: ComponentComparison;
  readonly plays: Readonly<Record<Source, PlayReport>>;
  readonly generation: Readonly<Record<Source, GenerationReport>>;
}

export interface Report {
  readonly version: typeof REPORT_VERSION;
  readonly generatedAt: string;
  readonly components: readonly ComponentReport[];
}

const COMPONENT_STATUSES: readonly ComponentStatus[] = [
  'missing',
  'incomplete',
  'match',
  'differs',
];
const SECTION_STATUSES: readonly SectionStatus[] = [
  'identical',
  'different',
  'react-only',
  'django-only',
];
const PLAY_STATES = ['no-story', 'no-play', 'unknown', 'not-run', 'ran'];
const SOURCE_KEYS: readonly Source[] = ['react', 'django'];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isSection = (value: unknown): boolean =>
  isRecord(value) &&
  typeof value.title === 'string' &&
  SECTION_STATUSES.some((status) => status === value.status) &&
  typeof value.changedLines === 'number' &&
  (value.diff === undefined || Array.isArray(value.diff)) &&
  (value.expected === undefined || typeof value.expected === 'string');

const isComparison = (value: unknown): value is ComponentComparison =>
  isRecord(value) &&
  COMPONENT_STATUSES.some((status) => status === value.status) &&
  Array.isArray(value.present) &&
  Array.isArray(value.sections) &&
  value.sections.every(isSection) &&
  Array.isArray(value.staleExpectations);

const hasPerSource = (
  value: unknown,
  accepts: (entry: Record<string, unknown>) => boolean
): boolean =>
  isRecord(value) &&
  SOURCE_KEYS.every((source) => {
    const entry = value[source];
    return isRecord(entry) && accepts(entry);
  });

const isComponent = (value: unknown): value is ComponentReport =>
  isRecord(value) &&
  typeof value.name === 'string' &&
  isComparison(value.comparison) &&
  hasPerSource(
    value.plays,
    (play) => typeof play.state === 'string' && PLAY_STATES.includes(play.state)
  ) &&
  hasPerSource(
    value.generation,
    (entry) => entry.state === 'not-recorded' || entry.state === 'recorded'
  );

/** Checks the structure the page relies on and returns the report, or throws a message the page can show. */
export function parseReport(value: unknown): Report {
  if (!isRecord(value) || value.version !== REPORT_VERSION)
    throw new Error(
      `This report was not written by the current tooling (expected version ${REPORT_VERSION}). Run "pnpm snapshots report".`
    );
  if (
    typeof value.generatedAt !== 'string' ||
    !Array.isArray(value.components) ||
    !value.components.every(isComponent)
  )
    throw new Error('The report is malformed. Run "pnpm snapshots report" to rebuild it.');
  return { version: REPORT_VERSION, generatedAt: value.generatedAt, components: value.components };
}
