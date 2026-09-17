Design tokens package for agency-ui-platform.

This package stores platform-agnostic tokens in JSON source files and compiles them for CSS and JavaScript consumers.

## Structure

- `src/color.json`: color tokens (`primary`, `secondary`, `background`, `surface`, `text`)
- `src/spacing.json`: spacing scale tokens (`xs`, `sm`, `md`, `lg`, `xl`)
- `src/typography.json`: typography tokens
- `src/radius.json`: border radius tokens
- `src/_variables.scss`: Sass design tokens (the theme layer consumed by `@solexllc/usx`)
- `src/theme-manifest.js`: canonical manifest of themeable tokens (names, CSS variables, defaults, derivation)
- `dist/tokens.css`: generated CSS variables
- `dist/tokens.js`: generated JS export
- `dist/theme-manifest.json`: generated theme manifest

## Build

```sh
pnpm build   # node build.js → dist/
pnpm dev     # node build.js --watch (used by the root `pnpm dev`)
```

`src/system-colors.generated.js` (the USWDS system-color palette used by the
Theme Playground) is generated from `@uswds/uswds`'s own token JSON and is
committed. Regenerate it only after bumping `@uswds/uswds`:

```sh
pnpm generate:system-colors
```

## Theming

Every themeable Sass token in `src/_variables.scss` is a **triple**:

```scss
$color-primary-static: #2563eb !default;                 // plain value — the only thing Sass math may consume
$usx-color-primary-var: --usx-color-primary !default;    // CSS custom property hook (null to opt out)
$usx-color-primary: usx-var($usx-color-primary-var, $color-primary-static) !default;  // published token
```

The published token (what component SCSS consumes by name) resolves to
`var(--usx-color-primary, #2563eb)` by default, so consumers have three ways
to use USX — **all variables are optional**:

1. **Do nothing.** Defaults are baked in as `var()` fallbacks; the output looks
   identical to a fully static build.
2. **Compile-time overrides** — classic Sass configuration:

   ```scss
   @use 'pkg:@solexllc/usx-theme/variables' with ($color-primary-static: #b00020);
   ```

3. **Runtime theming** — set CSS custom properties anywhere in the cascade
   (`:root` or a wrapper element), no recompile needed:

   ```css
   :root {
     --usx-color-primary: #b00020;
     --usx-color-primary-hover: #e60524;
   }
   ```

### Opting out of CSS variables

Set the master switch to compile every published token to its static value —
the output contains zero `var()` references:

```scss
@use 'pkg:@solexllc/usx-theme/variables' with ($usx-css-vars: false);
```

Individual tokens can also opt out by nulling their hook
(e.g. `$usx-color-primary-var: null`).

### Notes

- **Derived shades are first-class tokens.** Overriding `--usx-color-primary`
  does NOT recompute `--usx-color-primary-darker` etc. — set each shade you
  care about (the Theme playground's export includes them automatically).
- **Compile-time only:** breakpoints, media queries, and the `units()`
  function cannot be themed at runtime (CSS cannot use `var()` in media
  queries).
- CSS variables are never written directly in component SCSS; the indirection
  lives entirely in this package.

### Theme playground

The Storybook page **Documentation → Theme → Playground** renders the component showcase with
live controls for every manifest token, auto-derives shades when a base color
changes, and exports a ready-to-use `:root { --usx-*: ... }` block
(copy/download).
