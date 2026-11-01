import fs from 'node:fs';
import path from 'node:path';

const isMissing = (error: unknown): boolean =>
  error instanceof Error && 'code' in error && error.code === 'ENOENT';

export function readTextIfExists(file: string): string | undefined {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (error) {
    if (isMissing(error)) return undefined;
    throw error;
  }
}

/** Readers never observe a partially written file, even if two processes write the same path. */
export function writeFileAtomic(file: string, content: string): void {
  const directory = path.dirname(file);
  fs.mkdirSync(directory, { recursive: true });
  const temporary = path.join(directory, `.${path.basename(file)}.${process.pid}.tmp`);
  fs.writeFileSync(temporary, content);
  fs.renameSync(temporary, file);
}
