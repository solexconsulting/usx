# @solexllc/usx

Branded USX component styles (`.usx-*`) layered on top of USWDS, compiled with
Dart Sass. This package ships Sass source only (`exports` → `src/*.scss`);
consumers compile it with the `pkg:` importer, so there is no build step.

## Theming

All design tokens come from `@solexllc/usx-theme` and are runtime-themeable via
`--usx-*` CSS custom properties. Compile `src/index.scss` for a fully static
build (no `var()` references), or `src/themed.scss` to enable every hook.
See `packages/usx-theme/README.md` for the full theming guide, and the Storybook
**Documentation → Theme → Playground** to generate a theme visually.

## Tests

```sh
pnpm test   # node test/theme-check.mjs
```

`test/theme-check.mjs` compiles both entry points and asserts: the default
build has zero `var(--usx-*)` references; the themed build uses only bare
`var(--usx-*)` references (no fallbacks) that all exist in the theme manifest;
every manifest entry is consumed (or explicitly listed as unconsumed); no
literal `null` leaks into CSS; every `derivedFrom` names a real token.
