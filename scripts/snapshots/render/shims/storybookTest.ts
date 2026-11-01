/** Stands in for `storybook/test` while snapshots are generated: stories only reference it in actions and plays. */
export const fn = (): (() => void) => () => {};
export const expect = (): void => {};
