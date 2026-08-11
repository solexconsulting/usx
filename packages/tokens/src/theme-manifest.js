// theme-manifest.js — canonical manifest of themeable USX tokens.
//
// Single source of truth consumed by:
//   - build.js            → emits dist/theme-manifest.json, dist/theme.css
//                           (:root values), dist/_hooks.scss (Sass hooks)
//   - the Storybook theme playground (controls, derivation, export)
//   - test scripts        → verify manifest entries match compiled var() refs
//
// Keep in sync with src/_variables.scss (each entry mirrors a hook/published
// token pair). Compiled CSS emits bare var(--usx-*) references with NO
// fallbacks — defaultValue is the value theme.css assigns on :root.
//
// Fields:
//   name         — SCSS token name without `$` (published token).
//   cssVar       — CSS custom property name.
//   defaultValue — the default value theme.css assigns to cssVar on :root.
//   group        — color | spacing | radius | radius-advanced | border |
//                  typography | component.
//   type         — color | length | number | font-family.
//   derivedFrom  — (optional) base token `name` this shade derives from; the
//                  playground re-derives it by applying the HSL-lightness
//                  delta between the two defaults to the new base value.

// systemDefault records which real USWDS system token (family + grade, from
// the immutable palette in system-colors.generated.js) this theme/state
// token points at by default — mirrors how USWDS's own settings
// (`$theme-color-primary: "blue-60v"`) are just pointers into the system
// palette, never raw hex. Only set for tokens with a real USWDS counterpart;
// USX-specific extensions (hover/active aliases, base-100/200/300, border,
// component tokens, etc.) omit it and stay plain hex in the playground.
const c = (name, defaultValue, derivedFrom, systemDefault) => ({
  name,
  cssVar: `--usx-${name}`,
  defaultValue,
  group: 'color',
  type: 'color',
  ...(derivedFrom ? { derivedFrom } : {}),
  ...(systemDefault ? { systemDefault } : {})
});

const component = (name, defaultValue, derivedFrom) => ({
  name,
  cssVar: `--${name}`,
  defaultValue,
  group: 'component',
  type: 'color',
  ...(derivedFrom ? { derivedFrom } : {})
});

const scale = (name, cssVar, defaultValue, group, type = 'length') => ({
  name,
  cssVar,
  defaultValue,
  group,
  type
});

// Default values below mirror the USWDS default theme color tokens
// (https://designsystem.digital.gov/design-tokens/color/theme-tokens/ and
// .../state-tokens/) so the "Default" theme matches USWDS out of the box.
export const themeManifest = [
  // ── Color primitives ──────────────────────────────────────────────────────
  c('color-light', '#ffffff'),

  // Tier names/values below match USWDS's official theme-color tables
  // (designsystem.digital.gov/design-tokens/color/theme-tokens) exactly.
  // `-hover`/`-active` are USX-specific convenience aliases (not real USWDS
  // tokens) kept for existing component SCSS; they point at whichever real
  // tier reads correctly as an interaction state (usually vivid/dark).
  c('color-primary', '#005ea2', null, { family: 'blue', grade: '60', vivid: true }),
  c('color-primary-lighter', '#d9e8f6', 'color-primary', { family: 'blue', grade: '10' }),
  c('color-primary-light', '#73b3e7', 'color-primary', { family: 'blue', grade: '30' }),
  c('color-primary-vivid', '#0050d8', 'color-primary', { family: 'blue-warm', grade: '60', vivid: true }),
  c('color-primary-dark', '#1a4480', 'color-primary', { family: 'blue-warm', grade: '70', vivid: true }),
  c('color-primary-darker', '#162e51', 'color-primary', { family: 'blue-warm', grade: '80', vivid: true }),
  c('color-primary-hover', '#0050d8', 'color-primary'),
  c('color-primary-active', '#162e51', 'color-primary'),

  c('color-secondary', '#d83933', null, { family: 'red', grade: '50' }),
  c('color-secondary-lighter', '#f3e1e4', 'color-secondary', { family: 'red-cool', grade: '10' }),
  c('color-secondary-light', '#f2938c', 'color-secondary', { family: 'red', grade: '30' }),
  c('color-secondary-vivid', '#e41d3d', 'color-secondary', { family: 'red-cool', grade: '50', vivid: true }),
  c('color-secondary-dark', '#b50909', 'color-secondary', { family: 'red', grade: '60', vivid: true }),
  c('color-secondary-darker', '#8b0a03', 'color-secondary', { family: 'red', grade: '70', vivid: true }),
  c('color-secondary-hover', '#e41d3d', 'color-secondary'),
  c('color-secondary-active', '#b50909', 'color-secondary'),

  c('color-accent-cool', '#00bde3', null, { family: 'cyan', grade: '30', vivid: true }),
  c('color-accent-cool-lighter', '#e1f3f8', 'color-accent-cool', { family: 'blue-cool', grade: '5', vivid: true }),
  c('color-accent-cool-light', '#97d4ea', 'color-accent-cool', { family: 'blue-cool', grade: '20', vivid: true }),
  c('color-accent-cool-dark', '#28a0cb', 'color-accent-cool', { family: 'blue-cool', grade: '40', vivid: true }),
  c('color-accent-cool-darker', '#07648d', 'color-accent-cool', { family: 'blue-cool', grade: '60', vivid: true }),
  c('color-accent-cool-hover', '#28a0cb', 'color-accent-cool'),
  c('color-accent-cool-active', '#07648d', 'color-accent-cool'),

  c('color-accent-warm', '#fa9441', null, { family: 'orange', grade: '30', vivid: true }),
  c('color-accent-warm-lighter', '#f2e4d4', 'color-accent-warm', { family: 'orange', grade: '10' }),
  c('color-accent-warm-light', '#ffbc78', 'color-accent-warm', { family: 'orange', grade: '20', vivid: true }),
  c('color-accent-warm-dark', '#c05600', 'color-accent-warm', { family: 'orange', grade: '50', vivid: true }),
  c('color-accent-warm-darker', '#775540', 'color-accent-warm', { family: 'orange', grade: '60' }),
  c('color-accent-warm-hover', '#c05600', 'color-accent-warm'),
  c('color-accent-warm-active', '#775540', 'color-accent-warm'),

  c('color-base', '#71767a', null, { family: 'gray-cool', grade: '50' }),
  c('color-base-lightest', '#f0f0f0', 'color-base', { family: 'gray', grade: '5' }),
  c('color-base-lighter', '#dfe1e2', 'color-base', { family: 'gray-cool', grade: '10' }),
  c('color-base-light', '#a9aeb1', 'color-base', { family: 'gray-cool', grade: '30' }),
  c('color-base-dark', '#565c65', 'color-base', { family: 'gray-cool', grade: '60' }),
  c('color-base-darker', '#3d4551', 'color-base', { family: 'gray-cool', grade: '70' }),
  c('color-base-darkest', '#1b1b1b', 'color-base', { family: 'gray', grade: '90' }),
  c('color-base-ink', '#1b1b1b', 'color-base', { family: 'gray', grade: '90' }),
  c('color-base-hover', '#565c65', 'color-base'),
  c('color-base-active', '#1b1b1b', 'color-base'),

  c('color-info', '#00bde3', null, { family: 'cyan', grade: '30', vivid: true }),
  c('color-info-lighter', '#e7f6f8', 'color-info', { family: 'cyan', grade: '5' }),
  c('color-info-light', '#99deea', 'color-info', { family: 'cyan', grade: '20' }),
  c('color-info-dark', '#009ec1', 'color-info', { family: 'cyan', grade: '40', vivid: true }),
  c('color-info-darker', '#2e6276', 'color-info', { family: 'blue-cool', grade: '60' }),

  c('color-warning', '#ffbe2e', null, { family: 'gold', grade: '20', vivid: true }),
  c('color-warning-lighter', '#faf3d1', 'color-warning', { family: 'yellow', grade: '5' }),
  c('color-warning-light', '#fee685', 'color-warning', { family: 'yellow', grade: '10', vivid: true }),
  c('color-warning-dark', '#e5a000', 'color-warning', { family: 'gold', grade: '30', vivid: true }),
  c('color-warning-darker', '#936f38', 'color-warning', { family: 'gold', grade: '50', vivid: true }),

  c('color-success', '#00a91c', null, { family: 'green-cool', grade: '40', vivid: true }),
  c('color-success-lighter', '#ecf3ec', 'color-success', { family: 'green-cool', grade: '5' }),
  c('color-success-light', '#70e17b', 'color-success', { family: 'green-cool', grade: '20', vivid: true }),
  c('color-success-dark', '#008817', 'color-success', { family: 'green-cool', grade: '50', vivid: true }),
  c('color-success-darker', '#216e1f', 'color-success', { family: 'green-cool', grade: '60', vivid: true }),

  c('color-error', '#d54309', null, { family: 'red-warm', grade: '50', vivid: true }),
  c('color-error-lighter', '#f4e3db', 'color-error', { family: 'red-warm', grade: '10' }),
  c('color-error-light', '#f39268', 'color-error', { family: 'red-warm', grade: '30', vivid: true }),
  c('color-error-dark', '#b50909', 'color-error', { family: 'red', grade: '60', vivid: true }),
  c('color-error-darker', '#6f3331', 'color-error', { family: 'red', grade: '70' }),

  c('color-emergency', '#9c3d10', null, { family: 'red-warm', grade: '60', vivid: true }),
  c('color-emergency-dark', '#332d29', 'color-emergency', { family: 'red-warm', grade: '80' }),

  // USWDS state color with no default USX theme role until now — added to
  // complete parity with designsystem.digital.gov/design-tokens/color/state-tokens.
  c('color-disabled', '#757575', null, { family: 'gray', grade: '50' }),
  c('color-disabled-lighter', '#c9c9c9', 'color-disabled', { family: 'gray', grade: '20' }),
  c('color-disabled-light', '#919191', 'color-disabled', { family: 'gray', grade: '40' }),
  c('color-disabled-dark', '#454545', 'color-disabled', { family: 'gray', grade: '70' }),
  c('color-disabled-darker', '#1b1b1b', 'color-disabled', { family: 'gray', grade: '90' }),

  // Surface abstraction: components chain to these three roles — not
  // directly to color-light/color-base-lightest/color-base-lighter — so a
  // dark theme can repoint them freely without the confusing "lightest is
  // actually the darkest surface" naming a raw USWDS base-tier alias would
  // create. No `derivedFrom`: unlike shade scales, a dark preset's surface-2
  // isn't a computed tint of surface-1, it's an independent value.
  //   surface-1 — white/chrome surfaces (header, nav)
  //   surface-2 — small surfaces (footer secondary section, task-list hover,
  //               callouts)
  //   surface-3 — page background (footer primary section, carousel media)
  // Default values match the real USWDS base-family tiers they replace, so
  // the Default theme is pixel-identical to plain USWDS.
  c('surface-1', '#ffffff'),
  c('surface-2', '#dfe1e2'),
  c('surface-3', '#f0f0f0'),

  // Shared border color: checkbox/radio tiles, task-list item dividers,
  // sidenav item dividers, and the default (overridable) for header/footer
  // section dividers all chain to this via their own usx-*-border-color hook.
  c('color-border', '#c9c9c9', 'color-base-lighter'),
  c('color-dark-bg', '#1b1b1b'),
  c('color-dark-bg-darker', '#000000', 'color-dark-bg'),
  c('color-dark-bg-lighter', '#3d4551', 'color-dark-bg'),

  c('color-beta', '#2e8540'),
  c('color-test', '#7800af'),
  c('color-dev', '#ee9a2d'),

  // ── Text colors ───────────────────────────────────────────────────────────
  c('color-text', '#1b1b1b'),
  c('color-light-text', '#ffffff'),
  c('color-text-base', '#71767a'),

  // Text abstraction: components chain to these three roles — not directly
  // to color-text/color-text-base/color-light-text — mirroring the
  // surface-1/surface-2/surface-3 pattern above, so a dark theme can flip
  // ink colors without fighting a token literally named "light-text" when
  // the surface it sits on isn't necessarily light. No `derivedFrom`: these
  // are independent roles, not computed tints.
  //   text          — primary body/ink color
  //   text-subtle   — secondary/muted text (secondary links, attributions,
  //                   step-indicator pending labels, eyebrows, etc.)
  //   text-inverse  — text drawn on a surface that's the opposite polarity
  //                   of the theme's main surfaces (e.g. a colored button,
  //                   or a banner/dropdown panel that stays dark even under
  //                   a light theme)
  c('text', '#1b1b1b'),
  c('text-subtle', '#71767a'),
  c('text-inverse', '#ffffff'),

  // ── Spacing ───────────────────────────────────────────────────────────────
  scale('spacing-xs', '--usx-spacing-xs', '0.25rem', 'spacing'),
  scale('spacing-sm', '--usx-spacing-sm', '0.5rem', 'spacing'),
  scale('spacing-md', '--usx-spacing-md', '1rem', 'spacing'),
  scale('spacing-lg', '--usx-spacing-lg', '1.5rem', 'spacing'),
  scale('spacing-xl', '--usx-spacing-xl', '2rem', 'spacing'),

  // ── Radius ────────────────────────────────────────────────────────────────
  // Semantic radii — components pick a radius by group (DaisyUI-style).
  scale('radius-box', '--usx-radius-box', '1rem', 'radius'),
  scale('radius-field', '--usx-radius-field', '0.5rem', 'radius'),
  scale('radius-selector', '--usx-radius-selector', '2px', 'radius'),
  scale('radius-none', '--usx-radius-none', '0', 'radius'),
  // Primitives — reserved for utility classes.
  scale('r-sm', '--usx-radius-sm', '0.25rem', 'radius'),
  scale('r-md', '--usx-radius-md', '0.5rem', 'radius'),
  scale('r-lg', '--usx-radius-lg', '1rem', 'radius'),
  scale('r-xl', '--usx-radius-xl', '2rem', 'radius'),
  scale('r-full', '--usx-radius-full', '100%', 'radius'),

  // ── Advanced radius — per-component overrides, defaulting to the group var ─
  scale('usx-accordion-radius', '--usx-accordion-radius', 'var(--usx-radius-none)', 'radius-advanced'),
  scale('usx-alert-radius', '--usx-alert-radius', 'var(--usx-radius-none)', 'radius-advanced'),
  scale('usx-button-radius', '--usx-button-radius', 'var(--usx-radius-field)', 'radius-advanced'),
  scale('usx-input-radius', '--usx-input-radius', 'var(--usx-radius-field)', 'radius-advanced'),
  scale('usx-textarea-radius', '--usx-textarea-radius', 'var(--usx-radius-field)', 'radius-advanced'),
  scale('usx-code-radius', '--usx-code-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-summary-box-radius', '--usx-summary-box-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-hero-callout-radius', '--usx-hero-callout-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-image-radius', '--usx-image-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-tag-radius', '--usx-tag-radius', 'var(--usx-radius-selector)', 'radius-advanced'),
  scale('usx-checkbox-radius', '--usx-checkbox-radius', 'var(--usx-radius-selector)', 'radius-advanced'),
  scale('usx-tile-radius', '--usx-tile-radius', '0.25rem', 'radius-advanced'),
  scale('usx-misc-banner-badge-radius', '--usx-misc-banner-badge-radius', '6px', 'radius-advanced'),

  // ── Border widths ─────────────────────────────────────────────────────────
  scale('border-width-thin', '--usx-border-width-thin', '1px', 'border'),
  scale('border-width-thick', '--usx-border-width-thick', '4px', 'border'),

  // ── Typography ────────────────────────────────────────────────────────────
  scale('typography-fontFamilyBase', '--usx-typography-font-family-base',
    'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    'typography', 'font-family'),
  scale('typography-fontSizeBase', '--usx-typography-font-size-base', '1rem', 'typography'),
  scale('typography-fontWeightRegular', '--usx-typography-font-weight-regular', '400', 'typography', 'number'),
  scale('typography-fontWeightBold', '--usx-typography-font-weight-bold', '700', 'typography', 'number'),
  scale('typography-lineHeightBase', '--usx-typography-line-height-base', '1.5', 'typography', 'number'),

  // ── Component tokens (hardcoded-hex promotions) ───────────────────────────
  component('usx-link-color', '#005ea2', 'color-primary'),
  component('usx-link-visited-color', '#54278f'),
  // USWDS swaps link/visited color to a light neutral on a dark background
  // (`.usa-dark-background`) instead of the illegible blue/purple defaults;
  // no existing primitive matches this exact shade, so it gets its own token.
  component('usx-link-color-dark', '#e6e6e6'),
  component('usx-link-visited-color-dark', '#e6e6e6'),
  component('usx-summary-box-link-visited-color', '#54278f'),
  // No existing color primitive matches USWDS's summary-box "info" tint, so
  // these get their own dedicated defaults (kept in sync with real USWDS
  // output) rather than being forced to a shared primitive.
  component('usx-summary-box-background-color', '#e7f6f8'),
  component('usx-summary-box-border-color', '#99deea'),
  component('usx-accordion-accent-color', '#f0f0f0', 'color-base-lightest'),
  component('usx-accordion-content-background', '#ffffff', 'color-light'),
  component('usx-banner-after-color', '#005ea2', 'color-primary'),
  component('usx-carousel-dot-color', '#c0c0c0'),
  component('usx-carousel-dot-color-hover', '#a0a0a0', 'usx-carousel-dot-color'),
  component('usx-carousel-dot-color-active', '#808080', 'usx-carousel-dot-color'),
  component('usx-carousel-focus-outline-color', '#2491ff'),
  // Follows usx-link-color by default (a `var()` reference, like the
  // radius-advanced tokens default to `var(--usx-radius-none)`) unless its
  // own custom property is explicitly overridden.
  component('usx-task-list-link-color', 'var(--usx-link-color)'),
  component('usx-clickable-focus-outline-color', '#2491ff'),
  component('usx-clickable-hover-color', '#005ea2'),
  component('usx-misc-banner-focus-outline-color', '#9bdaf1'),
  // Per-component overrides of the shared color-border token (see above).
  component('usx-tile-border-color', 'var(--usx-color-border)'),
  component('usx-task-list-border-color', 'var(--usx-color-border)'),
  component('usx-sidenav-hover-color', 'var(--usx-surface-2)'),
  component('usx-sidenav-border-color', 'var(--usx-color-border)'),
  component('usx-header-border-color', 'var(--usx-color-border)'),
  component('usx-footer-border-color', 'var(--usx-color-border)'),
  { name: 'usx-table-selected-bg', cssVar: '--usx-table-selected-bg', defaultValue: '#e7f0fa', group: 'component', type: 'color' },
  { name: 'usx-table-hover-bg', cssVar: '--usx-table-hover-bg', defaultValue: '#73b3e7', group: 'component', type: 'color', derivedFrom: 'color-primary' },
  // Real USWDS bakes the tooltip's background/font color as fixed values at
  // its own build time, so it never followed our theme. Defaults mirror
  // color-base-darkest/text-inverse (see _variables.scss) — a stable,
  // theme-invariant dark neutral (not the per-preset brand-tinted
  // color-dark-bg used by hero/banner) with light text on it.
  component('usx-tooltip-background-color', '#1b1b1b', 'color-base-darkest'),
  component('usx-tooltip-text-color', '#ffffff', 'text-inverse'),
  // Real USWDS only colors icon-list icons via opt-in BEM modifier classes;
  // give it a themeable default (color-primary) instead.
  component('usx-icon-list-icon-color', '#005ea2', 'color-primary')
];

export default themeManifest;
