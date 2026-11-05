// How each status in the report is named and coloured.
export const STATUS_TAGS = {
  match: { label: 'Match', tone: 'success' },
  differs: { label: 'Differs', tone: 'error' },
  incomplete: { label: 'Incomplete', tone: 'warning' },
  missing: { label: 'No snapshots', tone: 'info' },
  identical: { label: 'Identical', tone: 'success' },
  different: { label: 'Different', tone: 'error' },
  'react-only': { label: 'React only', tone: 'warning' },
  'django-only': { label: 'Django only', tone: 'warning' },
  pass: { label: 'Pass', tone: 'success' },
  flaky: { label: 'Flaky', tone: 'warning' },
  fail: { label: 'Fail', tone: 'error' },
  error: { label: 'Error', tone: 'error' },
  'no-play': { label: 'No play', tone: 'info' },
  'no-story': { label: 'No story', tone: 'info' },
  'not-run': { label: 'Not run', tone: 'info' },
  unknown: { label: 'Unknown', tone: 'info' },
  stale: { label: 'Stale', tone: 'warning' },
};

export const SOURCE_LABELS = { react: 'React', django: 'Django' };
export const SOURCES = ['react', 'django'];
