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
//                  border-advanced | typography | typography-advanced |
//                  component.
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

const setting = (name, defaultValue, internal = false) => ({
  name,
  cssVar: `--${name}`,
  defaultValue,
  group: 'component',
  type: 'string',
  ...(internal ? { internal: true } : {})
});

// Default values below mirror the USWDS default theme color tokens
// (https://designsystem.digital.gov/design-tokens/color/theme-tokens/ and
// .../state-tokens/) so the "Default" theme matches USWDS out of the box.
export const themeManifest = [
  // ── Color primitives ──────────────────────────────────────────────────────


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
  c('color-primary-hover', 'var(--usx-color-primary-dark)', 'color-primary'),
  c('color-primary-active', 'var(--usx-color-primary-darker)', 'color-primary'),

  c('color-secondary', '#d83933', null, { family: 'red', grade: '50' }),
  c('color-secondary-lighter', '#f3e1e4', 'color-secondary', { family: 'red-cool', grade: '10' }),
  c('color-secondary-light', '#f2938c', 'color-secondary', { family: 'red', grade: '30' }),
  c('color-secondary-vivid', '#e41d3d', 'color-secondary', { family: 'red-cool', grade: '50', vivid: true }),
  c('color-secondary-dark', '#b50909', 'color-secondary', { family: 'red', grade: '60', vivid: true }),
  c('color-secondary-darker', '#8b0a03', 'color-secondary', { family: 'red', grade: '70', vivid: true }),
  c('color-secondary-hover', 'var(--usx-color-secondary-dark)', 'color-secondary'),
  c('color-secondary-active', 'var(--usx-color-secondary-darker)', 'color-secondary'),

  c('color-accent-cool', '#00bde3', null, { family: 'cyan', grade: '30', vivid: true }),
  c('color-accent-cool-lighter', '#e1f3f8', 'color-accent-cool', { family: 'blue-cool', grade: '5', vivid: true }),
  c('color-accent-cool-light', '#97d4ea', 'color-accent-cool', { family: 'blue-cool', grade: '20', vivid: true }),
  c('color-accent-cool-dark', '#28a0cb', 'color-accent-cool', { family: 'blue-cool', grade: '40', vivid: true }),
  c('color-accent-cool-darker', '#07648d', 'color-accent-cool', { family: 'blue-cool', grade: '60', vivid: true }),
  c('color-accent-cool-hover', 'var(--usx-color-accent-cool-dark)', 'color-accent-cool'),
  c('color-accent-cool-active', 'var(--usx-color-accent-cool-darker)', 'color-accent-cool'),

  c('color-accent-warm', '#fa9441', null, { family: 'orange', grade: '30', vivid: true }),
  c('color-accent-warm-lighter', '#f2e4d4', 'color-accent-warm', { family: 'orange', grade: '10' }),
  c('color-accent-warm-light', '#ffbc78', 'color-accent-warm', { family: 'orange', grade: '20', vivid: true }),
  c('color-accent-warm-dark', '#c05600', 'color-accent-warm', { family: 'orange', grade: '50', vivid: true }),
  c('color-accent-warm-darker', '#775540', 'color-accent-warm', { family: 'orange', grade: '60' }),
  c('color-accent-warm-hover', 'var(--usx-color-accent-warm-dark)', 'color-accent-warm'),
  c('color-accent-warm-active', 'var(--usx-color-accent-warm-darker)', 'color-accent-warm'),

  c('color-base', '#71767a', null, { family: 'gray-cool', grade: '50' }),
  c('color-base-lightest', '#f0f0f0', 'color-base', { family: 'gray', grade: '5' }),
  c('color-base-lighter', '#dfe1e2', 'color-base', { family: 'gray-cool', grade: '10' }),
  c('color-base-light', '#a9aeb1', 'color-base', { family: 'gray-cool', grade: '30' }),
  c('color-base-dark', '#565c65', 'color-base', { family: 'gray-cool', grade: '60' }),
  c('color-base-darker', '#3d4551', 'color-base', { family: 'gray-cool', grade: '70' }),
  c('color-base-darkest', '#1b1b1b', 'color-base', { family: 'gray', grade: '90' }),
  c('color-base-ink', '#1b1b1b', 'color-base', { family: 'gray', grade: '90' }),
  c('color-base-hover', 'var(--usx-color-base-dark)', 'color-base'),
  c('color-base-active', 'var(--usx-color-base-darker)', 'color-base'),

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

  // USWDS's own default focus-outline color (`.usa-focus`, native form
  // controls, etc.) — surfaced as a real state token so it can be
  // overridden in one place instead of only per-component.
  c('color-focus', '#2491ff', null, { family: 'blue', grade: '40', vivid: true }),
  // Was only a link-component token (usx-link-visited-color); surfaced here
  // so any component can chain to it, same as the other state colors.
  c('color-visited', '#54278f', null, { family: 'violet', grade: '70', vivid: true }),

  // Surface abstraction: components chain to these three roles — not
  // directly to color-light/color-base-lightest/color-base-lighter — so a
  // dark theme can repoint them freely without the confusing "lightest is
  // actually the darkest surface" naming a raw USWDS base-tier alias would
  // create. No `derivedFrom`: unlike shade scales, a dark preset's surface-2
  // isn't a computed tint of surface-1, it's an independent value.
  //   surface-1 — the largest surfaces (page/main content background)
  //   surface-2 — table headers, accordion button, callouts, footer primary
  //               section, banner, task-list hover
  //   surface-3 — header/primary nav (default empty — see
  //               usx-header-background-color/usx-nav-background-color
  //               below), table grouped rows, footer secondary section,
  //               carousel media
  // Default values match the real USWDS base-family tiers they replace, so
  // the Default theme is pixel-identical to plain USWDS.
  c('surface-1', '#ffffff'),
  c('surface-2', '#e6e6e6'),
  c('surface-3', '#f0f0f0'),

  // Shared border color: checkbox/radio tiles, task-list item dividers,
  // sidenav item dividers, and the default (overridable) for header/footer
  // section dividers all chain to this via their own usx-*-border-color hook.
  c('color-border', '#c9c9c9', 'color-base-lighter'),

  c('color-beta', '#2e8540'),
  c('color-test', '#7800af'),
  c('color-dev', '#ee9a2d'),

  // ── Text colors ───────────────────────────────────────────────────────────

  // Text abstraction: components chain to these four roles, mirroring the
  // surface-1/surface-2/surface-3 pattern above, so a dark theme can flip
  // ink colors without fighting a token literally named "light-text" when
  // the surface it sits on isn't necessarily light. No `derivedFrom`: these
  // are independent roles, not computed tints. Along with surface-1/2/3 and
  // the theme/state color families, these are the only tokens needed to
  // build background and text colors anywhere in USX — there is no separate
  // raw text-color primitive tier.
  //   text-ink      — primary body/ink color
  //   text-muted    — real USWDS bakes several nav/stepper text colors to
  //                   its "base-dark" gray (#565c65) at build time — darker
  //                   than text-subtle (nav primary links/buttons, sidenav
  //                   links, step-indicator pending labels & counters)
  //   text-subtle   — secondary/muted text (secondary links, attributions,
  //                   eyebrows, etc.)
  //   text-inverse  — text drawn on a surface that's the opposite polarity
  //                   of the theme's main surfaces (e.g. a colored button,
  //                   or a banner/dropdown panel that stays dark even under
  //                   a light theme)
  c('text-ink', '#1b1b1b'),
  c('text-muted', '#565c65'),
  c('text-subtle', '#71767a'),
  c('text-inverse', '#ffffff'),

  // ── Spacing ───────────────────────────────────────────────────────────────
  scale('spacing-xs', '--usx-spacing-xs', '0.25rem', 'spacing'),
  scale('spacing-sm', '--usx-spacing-sm', '0.5rem', 'spacing'),
  scale('spacing-md', '--usx-spacing-md', '1rem', 'spacing'),
  scale('spacing-lg', '--usx-spacing-lg', '1.5rem', 'spacing'),
  scale('spacing-xl', '--usx-spacing-xl', '2rem', 'spacing'),

  // ── Radius ────────────────────────────────────────────────────────────────
  // Primitives — reserved for utility classes.
  scale('radius-sm', '--usx-radius-sm', '0.25rem', 'radius'),
  scale('radius-md', '--usx-radius-md', '0.5rem', 'radius'),
  scale('radius-lg', '--usx-radius-lg', '1rem', 'radius'),
  scale('radius-xl', '--usx-radius-xl', '2rem', 'radius'),
  scale('radius-full', '--usx-radius-full', '100%', 'radius'),

  // Semantic radii — components pick a radius by group (DaisyUI-style).
  scale('radius-box', '--usx-radius-box', '1rem', 'radius'),
  scale('radius-field', '--usx-radius-field', '0', 'radius'),
  scale('radius-button', '--usx-radius-button', '0.25rem', 'radius'),
  scale('radius-selector', '--usx-radius-selector', '2px', 'radius'),
  scale('radius-none', '--usx-radius-none', '0', 'radius'),

  // ── Advanced radius — per-component overrides, defaulting to the group var ─
  scale('usx-accordion-radius', '--usx-accordion-radius', 'var(--usx-radius-none)', 'radius-advanced'),
  scale('usx-alert-radius', '--usx-alert-radius', 'var(--usx-radius-none)', 'radius-advanced'),
  scale('usx-input-radius', '--usx-input-radius', 'var(--usx-radius-field)', 'radius-advanced'),
  scale('usx-textarea-radius', '--usx-textarea-radius', 'var(--usx-radius-field)', 'radius-advanced'),
  scale('usx-code-radius', '--usx-code-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-summary-box-radius', '--usx-summary-box-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-hero-callout-radius', '--usx-hero-callout-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-image-radius', '--usx-image-radius', 'var(--usx-radius-box)', 'radius-advanced'),
  scale('usx-tag-radius', '--usx-tag-radius', 'var(--usx-radius-selector)', 'radius-advanced'),
  scale('usx-checkable-radius', '--usx-checkable-radius', 'var(--usx-radius-selector)', 'radius-advanced'),
  scale('usx-checkable-tile-radius', '--usx-checkable-tile-radius', '0.25rem', 'radius-advanced'),
  scale('usx-misc-banner-badge-radius', '--usx-misc-banner-badge-radius', '6px', 'radius-advanced'),

  // ── Border widths ─────────────────────────────────────────────────────────
  scale('border-width-sm', '--usx-border-width-sm', '1px', 'border'),
  scale('border-width-md', '--usx-border-width-md', '2px', 'border'),
  scale('border-width-lg', '--usx-border-width-lg', '0.25rem', 'border'),
  scale('border-width-xl', '--usx-border-width-xl', '0.5rem', 'border'),
  scale('border-width-inputs', '--usx-border-width-inputs', 'var(--usx-border-width-sm)', 'border'),

  // ── Advanced border — per-component overrides, defaulting to a shared width ─
  scale('usx-task-list-inner-border-width', '--usx-task-list-inner-border-width', 'var(--usx-border-width-sm)', 'border-advanced'),
  scale('usx-task-list-outer-border-width', '--usx-task-list-outer-border-width', 'var(--usx-border-width-md)', 'border-advanced'),
  scale('usx-step-indicator-segment-bar-width', '--usx-step-indicator-segment-bar-width', 'var(--usx-border-width-xl)', 'border-advanced'),
  scale('usx-accordion-border-width', '--usx-accordion-border-width', 'var(--usx-border-width-lg)', 'border-advanced'),
  scale('usx-button-outline-border-width', '--usx-button-outline-border-width', 'var(--usx-border-width-md)', 'border-advanced'),
  scale('usx-switch-border-width', '--usx-switch-border-width', '2px', 'border-advanced'),
  scale('usx-file-input-border-width', '--usx-file-input-border-width', 'var(--usx-border-width-inputs)', 'border-advanced'),
  scale('usx-file-input-item-border-width', '--usx-file-input-item-border-width', 'var(--usx-border-width-sm)', 'border-advanced'),
  scale('usx-range-slider-border-width', '--usx-range-slider-border-width', 'var(--usx-border-width-md)', 'border-advanced'),

  // ── Typography ────────────────────────────────────────────────────────────
  // Font stack matches the actual family baked into the precompiled USWDS
  // bundle (Source Sans Pro Web) so the default theme causes zero visual
  // drift.
  scale('font-family', '--usx-font-family',
    'Source Sans Pro Web, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif',
    'typography', 'font-family'),
  // Chains to font-family by default — see _variables.scss.
  scale('font-family-heading', '--usx-font-family-heading', 'var(--usx-font-family)',
    'typography', 'font-family'),
  scale('font-size-base', '--usx-font-size-base', '1rem', 'typography'),
  scale('font-size-h1', '--usx-font-size-h1', '2.5rem', 'typography'),
  scale('font-size-h2', '--usx-font-size-h2', '2rem', 'typography'),
  scale('font-size-h3', '--usx-font-size-h3', '1.75rem', 'typography'),
  scale('font-size-h4', '--usx-font-size-h4', '1.5rem', 'typography'),
  scale('font-size-h5', '--usx-font-size-h5', '1.25rem', 'typography'),
  scale('font-size-h6', '--usx-font-size-h6', '1rem', 'typography'),
  scale('font-weight-regular', '--usx-font-weight-regular', '400', 'typography', 'number'),
  scale('font-weight-bold', '--usx-font-weight-bold', '700', 'typography', 'number'),
  scale('line-height-base', '--usx-line-height-base', '1.5', 'typography', 'number'),
  scale('line-height-heading', '--usx-line-height-heading', '1.2', 'typography', 'number'),

  // ── Typography — component overrides (hardcoded-value promotions) ────────
  // One-off font-size/weight/line-height values that don't fit the shared
  // base/heading scale, promoted from hardcoded component SCSS literals to
  // real runtime-themeable tokens, same pattern as radius-advanced.
  scale('usx-attribution-primary-font-weight', '--usx-attribution-primary-font-weight', '600', 'typography-advanced', 'number'),
  scale('usx-attribution-secondary-font-size', '--usx-attribution-secondary-font-size', '0.875rem', 'typography-advanced'),
  scale('usx-avatar-content-font-weight', '--usx-avatar-content-font-weight', '600', 'typography-advanced', 'number'),
  scale('usx-avatar-font-size-sm', '--usx-avatar-font-size-sm', '0.875rem', 'typography-advanced'),
  scale('usx-avatar-font-size-lg', '--usx-avatar-font-size-lg', '1.25rem', 'typography-advanced'),
  scale('usx-avatar-font-size-xl', '--usx-avatar-font-size-xl', '1.5rem', 'typography-advanced'),
  scale('usx-calendar-date-font-size', '--usx-calendar-date-font-size', '1.13rem', 'typography-advanced'),
  scale('usx-code-font-size', '--usx-code-font-size', '0.875rem', 'typography-advanced'),
  scale('usx-misc-banner-font-size', '--usx-misc-banner-font-size', '1.07rem', 'typography-advanced'),
  scale('usx-modal-heading-font-size', '--usx-modal-heading-font-size', '1.34rem', 'typography-advanced'),
  scale('usx-tag-line-height', '--usx-tag-line-height', '1.6', 'typography-advanced', 'number'),
  scale('usx-task-list-link-font-size', '--usx-task-list-link-font-size', '1.31rem', 'typography-advanced'),

  // ── Component tokens (hardcoded-hex promotions) ───────────────────────────
  component('usx-link-text', '#005ea2', 'color-primary'),
  component('usx-link-text-visited', 'var(--usx-color-visited)'),
  // USWDS swaps link/visited color to a light neutral on a dark background
  // (`.usa-dark-background`) instead of the illegible blue/purple defaults;
  // no existing primitive matches this exact shade, so it gets its own token.
  component('usx-link-text-dark', '#e6e6e6'),
  component('usx-link-text-visited-dark', '#e6e6e6'),
  component('usx-summary-box-link-text-visited', 'var(--usx-color-visited)'),
  // USWDS's summary-box "info" tint (background "info-lighter"/cyan-5,
  // border "info-light"/cyan-20) matches our color-info-lighter/
  // color-info-light primitives exactly, so chain to those (like
  // usx-alert-info-background-color does) instead of a standalone duplicate.
  component('usx-summary-box-bg', '#e7f6f8', 'color-info-lighter'),
  component('usx-summary-box-border-color', '#99deea', 'color-info-light'),
  component('usx-summary-box-text', '#1b1b1b', 'text-ink'),
  component('usx-summary-box-link-text', '#005ea2', 'color-primary'),
  component('usx-summary-box-link-text-hover', '#1a4480', 'color-primary-dark'),
  component('usx-accordion-bg', '#f0f0f0', 'surface-2'),
  component('usx-accordion-bg-hover', '#e6e6e6', 'surface-3'),
  component('usx-accordion-content-bg', '#ffffff', 'surface-1'),
  component('usx-accordion-text', 'var(--usx-text-ink)'),
  component('usx-accordion-content-text', 'var(--usx-text-ink)'),
  setting('usx-accordion-icon-position', '1.25rem auto'),
  setting('usx-accordion-icon-padding-start', '3.5rem', true),
  setting('usx-accordion-icon-padding-end', '1.25rem', true),
  // Branding logo swap. A CSS variable can't rewrite an <img> src, so the
  // theme toggles which of the two supplied variants is displayed instead.
  setting('usx-logo-display', 'block'),
  setting('usx-logo-inverse-display', 'none', true),
  // USWDS defaults: background "base-lightest" (-> surface-2), auto-contrast
  // text (-> text), action link/chevron following the shared link color.
  component('usx-banner-bg', '#dfe1e2', 'surface-2'),
  component('usx-banner-text', '#1b1b1b', 'text-ink'),
  component('usx-banner-button-text', '#005ea2', 'usx-link-text'),
  component('usx-banner-chevron-text', '#005ea2', 'color-primary'),
  component('usx-carousel-dot-bg', '#c0c0c0'),
  component('usx-carousel-dot-bg-hover', '#a0a0a0', 'usx-carousel-dot-bg'),
  component('usx-carousel-dot-bg-active', '#808080', 'usx-carousel-dot-bg'),
  component('usx-carousel-focus', 'var(--usx-color-focus)'),
  // Real USWDS ships the step-indicator's CSS precompiled — these two get
  // their own hooks (unlike the plain $color-primary-dark/-darker aliases
  // in _variables.scss) so the --counters variant's ring/gap colors are
  // independently overridable from the general surface/border roles.
  component('usx-step-indicator-bg', 'var(--usx-surface-1)'),
  component('usx-step-indicator-segment-pending-border', 'var(--usx-color-base-light)'),
  // Follows usx-link-color by default (a `var()` reference, like the
  // radius-advanced tokens default to `var(--usx-radius-none)`) unless its
  // own custom property is explicitly overridden.
  component('usx-task-list-link-text', 'var(--usx-link-text)'),
  component('usx-clickable-focus', 'var(--usx-color-focus)'),
  component('usx-clickable-text-hover', '#005ea2'),
  component('usx-misc-banner-focus', '#9bdaf1'),
  // Per-component overrides of the shared color-border token (see above).
  component('usx-checkable-tile-border', 'var(--usx-color-border)'),
  component('usx-task-list-border', 'var(--usx-color-border)'),
  component('usx-file-input-border', 'var(--usx-color-border)'),
  component('usx-file-input-item-border', 'var(--usx-color-border)'),
  // USWDS bakes the "N files selected" heading and each preview row to a
  // fixed "primary-lighter" callout background (with default body text),
  // regardless of theme — same callout role as usx-accordion-bg/
  // usx-banner-bg, so it chains to the same surface-2/text roles.
  component('usx-file-input-preview-bg', '#d9e8f6', 'surface-2'),
  component('usx-file-input-preview-text', '#1b1b1b', 'text-ink'),
  component('usx-task-list-bg-hover', 'var(--usx-surface-2)'),
  // Shared by both checkbox and radio unchecked ::before styling.
  component('usx-checkable-bg', 'var(--usx-surface-1)'),
  component('usx-checkable-border', 'var(--usx-text-ink)'),
  component('usx-sidenav-bg-hover', 'var(--usx-surface-2)'),
  component('usx-sidenav-border', 'var(--usx-color-border)'),
  // Unlike tile/selector/sidenav (which have a visible border in USWDS by
  // default), real USWDS renders .usa-header/.usa-footer with NO border at
  // all by default, so these must stay invisible until a consumer opts in,
  // rather than chaining to color-border's visible gray.
  component('usx-header-border', 'transparent'),
  // Same reasoning as the borders above: real USWDS renders .usa-header
  // with no explicit background at all (just the ambient page background),
  // so this stays transparent by default; the Sass fallback chains to
  // surface-3 for consumers/presets that opt into a themed shell.
  component('usx-header-bg', 'transparent'),
  // Chains to $text at the Sass level (see _variables.scss), so unthemed
  // output just inherits the ambient ink color; a theme with a dark/colored
  // header can override this independently to var(--usx-text-inverse).
  component('usx-header-text', 'var(--usx-text-ink)'),
  // Unlike the header, real USWDS's mobile nav IS an opaque white off-canvas
  // drawer (not "no background") — default to that explicitly rather than
  // transparent, or the drawer becomes see-through until a theme opts in.
  component('usx-header-nav-bg', '#ffffff'),
  // Independent mobile-drawer override; defaults the same as desktop so
  // Default's mobile drawer stays opaque white unless a theme opts in.
  component('usx-header-nav-bg-mobile', '#ffffff'),
  // Chains to $text-muted at the Sass level, matching real USWDS's baked-in
  // nav/link gray; own hook so a theme with a dark/branded nav surface can
  // override it independently (see usx-header-text above).
  component('usx-header-nav-link-text', 'var(--usx-text-muted)'),
  // Independent drawer override — the off-canvas mobile menu is a visually
  // distinct surface from the desktop nav bar.
  component('usx-header-nav-link-text-mobile', 'var(--usx-header-nav-link-text)'),
  component('usx-header-nav-link-text-hover', 'var(--usx-color-primary)'),
  component('usx-header-nav-link-text-hover-mobile', 'var(--usx-header-nav-link-text-hover)'),
  // Chains to $text-subtle at the Sass level; own hook for the same reason
  // as usx-nav-link-color above.
  component('usx-header-secondary-link-text', 'var(--usx-text-subtle)'),
  component('usx-header-secondary-link-text-hover', 'var(--usx-color-primary)'),
  // Vendor hardcodes #f0f0f0 for nav link/button hover (mobile only) — track
  // surface-2 so it stays distinct from the surface-3 drawer/header once a
  // theme is active.
  component('usx-header-nav-link-bg-hover', 'var(--usx-surface-2)'),
  component('usx-header-nav-top-border', 'var(--usx-color-border)'),
  component('usx-header-nav-bottom-border', 'transparent'),
  component('usx-footer-border', 'transparent'),
  component('usx-footer-primary-section-border', 'transparent'),
  component('usx-footer-secondary-section-border', 'transparent'),
  // Independent footer text/link/heading hooks — same rationale as the
  // header text/nav-link hooks above: a theme whose footer secondary
  // section sits on a drastically different surface (e.g. NASA's black
  // surface-3) needs to override these without affecting the ambient
  // text/color-primary roles used elsewhere.
  component('usx-footer-text', 'var(--usx-text-ink)'),
  component('usx-footer-link-text', 'var(--usx-color-primary)'),
  component('usx-footer-link-text-hover', 'var(--usx-color-primary-dark)'),
  component('usx-footer-secondary-link-text', 'var(--usx-color-primary)'),
  component('usx-footer-secondary-link-text-hover', 'var(--usx-color-primary-dark)'),
  component('usx-footer-heading-text', 'var(--usx-text-ink)'),
  // Secondary-section headings (logo/contact) chain to the primary heading
  // color by default but can be overridden independently since they sit on
  // usx-footer-secondary-bg-color rather than usx-footer-primary-bg-color.
  component('usx-footer-heading-secondary-text', 'var(--usx-footer-heading-text)'),
  // Page chains its own background to surface-1 (some patterns render
  // <Page> without a <Layout> ancestor to paint it); Section has no such
  // fallback role and stays transparent, always nested in a Page/Layout
  // that already paints the surface. Text on both chains live to usx-text
  // so headings/copy stay legible instead of getting stuck on real USWDS's
  // static, non-themeable body text color.
  component('usx-page-bg', 'var(--usx-surface-1)'),
  component('usx-page-text', 'var(--usx-text-ink)'),
  component('usx-section-bg', 'transparent'),
  component('usx-section-text', 'var(--usx-text-ink)'),
  // Hover/selected row highlights alias the surface-2/surface-3 roles (like
  // usx-sidenav-hover-color above) instead of a color-primary blue tint, so
  // the table's aesthetic stays neutral and in step with the rest of the
  // surface system rather than an unrelated brand-accent highlight.
  component('usx-table-bg-hover', 'var(--usx-surface-2)'),
  component('usx-table-selected-bg', 'var(--usx-surface-3)'),
  // The table's own base cell/header/stripe backgrounds (real USWDS bakes
  // these as static white/base-lighter/base-lightest), aliased to the same
  // surface-1/2/3 roles so the whole table adapts to the theme, not just
  // the hover/selected highlights above.
  component('usx-table-bg', 'var(--usx-surface-1)'),
  component('usx-table-header-bg', 'var(--usx-surface-2)'),
  component('usx-table-stripe-bg', 'var(--usx-surface-3)'),
  // Divider border (footer rule, sticky-first-column shadow line) — same
  // shared color-border role used by header/footer/sidenav/tile dividers.
  component('usx-table-border', 'var(--usx-color-border)'),
  component('usx-table-placeholder-text', 'var(--usx-text-subtle)'),
  component('usx-table-sorted-column-bg', 'var(--usx-color-accent-cool)'),
  component('usx-table-grouped-row-bg', 'var(--usx-surface-3)'),
  component('usx-table-grouped-row-text', 'var(--usx-text-ink)'),
  // Real USWDS bakes the tooltip's background/font color as fixed values at
  // its own build time, so it never followed our theme. Defaults mirror
  // color-base-darkest/text-inverse (see _variables.scss) — a stable,
  // theme-invariant dark neutral (not the per-preset brand-tinted
  // color-dark-bg used by hero/banner) with light text on it.
  component('usx-tooltip-bg', '#1b1b1b', 'color-base-darkest'),
  component('usx-tooltip-text', '#ffffff', 'text-inverse'),
  // Real USWDS only colors icon-list icons via opt-in BEM modifier classes;
  // give it a themeable default (color-primary) instead.
  component('usx-icon-list-icon-text', '#005ea2', 'color-primary'),

  // Real USWDS bakes the date-picker toggle button's calendar icon as a
  // fixed-color background-image at build time, so it never follows the
  // theme; repainted via mask-image instead (see _date-picker.scss).
  component('usx-date-picker-button-icon-color', 'var(--usx-text-ink)'),
  // Hover and active share one token/color by design (see themePresets.js's
  // Midnight/Carbon/Borealis overrides for why dark presets need their own
  // hardcoded value here instead of just chaining to color-base-light).
  component('usx-date-picker-button-hover-active-bg', '#a9aeb1', 'color-base-light'),

  // Real USWDS's compiled CSS hardcodes the combo-box list's selected-option
  // highlight to a literal `color("primary")` (never a runtime var), so it
  // stayed USWDS default blue under every preset. Unlike the range
  // slider/date-picker-icon below, this one IS just the ordinary brand
  // primary color (not a fixed system gray), so it should track the theme —
  // chain it to color-primary instead of leaving it static.
  component('usx-combo-box-selected-bg', '#005ea2', 'color-primary'),

  // Real USWDS bakes the range slider's track/thumb to fixed "base-lightest"/
  // "base-darker" grays regardless of theme. Unlike most components, this
  // one intentionally stays that way — text inputs/selects/textareas also
  // keep a static white surface + gray border under every preset (see
  // $usx-input-bg/-text/-border in _variables.scss, always null), so the
  // range slider matches that same "form controls don't flip surfaces"
  // convention instead of chasing the surface-1/2/3 abstraction.
  component('usx-range-slider-track-bg', '#f0f0f0'),
  component('usx-range-slider-track-border', '#3d4551'),
  component('usx-range-slider-thumb-bg', '#f0f0f0'),
  component('usx-range-slider-thumb-border', '#3d4551'),
  component('usx-range-slider-focus', 'var(--usx-color-focus)'),

  // Real USWDS resolves the in-page-nav card's background/text/link/current/
  // bar colors from compile-time $theme-in-page-nav-* settings (all
  // "default"), so none of them follow a runtime theme override on their
  // own. Chain each role to the same shared tokens already used elsewhere
  // (text, link-text, border, primary) — see _in-page-nav.scss. Background
  // defaults transparent (opts back into a filled surface-2 card only on
  // presets with a dark shell — see themePresets.js/Theme.stories.jsx).
  component('usx-in-page-nav-bg', 'transparent'),
  component('usx-in-page-nav-text', 'var(--usx-text-ink)'),
  component('usx-in-page-nav-border', 'var(--usx-color-border)'),
  component('usx-in-page-nav-link-text', 'var(--usx-link-text)'),
  component('usx-in-page-nav-link-text-hover', 'var(--usx-link-text-hover)'),
  component('usx-in-page-nav-current-text', 'var(--usx-text-ink)'),
  component('usx-in-page-nav-bar', 'var(--usx-color-primary)'),

  // Real USWDS hardcodes breadcrumb text/background to fixed
  // #1b1b1b/#fff regardless of theme (nav/wayfinding element — should
  // theme dynamically, unlike static form controls). Background defaults
  // transparent so it inherits whatever surface it's placed on; text/link
  // chain to the shared text/link tokens.
  component('usx-breadcrumb-bg', 'transparent'),
  component('usx-breadcrumb-text', 'var(--usx-text-ink)'),
  component('usx-breadcrumb-link-text', 'var(--usx-link-text)'),
  component('usx-breadcrumb-link-text-hover', 'var(--usx-link-text-hover)'),
  component('usx-breadcrumb-current-text', 'var(--usx-text-ink)'),

  // Real USWDS hardcodes process-list heading/number-circle text to
  // #1b1b1b and the connecting line + circle border to fixed light-blue/
  // gray-cool literals, none of which follow a runtime theme override.
  component('usx-process-list-heading-text', 'var(--usx-text-ink)'),
  component('usx-process-list-border', '#d9e8f6', 'color-primary'),
  component('usx-process-list-counter-text', 'var(--usx-text-ink)'),
  component('usx-process-list-counter-border', 'var(--usx-text-ink)'),
  component('usx-process-list-counter-ring', 'var(--usx-surface-1)'),

  // Real USWDS never sets a color on collection meta/description — they
  // inherit ambient text (the heading link is already themed via .usx-link).
  component('usx-collection-meta-text', 'var(--usx-text-subtle)'),
  component('usx-collection-description-text', 'var(--usx-text-ink)'),

  // Real USWDS's compiled CSS hardcodes pagination link/button text and the
  // current-page underline to literal `color("primary")`/`color("primary-
  // vivid")` — nav/wayfinding element, should track the theme.
  component('usx-pagination-link-text', 'var(--usx-link-text)'),
  component('usx-pagination-link-text-hover', 'var(--usx-link-text-hover)'),
  component('usx-pagination-current-bg', 'var(--usx-color-primary)'),
  component('usx-pagination-current-text', '#ffffff', 'text-inverse'),
  // Real USWDS also hardcodes the `.usa-pagination` nav itself to a static
  // white bg / #1b1b1b text, which floats as an opaque box over a themed
  // (e.g. dark) page background instead of blending into it.
  component('usx-pagination-bg', 'transparent'),
  component('usx-pagination-text', 'var(--usx-text-ink)'),
  // Real USWDS hardcodes the button border to rgba(27,27,27,.2), a black-
  // based translucent border that's drowned out on dark surfaces.
  component('usx-pagination-button-border', 'var(--usx-color-border)'),

  // Real USWDS hardcodes the modal surface to a static white background
  // with auto-contrast (effectively text-ink) body text, and the close
  // button to color("base") / color("ink") on hover — none of which follow
  // a runtime theme override.
  component('usx-modal-bg', '#ffffff', 'surface-1'),
  component('usx-modal-text', '#1b1b1b', 'text-ink'),
  component('usx-modal-close-text', '#71767a', 'text-subtle'),
  component('usx-modal-close-text-hover', '#1b1b1b', 'text-ink'),

  // ── Component tokens: Language Selector (custom; defaults baked in SCSS) ──
  // Real USWDS hardcodes the language-menu dropdown to color("primary-darker")
  // bg / white text — a fixed dark nav-dropdown treatment, chained here to the
  // theme's primary-darker shade instead of a static hex.
  component('usx-language-selector-menu-bg', 'var(--usx-color-primary-darker)'),
  component('usx-language-selector-menu-text', '#ffffff', 'text-inverse')
];

export default themeManifest;
