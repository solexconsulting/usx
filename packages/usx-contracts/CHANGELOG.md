# @solexllc/usx-contracts

## 0.2.0

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

## 0.1.4

### Patch Changes

- [`f660bb4`](https://github.com/solexconsulting/usx/commit/f660bb4c4bf57f9a9dfc5aed64feee6d5c237b5f) Thanks [@olsonap](https://github.com/olsonap)! - Add expandable React and Django layouts with shared expand/contract icons, and fix sidebar alignment. Standardize layout widths and component spacing, add an optional `usx-when` fallback, and support a configurable Page element.

## 0.1.3

### Patch Changes

- [`4d30098`](https://github.com/solexconsulting/usx/commit/4d30098c585acb137d6dd43dbcc0fad9207dc109) Thanks [@olsonap](https://github.com/olsonap)! - Identifier now renders its masthead logos with the shared Avatar component instead of duplicating its markup, and Avatar gains support for a custom image class via `imageClassName`. Identifier's `parentAgencies` entries also accept a `useThe` flag to omit the hardcoded "the" article before an agency name (e.g. for organizations like "SOLEX Consulting LLC").

## 0.1.2

### Patch Changes

- [`c6480dc`](https://github.com/solexconsulting/usx/commit/c6480dcb10b22338a0d15641316067d4f289ef04) Thanks [@olsonap](https://github.com/olsonap)! - Expand Hero customization and improve component consistency.

- [`f6c8b45`](https://github.com/solexconsulting/usx/commit/f6c8b45ec290c84f1a836c5e4592533af9300e2b) Thanks [@olsonap](https://github.com/olsonap)! - Banner now relies exclusively on USWDS JS instead of providing its own in react, while also enabling flagSrc param to configure icon in banner

## 0.1.1

### Patch Changes

- [`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8) Thanks [@olsonap](https://github.com/olsonap)! - Initial automated release of usx packages
