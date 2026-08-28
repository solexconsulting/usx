# @solexllc/usx

Branded USX component styles (`.usx-*`) layered on top of USWDS, compiled with
Dart Sass.

## Build

```sh
pnpm build   # sass src/index.scss → dist/usx.css
```

## Theming

All design tokens come from `@solexllc/usx-theme` and are runtime-themeable via
`--usx-*` CSS custom properties (with compiled-in fallbacks), compile-time
configurable via `with (...)`, or fully static via the `$usx-css-vars: false`
master switch. See `packages/tokens/README.md` for the full theming guide, and
the Storybook **Foundations → Theme** playground to generate a theme visually.

## Tests

```sh
pnpm test
```

- `test/theme-parity.mjs` — asserts the opt-out build (`$usx-css-vars: false`)
  contains zero `var()` references and is byte-identical to the default build
  after substituting every `var(--usx-*, fallback)` with its fallback.
- `test/theme-manifest-check.mjs` — asserts the theme manifest
  (`@solexllc/usx-theme/theme-manifest`) stays in sync with compiled CSS:
  every `var(--usx-*)` fallback matches its manifest default.
