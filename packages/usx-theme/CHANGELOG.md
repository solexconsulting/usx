# @solexllc/usx-theme

## 0.8.0

### Minor Changes

- [`ef3a85c`](https://github.com/solexconsulting/usx/commit/ef3a85cd7cd34f31bf5582b5e78a45fad66a331c) Thanks [@olsonap](https://github.com/olsonap)! - Align border color utilities with USWDS and clarify border width utility names. Update React and Django callouts, examples, and utility documentation, including grid layouts for radius demonstrations.

  Migration:
  - Replace `.usx-border-{color}` with `.border-{color}`.
  - Replace `.usx-border-{size}` with `.usx-border-width-{size}`.
  - Rename Sass maps: `$colors` to `$usx-colors`, `$text-colors` to `$usx-text-colors`, `$surface-colors` to `$usx-surface-colors`, `$border-radius` to `$usx-border-radiuses`, and `$border-width` to `$usx-border-widths`.

## 0.7.0

### Minor Changes

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Replace Block with Callout and a separate Quote composite. Migrate Block's color prop to strokeColor and its callout variant to orientation="vertical"; horizontal is the default. Callout supports independent backgroundColor and textColor utilities, children-over-content precedence, and an element override.

  Quote renders a Callout containing a figure, blockquote, and attribution/source figcaption. The horizontal quote icon sits above the left border; vertical quotes wrap the text in ❝❞. Both the quotation and its attribution stay inside the Callout. Pass Callout and Attribution options through calloutProps and attributionProps, and apply quotation-only classes through blockquoteClassName. sourceLinkProps passes Link props to the sourceTitle link and supplies the blockquote cite URL; sourceTitle renders in an unlinked cite when no link props are supplied.

  Rename usx-block CSS classes and Sass tokens to usx-callout; the old callout background token becomes usx-callout-background. Update stories, examples, generated contracts, exports, and Django rendering.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Remove Page and Section background/text overrides so these layout components inherit their surrounding surface and text colors. Remove the corresponding usx-page-_ and usx-section-_ theme tokens.

## 0.6.0

### Minor Changes

- [`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257) Thanks [@olsonap](https://github.com/olsonap)! - Add independent Header and Footer border tokens accepting complete border values, such as `1px solid var(--usx-color-border)` or `none`, and update prebuilt themes to use them.

  Migrate existing color-only CSS custom properties and their corresponding Sass variables:
  - `usx-header-border` to `usx-header-border-top`.
  - `usx-header-nav-top-border` to `usx-header-border-separator`.
  - `usx-header-nav-bottom-border` to `usx-header-border-bottom`.
  - `usx-footer-border` to `usx-footer-border-top`.
  - `usx-footer-primary-section-border` to `usx-footer-primary-section-border-top`.
  - `usx-footer-secondary-section-border` to `usx-footer-secondary-section-border-top`.

  Supply a full border value instead of a color. Separate tokens now control Header mobile boundaries and menu dividers, plus Footer bottom borders and navigation dividers.

  Increase the default mobile layout gutter from `0.75rem` (12px) to `1rem`. Change `at-media('mobile')` to target the mobile minimum width; use `at-media('tablet', 'max')` for the previous below-tablet behavior.

## 0.5.0

### Minor Changes

- [`4791d75`](https://github.com/solexconsulting/usx/commit/4791d75cc1d12987c405ddd963ff48001eb1543e) Thanks [@olsonap](https://github.com/olsonap)! - Add shared Sass helpers for layout containers, gutters, and responsive queries.
  - Add `layout-container($max-width: $usx-layout-max-width)` for centered, border-box containers and `layout-gutters` for responsive inline padding. Both support the existing runtime gutter hooks with static fallbacks.
  - Expose `$usx-layout-gutter-mobile-default` and `$usx-layout-gutter-default`, defaulting to 12px and 32px, for consistent static spacing and sizing calculations.
  - Extend `at-media` with an optional direction argument. `'max'` emits an exclusive upper bound, `'desktop'` reads `$usx-layout-breakpoint`, and the legacy `'mobile'` call continues to mean below tablet.
  - Add the fixed `$uswds-header-breakpoint` compatibility reference and `at-media('uswds-header')` for appearance rules that must track upstream navigation. These helpers do not configure or rebuild USWDS.

  Layout widths remain compile-time Sass values; this release does not add runtime width tokens.

## 0.4.0

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

## 0.3.1

### Patch Changes

- [`00a65a0`](https://github.com/solexconsulting/usx/commit/00a65a05426ec28dac96e00b5aa6073bbe9a5c9c) Thanks [@olsonap](https://github.com/olsonap)! - Fix responsive footer branding and social-icon theming.
  - Render responsive normal and inverse logo sources in Django Footer across big, medium, and slim layouts, including branding without a link.
  - Update HTML footer branding and shared React/Django Footer stories to use responsive, theme-adaptive artwork. Apply matching inverse branding to example-page headers and footers, including Login.
  - Connect footer social-link backgrounds, hover backgrounds, and icon filters to runtime theme tokens. Use white icons in Borealis, Midnight, and Carbon while preserving readable forced-colors rendering.
  - Add regression coverage for Django responsive branding and social-icon preset values.

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
