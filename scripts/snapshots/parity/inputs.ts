import path from 'node:path';
import { COMPONENTS_DIR, REPO_ROOT } from '../model/paths.ts';
import { hashFiles, listFiles } from '../plays/inputs.ts';

/** Include shared/nested renderers: a child component change can affect any parent. */
export function parityInputHash(): string {
  const roots = [
    COMPONENTS_DIR,
    'packages/usx-react/src/assets.ts',
    'packages/usx-stories/src/utils/storyHelpers.jsx',
    'apps/storybook-django/project',
    'apps/storybook-django/requirements.txt',
    'scripts/tests/renderer-parity.mjs',
    'scripts/tests/fixtures/renderer-parity',
    'scripts/lib/component-configs.js',
    'scripts/snapshots/compare',
    'scripts/snapshots/render/runtime.ts',
    'scripts/snapshots/html.ts',
    'scripts/snapshots/ids.ts',
    'scripts/snapshots/parity',
    'pnpm-lock.yaml',
  ];
  return hashFiles(
    roots
      .flatMap((root) => listFiles(path.resolve(REPO_ROOT, root)))
      .filter(
        (file) =>
          /\.(tsx?|jsx?|mjs|py|json|txt|yaml)$|\.django\.html$/.test(file) &&
          !/\.test\.|\/test[^/]*\.py$/.test(file)
      )
  );
}
