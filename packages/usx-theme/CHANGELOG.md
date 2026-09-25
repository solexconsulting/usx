# @solexllc/usx-theme

## 0.2.0

### Minor Changes

- [`e60910a`](https://github.com/solexconsulting/usx/commit/e60910a9e9451d8466d8587ef02b4d17034f810f) Thanks [@olsonap](https://github.com/olsonap)! - Prebuilt themes, DaisyUI-style. The Theme Playground's presets now ship in the package and are opt-in per theme:
  - `@use 'pkg:@solexllc/usx-theme/themes' with ($themes: (forest, carbon), $default: forest, $prefersdark: carbon)` emits only the listed themes as `[data-theme="<slug>"]` blocks (plus `:root` / `prefers-color-scheme: dark` wiring for the flagged ones). `$themes` may be a map to tweak a prebuilt theme or add a custom one; the Playground's new **Sass theme entry** export pastes straight in.
  - Plain stylesheets for the no-Sass route: `@solexllc/usx-theme/themes/<slug>.css` and `@solexllc/usx-theme/themes.css`.
  - New JS subpaths `@solexllc/usx-theme/presets` (the palettes) and `@solexllc/usx-theme/derive` (shade derivation, `themeToCss`, `themeToSass`, `colorSchemeOf`, `themeSlug`), moved here from the Storybook stories package.

## 0.1.1

### Patch Changes

- [`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8) Thanks [@olsonap](https://github.com/olsonap)! - Initial automated release of usx packages
