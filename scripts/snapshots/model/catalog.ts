import fs from 'node:fs';
import path from 'node:path';
import { UserError } from '../errors.ts';
import { COMPONENTS_DIR, STORIES_DIR } from './paths.ts';
import type { ComponentName } from './types.ts';

/** Components are the directories of packages/usx-react that carry a config.json. */
export function listComponents(): ComponentName[] {
  return fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && fs.existsSync(path.join(COMPONENTS_DIR, entry.name, 'config.json'))
    )
    .map((entry) => entry.name)
    .sort();
}

/** Returns the requested names after checking each is a real component. */
export function requireComponents(requested: readonly string[]): ComponentName[] {
  const known = new Set(listComponents());
  const unknown = requested.filter((name) => !known.has(name));
  if (unknown.length) throw new UserError(`Unknown component(s): ${unknown.join(', ')}`);
  return [...requested];
}

export type StoryKind = 'React' | 'Django' | 'HTML';

/** The one stories file of a kind, named <Pascal>.<Kind>.stories.<ext>. */
export function storiesFile(component: ComponentName, kind: StoryKind): string {
  const directory = path.join(STORIES_DIR, component);
  const pattern = new RegExp(`\\.${kind}\\.stories\\.(jsx|tsx|js|ts)$`);
  const matches = fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((file) => pattern.test(file))
    : [];
  const [match] = matches;
  if (matches.length !== 1 || match === undefined)
    throw new UserError(
      `Expected exactly one ${kind} stories file in ${directory}, found ${matches.length}.`
    );
  return path.join(directory, match);
}
