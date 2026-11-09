# @solexllc/usx-react

## 0.10.0

### Minor Changes

- [#25](https://github.com/solexconsulting/usx/pull/25) [`8ac6a60`](https://github.com/solexconsulting/usx/commit/8ac6a6085e213b7d1f041309d2748db95acaeaef) Thanks [@olsonap](https://github.com/olsonap)! - Add consistent enhancement markers and no-JavaScript fallbacks for USX components. Expose enhancement-target attributes in React components and component contracts, and document the fallback states in Storybook.

### Patch Changes

- [`880c0a5`](https://github.com/solexconsulting/usx/commit/880c0a53f7e15a1ba9cc34f7d997b8ca4fa0ba55) Thanks [@olsonap](https://github.com/olsonap)! - Omit the mobile menu and navigation drawer when a Header has no navigation content.
- Updated dependencies [[`93ab033`](https://github.com/solexconsulting/usx/commit/93ab03347ec9c573b477f9748e170ada03f154d0), [`8ac6a60`](https://github.com/solexconsulting/usx/commit/8ac6a6085e213b7d1f041309d2748db95acaeaef)]:
  - @solexllc/usx@0.12.0
  - @solexllc/usx-theme@0.11.1
  - @solexllc/usx-uswds-fixes@0.1.16

## 0.9.0

### Minor Changes

- [#23](https://github.com/solexconsulting/usx/pull/23) [`e42b668`](https://github.com/solexconsulting/usx/commit/e42b668b2febe657c81e172a0706283396394249) Thanks [@olsonap](https://github.com/olsonap)! - Split the former advanced Table API into a themeable USWDS Table and a new USX DataTable. DataTable adds grouped and spanning cells, multilevel headers, sorting, search, selection, pagination, row details, and responsive layouts. Update the Django templates, static initializer, theme tokens, component contracts, stories, snapshots, and play coverage. Existing advanced Table usages should migrate to DataTable.

  DataTable React now renders markup and initial state only. The shared USX JavaScript initializer owns interaction for React, Django, and static HTML. Replace React interaction callbacks with `usx:data-table:*` event listeners; use `sortValue(row)` for custom sortable values.

  Grouped tables can set `groupBy.headers` independently from their group-row cells and `groupBy.rowClassName` for a uniform group color. Rows, columns, and cells accept USX `bg-*` and `text-*` classes, with cell colors taking precedence over column colors.

  The USWDS Table accepts `scrollHeight` to give its existing scroll container a fixed height, including for sticky headers.

  React and Django DataTable now emit matching complete HTML before JavaScript runs. The shared `data-table.mjs` initializer applies the initial sort and later interactions to either renderer. The Django package keeps table layout planning in a Python runtime module and packages templates through the normal generator without template-specific setup checks.

  Organize the React and Django DataTable stories into Sorting, Grouping, Responsive, Selection, and Footers folders. Add footer examples for published values, totals, summary statistics, and record counts.

### Patch Changes

- Updated dependencies [[`e42b668`](https://github.com/solexconsulting/usx/commit/e42b668b2febe657c81e172a0706283396394249)]:
  - @solexllc/usx@0.11.0
  - @solexllc/usx-theme@0.11.0
  - @solexllc/usx-uswds-fixes@0.1.15

## 0.8.0

### Minor Changes

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Add a themeable Drawer built on a native modal dialog, with four viewport edges, three sizes, semantic content, and React, HTML, and Django examples.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Add an experimental positioned Popover built on native `details` and `summary`, with themed panels and CSS placement on four sides and three alignments.

  Authors own the summary and content appearance. Popover adds no summary classes or styles and has no navigation-specific CSS. Use existing USWDS/USX components and utilities for panel contents.

  Use `popover.on/off` for outside dismissal, Escape with focus return, and nested Popover cleanup. Native `name` groups control exclusive opening. A composition story pairs Popover with Tree on small screens and a list with nested Popovers on larger screens. Include React, Django, and HTML stories for evaluation; do not use in production yet.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Add a semantic Tree driven by recursive `items` data. Each item sets an explicit `type`: `link` uses Link, `details` uses Details with `summaryProps` and either nested `items` or paragraph `text`, and `text` renders a plain label. Nested branches need no authored list markup or JavaScript.

  Add default and padded variants. The default preserves Details styling without a variant class; padded adds row spacing, alignment, and hover surfaces for links and summaries.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Replace Avatar's `tooltip` string prop with `tooltipProps` and render the shared Tooltip component in React and Django. Nested Avatar consumers forward Tooltip props, including position and CSS classes.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Align React and Django markup for the updated component stories. Misc Banner replaces `tone` with an open-ended `color` prop and renders its badge only when `badgeText` is provided. Spinner forwards `staticUrlPrefix` to its icon in React and Django.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf) Thanks [@olsonap](https://github.com/olsonap)! - Require summary-related options on Details and Popover to be passed through `summaryProps`, which is forwarded to the shared Summary component. Migrate existing story arguments to the grouped API.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Add `@solexllc/usx/js/layout` (also started by `@solexllc/usx/js/start`), which toggles the Layout expand button in static markup through a `data-usx-layout-toggle` attribute. The Django Layout template no longer emits an inline `onclick` and ignores `onToggleExpanded`; call `layout.on(root)` or import `@solexllc/usx/js/start`. React Layout keeps handling its own click.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Support URLs and fragments through `pageUrlPrefix`, while preserving literal `#` links for consumer click handlers when it is omitted. Add `renderPart` for standalone navigation, step options, and summary composition, and `stepOptionsId` for distinct controls on pages with multiple paginations.

  Pagination now renders only markup. Consumers can handle page clicks and page-size changes through the rendered `data-usx-pagination-*` attributes and supply the next `currentPage` and `pageSize`; the component has no internal state or event handlers.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Add `panelShape` to Popover. The default rounded panel keeps its existing radius and extra vertical padding; the square panel uses equal outer padding and no radius. Nested `menuItems` flyouts inherit the shape. Replace the Navigation story with explicit rounded, square, and square menu examples.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Redesign the Drawer to follow the USWDS mobile navigation: square edges by default, an icon close button styled like `usa-nav__close` (first in DOM order, named by `closeLabel`), a compact size as wide as `usa-nav`, and the same 1rem padding and 0.3s slide-in. Add `rounded` to round the edge facing the page and `actionRequired` to omit the close button and ignore Escape and outside clicks. Replace the text close button. The heading receives initial focus by default; with `focusHeading` off, mark a control in the content with `autofocus`.

  Remove the modeless `modal={false}` option because it relied on the browser Popover API. Drawer panels are modal dialogs. A packaged enhancement supports their native open and close commands in browsers that support `<dialog>` but not invoker commands.

  The packaged enhancement also closes ordinary drawers when the backdrop is clicked; `actionRequired` drawers remain open.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Standardize element props: `as` chooses a component root and `headingAs` chooses a child heading. Rename `element` to `as` on Callout and Container, `tag` to `as` on Card, `containerElement` to `as` on Prose, `headingLevel` to `headingAs` on Accordion, Hero, Popover, and Section, `headingTag` to `headingAs` on StepIndicator and ProcessList items, and `titleHeadingLevel` to `titleAs` on InPageNav. Page gains a contract-level `as` prop (`main`, `div`, `section`, or `article`; default `main`), so Django pages can render the same root element as React. Card `as` accepts `div`, `li`, or `article`. Update story arguments and templates to the new names.

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Add the optional packaged Theme Picker initializer for opening and closing rendered markup. React and Django now render the same accessible trigger and panel without component-level click handlers or inline scripts. Applications still own theme selection and persistence.

### Patch Changes

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Add Django block tags for Clickable's Link, ColorChange, and BgColorChange parts. Render every Django Clickable story with those tags, matching the React composition examples.

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Provide representative default props in each component config and expose them in generated contracts. Storybook Default stories and the Django template workbench use these shared examples. Also fix controlled React Text Area usage by omitting `defaultValue` when `value` is supplied.

- [#21](https://github.com/solexconsulting/usx/pull/21) [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c) Thanks [@olsonap](https://github.com/olsonap)! - Add `fileInput.on(root)` for managed file lists in server-rendered markup. The handler adds and deletes individual files and emits `usx:files-change` with current browser files. React keeps its existing state handler. Django File Input now renders managed and preloaded lists inside the form group.

- Add an underline color utility for Details and Summary and use it for their `underlineColor` prop.

- [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1) Thanks [@olsonap](https://github.com/olsonap)! - Set Tooltip's default position to `right` in React, Django, and the shared contract.
- Updated dependencies [[`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf), [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf), [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf), [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c), [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c), [`b1befdd`](https://github.com/solexconsulting/usx/commit/b1befddfdc1d8f5d0c3c4b2bb6ef12691d4af1bf), [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c), [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c), [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c), [`b729455`](https://github.com/solexconsulting/usx/commit/b72945508a5ae10e38f9f6ad5ea3b69950a0f52c), [`5adbd68`](https://github.com/solexconsulting/usx/commit/5adbd68dfff848d344f0feb710f7996e29296cd1)]:
  - @solexllc/usx@0.10.0

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

### Patch Changes

- Updated dependencies [[`e3ff428`](https://github.com/solexconsulting/usx/commit/e3ff428873c9cadf2ad43a71b13434c618406fd4), [`369d0b5`](https://github.com/solexconsulting/usx/commit/369d0b56799744f4e1a90985ebce5c661d3a8297), [`c219836`](https://github.com/solexconsulting/usx/commit/c2198366e15314a0fa1083b5a8393c959ab13931)]:
  - @solexllc/usx@0.9.0
  - @solexllc/usx-theme@0.10.0
  - @solexllc/usx-uswds-fixes@0.1.14

## 0.6.1

### Patch Changes

- Updated dependencies [[`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb), [`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb), [`094cce6`](https://github.com/solexconsulting/usx/commit/094cce657ebe52877301e42df4a9f65d610df0cb), [`c4d1a17`](https://github.com/solexconsulting/usx/commit/c4d1a170a0fa9b124edd3f9df27cf888e719de8a)]:
  - @solexllc/usx-theme@0.9.0
  - @solexllc/usx@0.8.0
  - @solexllc/usx-uswds-fixes@0.1.13

## 0.6.0

### Minor Changes

- [`ef3a85c`](https://github.com/solexconsulting/usx/commit/ef3a85cd7cd34f31bf5582b5e78a45fad66a331c) Thanks [@olsonap](https://github.com/olsonap)! - Align border color utilities with USWDS and clarify border width utility names. Update React and Django callouts, examples, and utility documentation, including grid layouts for radius demonstrations.

  Migration:
  - Replace `.usx-border-{color}` with `.border-{color}`.
  - Replace `.usx-border-{size}` with `.usx-border-width-{size}`.
  - Rename Sass maps: `$colors` to `$usx-colors`, `$text-colors` to `$usx-text-colors`, `$surface-colors` to `$usx-surface-colors`, `$border-radius` to `$usx-border-radiuses`, and `$border-width` to `$usx-border-widths`.

- [`4a123a8`](https://github.com/solexconsulting/usx/commit/4a123a8376b3764847fc97f24f2cfbec6020cd7f) Thanks [@olsonap](https://github.com/olsonap)! - Add an unstyled Container with optional responsive flex, display, spacing, float, and USWDS grid controls. Include React and Django rendering, CMS metadata, and Storybook examples.

  Use one shared prop contract with template-only Django rendering and no Container-specific Python helper.

### Patch Changes

- Updated dependencies [[`ef3a85c`](https://github.com/solexconsulting/usx/commit/ef3a85cd7cd34f31bf5582b5e78a45fad66a331c), [`4a123a8`](https://github.com/solexconsulting/usx/commit/4a123a8376b3764847fc97f24f2cfbec6020cd7f)]:
  - @solexllc/usx@0.7.0
  - @solexllc/usx-theme@0.8.0
  - @solexllc/usx-uswds-fixes@0.1.12

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

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Render Carousel slide navigation for supplied children as well as slide data, and pass Django slide image props through to Image. Add Card Carousel stories, remove default Card margins inside Carousel tracks so cards fit the slides, and hide the viewport scrollbar.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Use classnames consistently for component CSS class composition and update the new-component scaffold.

- [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9) Thanks [@olsonap](https://github.com/olsonap)! - Correct renderable children and other composed-content props to use slot metadata, including Page and Section. Add missing children contracts for Breadcrumb, Prose, Table, and InPageNav, and increment affected component contract versions. Preserve string-only HTML inputs and recursive navigation arrays. Update the component scaffold to declare children as a slot.
- Updated dependencies [[`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9), [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9), [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9), [`90c0553`](https://github.com/solexconsulting/usx/commit/90c0553b944f3b0333836b9e463fddb2381113b9)]:
  - @solexllc/usx@0.6.0
  - @solexllc/usx-theme@0.7.0
  - @solexllc/usx-uswds-fixes@0.1.11

## 0.4.0

### Minor Changes

- [`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257) Thanks [@olsonap](https://github.com/olsonap)! - Add `staticBaseUrl` to Banner, Icon, Spinner, Alert, Code, CopyToClipboard, Image, Header, and Footer. Asset paths resolve against a non-empty component override, then `window.usxBaseUrl`, then `/`; Django templates use `STATIC_URL` as their fallback. Header resolves branding images, while Footer also resolves social images. Image supports automatic resolution of responsive sources and `srcSet` candidates.

  Pass asset-relative filenames instead of paths already prefixed with the asset base. Fully qualified and data URLs remain unchanged, and link destinations are unaffected. Icon's explicit `staticUrlPrefix` still overrides automatic sprite resolution.

  Replace CopyToClipboard's `tooltip` and `copiedTooltip` props with `tooltipProps.label` and `tooltipProps.copiedTooltip`. Other Tooltip props pass through; omitting `tooltipProps` now renders no tooltip wrapper. Tooltip accepts rich labels and a `bodyClassName`. Code displays a left-positioned Copy/Copied tooltip, and its copy action now requires the Clipboard API rather than falling back to `execCommand`.

  Button no longer adds the primary variant class when `variant` is omitted; pass `variant="primary"` explicitly. Spinner's React types now expose `screenReaderLabel` instead of the unused `omitLabel` prop and accept sizes 1 through 9. Slim Footer contact links use individual responsive columns and no longer display the contact heading.

  Update Django component tag libraries to provide `asset_url`, `asset_srcset`, `dict` (renamed from `html_attrs`), and the `code` and `copy_to_clipboard` block tags. Composed block tags require `props=` mapping support, with explicit arguments taking precedence. Clipboard tooltip markup no longer introduces template whitespace that increases its height.

### Patch Changes

- [`b8695da`](https://github.com/solexconsulting/usx/commit/b8695dafd4a8370ae0b6fd303485eb218f732fd5) Thanks [@olsonap](https://github.com/olsonap)! - Extend the existing component manifest with exact package release identities,
  React and Django bindings for every component, and example props kept separate
  from declared defaults. Describe renderer-specific prop differences.

  Correct Button, Layout, Alert, and Icon metadata and advance those contract
  versions to 2. This changes component descriptions, not rendering behavior;
  existing developer APIs and the complete component catalog remain available.

- Updated dependencies [[`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257), [`8c570b7`](https://github.com/solexconsulting/usx/commit/8c570b720ca550e91a0a06d2b6209f91583f4257)]:
  - @solexllc/usx@0.5.0
  - @solexllc/usx-theme@0.6.0
  - @solexllc/usx-uswds-fixes@0.1.10

## 0.3.1

### Patch Changes

- [`4791d75`](https://github.com/solexconsulting/usx/commit/4791d75cc1d12987c405ddd963ff48001eb1543e) Thanks [@olsonap](https://github.com/olsonap)! - Remove the unused early variables import from the Sass entry so the existing themed entry initializes runtime hooks before component styles. This avoids requiring a separate hooks import in consuming stylesheets when theme modules resolve to one canonical path.

  Document shared layout and gutter helpers, custom breakpoint configuration, and integration with unchanged precompiled USWDS CSS. Clarify the distinction between USX layout breakpoints and the upstream Header navigation transition.

- Updated dependencies [[`4791d75`](https://github.com/solexconsulting/usx/commit/4791d75cc1d12987c405ddd963ff48001eb1543e), [`4791d75`](https://github.com/solexconsulting/usx/commit/4791d75cc1d12987c405ddd963ff48001eb1543e)]:
  - @solexllc/usx@0.4.0
  - @solexllc/usx-theme@0.5.0
  - @solexllc/usx-uswds-fixes@0.1.9

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
  - @solexllc/usx@0.3.0
  - @solexllc/usx-theme@0.4.0
  - @solexllc/usx-uswds-fixes@0.1.8

## 0.2.1

### Patch Changes

- [`00a65a0`](https://github.com/solexconsulting/usx/commit/00a65a05426ec28dac96e00b5aa6073bbe9a5c9c) Thanks [@olsonap](https://github.com/olsonap)! - Fix responsive footer branding and social-icon theming.
  - Render responsive normal and inverse logo sources in Django Footer across big, medium, and slim layouts, including branding without a link.
  - Update HTML footer branding and shared React/Django Footer stories to use responsive, theme-adaptive artwork. Apply matching inverse branding to example-page headers and footers, including Login.
  - Connect footer social-link backgrounds, hover backgrounds, and icon filters to runtime theme tokens. Use white icons in Borealis, Midnight, and Carbon while preserving readable forced-colors rendering.
  - Add regression coverage for Django responsive branding and social-icon preset values.

- Updated dependencies [[`00a65a0`](https://github.com/solexconsulting/usx/commit/00a65a05426ec28dac96e00b5aa6073bbe9a5c9c)]:
  - @solexllc/usx@0.2.1
  - @solexllc/usx-theme@0.3.1
  - @solexllc/usx-uswds-fixes@0.1.7

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
  - @solexllc/usx@0.2.0
  - @solexllc/usx-theme@0.3.0
  - @solexllc/usx-uswds-fixes@0.1.6

## 0.1.8

### Patch Changes

- [`f660bb4`](https://github.com/solexconsulting/usx/commit/f660bb4c4bf57f9a9dfc5aed64feee6d5c237b5f) Thanks [@olsonap](https://github.com/olsonap)! - Add expandable React and Django layouts with shared expand/contract icons, and fix sidebar alignment. Standardize layout widths and component spacing, add an optional `usx-when` fallback, and support a configurable Page element.
- Updated dependencies [[`f660bb4`](https://github.com/solexconsulting/usx/commit/f660bb4c4bf57f9a9dfc5aed64feee6d5c237b5f)]:
  - @solexllc/usx@0.1.8
  - @solexllc/usx-theme@0.2.3
  - @solexllc/usx-uswds-fixes@0.1.5

## 0.1.7

### Patch Changes

- [`4d30098`](https://github.com/solexconsulting/usx/commit/4d30098c585acb137d6dd43dbcc0fad9207dc109) Thanks [@olsonap](https://github.com/olsonap)! - Identifier now renders its masthead logos with the shared Avatar component instead of duplicating its markup, and Avatar gains support for a custom image class via `imageClassName`. Identifier's `parentAgencies` entries also accept a `useThe` flag to omit the hardcoded "the" article before an agency name (e.g. for organizations like "SOLEX Consulting LLC").
- Updated dependencies [[`4d30098`](https://github.com/solexconsulting/usx/commit/4d30098c585acb137d6dd43dbcc0fad9207dc109)]:
  - @solexllc/usx@0.1.7

## 0.1.6

### Patch Changes

- [`c6480dc`](https://github.com/solexconsulting/usx/commit/c6480dcb10b22338a0d15641316067d4f289ef04) Thanks [@olsonap](https://github.com/olsonap)! - Expand Hero customization and improve component consistency.

- [`f6c8b45`](https://github.com/solexconsulting/usx/commit/f6c8b45ec290c84f1a836c5e4592533af9300e2b) Thanks [@olsonap](https://github.com/olsonap)! - Banner now relies exclusively on USWDS JS instead of providing its own in react, while also enabling flagSrc param to configure icon in banner
- Updated dependencies [[`c6480dc`](https://github.com/solexconsulting/usx/commit/c6480dcb10b22338a0d15641316067d4f289ef04)]:
  - @solexllc/usx@0.1.6
  - @solexllc/usx-theme@0.2.2
  - @solexllc/usx-uswds-fixes@0.1.4

## 0.1.5

### Patch Changes

- Updated dependencies [[`96a0918`](https://github.com/solexconsulting/usx/commit/96a0918ca56054481a4caa06a00bb996ba7d7eac)]:
  - @solexllc/usx@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies [[`2e35021`](https://github.com/solexconsulting/usx/commit/2e35021e06902ff79d2379a09feb490c52610f31)]:
  - @solexllc/usx-theme@0.2.1
  - @solexllc/usx@0.1.4
  - @solexllc/usx-uswds-fixes@0.1.3

## 0.1.3

### Patch Changes

- Updated dependencies [[`e60910a`](https://github.com/solexconsulting/usx/commit/e60910a9e9451d8466d8587ef02b4d17034f810f)]:
  - @solexllc/usx-theme@0.2.0
  - @solexllc/usx@0.1.3
  - @solexllc/usx-uswds-fixes@0.1.2

## 0.1.2

### Patch Changes

- [`bb42da7`](https://github.com/solexconsulting/usx/commit/bb42da71a5bbb838fcb68cdf3f4b197180801c72) Thanks [@olsonap](https://github.com/olsonap)! - Bug fixes for layout, in-page-nav, and header to facilitate intended layout options
- Updated dependencies [[`bb42da7`](https://github.com/solexconsulting/usx/commit/bb42da71a5bbb838fcb68cdf3f4b197180801c72)]:
  - @solexllc/usx@0.1.2

## 0.1.1

### Patch Changes

- [`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8) Thanks [@olsonap](https://github.com/olsonap)! - Initial automated release of usx packages
- Updated dependencies [[`c787b22`](https://github.com/solexconsulting/usx/commit/c787b22b0d99a88ff4018d1f519441b26b7d66e8)]:
  - @solexllc/usx@0.1.1
  - @solexllc/usx-theme@0.1.1
  - @solexllc/usx-uswds-fixes@0.1.1
