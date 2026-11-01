import path from 'node:path';
import type { ComponentName, Source } from './types.ts';

export const REPO_ROOT = path.resolve(import.meta.dirname, '..', '..', '..');
export const COMPONENTS_DIR = path.join(REPO_ROOT, 'packages', 'usx-react', 'src', 'components');
export const STORIES_DIR = path.join(REPO_ROOT, 'packages', 'usx-stories', 'src', 'components');
export const REPORTS_DIR = path.join(REPO_ROOT, 'reports');
export const REPORT_PATH = path.join(REPORTS_DIR, 'snapshot-report.json');
export const RESULTS_DIR = path.join(REPORTS_DIR, 'results');
export const EXPECTATIONS_PATH = path.join(REPO_ROOT, 'scripts', 'snapshots', 'expectations.json');

export const snapshotPath = (component: ComponentName, source: Source): string =>
  path.join(COMPONENTS_DIR, component, `${component}.${source}-snapshot.html`);
