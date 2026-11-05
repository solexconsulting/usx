export const formatTime = (iso) =>
  iso ? new Date(iso).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'never';

export const formatDuration = (milliseconds) => `${(milliseconds / 1000).toFixed(1)}s`;

export function tally(values) {
  const counts = {};
  for (const value of values) counts[value] = (counts[value] ?? 0) + 1;
  return counts;
}

export function sectionSummary(comparison) {
  const { sections } = comparison;
  if (sections.length === 0) return '';
  const identical = sections.filter((section) => section.status === 'identical').length;
  const expected = sections.filter((section) => section.expected !== undefined).length;
  const expectedText = expected ? `, ${expected} expected difference${expected > 1 ? 's' : ''}` : '';
  return `${identical}/${sections.length} sections identical${expectedText}`;
}
