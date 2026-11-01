import { UserError } from './errors.ts';
import { readTextIfExists, writeFileAtomic } from './fs.ts';
import { snapshotPath } from './model/paths.ts';
import type { ComponentName, Section, Source } from './model/types.ts';
import { parseSnapshot } from './snapshotFile.ts';

/** The committed snapshot of a component, or undefined when no file exists. */
export function readSnapshot(component: ComponentName, source: Source): Section[] | undefined {
  const file = snapshotPath(component, source);
  const text = readTextIfExists(file);
  if (text === undefined) return undefined;
  try {
    return parseSnapshot(text);
  } catch (error) {
    if (error instanceof UserError)
      throw new UserError(`${file}: ${error.message}`, { cause: error });
    throw error;
  }
}

/** Writes the snapshot unless the file already has this content. */
export function writeSnapshotText(
  component: ComponentName,
  source: Source,
  text: string
): 'written' | 'unchanged' {
  const file = snapshotPath(component, source);
  if (readTextIfExists(file) === text) return 'unchanged';
  writeFileAtomic(file, text);
  return 'written';
}
