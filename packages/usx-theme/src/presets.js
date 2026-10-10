// presets.js — the prebuilt theme palettes.
//
// Single source for: the Storybook toolbar theme toggle and Theme Playground
// preset buttons, and build.js, which resolves each preset (derive.js) and
// bakes it into dist/themes/<slug>.css, dist/themes/all.css and the Sass registry
// behind `pkg:@solexllc/usx-theme/themes`. Keys are manifest token names;
// values are CSS values (hex, `var(--usx-*)`, lengths, keywords).

export function headerFooterBorderOverrides() {
  return {
    'header-border-top': 'var(--usx-border-width-sm) solid var(--usx-color-border-subtle)',
    'header-border-bottom': 'var(--usx-border-width-sm) solid var(--usx-color-border-subtle)',
    'footer-border-top': 'var(--usx-border-width-sm) solid var(--usx-color-border-subtle)',
    'footer-primary-section-border-top': 'var(--usx-border-width-sm) solid var(--usx-color-border-subtle)',
    'footer-secondary-section-border-top': 'var(--usx-border-width-sm) solid var(--usx-color-border-subtle)',
  };
}

// Header background now defaults to transparent (real USWDS renders no
// explicit background there either), so any theme that wants a filled
// header/nav shell — i.e. every preset/randomize below except Default —
// must opt in explicitly. Nav now matches the header (surface-3); the
// hover-state background (usx-nav-link-hover-bg-color) is what provides
// the visibly distinct tone against that shared surface.
export function headerNavBackgroundOverrides() {
  return {
    'header-bg': 'var(--usx-surface-3)',
    'header-nav-bg': 'var(--usx-surface-3)',
    'header-nav-bg-mobile': 'var(--usx-surface-3)'
  };
}

// Themes with dark header/footer shells ship white logo artwork. Branding
// renders both variants and these tokens pick the one that reads against the
// shell — only used by presets whose header AND footer are both dark.
export function inverseLogoOverrides() {
  return {
    'logo-display': 'none',
    'logo-inverse-display': 'block'
  };
}

export const PRESETS = {
  // Left with no overrides, including the optional Header/Footer shell borders.
  Default: {},
  Forest: {
    'color-primary': '#2e7d32',
    'color-secondary': '#00695c',
    'color-accent-cool': '#81c784',
    'color-accent-warm': '#ffb300',
    'surface-3': '#f4faf4',
    'summary-box-bg': 'var(--usx-surface-3)',
    'summary-box-border-color': 'var(--usx-color-primary)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides()
  },
  Sunset: {
    'color-primary': '#d84315',
    'color-primary-lighter': '#faeee5',
    'color-secondary': '#6a1b9a',
    'color-accent-cool': '#ff8a65',
    'color-accent-warm': '#ffd54f',
    'surface-3': '#fdf6f1',
    'summary-box-bg': 'var(--usx-surface-3)',
    'summary-box-border-color': 'var(--usx-color-primary)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides()
  },
  Ocean: {
    'color-primary': '#0891b2',
    'color-secondary': '#4338ca',
    'color-accent-cool': '#67e8f9',
    'color-accent-warm': '#fb923c',
    'surface-3': '#f0f9fb',
    'summary-box-bg': 'var(--usx-surface-3)',
    'summary-box-border-color': 'var(--usx-color-primary)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides()
  },
  Aurora: {
    'color-primary': '#3457d5',
    'color-primary-lighter': '#cfe8ff',
    'color-primary-light': '#58b4ff',
    'color-secondary': '#7c4dff', // brighter kin of the emergency violet
    'color-accent-cool': '#00b8d9', // echoes the success teal
    'color-accent-warm': '#ff8f6b', // saturated kin of the warning peach
    'surface-3': '#f5f7fc',
    'color-info': '#58b4ff',
    'color-warning': '#fdb8ae',
    'color-success': '#009ec1',
    'color-error': '#e52207',
    'color-emergency': '#5942d2',
    'accordion-icon-position': 'auto 1.25rem',
    'accordion-icon-padding-start': '1.25rem',
    'accordion-icon-padding-end': '3.5rem',
    'accordion-bg-hover': 'var(--usx-surface-3)',
    'summary-box-bg': 'var(--usx-surface-3)',
    'summary-box-border-color': 'var(--usx-color-primary)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides(),
  },
  // Aurora's dark counterpart — same fixed state colors, but the theme hues
  // are brightened kin of Aurora's (rather than reused as-is) so they still
  // read clearly against the near-black surfaces, and surface/border/text
  // are flipped the same way Midnight/Carbon do below.
  Borealis: {
    'footer-social-icon-filter': 'brightness(0) invert(1)',
    'color-primary': '#5b7cfa',
    'color-primary-lighter': '#cfe8ff',
    'color-primary-light': '#58b4ff',
    'color-secondary': '#b98cff',
    'color-accent-cool': '#2dd4bf',
    'color-accent-warm': '#ffab91',
    'surface-1': '#161a2e',
    'surface-3': '#0b0e1c',
    'surface-2': '#232849',
    'text-ink': '#e6e8f5',
    'text-muted': '#dcddff',
    'text-subtle': '#aeafc9',
    'text-inverse': '#161a2e',
    'color-border': '#858ba5',
    'color-border-muted': '#565d7f',
    'color-border-subtle': '#363d5e',
    'color-border-inverse': '#161a2e',
    'color-info': '#58b4ff',
    'color-warning': '#fdb8ae',
    'color-success': '#009ec1',
    'color-error': '#e52207',
    'color-emergency': '#5942d2',
    'accordion-icon-position': 'auto 1.25rem',
    'accordion-icon-padding-start': '1.25rem',
    'accordion-icon-padding-end': '3.5rem',
    'accordion-bg-hover': 'var(--usx-surface-3)',
    'summary-box-bg': '#101b33',
    'summary-box-border-color': '#5b7cfa',
    'color-visited': '#c9a8ff',
    'banner-button-text': 'var(--usx-text-ink)',
    // The date-picker toggle button's hover/active background defaults to
    // color-base-light (#a9aeb1) — too close to this preset's light 'text-ink'
    // color for the calendar icon to stay visible. color-base-dark (#565c65)
    // is the mirrored mid-gray on the dark side of the same scale.
    'date-picker-button-hover-active-bg': '#565c65',
    // Nav background defaults transparent; a filled card reads better
    // against this preset's dark page background.
    'in-page-nav-bg': 'var(--usx-surface-2)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides(),
    ...inverseLogoOverrides()
  },
  // Dark themes: unlike the light presets above (which only nudge the page
  // background), these also flip the surface/border/text tokens so cards,
  // dividers and copy stay legible against a dark page.
  Midnight: {
    'footer-social-icon-filter': 'brightness(0) invert(1)',
    'color-primary': '#60a5fa',
    'color-secondary': '#a78bfa',
    'color-accent-cool': '#38bdf8',
    'color-accent-warm': '#fbbf24',
    'surface-1': '#1e293b',
    'surface-3': '#0f172a',
    'surface-2': '#334155',
    'text-ink': '#e2e8f0',
    'text-muted': '#c7c9da',
    'text-subtle': '#aeafc9',
    'text-inverse': '#1e293b',
    'color-border': '#8494aa',
    'color-border-muted': '#64748b',
    'color-border-subtle': '#475569',
    'color-border-inverse': '#1e293b',
    'summary-box-bg': '#0f1b2e',
    'summary-box-border-color': '#60a5fa',
    'color-visited': '#b39ddb',
    'banner-button-text': 'var(--usx-text-ink)',
    // See Borealis's comment above for why this can't just chain to
    // color-base-light.
    'date-picker-button-hover-active-bg': '#565c65',
    'in-page-nav-bg': 'var(--usx-surface-2)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides(),
    ...inverseLogoOverrides(),
  },
  Carbon: {
    'footer-social-icon-filter': 'brightness(0) invert(1)',
    'color-primary': '#fa9441',
    'color-primary-light': '#f3bf90',
    'color-primary-lighter': '#f2e4d4',
    'color-secondary': '#22d3ee',
    'color-accent-cool': '#38bdf8',
    'color-accent-warm': '#facc15',
    'surface-1': '#1c1c1e',
    'surface-3': '#121214',
    'surface-2': '#3a3a3d',
    'text-ink': '#e5e5e5',
    'text-muted': '#c0c0c0',
    'text-subtle': '#a3a3a3',
    'text-inverse': '#1c1c1e',
    'color-border': '#919191',
    'color-border-muted': '#6b6b70',
    'color-border-subtle': '#505055',
    'color-border-inverse': '#1c1c1e',
    'summary-box-bg': '#241a10',
    'summary-box-border-color': '#fb923c',
    'color-visited': '#b39ddb',
    // See Borealis's comment above for why this can't just chain to
    // color-base-light.
    'date-picker-button-hover-active-bg': '#565c65',
    'in-page-nav-bg': 'var(--usx-surface-2)',
    'radius-box': '1.25rem',
    'radius-button': '0.5rem',
    'radius-field': '0.5rem',
    'radius-selector': '4px',
    'accordion-radius': 'var(--usx-radius-button)',
    'alert-radius': 'var(--usx-radius-box)',
    'tag-radius': 'var(--usx-radius-box)',
    'checkable-tile-radius': 'var(--usx-radius-box)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides(),
    // Carbon wants the desktop nav bar one tone lighter than the header
    // (surface-2), but the mobile drawer matching the header (surface-3).
    'header-nav-bg': 'var(--usx-surface-2)',
    'header-nav-bg-mobile': 'var(--usx-surface-3)',
    // Overrides banner's own surface-2 default — Carbon wants the banner to
    // match the header's surface-3 instead.
    'banner-bg': 'var(--usx-surface-3)',
    'banner-button-text': 'var(--usx-text-ink)',
    ...inverseLogoOverrides()
  },
  // The three presets below are sourced from real design systems/sites
  // rather than invented palettes — VADS/GOVUK values come from each
  // system's own documented color tokens; NASA's are pulled directly from
  // nasa.gov's live rendered CSS (see that preset's own comment).
  VADS: {
    // VA.gov Design System (design.va.gov) semantic color tokens.
    'color-primary': '#005ea2', // vads-color-primary (USWDS blue-vivid-60)
    'color-secondary': '#00bde3', // vads-color-primary-alt (cyan-vivid-30)
    'color-accent-cool': '#97d4ea', // vads-color-primary-alt-light
    'color-accent-warm': '#bd5727', // vads-color-hub-careers (orange-warm-50)
    'surface-3': '#f0f0f0', // vads-color-background-muted
    'font-family': '"Source Sans Pro Web", "Source Sans Pro", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif', // real va.gov body font
    'font-family-heading': 'Bitter, Georgia, Cambria, "Times New Roman", Times, serif', // real va.gov heading font — a distinct serif face
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides()
  },
  "GOV.UK": {
    // GOV.UK Design System (design-system.service.gov.uk) web palette +
    // functional colours.
    'color-primary': '#1d70b8', // govuk-colour('blue') / functional brand
    'color-primary-lighter': '#cfe8ff',
    'color-secondary': '#0f7a52', // govuk-colour('green') — the "Start now" button
    'color-accent-cool': '#8eb8dc', // govuk-colour('blue', $variant: 'tint-50')
    'color-accent-warm': '#f47738', // govuk-colour('orange')
    'surface-3': '#f4f8fb', // functional template-background
    'color-border-subtle': '#cecece', // section dividers
    'color-focus': '#ffdd00', // functional focus — GOV.UK's signature yellow focus state
    'font-family': '"GDS Transport", arial, sans-serif', // real gov.uk body/heading font
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides(),
    // gov.uk's real header/nav bar is filled with brand blue, not a neutral
    // surface — override past the shared surface-3 default to match.
    'header-bg': 'var(--usx-color-primary)',
    'header-nav-bg': 'var(--usx-color-primary)',
    'header-text': 'var(--usx-text-inverse)',
    // text-subtle/text-muted are tuned for a light/neutral surface — real
    // gov.uk nav links are white against the blue bar (verified live), and
    // color-primary as a hover color would be invisible against the
    // color-primary background it now sits on.
    'header-nav-link-text': 'var(--usx-text-inverse)',
    'header-nav-link-text-hover': 'var(--usx-text-inverse)',
    'header-secondary-link-text': 'var(--usx-text-ink)',
    'header-secondary-link-text-hover': 'var(--usx-text-ink)',
    'header-nav-bg-mobile': '#f4f8fb',
    'header-nav-link-text-mobile': '#1a65a6',
    'header-nav-link-text-hover-mobile': '#0f385c',
    // GOV.UK famously never rounds a corner (buttons, inputs, panels, tags,
    // checkboxes all render dead square — verified live on the design
    // system's own component pages). Overriding the three base radius
    // scales cascades to every component that chains to them; tile/badge
    // are independent literals so need their own overrides.
    'radius-field': '0', // buttons/inputs/textarea
    'radius-box': '0', // summary box/alert/code/hero-callout/image
    'radius-selector': '0', // tags/checkboxes
    'checkable-tile-radius': '0',
    'misc-banner-badge-radius': '0',
    // Real GOV.UK form inputs render with a thick 2px black border — one of
    // its most recognizable traits (verified on design-system.service.gov.uk).
    'border-width-inputs': '2px',
    // Real GOV.UK accordion sections are divided by a thin 1px rule (not a
    // heavy border) with a light-grey button background (#f3f3f3) and
    // near-black text — verified live on the design system's accordion
    // example page.
    'accordion-border-width': '1px',
    'accordion-bg': '#f3f3f3',
    'accordion-content-bg': '#ffffff',
    'accordion-text': '#0b0c0c',
    'accordion-content-text': '#0b0c0c',
    // Modeled on the real GOV.UK notification banner (a blue-bordered white
    // panel) as the closest analog to our summary box.
    'summary-box-bg': 'var(--usx-surface-3)',
    'summary-box-border-color': 'var(--usx-color-primary)',
    'summary-box-text': '#0b0c0c',
  },
  NASA: {
    // nasa.gov's live site itself (not the unaffiliated/outdated NASAWDS
    // template) — colors pulled from its actual rendered CSS.
    'color-primary': '#d83933', // real CTA button background (e.g. "Live Mission Coverage")
    'color-secondary': '#1c67e3', // real accent blue (download-link icon)
    'color-accent-cool': '#959599', // real neutral gray used across icons/labels
    'color-accent-warm': '#f64137', // real "read more" arrow-icon accent
    'surface-3': '#000000', // real header background — solid black
    'color-border-subtle': '#b9b9bb', // divider gray (also visible against the black header)
    'header-text': 'var(--usx-text-inverse)', // real header text is white against the black bar
    // text-subtle/text-muted are tuned for a light/neutral surface — against
    // the solid black header/nav they'd be low-contrast, so match the real
    // white nav text instead. color-primary (red) already reads fine as the
    // hover color against black, so it's left on the default.
    'header-nav-link-text': 'var(--usx-text-inverse)',
    'header-secondary-link-text': 'var(--usx-text-inverse)',
    // The real CTA button (e.g. "Live Mission Coverage") measures a 4px
    // corner radius, not our default 0.5rem — verified via computed style
    // on the live site.
    'radius-box': '0',
    'radius-field': '0',
    'radius-selector': '2px',
    'radius-button': '4px',
    // nasa.gov's content cards (hds-content-card) render perfectly square —
    // verified live.
    'card-text': 'var(--usx-text-inverse)',
    'checkable-tile-radius': '0',
    // nasa.gov's nav literally renders stock USWDS usa-accordion markup, so
    // its button background is stock USWDS base-lightest rather than our
    // slightly darker surface-2 default.
    'accordion-bg': 'var(--usx-surface-3)',
    'accordion-bg-hover': 'var(--usx-color-primary)',
    'accordion-text': 'var(--usx-text-inverse)',
    'range-slider-track-bg': 'var(--usx-surface-1)',
    'range-slider-thumb-bg': 'var(--usx-surface-1)',
    'range-slider-track-border': '#000000',
    'range-slider-thumb-border': '#000000',
    'summary-box-bg': 'var(--usx-surface-3)',
    'summary-box-border-color': 'var(--usx-color-primary)',
    'summary-box-text': 'var(--usx-text-inverse)',
    ...headerFooterBorderOverrides(),
    ...headerNavBackgroundOverrides(),
    // Keep the mobile drawer the same black as the desktop header/nav bar.
    'header-nav-bg-mobile': 'var(--usx-surface-3)',
    // The footer's secondary section (logo + contact block) chains its
    // background to surface-3 too, so it's solid black here just like the
    // header — same text-color/heading-color-secondary fix as above.
    // Link colors are untouched since color-primary (red) already reads
    // fine against black.
    'footer-text': 'var(--usx-text-inverse)',
    'footer-heading-secondary-text': 'var(--usx-text-inverse)',
    'table-grouped-row-text': 'var(--usx-text-inverse)',
    ...inverseLogoOverrides(),
  }
};
