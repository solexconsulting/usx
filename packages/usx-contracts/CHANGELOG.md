# @solexllc/usx-contracts

## 0.10.0

### Minor Changes

- [#25](https://github.com/solexconsulting/usx/pull/25) [`8ac6a60`](https://github.com/solexconsulting/usx/commit/8ac6a6085e213b7d1f041309d2748db95acaeaef) Thanks [@olsonap](https://github.com/olsonap)! - Add consistent enhancement markers and no-JavaScript fallbacks for USX components. Expose enhancement-target attributes in React components and component contracts, and document the fallback states in Storybook.

## 0.9.0

### Minor Changes

- [#23](https://github.com/solexconsulting/usx/pull/23) [`e42b668`](https://github.com/solexconsulting/usx/commit/e42b668b2febe657c81e172a0706283396394249) Thanks [@olsonap](https://github.com/olsonap)! - Split the former advanced Table API into a themeable USWDS Table and a new USX DataTable. DataTable adds grouped and spanning cells, multilevel headers, sorting, search, selection, pagination, row details, and responsive layouts. Update the Django templates, static initializer, theme tokens, component contracts, stories, snapshots, and play coverage. Existing advanced Table usages should migrate to DataTable.

  DataTable React now renders markup and initial state only. The shared USX JavaScript initializer owns interaction for React, Django, and static HTML. Replace React interaction callbacks with `usx:data-table:*` event listeners; use `sortValue(row)` for custom sortable values.

  Grouped tables can set `groupBy.headers` independently from their group-row cells and `groupBy.rowClassName` for a uniform group color. Rows, columns, and cells accept USX `bg-*` and `text-*` classes, with cell colors taking precedence over column colors.

  The USWDS Table accepts `scrollHeight` to give its existing scroll container a fixed height, including for sticky headers.

  React and Django DataTable now emit matching complete HTML before JavaScript runs. The shared `data-table.mjs` initializer applies the initial sort and later interactions to either renderer. The Django package keeps table layout planning in a Python runtime module and packages templates through the normal generator without template-specific setup checks.

  Organize the React and Django DataTable stories into Sorting, Grouping, Responsive, Selection, and Footers folders. Add footer examples for published values, totals, summary statistics, and record counts.

## 0.8.0

### Minor Changes

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Add a themeable Drawer built on a native modal dialog, with four viewport edges, three sizes, semantic content, and React, HTML, and Django examples.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Add an experimental positioned Popover built on native `details` and `summary`, with themed panels and CSS placement on four sides and three alignments.

  Authors own the summary and content appearance. Popover adds no summary classes or styles and has no navigation-specific CSS. Use existing USWDS/USX components and utilities for panel contents.

  Use `popover.on/off` for outside dismissal, Escape with focus return, and nested Popover cleanup. Native `name` groups control exclusive opening. A composition story pairs Popover with Tree on small screens and a list with nested Popovers on larger screens. Include React, Django, and HTML stories for evaluation; do not use in production yet.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Add a semantic Tree driven by recursive `items` data. Each item sets an explicit `type`: `link` uses Link, `details` uses Details with `summaryProps` and either nested `items` or paragraph `text`, and `text` renders a plain label. Nested branches need no authored list markup or JavaScript.

  Add default and padded variants. The default preserves Details styling without a variant class; padded adds row spacing, alignment, and hover surfaces for links and summaries.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Replace Avatar's `tooltip` string prop with `tooltipProps` and render the shared Tooltip component in React and Django. Nested Avatar consumers forward Tooltip props, including position and CSS classes.

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Provide representative default props in each component config and expose them in generated contracts. Storybook Default stories and the Django template workbench use these shared examples. Also fix controlled React Text Area usage by omitting `defaultValue` when `value` is supplied.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Align React and Django markup for the updated component stories. Misc Banner replaces `tone` with an open-ended `color` prop and renders its badge only when `badgeText` is provided. Spinner forwards `staticUrlPrefix` to its icon in React and Django.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Add `fileInput.on(root)` for managed file lists in server-rendered markup. The handler adds and deletes individual files and emits `usx:files-change` with current browser files. React keeps its existing state handler. Django File Input now renders managed and preloaded lists inside the form group.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Require summary-related options on Details and Popover to be passed through `summaryProps`, which is forwarded to the shared Summary component. Migrate existing story arguments to the grouped API.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Support URLs and fragments through `pageUrlPrefix`, while preserving literal `#` links for consumer click handlers when it is omitted. Add `renderPart` for standalone navigation, step options, and summary composition, and `stepOptionsId` for distinct controls on pages with multiple paginations.

  Pagination now renders only markup. Consumers can handle page clicks and page-size changes through the rendered `data-usx-pagination-*` attributes and supply the next `currentPage` and `pageSize`; the component has no internal state or event handlers.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Add `panelShape` to Popover. The default rounded panel keeps its existing radius and extra vertical padding; the square panel uses equal outer padding and no radius. Nested `menuItems` flyouts inherit the shape. Replace the Navigation story with explicit rounded, square, and square menu examples.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Redesign the Drawer to follow the USWDS mobile navigation: square edges by default, an icon close button styled like `usa-nav__close` (first in DOM order, named by `closeLabel`), a compact size as wide as `usa-nav`, and the same 1rem padding and 0.3s slide-in. Add `rounded` to round the edge facing the page and `actionRequired` to omit the close button and ignore Escape and outside clicks. Replace the text close button. The heading receives initial focus by default; with `focusHeading` off, mark a control in the content with `autofocus`.

  Remove the modeless `modal={false}` option because it relied on the browser Popover API. Drawer panels are modal dialogs. A packaged enhancement supports their native open and close commands in browsers that support `<dialog>` but not invoker commands.

  The packaged enhancement also closes ordinary drawers when the backdrop is clicked; `actionRequired` drawers remain open.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Standardize element props: `as` chooses a component root and `headingAs` chooses a child heading. Rename `element` to `as` on Callout and Container, `tag` to `as` on Card, `containerElement` to `as` on Prose, `headingLevel` to `headingAs` on Accordion, Hero, Popover, and Section, `headingTag` to `headingAs` on StepIndicator and ProcessList items, and `titleHeadingLevel` to `titleAs` on InPageNav. Page gains a contract-level `as` prop (`main`, `div`, `section`, or `article`; default `main`), so Django pages can render the same root element as React. Card `as` accepts `div`, `li`, or `article`. Update story arguments and templates to the new names.

### Patch Changes

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Add Django block tags for Clickable's Link, ColorChange, and BgColorChange parts. Render every Django Clickable story with those tags, matching the React composition examples.

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Add the optional packaged Theme Picker initializer for opening and closing rendered markup. React and Django now render the same accessible trigger and panel without component-level click handlers or inline scripts. Applications still own theme selection and persistence.

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Set Tooltip's default position to `right` in React, Django, and the shared contract.

## 0.7.0

### Minor Changes

- [`e3ff428`](https://github.com/solexconsulting/usx/commit/e3ff428873c9cadf2ad43a71b13434c618406fd4) Thanks [@olsonap](https://github.com/olsonap)! - Build an accessible Carousel with a packaged USWDS-style JavaScript initializer. React and Django render scrollable slide markup, while initialization adds navigation controls and selected-slide state and skips elements marked `data-enhanced`. Native scroll snapping supports touch dragging; arrow and dot controls animate between slides, respect reduced-motion preferences, and keep slide status in sync with scrolling and keyboard navigation.

  Improve Card, Carousel, and Image composition: Card supports `containerClassName`, image carousels fill card media space at a stable aspect ratio, and captioned Images retain their links and screen-reader captions. Update the Card and Carousel contracts for their revised props, and expand standalone HTML examples across components to cover the React variants.

  Default Carousel dot colors to the primary, primary-dark, and primary-darker tokens, with a focus-color fallback.

- [`c219836`](https://github.com/solexconsulting/usx/commit/c2198366e15314a0fa1083b5a8393c959ab13931) Thanks [@olsonap](https://github.com/olsonap)! - Add ErrorPage and Details components with matching React and Django contracts and HTML story snapshots.
  - Details uses native details/summary elements for plain text or composed content. It supports initial open state, marker and border colors, summary and content classes, and independent border and underline switches that also work in nested disclosures.
  - ErrorPage composes USX Page, Prose, ButtonGroup, Button, Link, Image, and Details for recovery actions, support channels, public error metadata, optional diagnostics, and opt-in HTTP Cats illustrations. ErrorPage does not set a tabindex on Page.
  - Page supports shared heading IDs, root labeling, and optional programmatic focus props in React and Django.
  - Callout supports paragraph roots alongside div, section, and aside. Remove its blockquote root and cite prop; use Quote for quotations.
  - Code supports contentClassName for styling its content independently.
  - Add marker color utilities and the ink border color utility used by Details.

## 0.6.0

### Minor Changes

- [`4a123a8`](https://github.com/solexconsulting/usx/commit/4a123a8376b3764847fc97f24f2cfbec6020cd7f) Thanks [@olsonap](https://github.com/olsonap)! - Add an unstyled Container with optional responsive flex, display, spacing, float, and USWDS grid controls. Include React and Django rendering, CMS metadata, and Storybook examples.

  Use one shared prop contract with template-only Django rendering and no Container-specific Python helper.

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
