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

const c = (name, defaultValue, derivedFrom) => ({
  name,
  cssVar: `--usx-${name}`,
  defaultValue,
  group: 'color',
  type: 'color',
  ...(derivedFrom ? { derivedFrom } : {})
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

  c('color-primary', '#005ea2'),
  c('color-primary-darker', '#1a4480', 'color-primary'),
  c('color-primary-darkest', '#162e51', 'color-primary'),
  c('color-primary-lighter', '#73b3e7', 'color-primary'),
  c('color-primary-lightest', '#d9e8f6', 'color-primary'),
  c('color-primary-hover', '#0050d8', 'color-primary'),
  c('color-primary-active', '#162e51', 'color-primary'),

  c('color-secondary', '#d83933'),
  c('color-secondary-darker', '#8b0a03', 'color-secondary'),
  c('color-secondary-hover', '#e41d3d', 'color-secondary'),
  c('color-secondary-active', '#b50909', 'color-secondary'),

  c('color-accent-cool', '#00bde3'),
  c('color-accent-cool-light', '#97d4ea', 'color-accent-cool'),
  c('color-accent-cool-hover', '#28a0cb', 'color-accent-cool'),
  c('color-accent-cool-active', '#07648d', 'color-accent-cool'),

  c('color-accent-warm', '#fa9441'),
  c('color-accent-warm-light', '#ffbc78', 'color-accent-warm'),
  c('color-accent-warm-hover', '#c05600', 'color-accent-warm'),
  c('color-accent-warm-active', '#775540', 'color-accent-warm'),

  c('color-base', '#71767a'),
  c('color-base-darker', '#3d4551', 'color-base'),
  c('color-base-hover', '#565c65', 'color-base'),
  c('color-base-active', '#1b1b1b', 'color-base'),

  c('color-info', '#00bde3'),
  c('color-info-darker', '#009ec1', 'color-info'),
  c('color-info-lighter', '#e7f6f8', 'color-info'),
  c('color-warning', '#ffbe2e'),
  c('color-warning-lighter', '#faf3d1', 'color-warning'),
  c('color-success', '#00a91c'),
  c('color-success-lighter', '#ecf3ec', 'color-success'),
  c('color-error', '#d54309'),
  c('color-error-lighter', '#f4e3db', 'color-error'),
  c('color-emergency', '#9c3d10'),

  // Base surfaces: 100 = card surfaces, 200 = page background, 300 = small
  // surfaces (switch tracks, callouts) and the standard border color.
  c('color-base-100', '#ffffff'),
  c('color-base-200', '#f0f0f0', 'color-base-100'),
  c('color-base-300', '#dfe1e2', 'color-base-100'),
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
  scale('radius-selector', '--usx-radius-selector', '0.5rem', 'radius'),
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
  scale('usx-misc-banner-badge-radius', '--usx-misc-banner-badge-radius', 'var(--usx-radius-selector)', 'radius-advanced'),

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
  component('usx-link-visited-color', '#54278f'),
  component('usx-summary-box-link-visited-color', '#c254ee'),
  component('usx-accordion-accent-color', '#87c5ff'),
  component('usx-accordion-content-background', '#d7ebff'),
  component('usx-banner-after-color', '#2491ff'),
  component('usx-carousel-dot-color', '#c0c0c0'),
  component('usx-carousel-dot-color-hover', '#a0a0a0', 'usx-carousel-dot-color'),
  component('usx-carousel-dot-color-active', '#808080', 'usx-carousel-dot-color'),
  component('usx-carousel-focus-outline-color', '#2491ff'),
  component('usx-task-list-link-color', '#005ea2'),
  component('usx-attribution-secondary-color', '#757575'),
  component('usx-clickable-focus-outline-color', '#2491ff'),
  component('usx-clickable-hover-color', '#005ea2'),
  component('usx-misc-banner-focus-outline-color', '#9bdaf1'),
  { name: 'usx-table-selected-bg', cssVar: '--usx-table-selected-bg', defaultValue: '#e7f0fa', group: 'component', type: 'color' },
  { name: 'usx-table-hover-bg', cssVar: '--usx-table-hover-bg', defaultValue: '#73b3e7', group: 'component', type: 'color', derivedFrom: 'color-primary' }
];

export default themeManifest;
