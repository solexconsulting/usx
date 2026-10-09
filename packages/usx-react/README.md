React component library for USX.

This package uses a self-contained component structure where each component owns its canonical HTML, Django template, styling, and React wrapper.

USWDS is treated as an external foundation. This package does not bundle USWDS assets; consuming applications should load USWDS styles in their own application bundle.

## Asset URLs And Subpath Deployment

`usxBaseUrl` means the **static asset root**, not the application's routing
base. USX does not own routing. An app at `/application-root/` can serve its
assets at `/application-root/`, `/static/usx/`, or a separate static host.
It does not affect your router/framework's application base.

### Browser Configuration

No configuration is needed when assets use the default root paths, such as
`/img/sprite.svg`. For assets hosted elsewhere, `window.usxBaseUrl` is an
optional prefix override. For example, assets under `/application-root/`
could use:

```html
<script>window.usxBaseUrl = '/application-root/';</script>
```

Banner, Icon, and Spinner then load `/application-root/img/us_flag_small.png`,
`/application-root/img/sprite.svg#check`, and
`/application-root/img/usx-sprite.svg#spinner`. Alert and copy-button icons use
the same base, as do icons nested in other components. The example path is not
a required deployment layout: the value reflects wherever your assets are
already served, independently of the page URL.

### Per-Component Overrides

Banner, Icon, Spinner, Alert, Code, CopyToClipboard, Image, Header, and Footer accept an optional
`staticBaseUrl` string. Their built-in asset URLs resolve automatically:

1. A non-empty `staticBaseUrl` prop.
2. A non-empty `window.usxBaseUrl`.
3. `/`.

For example, these two props keep the filename separate from its base:

```jsx
<Banner flagSrc="flags/agency.png" staticBaseUrl="/other-assets/" />
<Icon name="check" staticBaseUrl="/other-assets/" />
```

The flag becomes `/other-assets/flags/agency.png`; the icon uses
`/other-assets/img/sprite.svg#check`. Banner's other images and nested lock icon
use its override too. No helper call or manual concatenation is needed.
Trailing slashes on the base and leading slashes on asset paths are normalized.
An empty override falls back to the global; `staticBaseUrl="/"` explicitly
selects root even when the global points elsewhere. Fully qualified asset
URLs pass through unchanged. Icon/Spinner's legacy `staticUrlPrefix` remains
a full sprite-URL escape hatch; it bypasses base resolution.

Internal asset resolution reads the global during rendering, with no subscriptions or automatic
rerendering. When using a global override, define it before rendering. USX does not
infer an asset root from the current route.

Without `window`, `staticBaseUrl` still works and the default remains `/`.
For SSR, the same component prop on the server and client keeps asset URLs
consistent during hydration. No process-global configuration is needed.

### Image And Branding Assets

Image resolves its source, responsive fallback, and every source-set candidate
against the asset base. Header and Footer resolve branding logos, inverse artwork,
and symbols internally; Footer also resolves social-image paths. Supply filenames
without looking up or concatenating the base:

```jsx
import { Image } from '@solexllc/usx-react';

function AgencyLogo() {
	return <Image src="img/agency-logo.svg" alt="Agency" />;
}
```

Asset resolution is internal to USX; no URL helper is exported from the package.
Image, Header, Footer, and direct Branding usage accept `staticBaseUrl` overrides.
Fully qualified and data URLs remain unchanged, as do navigation and image-link
destinations. Already-prefixed root-relative image paths should be replaced with
asset-relative paths to avoid adding the base twice.
Use root-relative or fully qualified bases for reliable deep-link behavior;
relative bases resolve against the document URL and are usually unsuitable.

### Asset Publishing

How files reach those URLs is up to your application and deployment tools.
USX generates URLs but does not copy files or serve them. Its default component
paths expect USWDS images under `img/`, alongside the USX sprite supplied as
`@solexllc/usx/src/img/usx-sprite.svg`, relative to the asset base.

The asset base does **not** rewrite CSS `url(...)`, stylesheet/script imports,
router links, or supplied HTML. Precompiled USWDS CSS references sibling
`img/` and `fonts/` directories; bundlers may instead resolve and emit those
assets using their own public/base URL. This setting does not change either
approach or require vendor Sass recompilation.

A fully qualified asset base can point to a static host, but browsers generally
block cross-origin external SVG `<use>` sprites, even with CORS headers.
Serve `sprite.svg` and `usx-sprite.svg` through the application's origin (for
example, a reverse proxy). The safest shared base is same-origin; use explicit
image URLs for CDN images, or `staticUrlPrefix` to override individual Icon and
Spinner sprites. A CDN-only base cannot make every default icon work.

### Django And Static HTML

Django uses `STATIC_URL` instead of the browser global. The same six components
accept `staticBaseUrl`; without an override their `asset_url` template tag
delegates to Django's static-file resolver. The tag lives in the included
`components` tag library. For example:

```django
{% banner flagSrc="flags/agency.png" staticBaseUrl="/other-assets/" %}{% endbanner %}
```

`STATIC_URL` is independent of `FORCE_SCRIPT_NAME` or URL routing. An example
static-file configuration is:

```python
STATIC_URL = '/application-root/static/usx/'
STATICFILES_DIRS = [
		BASE_DIR / 'node_modules/@uswds/uswds/dist',
		('img', BASE_DIR / 'node_modules/@solexllc/usx/src/img'),
]
```

Run `collectstatic` into your configured `STATIC_ROOT` and serve its output at
`STATIC_URL`. Preserve the `css/`, `img/`, and `fonts/` layout. The Storybook Django deployment exposes
this setting as `DJANGO_STATIC_URL`; its app mount is `DJANGO_FORCE_SCRIPT_NAME`.

Canonical `.html` files are reference markup, not a runtime URL resolver.
Replace their sample `/img/...` and `/assets/img/...` URLs with your deployed
asset paths when using that markup directly, or render the Django templates.
A browser global alone cannot rewrite literal URLs in static HTML.

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

### Generic Container

`Container` groups arbitrary content in one element. Its default `div` has only
the passive `usx-container` hook: no padding, width, display override, or child
wrappers. `children` takes precedence over `content` unless null or undefined;
empty children and zero are preserved. It is available in React, Django, the
CMS contract, and the React/Django/HTML Storybook catalogs.

```jsx
import { Container, Button } from '@solexllc/usx-react';

<Container
  display="flex"
  direction="column"
  gap="2"
  responsive={{ tablet: { direction: 'row', wrap: 'wrap', align: 'center' } }}
>
  <Button>Save changes</Button>
  <Button variant="secondary">Cancel</Button>
</Container>
```

Top-level layout props apply at every width. `responsive` overrides individual
fields at `mobileLg` (30em), `tablet` (40em), and `desktop` (64em), continuing
upward until overridden again. At a 16px browser default these are 480, 640,
and 1024px. Missing fields inherit the smaller-screen setting; use an explicit
value to reset it, such as `gap: '0'`, `offset: 'none'`, or `direction: 'row'`.
Keys are processed in breakpoint order, regardless of JSON insertion order.
`mobileLg` emits the USWDS `mobile-lg:` class prefix.
Values are string tokens; unsupported tokens and breakpoint names are ignored.

| Control | Purpose |
| --- | --- |
| `display` | Normal flow, flex, inline flex, hidden, or `flow-root` for containing floats. |
| `direction`, `wrap`, `justify`, `align` | Arrange children of a flex container. Set `display="flex"` or `"inline-flex"` to enable flex layout. |
| `alignSelf`, `flex` | Control this container as a child of a flex parent. Use `column` instead of `flex` for USWDS grid columns. |
| `gap` | Space between flex children. Spacing tokens include `0`, `2px`, `05`, and `1`–`6`; `2` is 1rem. |
| `column`, `offset` | USWDS column width (`1`–`12`, `auto`, `fill`) and offset (`none`, `1`–`12`). |
| `gutters` | Horizontal USWDS grid gutters, including `sm`, `md`, `lg`, and spacing tokens. Requires `gridRow`. |
| `float` | Float this container within surrounding text. Has no effect on a flex child. |

These controls all accept breakpoint overrides. `gridContainer` and `gridRow`
are structural options set on the container itself:

```jsx
<Container gridContainer="default">
  <Container gridRow gutters="2" responsive={{ desktop: { gutters: '4' } }}>
    <Container column="12" responsive={{ tablet: { column: '4' } }}>
      Sidebar content
    </Container>
    <Container column="12" responsive={{ tablet: { column: '8' } }}>
      Main content
    </Container>
  </Container>
</Container>
```

Nest columns directly inside rows. Use `gutters` for rows and `gap` for ordinary
flex groups: adding CSS gap to percentage-width grid columns can cause unwanted
wrapping. Gutters add child padding and negative row margins, so nest the row
inside a padded parent, usually `gridContainer`. Keep page containers, rows, and
columns as separate nested elements when combining their behaviors. Widths and
gutters remain opt-in; children are never cloned, wrapped, or reordered.

`gridContainer="default"` uses the existing USX-themed `grid-container` width
and side padding. Named sizes, such as `gridContainer="widescreen"`, use the
corresponding USWDS class. Load precompiled USWDS CSS followed by USX styles.
Container supplies its own flex/display/gap/float classes because upstream
precompiled CSS omits some responsive variants. Its breakpoints deliberately
match the upstream grid, independently of USX page-layout theme settings.

Django uses the same props and nesting:

```django
{% load components %}
{% container display="flex" direction="column" gap="2" responsive=layout_overrides %}
  {% button %}Save changes{% endbutton %}
  {% button variant="secondary" %}Cancel{% endbutton %}
{% endcontainer %}
```

Here `layout_overrides` is a context dictionary such as
`{"tablet": {"direction": "row", "wrap": "wrap"}}`. CMS integrations discover
all options in `container/config.json`; responsive objects reference the same
contract with non-layout fields omitted.

Use `element` for semantic roots (`section`, `article`, `aside`, `nav`, `ul`,
`ol`, or `li`), with `id`, `role`, `ariaLabel`, or `ariaLabelledby` as needed.
The ARIA props render as `aria-label` and `aria-labelledby` in both frameworks.
React and Django use the same explicit prop contract; Container does not forward
arbitrary HTML props or inline styles. Use `className` for additional styling.
The Django renderer uses the existing component tags and a reusable template
fragment for layout classes; it has no Container-specific Python helper.
Native element styling still applies; for example, lists retain their browser
spacing unless explicitly reset. Reverse directions affect visual order only,
so preserve a sensible reading and keyboard order in the source. Responsive
`display: 'none'` also hides content from assistive technology.
Use `className` for application-specific decoration, spacing, or other layouts.

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
It controls outer gutters and USX-owned desktop transitions, including Hero,
MiscBanner, Pagination, and `at-media('desktop')`, not sidebar visibility. Configure it at
compile time, since CSS custom properties cannot set media-query thresholds.

CSS container queries show the expand/contract button only when the two widths
differ by more than one pixel, accounting for visible sidebar tracks. React
only manages the expanded state; there are no JavaScript size measurements.
The expanded state is preserved when resizing temporarily removes the difference.
Django and static HTML use the same sizing and visibility rules.

The `layout.sizing()` mixin accepts `$gutter-mobile` and `$gutter` lengths
(defaults: `$usx-layout-gutter-mobile-default`, 12px, and
`$usx-layout-gutter-default`, 32px). It uses these for static padding and subtracts them
from the expansion thresholds at the corresponding viewport breakpoint.
For custom gutters, pass the same lengths used by your runtime gutter tokens
or static Sass overrides. CSS size queries cannot read custom properties, so
changing runtime gutters alone does not update the compiled button threshold.
The compact comparison uses `$gutter-mobile: 1rem` and `$gutter: 2.5rem`.

The custom grid does not require `grid-row`, `grid-col`, or `grid-gap`. Shared
`grid-container`, Banner, Header, Hero, MiscBanner, and Identifier containers use
the same maximum and responsive gutters. Hero's horizontal tablet padding now
matches Layout rather than adding a separate intermediate gutter. Do not add a
second padded `grid-container` around Layout unless nested gutters are intended.

Use `@include layout-container` for new page-shell containers, or
`@include layout-gutters` for padding alone. `at-media('desktop', 'max')` emits
an exclusive below-desktop query; `at-media('tablet')` reads
`$breakpoint-tablet`. The legacy `at-media('mobile')` means below tablet.
Legacy width and breakpoint variables remain default aliases, but new styles
should consume the `$usx-layout-*` settings and media helpers.

Load USWDS's precompiled CSS unchanged, then load USX as an overlay. No USWDS Sass
configuration or compilation is required. USX settings do not redefine upstream
`desktop:*` or `tablet:*` utilities. Header's mobile drawer and desktop structure
remain controlled by upstream CSS; use `at-media('uswds-header')` for appearance
overrides that must follow that transition. Its shared 64em compatibility value
is not a USWDS customization. Header container widths and gutters still use USX
layout settings. Use USX-owned selectors and media helpers when custom responsive
behavior is needed rather than changing the meaning of upstream utility classes.

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
