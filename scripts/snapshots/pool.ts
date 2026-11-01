/**
 * Runs `task` over `items` with at most `limit` in flight and returns results in input order.
 * After a failure no new task starts; the first failure is rethrown once running tasks settle.
 */
export async function mapConcurrent<T, R>(
  items: readonly T[],
  limit: number,
  task: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  if (!Number.isInteger(limit) || limit < 1)
    throw new RangeError(`Concurrency must be a whole number of at least 1, got ${limit}.`);
  const results = new Array<R>(items.length);
  let next = 0;
  let failure: { readonly error: unknown } | undefined;

  const work = async (): Promise<void> => {
    while (failure === undefined && next < items.length) {
      const index = next++;
      try {
        results[index] = await task(items[index] as T, index);
      } catch (error) {
        failure ??= { error };
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, work));
  if (failure) throw failure.error;
  return results;
}
