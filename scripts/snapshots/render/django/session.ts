import { createHash } from 'node:crypto';

/** A request for a Django component's HTML, as the story's own code made it. */
export interface DjangoRequest {
  readonly key: string;
  readonly component: string;
  readonly props: unknown;
}

const TOKEN = '__usx_django_[0-9a-f]{16}__';
const HAS_TOKEN = new RegExp(TOKEN);

/** JSON with object keys sorted, so equal requests always produce equal keys. */
export function canonicalJson(value: unknown): string {
  return JSON.stringify(value, (_key, item: unknown) =>
    item !== null && typeof item === 'object' && !Array.isArray(item)
      ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => (a < b ? -1 : 1)))
      : item
  );
}

const tokenFor = (key: string): string =>
  `__usx_django_${createHash('sha256').update(key).digest('hex').slice(0, 16)}__`;

/**
 * Story code asks for Django HTML synchronously, but it can only be fetched asynchronously. A session
 * bridges the two: until a request has been fetched, the story receives a placeholder token in its
 * place. After a render pass the requests it made are fetched and the story is rendered again, until
 * a pass needs nothing new (see renderWithDjango).
 */
export class DjangoSession {
  readonly #serialize: (props: unknown) => unknown;
  readonly #responses = new Map<string, string>();
  readonly #issued = new Map<string, string>();
  #requests = new Map<string, DjangoRequest>();

  /** `serialize` turns story props into the JSON-safe value that is sent to Django. */
  constructor(serialize: (props: unknown) => unknown) {
    this.#serialize = serialize;
  }

  /** Starts a render pass; requests are recorded afresh each pass. */
  beginPass(): void {
    this.#requests = new Map();
  }

  /** The fetched HTML for this request, or a token standing in for it until it has been fetched. */
  htmlFor(component: string, props: unknown): string {
    const { key, token } = this.#record(component, props);
    return this.#responses.get(key) ?? token;
  }

  /**
   * Always the request's token, for output that is substituted afterwards (see fill). React would
   * escape HTML placed in a text node, so a component emits the token and lets fill insert the HTML.
   */
  slotFor(component: string, props: unknown): string {
    return this.#record(component, props).token;
  }

  #record(component: string, props: unknown): { key: string; token: string } {
    const serialized = this.#serialize(props);
    const key = canonicalJson({ component, props: serialized });
    const token = tokenFor(key);
    this.#requests.set(key, { key, component, props: serialized });
    this.#issued.set(token, key);
    return { key, token };
  }

  /** Replaces the tokens of fetched requests in `markup` with their HTML. */
  fill(markup: string): string {
    return markup.replace(new RegExp(TOKEN, 'g'), (token) => {
      const key = this.#issued.get(token);
      return (key === undefined ? undefined : this.#responses.get(key)) ?? token;
    });
  }

  /** True while `markup` still holds a token of a request that has not been fetched. */
  isIncomplete(markup: string): boolean {
    return HAS_TOKEN.test(markup);
  }

  /**
   * The requests of this pass that can be fetched now: not yet fetched, and not built from the
   * output of another request that is still outstanding.
   */
  nextBatch(): DjangoRequest[] {
    return [...this.#requests.values()].filter(
      (request) => !this.#responses.has(request.key) && !HAS_TOKEN.test(request.key)
    );
  }

  record(request: DjangoRequest, html: string): void {
    this.#responses.set(request.key, html);
  }
}

/** The session the story code reads while a render runs; set only for the duration of `run`. */
let active: DjangoSession | undefined;

export function runWithSession<T>(session: DjangoSession, run: () => T): T {
  active = session;
  try {
    return run();
  } finally {
    active = undefined;
  }
}

export function currentSession(): DjangoSession {
  if (!active)
    throw new Error('Django components can only be rendered while generating a snapshot.');
  return active;
}
