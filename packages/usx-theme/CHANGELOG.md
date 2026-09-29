# @solexllc/usx-theme

## 0.3.0

### Minor Changes

- [`fcddc2a`](https://github.com/solexconsulting/usx/commit/fcddc2a2f6d54e4315bd805a58638409308d80dc) Thanks [@olsonap](https://github.com/olsonap)! - Expand component theming and align React and Django rendering.
  - Add Card tokens for surfaces, text, borders, and corner radii, including inset, exdent, and flag media variants. Apply theme fonts to Card, Page, and Section headings.
  - Add semantic radius utilities and themed border-width utilities; constrain avatar images to their containers.
  - Add Accordion heading/content class targets and ButtonGroup item classes, with matching Django templates and generated contracts.
  - Align Card content precedence, image props, carousel classes, dot visibility, IDs, and accessibility markup across React and Django. Repair action-button rendering and use Carousel's declared slide contract.
  - Default buttons to the primary variant, align Django's button type default, remove CheckboxGroup's implicit legend, and add spacing after Required markers.
  - Support separate visible and screen-reader Spinner labels, with animation limited to the icon.

  Migration notes:
  - Spinner no longer supplies a default loading label. Use `label` for visible text or `screenReaderLabel` for assistive text. Remove `omitLabel`; omit both label props for an unlabelled spinner. The `usx-spinner` class now belongs to the wrapper rather than the SVG.
  - Accordion `className` now targets only the root. Use top-level `headingClassName` and `contentClassName` for inner elements instead of relying on root or item `className` propagation.
  - The default heading font is now Merriweather instead of inheriting the body font. Set `--usx-font-family-heading: var(--usx-font-family)` to retain inheritance.
  - Layout no longer enforces `min-height: 100vh`; apply a minimum height in the consuming application when needed. Supply a CheckboxGroup `legend` explicitly where required.

## 0.2.3

### Patch Changes

- [`f660bb4`](https://github.com/solexconsulting/usx/commit/f660bb4c4bf57f9a9dfc5aed64feee6d5c237b5f) Thanks [@olsonap](https://github.com/olsonap)! - Add expandable React and Django layouts with shared expand/contract icons, and fix sidebar alignment. Standardize layout widths and component spacing, add an optional `usx-when` fallback, and support a configurable Page element.

## 0.2.2

### Patch Changes

- [`c6480dc`](https://github.com/solexconsulting/usx/commit/c6480dcb10b22338a0d15641316067d4f289ef04) Thanks [@olsonap](https://github.com/olsonap)! - Expand Hero customization and improve component consistency.

## 0.2.1

### Patch Changes

- [`2e35021`](https://github.com/solexconsulting/usx/commit/2e35021e06902ff79d2379a09feb490c52610f31) Thanks [@olsonap](https://github.com/olsonap)! - Fix `@use 'pkg:@solexllc/usx-theme/themes'` failing with "Unable to determine which of multiple potential resolutions" under Sass's `NodePackageImporter`. Sass probes `themes.css` when resolving that subpath, and the sibling `./themes.css` export made the Sass module ambiguous. The all-themes stylesheet moved to `@solexllc/usx-theme/themes/all.css`; the `./themes.css` subpath is gone.

## 0.2.0

### Minor Changes

- [`e60910a`](https://github.com/solexconsulting/usx/commit/e60910a9e9451d8466d8587ef02b4d17034f810f) Thanks [@olsonap](https://github.com/olsonap)! - Prebuilt themes, DaisyUI-style. The Theme Playground's presets now ship in the package and are opt-in per theme:
  - `@use 'pkg:@solexllc/usx-theme/themes' with ($themes: (forest, carbon), $default: forest, $prefersdark: carbon)` emits only the listed themes as `[data-theme="<slug>"]` blocks (plus `:root` / `prefers-color-scheme: dark` wiring for the flagged ones). `$themes` may be a map to tweak a prebuilt theme or add a custom one; the Playground's new **Sass theme entry** export pastes straight in.
  - Plain stylesheets for the no-Sass route: `@solexllc/usx-theme/themes/<slug>.css` and `@solexllc/usx-theme/themes.css`.
  - New JS subpaths `@solexllc/usx-theme/presets` (the palettes) and `@solexllc/usx-theme/derive` (shade derivation, `themeToCss`, `themeToSass`, `colorSchemeOf`, `themeSlug`), moved here from the Storybook stories package.

## 0.1.1

### Patch Changes

- [`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8) Thanks [@olsonap](https://github.com/olsonap)! - Initial automated release of usx packages
