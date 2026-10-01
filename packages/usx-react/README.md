React component library for USX.

This package uses a self-contained component structure where each component owns its canonical HTML, Django template, styling, and React wrapper.

USWDS is treated as an external foundation. This package does not bundle USWDS assets; consuming applications should load USWDS styles in their own application bundle.

## Structure

- `src/components/<component>/`
	- `<Component>.tsx`: React component
	- `<component>.django.html`: Django template (rendered by `apps/storybook-django` and any consuming Django app)
	- `<component>.html`: canonical static HTML markup (used as the "HTML" Storybook reference and as a source of truth for hand-authored markup)
	- `config.json`: prop schema — drives Storybook argTypes, Django prop validation, default args, and the CMS contract
- `src/index.js`: generated barrel exporting every React component (`pnpm generate:exports`)
- `src/styles/core.scss`: Sass entry pulling in `@solexllc/usx` (themed) and `@solexllc/usx-uswds-fixes`
- `dist/`: build output (Vite library build), gitignored

The generated CMS contract manifest (`pnpm generate:contracts`) lives in the separate [`@solexllc/usx-contracts`](../usx-contracts/README.md) package, not here.

Component styling lives in `packages/usx/src/components/_<component>.scss`, not
alongside the component. `pnpm validate:configs` (part of `pnpm test`) checks
that every component has its required files and that the generated files above
are current.

Storybook stories for these components live separately in
`packages/usx-stories/src/components/<component>/`, not alongside the
component source.

## Components

See [component-implementation-status.md](../../component-implementation-status.md)
at the repo root for the full, up-to-date list of implemented components.

## Token usage

### Responsive Layout

`.usx-layout` owns the responsive outer padding: 12px (1.5 units)
below desktop and 32px (4 units) at desktop. `SingleColumnLayout` and the grid's
main content have no padding. The left sidebar has 32px of right padding, and
the right sidebar has 32px of left padding, keeping the inner gap large at
every width where sidebars are visible. These gaps are included in the sidebar
widths. Expanded sidebars extend into the outer gutter without removing the
inner gap. CSS container queries show supplied sidebars when
their combined widths fit alongside the minimum main-column width, capped by
the normal content maximum. Both sidebars appear together when both are supplied.
This works for expandable and non-expandable layouts and does not change when
expansion is toggled. Each sidebar adds 16rem outside
the configured 64rem content maximum. The unpadded main-column cap subtracts
twice the current outer gutter from that maximum, preserving the previous
readable width. The same subtraction applies to the expanded maximum.
A grid without sidebars matches the
single-column layout at every width. Expansion changes the content maximum to
100rem without changing gutters or sidebar visibility.

The main content, rather than the combined content-and-sidebar group, centers
when there is enough space on both sides. With default widths, all variants
align at 96rem of outer width (64rem configured content width plus room for a
16rem sidebar on either side).
Before that point, visible columns fill the available width until they reach
their caps; absent sidebars do not reserve tracks. A one-sidebar layout may
remain off-center while there is insufficient space to center its capped main
column without overlapping the sidebar. Expanded content aligns at 132rem of
outer width.

With the themed stylesheet and generated theme CSS loaded, these runtime tokens
can be set on a layout or an ancestor:

| Token | Default |
| --- | --- |
| `--usx-layout-gutter-mobile` | `0.75rem` |
| `--usx-layout-gutter` | `2rem` |

The desktop gutter token also supplies the fixed inner sidebar gap. Widths and
their container-query thresholds are configured together at Sass compile time:

| Sass variable | Default |
| --- | --- |
| `$usx-layout-max-width` | `64rem` |
| `$usx-layout-expanded-max-width` | `100rem` |
| `$usx-layout-sidebar-width` | `16rem` |
| `$usx-layout-content-min-width` | `32rem` |

The minimum main-column width is unpadded content space. Set it to match
the reading or control space your content needs. Default sidebar thresholds
are 48rem with one sidebar and 64rem with both. A narrow theme with 12rem
sidebars needs 44rem with one and 56rem with both. Measurements use the parent
layout's content-box width after outer padding, not the viewport, so embedded
layouts behave the same way. With default 16px root text and gutter values,
sidebars appear at outer widths of 792px (one) and 1088px (both).
Use nonnegative length values; percentage widths are not supported for these
grid sizing tokens. Sidebar detection uses CSS `:has()` with direct children.
Hidden sidebar content is also unavailable to assistive technology: provide
essential navigation or actions elsewhere on small screens.

For a static Sass build, configure the matching `$usx-layout-*` variables before
loading component styles. Existing `$max-layout-width` and `$max-sidebar-width`
remain the static defaults when the new width settings are unset. Runtime gutter
hooks take precedence in the themed build. `$usx-layout-breakpoint` defaults to
`$breakpoint-desktop` (1024px) and accepts a CSS length such as `880px`.
It controls the outer gutters, not sidebar visibility. Configure it at
compile time, since CSS custom properties cannot set media-query thresholds.

CSS container queries show the expand/contract button only when the two widths
differ by more than one pixel, accounting for visible sidebar tracks. React
only manages the expanded state; there are no JavaScript size measurements.
The expanded state is preserved when resizing temporarily removes the difference.
Django and static HTML use the same sizing and visibility rules.

The `layout.sizing()` mixin accepts `$gutter-mobile` and `$gutter` lengths
(defaults: 12px and 32px). It uses these for static padding and subtracts them
from the expansion thresholds at the corresponding viewport breakpoint.
For custom gutters, pass the same lengths used by your runtime gutter tokens
or static Sass overrides. CSS size queries cannot read custom properties, so
changing runtime gutters alone does not update the compiled button threshold.
The compact comparison uses `$gutter-mobile: 1rem` and `$gutter: 2.5rem`.

The custom grid does not require `grid-row`, `grid-col`, or `grid-gap`. USWDS's
site-margin settings still control its own containers; align those settings
with the USX gutter values when mixing both container types. Do not add a
second padded `grid-container` around Layout unless nested gutters are intended.

Layout stories use fullscreen previews. `ResponsiveComparison` and
`ThemedComparison` cover no, left, right, and both sidebars. When checking
expansion, expand at desktop width and resize without reloading the story.

### Component Tokens

Component `.scss` files consume design token variables published by
`@solexllc/usx-theme` (for example `$usx-color-primary`, `$usx-spacing-md`,
`$usx-radius-md`). These compile to `var(--usx-*, <default>)` by default, so
every token is runtime-themeable — see
[packages/usx-theme/README.md](../usx-theme/README.md) for the full theming guide.

Load `@solexllc/usx`'s compiled CSS (or `src/index.scss`, per that package's
build) so tokens and component styles are available together.

All `usx-*` classes are passive override hooks by default. They are intentionally no-op until a consuming application provides custom overrides.
