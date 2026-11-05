# @solexllc/usx

Branded USX component styles (`.usx-*`) layered on top of USWDS, compiled with
Dart Sass, plus JavaScript modules for USX interactions. Consumers compile the
Sass source with the `pkg:` importer, so there is no Sass build step. The icon
sprite is generated separately (see **Icons** below).

## JavaScript Enhancement

USWDS behavior comes from `@uswds/uswds`, not this package. Its
`uswds.min.js` bundle enhances markup already in the document when it runs.
After inserting USWDS components on the client, call their module's
`init(root)`.

USX behavior is exported from `@solexllc/usx/js/*`. Import
`@solexllc/usx/js/start` once to connect USX modules on document readiness,
or import the individual module you need. DataTable and Carousel expose
`init(root)` for newly mounted markup; DataTable's `on()` also observes
inserted tables. Other USX modules use delegated listeners through `on(root)`.
The [JavaScript enhancement guide](../usx-stories/src/stories/Documentation.UsxReact.UswdsJsInit.stories.jsx)
shows the lifecycle for both libraries.

## Theming

All design tokens come from `@solexllc/usx-theme` and are runtime-themeable via
`--usx-*` CSS custom properties. Compile `src/index.scss` for a fully static
build (no `var()` references), or `src/themed.scss` to enable every hook and
pair it with `pkg:@solexllc/usx-theme/themes` for opt-in prebuilt themes.
See `packages/usx-theme/README.md` for the full theming guide, and the Storybook
**Documentation → Theme → Playground** to generate a theme visually.

## Icons

`src/img/usx-sprite.svg` is a small sprite of custom icons USWDS doesn't ship
(currently just `spinner`, used by `@solexllc/usx-react`'s `Spinner`). It's
also exported as `@solexllc/usx/img/usx-sprite.svg` for direct resolution.
Like USWDS's own `dist/img/sprite.svg`, consuming apps must copy this file
into wherever they serve static assets from (e.g. Storybook mounts it at
`/img/usx-sprite.svg` via `staticDirs` in `.storybook/main.js`; a Django app
would add it to `STATICFILES_DIRS`).

The static asset root is configured by `window.usxBaseUrl` in
React, or `STATIC_URL` in Django. It is independent of application routing.
See the [asset deployment guide](../usx-react/README.md#asset-urls-and-subpath-deployment)
for the expected directory structure, subpath setup, CSS/font handling, and
the same-origin requirement for external SVG sprites.

The sprite is generated, not hand-written. Each icon lives as its own
standalone `<svg>` file in `src/icons/<name>.svg` (viewable directly in an
editor or browser), and `pnpm build` (or `pnpm --filter @solexllc/usx build`)
runs `scripts/build-sprite.mjs`, which reads every file in `src/icons/` and
writes the combined `<symbol>` sprite to `src/img/usx-sprite.svg`. To add an
icon: create `src/icons/<name>.svg`, add a matching `{ name, meta }` entry to
`src/img/usx-icons.json` (used by the Documentation/Icons page's search),
then rebuild. `pnpm --filter @solexllc/usx dev` rebuilds on every save.

## Tests

```sh
pnpm test   # node test/theme-check.mjs
```

`test/theme-check.mjs` compiles both entry points and asserts: the default
build has zero `var(--usx-*)` references; the themed build uses only bare
`var(--usx-*)` references (no fallbacks) that all exist in the theme manifest;
every manifest entry is consumed (or explicitly listed as unconsumed); no
literal `null` leaks into CSS; every `derivedFrom` names a real token.
