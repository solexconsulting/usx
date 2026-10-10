# @solexllc/usx

## 0.8.1

### Patch Changes

- Updated dependencies [[`369d0b5`](https://github.com/solexconsulting/usx/commit/369d0b56799744f4e1a90985ebce5c661d3a8297)]:
  - @solexllc/usx-theme@0.10.0

## 0.8.0

### Minor Changes

- [`c4d1a17`](https://github.com/solexconsulting/usx/commit/c4d1a170a0fa9b124edd3f9df27cf888e719de8a) Thanks [@olsonap](https://github.com/olsonap)! - Add subtle, muted, and inverse border color tokens alongside the strong default border role, with matching Sass variables and `.border-default`, `.border-subtle`, `.border-muted`, and `.border-inverse` utilities. Consolidate neutral component borders under these roles, including previously unthemed combo-box dividers. Preserve form validation, selection, and disabled borders when applying the neutral scale.

  Keep table rules, collection separators, and checkbox/radio outlines ink-colored and independent of the border scale. Their Sass overrides default to null without hooks; runtime tokens default to currentColor and can explicitly reference a border role.

  Keep step-indicator segment bars and counter outlines aligned with their label colors, including the pending state's muted text color, independently of the border scale.

  Process-list counter outlines inherit text-ink by default and retain an independent override. Expose the process list's heading, connecting line, counter text, counter outline, and counter background/ring in a dedicated Theme Playground component-color group.

  Improve Theme Playground color controls to preview inherited CSS variable values without replacing their references, and support switching between currentColor and custom colors. Add a dedicated Collection color group alongside the Process List controls.

  Refine primary palette tints in the Sunset, Aurora, Borealis, Carbon, and GOV.UK presets. Customize Carbon's box, button, field, and selector radii, with component overrides for accordions, alerts, tags, and checkbox/radio tiles.

  The default border color changes to `#565c65`; muted defaults to `#a9aeb1`, subtle to `#dfe1e2`, and inverse to `#ffffff`. Dark themes define a matching scale. Existing themes that set only `--usx-color-border` should also configure `--usx-color-border-muted` and `--usx-color-border-subtle` to customize all three border strengths. Explicitly configure the table, collection, and checkable border hooks to include them in that scale. Component-specific overrides retain precedence; inverse has no default component assignments.

### Patch Changes

- [`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb) Thanks [@olsonap](https://github.com/olsonap)! - Make pagination page buttons inherit `radius-button` through the new `usx-pagination-button-radius` token. Expose the independent override under Advanced radius in the Theme Playground, with matching Sass configuration and CSS custom property support.

- [`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb) Thanks [@olsonap](https://github.com/olsonap)! - Add a configurable `surface-inverse` role that defaults to `text-ink` and powers inverse surface utilities. Tooltips now inherit their background and arrow color from `surface-inverse` and their text color from `text-inverse`, while retaining independent component overrides. Preserve this inheritance across presets and randomized Playground themes, and expose the inverse surface in the Playground.
- Updated dependencies [[`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb), [`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb), [`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb), [`c4d1a17`](https://github.com/solexconsulting/usx/commit/c4d1a170a0fa9b124edd3f9df27cf888e719de8a)]:
  - @solexllc/usx-theme@0.9.0

## 0.7.0

### Minor Changes

- [`ef3a85c`](https://github.com/solexconsulting/usx/commit/ef3a85cd7cd34f31bf5582b5e78a45fad66a331c) Thanks [@olsonap](https://github.com/olsonap)! - Align border color utilities with USWDS and clarify border width utility names. Update React and Django callouts, examples, and utility documentation, including grid layouts for radius demonstrations.

  Migration:
  - Replace `.usx-border-{color}` with `.border-{color}`.
  - Replace `.usx-border-{size}` with `.usx-border-width-{size}`.
  - Rename Sass maps: `$colors` to `$usx-colors`, `$text-colors` to `$usx-text-colors`, `$surface-colors` to `$usx-surface-colors`, `$border-radius` to `$usx-border-radiuses`, and `$border-width` to `$usx-border-widths`.

- [`4a123a8`](https://github.com/solexconsulting/usx/commit/4a123a8376b3764847fc97f24f2cfbec6020cd7f) Thanks [@olsonap](https://github.com/olsonap)! - Add an unstyled Container with optional responsive flex, display, spacing, float, and USWDS grid controls. Include React and Django rendering, CMS metadata, and Storybook examples.

  Use one shared prop contract with template-only Django rendering and no Container-specific Python helper.

### Patch Changes

- Updated dependencies [[`ef3a85c`](https://github.com/solexconsulting/usx/commit/ef3a85cd7cd34f31bf5582b5e78a45fad66a331c)]:
  - @solexllc/usx-theme@0.8.0

## 0.6.0

### Minor Changes

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Replace Block with Callout and a separate Quote composite. Migrate Block's color prop to strokeColor and its callout variant to orientation="vertical"; horizontal is the default. Callout supports independent backgroundColor and textColor utilities, children-over-content precedence, and an element override.

  Quote renders a Callout containing a figure, blockquote, and attribution/source figcaption. The horizontal quote icon sits above the left border; vertical quotes wrap the text in ❝❞. Both the quotation and its attribution stay inside the Callout. Pass Callout and Attribution options through calloutProps and attributionProps, and apply quotation-only classes through blockquoteClassName. sourceLinkProps passes Link props to the sourceTitle link and supplies the blockquote cite URL; sourceTitle renders in an unlinked cite when no link props are supplied.

  Rename usx-block CSS classes and Sass tokens to usx-callout; the old callout background token becomes usx-callout-background. Update stories, examples, generated contracts, exports, and Django rendering.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Remove Page and Section background/text overrides so these layout components inherit their surrounding surface and text colors. Remove the corresponding usx-page-_ and usx-section-_ theme tokens.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Rebuild Toggle as a native radio group on the usx-toggle list, with keyboard focus, touch-sized button labels, disabled states, and accessible names for icon choices. Use stable generated React IDs and caller-provided Django group IDs. Fix controlled/default value precedence and preserve numeric values, including zero. Add ariaLabel, required, and React onChange metadata. Update stories with a controlled example and keyboard checks, and remove rendered Django whitespace that shifted the buttons.

  Toggle labels use usa-button/usx-button primary styling for the selected radio and the shared Button ghost styling for unselected radios, while retaining native checked-state and form-reset behavior. Custom button styles can target usx-toggle\_\_button.

### Patch Changes

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Render Carousel slide navigation for supplied children as well as slide data, and pass Django slide image props through to Image. Add Card Carousel stories, remove default Card margins inside Carousel tracks so cards fit the slides, and hide the viewport scrollbar.
- Updated dependencies [[`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9), [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9)]:
  - @solexllc/usx-theme@0.7.0

## 0.5.0

### Minor Changes

- [`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257) Thanks [@olsonap](https://github.com/olsonap)! - Support independent, full-value Header and Footer border tokens from `@solexllc/usx-theme`. Separate outer borders from navigation dividers, avoid duplicate boundaries, and apply the appropriate borders to desktop navigation and mobile drawers. Migrate color-only border overrides to the new full-border tokens when updating styles and theme together.

  Align Footer content with shared layout width and gutter settings across variants, and constrain grid gaps to the available gutter. Size desktop Header megamenu background extensions from the layout maximum width.

  Apply shared layout sizing to Site Alert bodies, reserve space for Alert dismiss controls, and keep Code copy buttons positioned correctly with or without a tooltip wrapper.

### Patch Changes

- Updated dependencies [[`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257)]:
  - @solexllc/usx-theme@0.6.0

## 0.4.0

### Minor Changes

- [`4791d75`](https://github.com/solexconsulting/usx/commit/4791d75cc1d12987c405ddd963ff48001eb1543e) Thanks [@olsonap](https://github.com/olsonap)! - Align component containers and responsive styles with the shared USX layout settings.
  - Apply the shared maximum width and responsive gutters to Header, Banner, Footer, Hero, MiscBanner, grid containers, and Identifier containers. Allow expanded Banner guidance to use wider layouts and keep Page paragraph widths aligned with the layout maximum.
  - Align desktop navigation link text with page content without widening the navigation container or affecting the mobile drawer. Adjust MiscBanner's mobile action spacing to match its gutters.
  - Replace scattered component media queries with shared desktop and tablet helpers. Keep Header and branding appearance rules aligned with the unchanged upstream USWDS navigation breakpoint.
  - Use the shared static gutter defaults in Layout's CSS-only sizing calculations.
  - Tint Hero backgrounds with an inset shadow instead of a positioned overlay. Preserve overlay color and opacity controls without painting over preceding Header focus outlines or tinting Hero content.
  - Let Footer sign-up forms use their available column width through a shared stylesheet rule covering React, Django, and HTML markup.

  Review custom spacing overrides: Hero's horizontal tablet gutter now follows Layout, and existing grid containers receive shared container sizing. USX-owned desktop transitions follow `$usx-layout-breakpoint`; upstream USWDS responsive utilities and navigation behavior remain unchanged. Runtime gutter overrides still require matching compile-time lengths for Layout's container-query thresholds.

### Patch Changes

- Updated dependencies [[`4791d75`](https://github.com/solexconsulting/usx/commit/4791d75cc1d12987c405ddd963ff48001eb1543e)]:
  - @solexllc/usx-theme@0.5.0

## 0.3.0

### Minor Changes

- [`00a634a`](https://github.com/solexconsulting/usx/commit/00a634aa8a5d1a89fda25f450c8614900bbf5f06) Thanks [@olsonap](https://github.com/olsonap)! - Refine responsive page layouts and support literal HTML and JSX in Code examples.
  - Use CSS container queries for Layout sidebar capacity and expand-button availability across React, Django, and HTML. Center the main column, preserve readable width, contain vertical margins consistently, and keep responsive outer gutters separate from inner sidebar gaps.
  - Consolidate Layout visibility rules to reduce generated CSS and repeated relational selectors. Add configurable Sass sizing profiles and runtime gutter tokens, accessible expand-button state, and sidebar expansion props in the component contract.
  - Make Hero height content-driven with responsive outer and callout padding. Align mobile branding and miscellaneous-banner spacing, use body typography for alert headings, and remove Page's automatic surface-background fallback.
  - Render Code lines as literal text by default. Add explicit `allowHtml` support for trusted formatting, including escaped JSX with a real bold fragment, with matching React, Django, HTML, and generated contracts.
  - Standardize complete examples and page-pattern stories on Layout, Page, and Section; correct duplicate headings, nested landmarks, and skip targets. Add page-anatomy documentation, markup examples, USWDS adoption research, and focused rendering and responsive-layout regression coverage.

  Migration notes:
  - Code no longer interprets line strings as HTML by default. Pass raw HTML or JSX source without pre-escaping it. Existing formatted fragments must set `allowHtml: true`; that mode does not sanitize HTML. For mixed source and formatting, escape the displayed markup but leave trusted formatting tags unescaped, and supply plain source separately through `copyText`.
  - Layout owns the responsive outer padding; the single-column and main-content wrappers are unpadded, and sidebars own their inner gaps. Review CSS that targets the previous padding placement. Keep custom runtime gutter values synchronized with the `layout.sizing()` mixin's `$gutter-mobile` and `$gutter` arguments because CSS size-query thresholds cannot read custom properties.
  - Hero no longer supplies a fixed minimum height. Add an explicit minimum height when required. Pages that need their own surface fill should explicitly configure their background rather than relying on the previous fallback.

### Patch Changes

- Updated dependencies [[`00a634a`](https://github.com/solexconsulting/usx/commit/00a634aa8a5d1a89fda25f450c8614900bbf5f06)]:
  - @solexllc/usx-theme@0.4.0

## 0.2.1

### Patch Changes

- [`00a65a0`](https://github.com/solexconsulting/usx/commit/00a65a05426ec28dac96e00b5aa6073bbe9a5c9c) Thanks [@olsonap](https://github.com/olsonap)! - Fix responsive footer branding and social-icon theming.
  - Render responsive normal and inverse logo sources in Django Footer across big, medium, and slim layouts, including branding without a link.
  - Update HTML footer branding and shared React/Django Footer stories to use responsive, theme-adaptive artwork. Apply matching inverse branding to example-page headers and footers, including Login.
  - Connect footer social-link backgrounds, hover backgrounds, and icon filters to runtime theme tokens. Use white icons in Borealis, Midnight, and Carbon while preserving readable forced-colors rendering.
  - Add regression coverage for Django responsive branding and social-icon preset values.

- Updated dependencies [[`00a65a0`](https://github.com/solexconsulting/usx/commit/00a65a05426ec28dac96e00b5aa6073bbe9a5c9c)]:
  - @solexllc/usx-theme@0.3.1

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

### Patch Changes

- Updated dependencies [[`fcddc2a`](https://github.com/solexconsulting/usx/commit/fcddc2a2f6d54e4315bd805a58638409308d80dc)]:
  - @solexllc/usx-theme@0.3.0

## 0.1.8

### Patch Changes

- [`f660bb4`](https://github.com/solexconsulting/usx/commit/f660bb4c4bf57f9a9dfc5aed64feee6d5c237b5f) Thanks [@olsonap](https://github.com/olsonap)! - Add expandable React and Django layouts with shared expand/contract icons, and fix sidebar alignment. Standardize layout widths and component spacing, add an optional `usx-when` fallback, and support a configurable Page element.
- Updated dependencies [[`f660bb4`](https://github.com/solexconsulting/usx/commit/f660bb4c4bf57f9a9dfc5aed64feee6d5c237b5f)]:
  - @solexllc/usx-theme@0.2.3

## 0.1.7

### Patch Changes

- [`4d30098`](https://github.com/solexconsulting/usx/commit/4d30098c585acb137d6dd43dbcc0fad9207dc109) Thanks [@olsonap](https://github.com/olsonap)! - Identifier now renders its masthead logos with the shared Avatar component instead of duplicating its markup, and Avatar gains support for a custom image class via `imageClassName`. Identifier's `parentAgencies` entries also accept a `useThe` flag to omit the hardcoded "the" article before an agency name (e.g. for organizations like "SOLEX Consulting LLC").

## 0.1.6

### Patch Changes

- [`c6480dc`](https://github.com/solexconsulting/usx/commit/c6480dcb10b22338a0d15641316067d4f289ef04) Thanks [@olsonap](https://github.com/olsonap)! - Expand Hero customization and improve component consistency.
- Updated dependencies [[`c6480dc`](https://github.com/solexconsulting/usx/commit/c6480dcb10b22338a0d15641316067d4f289ef04)]:
  - @solexllc/usx-theme@0.2.2

## 0.1.5

### Patch Changes

- [`96a0918`](https://github.com/solexconsulting/usx/commit/96a0918ca56054481a4caa06a00bb996ba7d7eac) Thanks [@olsonap](https://github.com/olsonap)! - Addressed issue with header nav drawer in mobile

## 0.1.4

### Patch Changes

- Updated dependencies [[`2e35021`](https://github.com/solexconsulting/usx/commit/2e35021e06902ff79d2379a09feb490c52610f31)]:
  - @solexllc/usx-theme@0.2.1

## 0.1.3

### Patch Changes

- Updated dependencies [[`e60910a`](https://github.com/solexconsulting/usx/commit/e60910a9e9451d8466d8587ef02b4d17034f810f)]:
  - @solexllc/usx-theme@0.2.0

## 0.1.2

### Patch Changes

- [`bb42da7`](https://github.com/solexconsulting/usx/commit/bb42da71a5bbb838fcb68cdf3f4b197180801c72) Thanks [@olsonap](https://github.com/olsonap)! - Bug fixes for layout, in-page-nav, and header to facilitate intended layout options

## 0.1.1

### Patch Changes

- [`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8) Thanks [@olsonap](https://github.com/olsonap)! - Initial automated release of usx packages
- Updated dependencies [[`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8)]:
  - @solexllc/usx-theme@0.1.1
