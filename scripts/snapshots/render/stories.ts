import fs from 'node:fs';
import { createElement, type ElementType, type ReactElement, type ReactNode } from 'react';
import { loadCsf } from 'storybook/internal/csf-tools';
import { UserError } from '../errors.ts';

export interface StoryDefinition {
  readonly exportName: string;
  /** The name Storybook shows for the story, which is also the heading of its snapshot section. */
  readonly name: string;
}

/** The stories of a CSF file in source order, exactly as Storybook's own indexer sees them. */
export function listStories(file: string): StoryDefinition[] {
  const csf = loadCsf(fs.readFileSync(file, 'utf8'), {
    fileName: file,
    makeTitle: (title) => title ?? '',
  }).parse();
  return csf.indexInputs
    .filter((entry) => entry.type === 'story')
    .map(({ exportName, name }) => ({ exportName, name: name ?? exportName }));
}

type Args = Record<string, unknown>;
type Render = (args: Args, context: Record<string, unknown>) => ReactNode;

interface Meta {
  readonly args?: Args;
  readonly component?: unknown;
  readonly render?: Render;
}

interface StoryObject {
  readonly args?: Args;
  readonly render?: Render;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** Stories are objects, or functions that carry their args as properties. */
const isStory = (value: unknown): value is StoryObject =>
  isObject(value) || typeof value === 'function';

/**
 * The element a story renders, following Storybook's composition: args are the meta's args under the
 * story's, and a story renders itself, else the meta's render, else the meta's component. Decorators,
 * loaders and parameters are not applied; snapshots are the story's own output.
 */
export function createStoryElement(
  module: Readonly<Record<string, unknown>>,
  exportName: string
): ReactElement {
  const meta: Meta = isObject(module.default) ? module.default : {};
  const story = module[exportName];
  const storyObject: StoryObject = isStory(story) ? story : {};
  const args: Args = { ...meta.args, ...storyObject.args };
  const context = { args, globals: {}, parameters: {}, viewMode: 'story' };

  // Rendered as a component so stories that call hooks work.
  const Story = (): ReactNode => {
    if (typeof story === 'function') return (story as Render)(args, context);
    const render = storyObject.render ?? meta.render;
    if (render) return render(args, context);
    if (meta.component === undefined)
      throw new UserError(
        `Story "${exportName}" has no render function and its meta has no component.`
      );
    // The component is validated by React when it renders; a forwardRef or memo is an object, not a function.
    return createElement(meta.component as ElementType, args);
  };
  return createElement(Story);
}
