import type { StoryRuntime } from '../runtime.ts';
import type { DjangoClient } from './client.ts';
import { renderWithDjango } from './renderWithDjango.ts';
import type * as ShimModule from './shim.ts';
import type * as SessionModule from './session.ts';

const SESSION_MODULE = new URL('./session.ts', import.meta.url).pathname;
const SHIM_MODULE = new URL('./shim.ts', import.meta.url).pathname;

/** Renders markup that may contain Django components, resolving their HTML from the render server. */
export type PageRenderer = (render: () => string) => Promise<string>;

/**
 * The session and shim modules are loaded through `runtime`, so they are the same instances the
 * stories import; the shim supplies the serialization the browser would apply to props.
 */
export async function createDjangoRenderer(
  runtime: StoryRuntime,
  client: DjangoClient
): Promise<PageRenderer> {
  const { DjangoSession, runWithSession } = (await runtime.load(
    SESSION_MODULE
  )) as typeof SessionModule;
  const { serializePropsForDjango } = (await runtime.load(SHIM_MODULE)) as typeof ShimModule;
  const session = new DjangoSession(serializePropsForDjango);
  return (render) => renderWithDjango(session, client, () => runWithSession(session, render));
}
