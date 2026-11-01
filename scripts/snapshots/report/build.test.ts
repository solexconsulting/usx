import assert from 'node:assert/strict';
import test from 'node:test';
import type { GenerationResult, PlayResult } from '../model/results.ts';
import type { Section } from '../model/types.ts';
import type { IndexEntry } from '../plays/storyIndex.ts';
import type { StoredResult } from '../results/store.ts';
import { buildReport, type ReportSources } from './build.ts';
import { parseReport } from './schema.ts';

const section = (title: string, html: string): Section => ({ title, html });
const playResult: PlayResult = { status: 'pass', attempts: 1, durationMs: 5, consoleErrors: [] };
const stored = <T>(result: T, inputHash: string): StoredResult<T> => ({
  inputHash,
  recordedAt: '2026-01-02T00:00:00.000Z',
  result,
});
const HTML = '../../packages/usx-stories/src/components/tag/Tag.HTML.stories.jsx';
const index: IndexEntry[] = [
  {
    id: 'tag-react',
    type: 'story',
    importPath: HTML,
    exportName: 'AllVariantsReact',
    tags: ['play-fn'],
  },
  { id: 'tag-django', type: 'story', importPath: HTML, exportName: 'AllVariantsDjango', tags: [] },
];

const sources = (overrides: Partial<ReportSources> = {}): ReportSources => ({
  components: ['tag', 'hint'],
  expectations: new Map(),
  readSnapshot: (component) => (component === 'tag' ? [section('A', '<i></i>')] : undefined),
  readPlay: (component, source) =>
    component === 'tag' && source === 'react' ? stored(playResult, 'h1') : undefined,
  readGeneration: () => undefined,
  playInputHash: () => 'h1',
  generationInputHash: () => 'g1',
  index,
  now: new Date('2026-01-03T00:00:00.000Z'),
  ...overrides,
});

test('every component is reported with its comparison and per-source plays', () => {
  const report = buildReport(sources());
  assert.equal(report.generatedAt, '2026-01-03T00:00:00.000Z');
  assert.deepEqual(
    report.components.map((component) => component.name),
    ['tag', 'hint']
  );
  assert.equal(report.components[0]?.comparison.status, 'match');
  assert.equal(report.components[1]?.comparison.status, 'missing');
});

test('play states follow the story index and the recorded results', () => {
  const [tag, hint] = buildReport(sources()).components;
  assert.deepEqual(tag?.plays.react, {
    state: 'ran',
    storyId: 'tag-react',
    freshness: 'current',
    recordedAt: '2026-01-02T00:00:00.000Z',
    result: playResult,
  });
  assert.deepEqual(tag?.plays.django, { state: 'no-play', storyId: 'tag-django' });
  assert.deepEqual(hint?.plays.react, { state: 'no-story' });
});

test('a recorded play is stale once its inputs have changed', () => {
  const report = buildReport(sources({ playInputHash: () => 'h2' }));
  assert.equal(
    report.components[0]?.plays.react.state === 'ran' && report.components[0].plays.react.freshness,
    'stale'
  );
});

test('without a story index the play state is unknown unless a result exists', () => {
  const [tag] = buildReport(sources({ index: undefined })).components;
  assert.equal(tag?.plays.react.state, 'ran');
  assert.deepEqual(tag?.plays.django, { state: 'unknown' });
});

test('a play that has a story but no result is not-run', () => {
  const [tag] = buildReport(sources({ readPlay: () => undefined })).components;
  assert.deepEqual(tag?.plays.react, { state: 'not-run', storyId: 'tag-react' });
});

test('generation results carry their freshness', () => {
  const generation: GenerationResult = { status: 'written', warnings: ['w'] };
  const readGeneration = () => stored(generation, 'g1');
  const current = buildReport(sources({ readGeneration })).components[0]?.generation.react;
  assert.deepEqual(current, {
    state: 'recorded',
    freshness: 'current',
    recordedAt: '2026-01-02T00:00:00.000Z',
    result: generation,
  });
  const stale = buildReport(sources({ readGeneration, generationInputHash: () => 'g2' }))
    .components[0]?.generation.django;
  assert.equal(stale?.state === 'recorded' && stale.freshness, 'stale');
  assert.deepEqual(buildReport(sources()).components[0]?.generation.react, {
    state: 'not-recorded',
  });
});

test('a built report passes validation after a JSON round trip', () => {
  const report = buildReport(sources());
  assert.deepEqual(parseReport(JSON.parse(JSON.stringify(report))), report);
});

test('validation rejects other versions and malformed reports with a helpful message', () => {
  assert.throws(() => parseReport({ rows: [] }), /expected version 1/);
  assert.throws(
    () => parseReport({ version: 1, generatedAt: 't', components: [{ name: 'x' }] }),
    /malformed/
  );
  assert.throws(() => parseReport(null), /expected version 1/);
});
