import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { NodePackageImporter } from "sass";
export default {
  stories: ['../../../packages/usx-stories/src/**/*stories.@(js|jsx|mjs|ts|tsx)'],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {}
  },

  addons: ['@storybook/addon-docs'],

  staticDirs: [
    '../../../node_modules/@uswds/uswds/dist',
    '../static',
  ],

  // base: './' makes Vite emit relative asset URLs so Storybook works
  // behind any subpath proxy without a build-time configuration.
  viteFinal: (config) => {
    config.base = './';
    config.css ??= {};
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.scss ??= {};
    config.css.preprocessorOptions.scss.importers = [new NodePackageImporter()];

    // Vite discovers a Sass file's dependencies (for HMR/cache invalidation)
    // from the compiler's sourcemap. Files reached only through the custom
    // NodePackageImporter (e.g. `pkg:@solexllc/usx-theme/variables`) are not
    // otherwise tracked, so edits to _variables.scss etc. never invalidated
    // the cached CSS for anything that imports it that way — changes were
    // silently ignored until a full dev-server restart. Enabling sourcemaps
    // lets Vite see and watch those transitive dependencies.
    config.css.devSourcemap = true;

    // Native fs events are unreliable for this workspace's mount (edits to
    // sibling packages/* source were silently missed by Vite's watcher,
    // requiring a full dev server restart to pick up SCSS/JS changes) —
    // fall back to polling so file watching actually fires.
    config.server ??= {};
    config.server.watch ??= {};
    config.server.watch.usePolling = true;
    config.server.watch.interval = 300;

    // `packages/tokens/src/*` (_variables.scss, theme-manifest.js,
    // system-colors.generated.js) is only ever reached indirectly through
    // Sass's `pkg:@solexllc/usx-theme/...` NodePackageImporter resolution.
    // Vite's CSS dependency graph can't see through that custom importer,
    // so it never knows any *.scss that `@use`s these files needs to be
    // recompiled when they change — even `devSourcemap` and a full browser
    // reload aren't enough, since the stale transform is cached server-side.
    // `packages/tokens/dist/*` (_hooks.scss, theme.css, theme-manifest.json)
    // has the exact same problem — it's what `pkg:@solexllc/usx-theme/hooks`
    // actually resolves to (regenerated from src by the tokens package's own
    // build/watch process), so it needs the same treatment.
    // `packages/usx/src/*` (_select.scss, _input.scss, etc.) is reached the
    // same way — core.scss's `@use 'pkg:@solexllc/usx/themed'` — so it has
    // the exact same blind spot and needs watching too.
    // Explicitly watch these folders ourselves and force a full dev-server
    // restart on change so edits actually take effect without the user
    // having to stop/restart Storybook by hand.
    config.plugins ??= [];
    config.plugins.push({
      name: 'usx-tokens-watch-restart',
      configureServer(server) {
        const tokensSrcDir = fileURLToPath(new URL('../../../packages/tokens/src', import.meta.url));
        const tokensDistDir = fileURLToPath(new URL('../../../packages/tokens/dist', import.meta.url));
        const usxSrcDir = fileURLToPath(new URL('../../../packages/usx/src', import.meta.url));
        server.watcher.add(tokensSrcDir);
        server.watcher.add(tokensDistDir);
        server.watcher.add(usxSrcDir);

        // Polling can fire multiple 'change' events for a single save (e.g.
        // separate mtime/size ticks), and calling server.restart() again
        // while a restart is already in flight corrupts Vite's esbuild
        // service ("service is no longer running"). Debounce + guard so
        // only one restart runs per burst of changes.
        let restarting = false;
        let debounceTimer = null;
        server.watcher.on('change', (file) => {
          if (!file.startsWith(tokensSrcDir) && !file.startsWith(tokensDistDir) && !file.startsWith(usxSrcDir)) return;
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            if (restarting) return;
            restarting = true;
            server.config.logger.info(`[usx-tokens-watch-restart] ${file} changed, restarting server...`, { timestamp: true });
            Promise.resolve(server.restart()).finally(() => {
              restarting = false;
            });
          }, 400);
        });
      },
    });

    return config;
  },

  previewHead: (head) => `
    ${head}
    <script>window.usxBaseUrl = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);</script>
    <script>fetch('./env-config.js').then(r=>r.ok&&r.text()).then(t=>t&&new Function(t)()).catch(()=>{})</script>
    <script src="./js/uswds-init.min.js"></script>
    <script src="./js/uswds.min.js" defer></script>
    <script>
      console.log('USX Storybook: USWDS JS initialized');
      const exampleEventTrigger = (tada=null) => {
        if (tada) {
          console.log('Event triggered with context:', tada);
          // Use alert to imply functionality since we don't have a real data source in Storybook
          alert("Event triggered with context: " + tada);
        } else {
          console.log('Event triggered with no context');
          alert("Event triggered with no context");
        }
      };

      window.exampleEventTrigger = exampleEventTrigger;
    </script>
  `
};

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}