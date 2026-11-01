export const SOURCES = ['react', 'django'] as const;
export type Source = (typeof SOURCES)[number];

export const SOURCE_LABELS = {
  react: 'React',
  django: 'Django',
} as const satisfies Readonly<Record<Source, string>>;

/** A directory name under packages/usx-react/src/components, e.g. "time-picker". */
export type ComponentName = string;

/** One story's rendered markup; sections of a snapshot share a page, so titles identify them. */
export interface Section {
  readonly title: string;
  readonly html: string;
}
