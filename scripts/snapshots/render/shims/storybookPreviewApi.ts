/** Stands in for `storybook/preview-api` while snapshots are generated: stories render with no globals. */
export const useGlobals = (): [Record<string, never>, () => void] => [{}, () => {}];
