import { SOURCES } from './labels.js';

/** The status of a source's play, or why it has none: what the column shows and sorts by. */
export const playStatus = (play) => (play.state === 'ran' ? play.result.status : play.state);

export const isPlayStale = (play) => play.state === 'ran' && play.freshness === 'stale';

const isGenerationStale = (generation) =>
  generation.state === 'recorded' && generation.freshness === 'stale';

const hasGenerationProblem = (generation) =>
  generation.state === 'recorded' &&
  (generation.result.status === 'failed' || generation.result.warnings.length > 0);

const anySource = (component, test) => SOURCES.some((source) => test(component, source));

/** Each entry of the "Show" menu: what it is called and which components it keeps. */
export const FILTERS = [
  { value: 'differs', label: 'Differs', keeps: (c) => c.comparison.status === 'differs' },
  { value: 'incomplete', label: 'Incomplete', keeps: (c) => c.comparison.status === 'incomplete' },
  { value: 'match', label: 'Match', keeps: (c) => c.comparison.status === 'match' },
  {
    value: 'play-fail',
    label: 'Play failed',
    keeps: (c) => anySource(c, (x, s) => ['fail', 'error'].includes(playStatus(x.plays[s]))),
  },
  {
    value: 'play-flaky',
    label: 'Play flaky',
    keeps: (c) => anySource(c, (x, s) => playStatus(x.plays[s]) === 'flaky'),
  },
  {
    value: 'no-play',
    label: 'No play',
    keeps: (c) => anySource(c, (x, s) => x.plays[s].state === 'no-play'),
  },
  {
    value: 'stale',
    label: 'Stale (sources changed since)',
    keeps: (c) =>
      anySource(c, (x, s) => isPlayStale(x.plays[s]) || isGenerationStale(x.generation[s])),
  },
  {
    value: 'console-errors',
    label: 'Console errors',
    keeps: (c) =>
      anySource(c, (x, s) => x.plays[s].state === 'ran' && x.plays[s].result.consoleErrors.length > 0),
  },
  {
    value: 'generation',
    label: 'Snapshot generation problems',
    keeps: (c) => anySource(c, (x, s) => hasGenerationProblem(x.generation[s])),
  },
];

/** The components that match the name search and the chosen filter. */
export function visibleComponents(components, search, filterValue) {
  const needle = search.trim().toLowerCase();
  const filter = FILTERS.find((entry) => entry.value === filterValue);
  return components
    .filter((component) => !needle || component.name.includes(needle))
    .filter((component) => !filter || filter.keeps(component));
}

/** Table rows: the component plus the scalar fields the sortable columns use. */
export const toRow = (component) => ({
  ...component,
  id: component.name,
  component: component.name,
  comparisonStatus: component.comparison.status,
  reactPlay: playStatus(component.plays.react),
  djangoPlay: playStatus(component.plays.django),
  playedAt: lastPlayed(component),
});

export function lastPlayed(component) {
  const times = SOURCES.map((source) => component.plays[source]).flatMap((play) =>
    play.state === 'ran' ? [play.recordedAt] : []
  );
  return times.length ? times.sort().at(-1) : null;
}
