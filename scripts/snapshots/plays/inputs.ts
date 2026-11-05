import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { ComponentName, Source } from '../model/types.ts';
import { storiesFiles } from '../model/catalog.ts';
import { COMPONENTS_DIR, REPO_ROOT, STORIES_DIR, snapshotPath } from '../model/paths.ts';
import { SOURCE_LABELS } from '../model/types.ts';

const SKIPPED_DIRECTORIES: ReadonlySet<string> = new Set(['node_modules', '__pycache__']);

/** Every file below `root`, sorted; nothing if `root` does not exist or is itself a file. */
export function listFiles(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  if (!fs.statSync(root).isDirectory()) return [root];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => !SKIPPED_DIRECTORIES.has(entry.name))
    .flatMap((entry) => listFiles(path.join(root, entry.name)))
    .sort();
}

/** A hash of the paths (relative to the repository) and contents of `files`. */
export function hashFiles(files: readonly string[]): string {
  const hash = createHash('sha256');
  for (const file of [...files].sort()) {
    hash
      .update(path.relative(REPO_ROOT, file))
      .update('\0')
      .update(fs.readFileSync(file))
      .update('\0');
  }
  return hash.digest('hex');
}

/**
 * Everything that can change what a play does or finds: the stories and helpers that define it, the
 * component under test, the shared scripts the preview starts, and the snapshot it runs against.
 * Snapshots are outputs of the component, so only the source's own one counts.
 */
export function playInputFiles(component: ComponentName, source: Source): string[] {
  const roots = [
    path.join(STORIES_DIR, component),
    path.join(COMPONENTS_DIR, component),
    path.join(STORIES_DIR, '..', 'utils'),
    path.join(REPO_ROOT, 'packages', 'usx', 'src', 'js'),
    path.join(REPO_ROOT, 'packages', 'usx', 'src', 'components', `_${component}.scss`),
    path.join(REPO_ROOT, 'apps', 'storybook', '.storybook'),
  ];
  const own = snapshotPath(component, source);
  return [
    ...roots.flatMap(listFiles).filter((file) => !file.endsWith('-snapshot.html')),
    ...listFiles(own),
  ];
}

export const playInputHash = (component: ComponentName, source: Source): string =>
  hashFiles(playInputFiles(component, source));

/**
 * What a snapshot is rendered from: the stories of its source (a Django snapshot also reads the React
 * stories' definitions), the component's own files, and the story helpers that call Django.
 */
export function generationInputFiles(component: ComponentName, source: Source): string[] {
  const stories = [
    ...storiesFiles(component, 'React'),
    ...(source === 'django' ? storiesFiles(component, SOURCE_LABELS[source]) : []),
  ];
  const localModules = listFiles(path.join(STORIES_DIR, component)).filter(
    (file) => !/\.stories\./.test(file) && !file.endsWith('-snapshot.html')
  );
  const utils = path.join(STORIES_DIR, '..', 'utils');
  return [
    ...stories,
    ...localModules,
    ...listFiles(path.join(COMPONENTS_DIR, component)).filter(
      (file) => !file.endsWith('-snapshot.html')
    ),
    path.join(utils, 'storyHelpers.jsx'),
    path.join(utils, 'djangoComponent.js'),
  ];
}

export const generationInputHash = (component: ComponentName, source: Source): string =>
  hashFiles(generationInputFiles(component, source));
