import path from 'node:path';
import { UserError } from '../errors.ts';
import { readTextIfExists, writeFileAtomic } from '../fs.ts';

/** A result plus what it was computed from, so it is valid exactly while the inputs are unchanged. */
export interface StoredResult<T> {
  readonly inputHash: string;
  readonly recordedAt: string;
  readonly result: T;
}

const KEY_PATTERN = /^[a-z0-9][a-z0-9.-]*$/;

const isEnvelope = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/** One JSON file per key. Files are written atomically, so concurrent runs never clobber each other. */
export class ResultStore<T> {
  readonly #directory: string;
  readonly #isResult: (value: unknown) => value is T;

  constructor(directory: string, isResult: (value: unknown) => value is T) {
    this.#directory = directory;
    this.#isResult = isResult;
  }

  read(key: string): StoredResult<T> | undefined {
    const file = this.#file(key);
    const text = readTextIfExists(file);
    if (text === undefined) return undefined;
    const parsed = this.#parse(file, text);
    if (
      !isEnvelope(parsed) ||
      typeof parsed.inputHash !== 'string' ||
      typeof parsed.recordedAt !== 'string' ||
      !this.#isResult(parsed.result)
    )
      throw new UserError(`${file} is not a valid result file. Delete it to continue.`);
    return { inputHash: parsed.inputHash, recordedAt: parsed.recordedAt, result: parsed.result };
  }

  write(key: string, stored: StoredResult<T>): void {
    writeFileAtomic(this.#file(key), `${JSON.stringify(stored, null, 2)}\n`);
  }

  #file(key: string): string {
    if (!KEY_PATTERN.test(key)) throw new RangeError(`Invalid result key "${key}".`);
    return path.join(this.#directory, `${key}.json`);
  }

  #parse(file: string, text: string): unknown {
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new UserError(`${file} is not valid JSON. Delete it to continue.`, { cause: error });
    }
  }
}
