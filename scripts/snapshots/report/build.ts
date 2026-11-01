import { compareComponent } from '../compare/compare.ts';
import type { Expectations } from '../compare/expectations.ts';
import type { GenerationResult, PlayResult } from '../model/results.ts';
import type { ComponentName, Section, Source } from '../model/types.ts';
import { findPlayTarget, type IndexEntry } from '../plays/storyIndex.ts';
import { freshnessOf } from '../results/stores.ts';
import type { StoredResult } from '../results/store.ts';
import {
  REPORT_VERSION,
  type ComponentReport,
  type GenerationReport,
  type PlayReport,
  type Report,
} from './schema.ts';

/** Everything a report is made of, as functions, so the report is computed without touching the world. */
export interface ReportSources {
  readonly components: readonly ComponentName[];
  readonly expectations: Expectations;
  readonly readSnapshot: (component: ComponentName, source: Source) => Section[] | undefined;
  readonly readPlay: (
    component: ComponentName,
    source: Source
  ) => StoredResult<PlayResult> | undefined;
  readonly readGeneration: (
    component: ComponentName,
    source: Source
  ) => StoredResult<GenerationResult> | undefined;
  readonly playInputHash: (component: ComponentName, source: Source) => string;
  readonly generationInputHash: (component: ComponentName, source: Source) => string;
  /** Storybook's story index; absent when Storybook was not consulted. */
  readonly index: readonly IndexEntry[] | undefined;
  readonly now: Date;
}

function playReport(sources: ReportSources, component: ComponentName, source: Source): PlayReport {
  const stored = sources.readPlay(component, source);
  const target = sources.index ? findPlayTarget(sources.index, component, source) : undefined;
  if (target?.kind === 'no-story') return { state: 'no-story' };
  if (target?.kind === 'no-play') return { state: 'no-play', storyId: target.storyId };
  const storyId = target?.storyId;
  if (!stored) return target ? { state: 'not-run', storyId: target.storyId } : { state: 'unknown' };
  return {
    state: 'ran',
    ...(storyId === undefined ? {} : { storyId }),
    freshness:
      freshnessOf(stored, sources.playInputHash(component, source)) === 'current'
        ? 'current'
        : 'stale',
    recordedAt: stored.recordedAt,
    result: stored.result,
  };
}

function generationReport(
  sources: ReportSources,
  component: ComponentName,
  source: Source
): GenerationReport {
  const stored = sources.readGeneration(component, source);
  if (!stored) return { state: 'not-recorded' };
  return {
    state: 'recorded',
    freshness:
      freshnessOf(stored, sources.generationInputHash(component, source)) === 'current'
        ? 'current'
        : 'stale',
    recordedAt: stored.recordedAt,
    result: stored.result,
  };
}

const perSource = <T>(make: (source: Source) => T): Record<Source, T> => ({
  react: make('react'),
  django: make('django'),
});

export function buildReport(sources: ReportSources): Report {
  const components: ComponentReport[] = sources.components.map((name) => ({
    name,
    comparison: compareComponent(
      {
        react: sources.readSnapshot(name, 'react'),
        django: sources.readSnapshot(name, 'django'),
      },
      sources.expectations.get(name)
    ),
    plays: perSource((source) => playReport(sources, name, source)),
    generation: perSource((source) => generationReport(sources, name, source)),
  }));
  return { version: REPORT_VERSION, generatedAt: sources.now.toISOString(), components };
}
