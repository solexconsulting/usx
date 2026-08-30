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
    // Explicitly watch generated Sass inputs and request a browser reload after
    // the USX watcher has rebuilt its output.
    config.plugins ??= [];
    config.plugins.push({
      name: 'usx-tokens-watch-reload',
      configureServer(server) {
        const tokensSrcDir = fileURLToPath(new URL('../../../packages/tokens/src', import.meta.url));
        const tokensDistDir = fileURLToPath(new URL('../../../packages/tokens/dist', import.meta.url));
        const usxSrcDir = fileURLToPath(new URL('../../../packages/usx/src', import.meta.url));
        const usxDistDir = fileURLToPath(new URL('../../../packages/usx/dist', import.meta.url));
        const coreSrcDir = fileURLToPath(new URL('../../../packages/core/src', import.meta.url));
        const storiesSrcDir = fileURLToPath(new URL('../../../packages/usx-stories/src', import.meta.url));
        // Same `pkg:` NodePackageImporter blind spot as usx/tokens above —
        // core.scss `@use`s this package too, so it needs the same treatment.
        const uswdsFixesSrcDir = fileURLToPath(new URL('../../../packages/usx-uswds-fixes/src', import.meta.url));
        server.watcher.add(tokensSrcDir);
        server.watcher.add(tokensDistDir);
        server.watcher.add(usxSrcDir);
        server.watcher.add(usxDistDir);
        server.watcher.add(coreSrcDir);
        server.watcher.add(storiesSrcDir);
        server.watcher.add(uswdsFixesSrcDir);

        // Only reload after the USX watcher has written its compiled CSS. This
        // avoids reloading between the token rebuild and the dependent Sass
        // rebuild, which otherwise leaves Storybook showing stale theme CSS.
        let pendingReload = false;
        let debounceTimer = null;
        // Drop only the cached style transforms. Invalidating the whole module
        // graph re-transforms every dependency (including the USWDS bundle) on
        // each save, which stalls the server in this workspace.
        const invalidateStyleModules = () => {
          for (const mod of server.moduleGraph.idToModuleMap.values()) {
            if (mod.id && /\.(scss|sass|css)(\?|$)/.test(mod.id)) {
              server.moduleGraph.invalidateModule(mod);
            }
          }
        };

        const reload = (file) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            invalidateStyleModules();
            server.config.logger.info(`[usx-watch-reload] ${file} changed, reloading preview...`, { timestamp: true });
            server.ws.send({ type: 'full-reload', path: '*' });
          }, 400);
        };
        server.watcher.on('change', (file) => {
          const isBuildInput = file.startsWith(tokensSrcDir) || file.startsWith(tokensDistDir) || file.startsWith(usxSrcDir);
          const isBuildOutput = file.startsWith(usxDistDir);
          // usx-uswds-fixes has no separate dist rebuild step to wait on —
          // Storybook resolves it straight from src, so reload immediately.
          const isStorybookSource = file.startsWith(coreSrcDir) || file.startsWith(storiesSrcDir) || file.startsWith(uswdsFixesSrcDir);
          const isWatched = isBuildInput || isBuildOutput || isStorybookSource;
          if (!isWatched) return;
          if (isBuildOutput) {
            pendingReload = false;
            reload(file);
          } else if (isBuildInput) {
            pendingReload = true;
            return;
          }
          else if (isStorybookSource) reload(file);
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