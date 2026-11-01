import { mapConcurrent } from '../../pool.ts';
import { UserError } from '../../errors.ts';
import type { DjangoClient } from './client.ts';
import type { DjangoSession } from './session.ts';

/** Nested Django components (a page given a layout as children) need one pass per level of nesting. */
const MAX_PASSES = 6;
const FETCH_CONCURRENCY = 6;

/**
 * Runs `render` until a pass leaves no request unfetched, fetching what each pass asked for in
 * between, and returns the final markup with every Django component's HTML in place.
 */
export async function renderWithDjango(
  session: DjangoSession,
  client: DjangoClient,
  render: () => string
): Promise<string> {
  for (let pass = 1; pass <= MAX_PASSES; pass++) {
    session.beginPass();
    const markup = session.fill(render());
    if (!session.isIncomplete(markup)) return markup;

    const batch = session.nextBatch();
    if (batch.length === 0)
      throw new UserError(
        'Django components request each other circularly; nothing can be fetched.'
      );
    const responses = await mapConcurrent(batch, FETCH_CONCURRENCY, (request) =>
      client.render(request.component, request.props)
    );
    batch.forEach((request, index) => session.record(request, responses[index] as string));
  }
  throw new UserError(`Django components are nested more than ${MAX_PASSES} levels deep.`);
}
