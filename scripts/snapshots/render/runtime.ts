import path from 'node:path';
import { createServer, type Plugin } from 'vite';
import { REPO_ROOT } from '../model/paths.ts';

/** Loads story modules in Node, with the browser-only parts of Storybook replaced by small shims. */
export interface StoryRuntime {
  load(file: string): Promise<Record<string, unknown>>;
  close(): Promise<void>;
}

export const DJANGO_COMPONENT_MODULE = path.join(
  REPO_ROOT,
  'packages',
  'usx-stories',
  'src',
  'utils',
  'djangoComponent.js'
);
const DJANGO_SHIM = path.join(import.meta.dirname, 'django', 'shim.ts');
const SHIMS = path.join(import.meta.dirname, 'shims');

/** Every import that resolves to the real Django module, however it is spelled, gets the shim. */
const useDjangoShim: Plugin = {
  name: 'usx-django-shim',
  enforce: 'pre',
  async resolveId(source, importer, options) {
    if (importer === DJANGO_SHIM) return null;
    const resolved = await this.resolve(source, importer, { ...options, skipSelf: true });
    return resolved?.id === DJANGO_COMPONENT_MODULE ? DJANGO_SHIM : null;
  },
};

export async function createStoryRuntime(): Promise<StoryRuntime> {
  const server = await createServer({
    root: REPO_ROOT,
    configFile: false,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
    esbuild: { jsx: 'automatic' },
    resolve: {
      alias: {
        'storybook/test': path.join(SHIMS, 'storybookTest.ts'),
        'storybook/preview-api': path.join(SHIMS, 'storybookPreviewApi.ts'),
      },
    },
    plugins: [useDjangoShim],
  });
  return {
    load: (file) => server.ssrLoadModule(file),
    close: () => server.close(),
  };
}
