Design tokens package for USX.

This package stores platform-agnostic tokens in JSON source files and compiles them for CSS and JavaScript consumers.

## Structure

- `src/color.json`: color tokens (`primary`, `secondary`, `background`, `surface`, `text`)
- `src/spacing.json`: spacing scale tokens (`xs`, `sm`, `md`, `lg`, `xl`)
- `src/typography.json`: typography tokens
- `src/radius.json`: border radius tokens
- `src/_variables.scss`: Sass design tokens (the theme layer consumed by `@solexllc/usx`)
- `src/theme-manifest.js`: canonical manifest of themeable tokens (names, CSS variables, defaults, derivation)
- `src/presets.js`: the prebuilt theme palettes (Forest, Carbon, GOV.UK, …)
- `src/derive.js`: shade derivation + theme serialization (CSS / Sass export), shared by the build and the Playground
- `src/_themes.scss`: the opt-in prebuilt/custom themes Sass module (`@solexllc/usx-theme/themes`)
- `dist/tokens.css`: generated CSS variables
- `dist/tokens.js`: generated JS export
- `dist/theme-manifest.json`: generated theme manifest
- `dist/theme.css`: every `--usx-*` token at its default, on `:root`
- `dist/themes/<slug>.css`, `dist/themes/all.css`: each prebuilt theme as a `[data-theme="<slug>"]` block (and all of them together)
- `dist/_themes-registry.scss`: generated data behind `src/_themes.scss`

## Build

```sh
pnpm build   # node build.js → dist/
pnpm dev     # node build.js --watch (used by the root `pnpm dev`)
pnpm test    # rebuild + test/themes-check.mjs
```

`src/system-colors.generated.js` (the USWDS system-color palette used by the
Theme Playground) is generated from `@uswds/uswds`'s own token JSON and is
committed. Regenerate it only after bumping `@uswds/uswds`:

```sh
pnpm generate:system-colors
```

## Theming

Every themeable Sass token in `src/_variables.scss` is a **triple**:

```scss
$color-primary-static: #2563eb !default;                 // plain value — the only thing Sass math may consume
$usx-color-primary-var: --usx-color-primary !default;    // CSS custom property hook (null to opt out)
$usx-color-primary: usx-var($usx-color-primary-var, $color-primary-static) !default;  // published token
```

The published token (what component SCSS consumes by name) resolves to
`var(--usx-color-primary, #2563eb)` by default, so consumers have three ways
to use USX — **all variables are optional**:

1. **Do nothing.** Defaults are baked in as `var()` fallbacks; the output looks
   identical to a fully static build.
2. **Compile-time overrides** — classic Sass configuration:

   ```scss
   @use 'pkg:@solexllc/usx-theme/variables' with ($color-primary-static: #b00020);
   ```

3. **Runtime theming** — set CSS custom properties anywhere in the cascade
   (`:root` or a wrapper element), no recompile needed:

   ```css
   :root {
     --usx-color-primary: #b00020;
     --usx-color-primary-hover: #e60524;
   }
   ```

### Opting out of CSS variables

Set the master switch to compile every published token to its static value —
the output contains zero `var()` references:

```scss
@use 'pkg:@solexllc/usx-theme/variables' with ($usx-css-vars: false);
```

Individual tokens can also opt out by nulling their hook
(e.g. `$usx-color-primary-var: null`).

### Border colors

Neutral borders use four independent roles. As with text, `muted` is stronger
than `subtle`. Each role has a CSS custom property, a matching Sass variable
(for example, `$usx-color-border-subtle`), and an optional `-var` Sass hook.

| CSS token | Default | Component use | Color utility |
| --- | --- | --- | --- |
| `--usx-color-border` | `#565c65` | Inputs, switches, range controls | `.border-default` |
| `--usx-color-border-muted` | `#a9aeb1` | File targets/items, checkbox/radio tiles, pagination buttons, in-page navigation rails | `.border-muted` |
| `--usx-color-border-subtle` | `#dfe1e2` | Cards, header/footer/navigation dividers, task-list dividers, combo-box option dividers | `.border-subtle` |
| `--usx-color-border-inverse` | `#ffffff` | Reserved for opposite-polarity surfaces; no default component assignments | `.border-inverse` |

The strong role covers input outlines. The muted role consolidates file-input
gray and translucent pagination/in-page-navigation borders. The subtle role
covers light structural dividers. Brand, focus, error, success, selected, and
disabled colors keep their existing roles.

Step-indicator bars and counter outlines follow their label colors: pending
segments use `--usx-text-muted`, while current and completed segments share
their respective label/state colors. They are independent of the border scale.

Process-list counter outlines default to `--usx-text-ink` through
`--usx-process-list-counter-border`, independently of the border scale. The
Theme Playground's **Component colors → Process List** group exposes heading
text, the connecting line, counter text, counter outline, and counter
background/ring as separate overrides.

Table rules, collection separators, and checkbox/radio `::before` outlines
remain ink-colored and independent of this scale. Their Sass overrides
(`$usx-table-border`, `$usx-collection-border`, and `$usx-checkable-border`)
default to `null` when no hook is enabled, preserving USWDS styling. With
runtime theming enabled, their CSS tokens default to `currentColor` so they
follow the component's text color. Assign a component token explicitly to
opt into a border role:

```css
:root {
  --usx-table-border: var(--usx-color-border);
  --usx-collection-border: var(--usx-color-border-subtle);
  --usx-checkable-border: var(--usx-color-border);
}
```

These utilities set only `border-color`; combine them with a border style and
width, such as `class="border border-subtle"`. Component hooks such as
`--usx-card-border-color` and `--usx-collection-border` can override their role.
Configure the roles at compile time or enable runtime hooks with
`@use 'pkg:@solexllc/usx/themed'` and load a theme stylesheet. Without configured
tokens, the new role declarations are omitted and USWDS defaults remain.

Existing themes that set only `--usx-color-border` now customize strong borders.
Set `--usx-color-border-muted` and `--usx-color-border-subtle` too when migrating
a theme that previously used the same color for every neutral border. To keep
tables, collections, or checkable outlines on that scale, explicitly assign
their component tokens as shown above. Dark presets provide their own scale
and inverse color.

### Prebuilt themes

The Playground's presets ship prebuilt. List the ones you want; nothing else
reaches your bundle. Themes apply via `data-theme`; `$default` also applies
with no attribute, `$prefersdark` under `prefers-color-scheme: dark`.

```scss
@use 'pkg:@solexllc/usx/themed';
@use 'pkg:@solexllc/usx-theme/themes' with (
  $themes: (forest, carbon, gov-uk),
  $default: forest,
  $prefersdark: carbon,
);
```

```html
<html data-theme="gov-uk">
```

`$themes` can also be a map, to tweak a prebuilt theme or add your own — the
Playground's **Sass theme entry** export pastes straight in:

```scss
@use 'pkg:@solexllc/usx-theme/themes' with (
  $themes: (
    forest: (),
    carbon: (--usx-color-primary: #ff7a00),
    acme: (
      color-scheme: light,
      --usx-color-primary: #b00020,
      --usx-color-primary-hover: #8a0018,
    ),
  ),
  $default: acme,
);
```

Every emitted theme declares the union of tokens across all emitted themes
(falling back to the `:root` default), so switching `data-theme` — even on a
nested element — never leaks a value from the previous theme.
`themes.theme($tokens, $selector)` emits a one-off block outside that union,
and `themes.$available` lists the prebuilt names.

Without Sass, import the plain stylesheets instead (no default/prefers-dark
wiring in this form):

```js
import '@solexllc/usx-theme/theme.css';
import '@solexllc/usx-theme/themes/forest.css';   // or .../themes/all.css for all
```

### Header Borders

Header borders accept complete CSS border values, including `none`, rather than
colors alone. Runtime overrides require the themed USX stylesheet and theme CSS.
The corresponding Sass variables use the same names with `$` instead of `--`.

| CSS custom property | Border owner |
| --- | --- |
| `--usx-header-border-top` | Header's outer top, at every viewport width |
| `--usx-header-border-bottom` | Desktop outer bottom: basic Header, or extended navigation |
| `--usx-header-border-separator` | Top of extended desktop navigation, between branding and navigation |
| `--usx-header-border-bottom-mobile` | Collapsed Header's bottom, below the upstream 64em transition |
| `--usx-header-nav-border-bottom-mobile` | Bottom of the open mobile navigation drawer |
| `--usx-header-nav-item-border` | Mobile menu-item dividers and desktop secondary-link separators |

Top, desktop bottom, and drawer bottom default to `none`. The other borders
default to the small border width and shared border color. Non-default presets
also enable top and desktop bottom borders. Use `none` to disable any border.
Each boundary is painted once; the mobile navbar's upstream border is removed.

```css
.site-shell {
  --usx-header-border-top: none;
  --usx-header-border-bottom: 2px solid var(--usx-color-primary);
  --usx-header-border-separator: 1px solid var(--usx-color-border-subtle);
  --usx-header-border-bottom-mobile: 3px solid var(--usx-color-primary);
  --usx-header-nav-border-bottom-mobile: none;
}
```

Apply runtime overrides to a common ancestor of Header and navigation, not only
the `<header>` element: React and Django render extended navigation as a sibling.
CSS-only border switching follows the unchanged USWDS Header transition.

### Footer Borders

Footer uses complete border values, including `none`, with one owner for each
shell edge. Runtime overrides require the themed USX stylesheet and theme CSS;
the corresponding Sass variables replace `--` with `$`.

| CSS custom property | Border owner |
| --- | --- |
| `--usx-footer-border-top` | Footer's outer top |
| `--usx-footer-border-bottom` | Footer's outer bottom |
| `--usx-footer-primary-section-border-top` | Boundary above the primary section, after return-to-top content |
| `--usx-footer-secondary-section-border-top` | Boundary above the secondary section |
| `--usx-footer-primary-link-border-top` | Primary-link top dividers below 30em |
| `--usx-footer-nav-border-bottom` | Navigation bottom below 30em; below 40em in Big Footer |

The four shell borders default to `none`, without reserving space for transparent borders.
Non-default presets enable the top and both section borders using the small
border width and shared border color; the bottom remains disabled. When a
section is the footer's first child, its top border is suppressed and the outer
top border owns that edge. These roles are the same on mobile and desktop.
The two navigation dividers default to the small border width and shared border
color. They accept full border overrides or `none`, but retain USWDS's responsive
visibility: neither divider appears on desktop.

```css
.usx-footer {
  --usx-footer-border-top: 3px solid var(--usx-color-primary);
  --usx-footer-border-bottom: none;
  --usx-footer-primary-section-border-top: 1px dashed var(--usx-color-border-subtle);
  --usx-footer-secondary-section-border-top: 2px solid var(--usx-color-border-subtle);
  --usx-footer-primary-link-border-top: 1px dashed var(--usx-color-border-subtle);
  --usx-footer-nav-border-bottom: none;
}
```

Migration: replace `--usx-footer-border`,
`--usx-footer-primary-section-border`, and
`--usx-footer-secondary-section-border` with the respective `-top` names above,
and replace color-only values with full border values. The old Sass color
variables and their `-var` hooks are removed. Existing Sass `*-border-top`
overrides still accept complete borders; their runtime hooks now use the same
names followed by `-var`.

### Notes

- **Derived shades are first-class tokens.** Overriding `--usx-color-primary`
  does NOT recompute `--usx-color-primary-darker` etc. — set each shade you
  care about (the Theme playground's export includes them automatically).
- **Compile-time only:** breakpoints, media queries, and the `units()`
  function cannot be themed at runtime (CSS cannot use `var()` in media
  queries).
- CSS variables are never written directly in component SCSS; the indirection
  lives entirely in this package.

### Theme playground

The Storybook page **Documentation → Theme → Playground** renders the component showcase with
live controls for every manifest token, auto-derives shades when a base color
changes, and exports the result as a Sass `$themes` entry, a `[data-theme]`
stylesheet, or a plain `:root { --usx-*: ... }` block (copy/download).
