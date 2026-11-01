import { UserError } from '../../errors.ts';

export interface DjangoClient {
  /** The HTML Django renders for a component given JSON-serializable props. */
  render(component: string, props: unknown): Promise<string>;
}

const REQUEST_TIMEOUT_MS = 30_000;

/** `baseUrl` is the Django render server, e.g. http://host:9090. Network errors are retried once. */
export function createDjangoClient(baseUrl: string, fetchImpl: typeof fetch = fetch): DjangoClient {
  const root = baseUrl.replace(/\/$/, '');

  const get = async (url: string): Promise<Response> => {
    try {
      return await fetchImpl(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    } catch {
      return fetchImpl(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) }).catch(
        (error: unknown) => {
          throw new UserError(`Could not reach the Django render server at ${root}.`, {
            cause: error,
          });
        }
      );
    }
  };

  return {
    async render(component, props) {
      const url = `${root}/render/${component}/?props=${encodeURIComponent(JSON.stringify(props))}`;
      const response = await get(url);
      if (!response.ok)
        throw new UserError(
          `Django failed to render "${component}": HTTP ${response.status} for ${url}`
        );
      return (await response.text()).trim();
    },
  };
}
