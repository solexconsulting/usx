import { serializePropsForDjango as serialize, storyTree as buildTree, prepareDjangoRequest as prepare } from '../../../../packages/usx-stories/src/utils/djangoComponent.js?real';
import { currentSession } from './session.ts';

/**
 * Stands in for packages/usx-stories/src/utils/djangoComponent.js while snapshots are generated.
 * Instead of fetching in the browser, each export asks the active session, which supplies the HTML
 * (or a placeholder that is replaced once it has been fetched).
 */

/** Stories use this at module level, so it is the real implementation. */
export const serializePropsForDjango = serialize;
export const storyTree = buildTree;
export const prepareDjangoRequest = prepare;
export const fetchStorySource = (): never => {
  throw new Error('Story source is only fetched in the browser.');
};

export const useDjangoRenderedHtml = (
  componentName: string,
  props: unknown
): { html: string; error: null } => ({
  html: currentSession().htmlFor(componentName, prepare(componentName, props)),
  error: null,
});

export const useDjangoRenderedFields = (
  fields: readonly { componentName: string; args: unknown }[]
): { html: string; errors: never[] } => ({
  html: fields
    .map(({ componentName, args }) => currentSession().htmlFor(componentName, prepare(componentName, args)))
    .join('\n'),
  errors: [],
});

/** Emits the request's token, which the session replaces with Django's HTML after rendering. */
export const djangoComponent =
  ({ componentName }: { componentName: string }) =>
  (props: unknown): string =>
    currentSession().slotFor(componentName, prepare(componentName, props));

export const fetchComponentHtml = (): never => {
  throw new Error('fetchComponentHtml is not available while generating snapshots.');
};
