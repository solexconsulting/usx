import { UserError } from '../errors.ts';
import type { ComponentName, Source } from '../model/types.ts';
import { SOURCE_LABELS } from '../model/types.ts';

/** The fields of a Storybook index entry (index.json) that matter here. */
export interface IndexEntry {
  readonly id: string;
  readonly type: string;
  readonly importPath: string;
  readonly exportName?: string;
  readonly tags?: readonly string[];
}

/** play-fn is the tag Storybook gives a story that has a play function. */
const PLAY_TAG = 'play-fn';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isEntry = (value: unknown): value is IndexEntry =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  typeof value.type === 'string' &&
  typeof value.importPath === 'string';

export async function loadStoryIndex(
  storybookUrl: string,
  fetchImpl: typeof fetch = fetch
): Promise<IndexEntry[]> {
  const url = `${storybookUrl}/index.json`;
  const response = await fetchImpl(url).catch((error: unknown) => {
    throw new UserError(`Could not reach Storybook at ${storybookUrl}.`, { cause: error });
  });
  if (!response.ok) throw new UserError(`Could not read ${url}: HTTP ${response.status}.`);
  const body: unknown = await response.json();
  const entries = isRecord(body) ? body.entries : undefined;
  if (!isRecord(entries)) throw new UserError(`${url} has no entries; is it a Storybook index?`);
  return Object.values(entries).filter(isEntry);
}

/** What a component offers to run for one source. */
export type PlayTarget =
  | { readonly kind: 'no-story' }
  | { readonly kind: 'no-play'; readonly storyId: string }
  | { readonly kind: 'play'; readonly storyId: string };

/**
 * The "All Variants" story of a source lives in <Name>.HTML.stories.* under the component's folder
 * and is exported as AllVariantsReact or AllVariantsDjango.
 */
export function findPlayTarget(
  index: readonly IndexEntry[],
  component: ComponentName,
  source: Source
): PlayTarget {
  const folder = `/components/${component}/`;
  const story = index.find(
    (entry) =>
      entry.type === 'story' &&
      entry.importPath.includes(folder) &&
      /\.HTML\.stories\.[jt]sx?$/.test(entry.importPath) &&
      entry.exportName === `AllVariants${SOURCE_LABELS[source]}`
  );
  if (!story) return { kind: 'no-story' };
  return story.tags?.includes(PLAY_TAG)
    ? { kind: 'play', storyId: story.id }
    : { kind: 'no-play', storyId: story.id };
}
