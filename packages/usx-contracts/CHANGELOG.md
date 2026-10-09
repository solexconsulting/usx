# @solexllc/usx-contracts

## 0.5.0

### Minor Changes

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Replace Block with Callout and a separate Quote composite. Migrate Block's color prop to strokeColor and its callout variant to orientation="vertical"; horizontal is the default. Callout supports independent backgroundColor and textColor utilities, children-over-content precedence, and an element override.

  Quote renders a Callout containing a figure, blockquote, and attribution/source figcaption. The horizontal quote icon sits above the left border; vertical quotes wrap the text in ❝❞. Both the quotation and its attribution stay inside the Callout. Pass Callout and Attribution options through calloutProps and attributionProps, and apply quotation-only classes through blockquoteClassName. sourceLinkProps passes Link props to the sourceTitle link and supplies the blockquote cite URL; sourceTitle renders in an unlinked cite when no link props are supplied.

  Rename usx-block CSS classes and Sass tokens to usx-callout; the old callout background token becomes usx-callout-background. Update stories, examples, generated contracts, exports, and Django rendering.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Replace duplicated child-component shapes with references and pass the full props through in React and Django.

  Migrate Card tags/actions/images to tagProps/buttonProps/imageProps; Hero button to buttonProps (text becomes label or children); Collection item calendarDate to calendarDateProps (wrap date strings in { datetime }); and CheckboxGroup options to checkboxProps. The React types now derive from the child components rather than separate CardTag/CardAction/CardImage, HeroButtonProps, and CheckboxOption shapes.

  Card keeps its default hidden captions and merges the single-image layout class with the supplied class. Collection defaults underCollection to true. Checkbox item props override group name/tile/small defaults, and missing IDs use the group id or name plus the item index. Update stories and shared Django composition paths, including CardGroup, ButtonGroup, and carousel images.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Add Section headingLevel (h1 through h6) in React and Django. It defaults to h2 and only renders a heading when title is supplied.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Rebuild Toggle as a native radio group on the usx-toggle list, with keyboard focus, touch-sized button labels, disabled states, and accessible names for icon choices. Use stable generated React IDs and caller-provided Django group IDs. Fix controlled/default value precedence and preserve numeric values, including zero. Add ariaLabel, required, and React onChange metadata. Update stories with a controlled example and keyboard checks, and remove rendered Django whitespace that shifted the buttons.

  Toggle labels use usa-button/usx-button primary styling for the selected radio and the shared Button ghost styling for unselected radios, while retaining native checked-state and form-reset behavior. Custom button styles can target usx-toggle\_\_button.

### Patch Changes

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Correct renderable children and other composed-content props to use slot metadata, including Page and Section. Add missing children contracts for Breadcrumb, Prose, Table, and InPageNav, and increment affected component contract versions. Preserve string-only HTML inputs and recursive navigation arrays. Update the component scaffold to declare children as a slot.

## 0.4.0

### Minor Changes

- [`b8695da`](https://github.com/solexconsulting/usx/commit/b8695dafd4a8370ae0b6fd303485eb218f732fd5) Thanks [@olsonap](https://github.com/olsonap)! - Extend the existing component manifest with exact package release identities,
  React and Django bindings for every component, and example props kept separate
  from declared defaults. Describe renderer-specific prop differences.

  Correct Button, Layout, Alert, and Icon metadata and advance those contract
  versions to 2. This changes component descriptions, not rendering behavior;
  existing developer APIs and the complete component catalog remain available.

- [`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257) Thanks [@olsonap](https://github.com/olsonap)! - Add `staticBaseUrl` to the Banner, Icon, Spinner, Alert, Code, CopyToClipboard, Image, Header, and Footer contracts. Remove Icon's hardcoded `staticUrlPrefix` default so automatic asset resolution can apply. Describe Banner flag paths and Image responsive sources and `srcSet` candidates relative to the selected asset base.

  Replace CopyToClipboard's `tooltip` and `copiedTooltip` fields with `tooltipProps`, referencing the Tooltip contract with an additional `copiedTooltip` field. Migrate stored values to `tooltipProps.label` and `tooltipProps.copiedTooltip`. Change Tooltip's `label` to a content slot and add `bodyClassName`.

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
