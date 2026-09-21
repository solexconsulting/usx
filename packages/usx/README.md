# @solexllc/usx

Branded USX component styles (`.usx-*`) layered on top of USWDS, compiled with
Dart Sass. This package ships Sass source only (`exports` → `src/*.scss`);
consumers compile it with the `pkg:` importer, so there is no Sass build step.
The only build step is regenerating the icon sprite (see **Icons** below).

## Theming

All design tokens come from `@solexllc/usx-theme` and are runtime-themeable via
`--usx-*` CSS custom properties. Compile `src/index.scss` for a fully static
build (no `var()` references), or `src/themed.scss` to enable every hook.
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
