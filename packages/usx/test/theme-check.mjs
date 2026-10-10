// theme-check.mjs — the single theme guardrail test for the USX styles.
//
// Compiles both Sass entry points once and asserts the "static by default,
// no fallback" architecture plus manifest parity:
//   1. default build (src/index.scss, hooks null) has zero theme var() refs —
//      unconfigured tokens are dropped so USWDS defaults show through.
//   2. themed build (src/themed.scss, hooks on) uses only bare theme var()
//      refs — no compiled-in fallbacks; runtime values come from theme.css.
//   3. neither build leaks a literal "null" (an unguarded composite value).
//   4. every theme var() in the themed build has a manifest entry.
//   5. every manifest entry is consumed by the themed build, unless listed in
//      UNCONSUMED (published for downstream Sass / theme.css chains only).
//   6. every manifest `derivedFrom` names a real manifest entry.
//   7. Sass emits no warnings (deprecations are treated as failures).
//
// Usage: node test/theme-check.mjs   (from packages/usx; also `pnpm test`)

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// Sass warnings (deprecations, @warn) are collected and reported as failures.
const sassWarnings = [];
const compile = (entry) =>
  sass.compile(path.join(pkgDir, entry), {
    importers: [new sass.NodePackageImporter()],
    logger: { warn: (message, { span }) => sassWarnings.push(`${span ? path.relative(pkgDir, fileURLToPath(span.url)) + ': ' : ''}${message.split('\n')[0]}`) },
  }).css;

const defaultCss = compile('src/index.scss');
const themedCss = compile('src/themed.scss');

// Tokens published by the theme layer but never referenced directly in
// compiled component CSS — either unused so far, or consumed only through
// theme.css's own var() fallback chains (e.g. --usx-radius-button:
// var(--usx-radius-field)). If one starts appearing in CSS, remove it here.
const UNCONSUMED = new Set([
  '--usx-color-primary-light',
  '--usx-color-primary-vivid',
  '--usx-color-secondary-lighter',
  '--usx-color-secondary-light',
  '--usx-color-secondary-vivid',
  '--usx-color-secondary-dark',
  '--usx-color-accent-cool-dark',
  '--usx-color-accent-cool-darker',
  '--usx-color-accent-warm-lighter',
  '--usx-color-accent-warm-dark',
  '--usx-color-accent-warm-darker',
  '--usx-color-base-lightest',
  '--usx-color-base-lighter',
  '--usx-color-base-light',
  '--usx-color-base-dark',
  '--usx-color-base-ink',
  '--usx-color-base-hover',
  '--usx-color-base-active',
  '--usx-color-info-light',
  '--usx-color-info-dark',
  '--usx-color-info-darker',
  '--usx-color-warning-light',
  '--usx-color-warning-dark',
  '--usx-color-warning-darker',
  '--usx-color-success-light',
  '--usx-color-success-dark',
  '--usx-color-success-darker',
  '--usx-color-error-light',
  '--usx-color-error-dark',
  '--usx-color-error-darker',
  '--usx-color-emergency-dark',
  '--usx-color-disabled-lighter',
  '--usx-color-disabled-light',
  '--usx-color-disabled-dark',
  '--usx-color-disabled-darker',
  '--usx-color-visited',
  '--usx-spacing-sm',
  '--usx-spacing-xl',
  '--usx-typography-font-family-base',
  '--usx-typography-font-size-base',
  '--usx-typography-font-weight-regular',
  '--usx-typography-font-weight-bold',
  '--usx-typography-line-height-base',
  '--border-width-md',
]);

// Every theme var() occurrence as { name, fallback }, nested-paren safe.
function themeVarRefs(css) {
  const refs = [];
  const marker = /var\(--(?:usx-|border-)/g;
  let match;
  while ((match = marker.exec(css)) !== null) {
    const i = match.index;
    let depth = 0;
    let j = i;
    for (; j < css.length; j++) {
      if (css[j] === '(') depth++;
      else if (css[j] === ')' && --depth === 0) break;
    }
    const inner = css.slice(i + 'var('.length, j);
    const comma = inner.indexOf(',');
    refs.push({ name: (comma === -1 ? inner : inner.slice(0, comma)).trim(), fallback: comma !== -1 ? inner : null });
    marker.lastIndex = i + 'var('.length; // rescan inside for nested theme var() references
  }
  return refs;
}

const errors = [];
const byVar = new Map(themeManifest.map((t) => [t.cssVar, t]));
const byName = new Map(themeManifest.map((t) => [t.name, t]));

for (const [name, parent] of Object.entries({
  'card-bg': 'surface-3',
  'card-text': 'text-ink',
  'card-heading-text': 'card-text',
  'card-media-bg': 'surface-3',
  'card-border-color': 'color-border-subtle',
  'card-radius': 'radius-box',
  'card-border-width': 'border-width-md',
  'pagination-button-radius': 'radius-button',
})) {
  const token = byName.get(name);
  const parentToken = byName.get(parent);
  if (!token || !parentToken || token.defaultValue !== `var(${parentToken.cssVar})`) {
    errors.push(`${name} must follow ${parent} by default`);
  }
}

const staticCardCss = compile('src/components/_card.scss');
for (const [selector, token] of [
  ['.usx-card .usa-card__container', '--usx-font-family'],
  ['.usx-card .usa-card__heading', '--usx-font-family-heading'],
]) {
  const rule = `${selector} {\n  font-family: var(${token});\n}`;
  if (!themedCss.includes(rule)) errors.push(`${selector} must use ${token}`);
}
if (staticCardCss.replace(/\/\*[\s\S]*?\*\//g, '').trim()) errors.push('unconfigured card styles must leave USWDS defaults untouched');
for (const selector of ['.usa-card.usx-card > .usa-card__container', '.usa-card.usx-card.usa-card--flag.usa-card--media-right', '.usa-card__media--inset .usa-card__img']) {
  if (!themedCss.includes(selector)) errors.push(`missing themed card selector: ${selector}`);
}

// Read emitted declarations without splitting commas inside :where/:not.
function cssRules(css) {
  const rules = [];
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, selectorText, body] of clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selectors = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i <= selectorText.length; i++) {
      if ('(['.includes(selectorText[i])) depth++;
      if (')]'.includes(selectorText[i])) depth--;
      if (i === selectorText.length || (selectorText[i] === ',' && depth === 0)) {
        selectors.push(selectorText.slice(start, i).trim());
        start = i + 1;
      }
    }
    const declarations = new Map();
    for (const declaration of body.split(';')) {
      const colon = declaration.indexOf(':');
      if (colon > 0) declarations.set(declaration.slice(0, colon).trim(), declaration.slice(colon + 1).trim());
    }
    for (const selector of selectors) rules.push({ selector, declarations });
  }
  return rules;
}

function expectDeclaration(rules, label, selector, property, expected) {
  const actual = rules.filter((rule) => rule.selector === selector && rule.declarations.has(property)).at(-1)?.declarations.get(property);
  if (actual !== expected) errors.push(`${label}: ${selector} ${property} is ${actual}, expected ${expected}`);
}

const defaultRules = cssRules(defaultCss);
const themedRules = cssRules(themedCss);
const borderComponents = [
  ['.usa-card.usx-card > .usa-card__container', 'border-color', 'usx-card-border-color', 'subtle'],
  // Ink borders have no shared border role; leave their USWDS defaults alone
  // until a component override or runtime hook is explicitly enabled.
  ['.usa-table td', 'border-color', 'usx-table-border', null],
  ['.usx-table.usa-table th', 'border-color', 'usx-table-border', null],
  ['.usx-collection .usa-collection__item', 'border-top-color', 'usx-collection-border', null],
  ['.usa-file-input__target', 'border-color', 'usx-file-input-border', 'muted'],
  ['.usx-file-input__file-item', 'border-color', 'usx-file-input-item-border', 'muted'],
  ['.usx-pagination__nav .usa-pagination__button:not(.usa-current)', 'border-color', 'usx-pagination-button-border', 'muted'],
  ['.usa-in-page-nav__list', 'border-left-color', 'usx-in-page-nav-border', 'muted'],
  ['.usx-sidenav.usa-sidenav', 'border-bottom-color', 'usx-sidenav-border', 'subtle'],
  ['.usx-task-list', 'border-color', 'usx-task-list-border', 'subtle'],
  ['.usa-range::-webkit-slider-runnable-track', 'border-color', 'usx-range-slider-track-border', 'default'],
];
for (const [selector, property, token] of borderComponents) {
  expectDeclaration(defaultRules, 'unconfigured border leaves USWDS intact', selector, property, undefined);
  expectDeclaration(themedRules, 'runtime component border', selector, property, `var(--${token})`);
}

const customBorders = { default: '#135791', subtle: '#246802', muted: '#357913', inverse: '#468024' };
const borderConfig = `
  $usx-color-border: ${customBorders.default},
  $usx-color-border-subtle: ${customBorders.subtle},
  $usx-color-border-muted: ${customBorders.muted},
  $usx-color-border-inverse: ${customBorders.inverse},
  $usx-text-ink: #579135,
  $usx-color-error: #a10000,
  $usx-color-success: #006100,
  $usx-radius-button: 0.75rem,
`;
const compileBorders = (extra = '') => cssRules(sass.compileString(`
  @use 'pkg:@solexllc/usx-theme/variables' with (${borderConfig}${extra});
  @use '../src/index';
`, {
  url: new URL('file://' + path.join(pkgDir, 'test', 'inline.scss')),
  importers: [new sass.NodePackageImporter(pkgDir)],
  logger: { warn: (message) => sassWarnings.push(message) },
}).css);
const customRules = compileBorders();
const paginationButton = '.usx-pagination__nav .usa-pagination__button';
expectDeclaration(defaultRules, 'unconfigured pagination radius preserves USWDS', paginationButton, 'border-radius', undefined);
expectDeclaration(themedRules, 'runtime pagination radius hook', paginationButton, 'border-radius', 'var(--usx-pagination-button-radius)');
expectDeclaration(customRules, 'pagination inherits the shared button radius', paginationButton, 'border-radius', '0.75rem');
for (const [selector, property, , role] of borderComponents) {
  expectDeclaration(customRules, 'custom Sass border scale', selector, property, customBorders[role]);
}

const processCounter = '.usx-process-list .usa-process-list__item::before';
expectDeclaration(defaultRules, 'unconfigured process counter preserves USWDS', processCounter, 'border-color', undefined);
expectDeclaration(themedRules, 'runtime process counter border hook', processCounter, 'border-color', 'var(--usx-process-list-counter-border)');
expectDeclaration(customRules, 'process counter border follows ink instead of shared border colors', processCounter, 'border-color', '#579135');
expectDeclaration(customRules, 'process counter text follows ink', processCounter, 'color', '#579135');

function expectTooltip(rules, label, background, text) {
  expectDeclaration(rules, label, '.usx-tooltip .usa-tooltip__body', 'background-color', background);
  expectDeclaration(rules, label, '.usx-tooltip .usa-tooltip__body::after', 'border-right-color', background);
  expectDeclaration(rules, label, '.usx-tooltip .usa-tooltip__body', 'color', text);
}
expectTooltip(defaultRules, 'unconfigured tooltip leaves USWDS colors intact', undefined, undefined);
expectTooltip(themedRules, 'runtime tooltip hooks', 'var(--usx-tooltip-bg)', 'var(--usx-tooltip-text)');
expectTooltip(customRules, 'inverse surface defaults to configured ink', '#579135', undefined);
expectDeclaration(defaultRules, 'unconfigured inverse surface utility', '.bg-surface-inverse', 'background-color', undefined);
expectDeclaration(themedRules, 'runtime inverse surface utility', '.bg-surface-inverse', 'background-color', 'var(--usx-surface-inverse) !important');
expectDeclaration(customRules, 'inverse surface utility defaults to ink', '.bg-surface-inverse', 'background-color', '#579135 !important');

const tooltipRules = cssRules(sass.compileString(`
  @use 'pkg:@solexllc/usx-theme/variables' with (
    $usx-text-ink: #102030,
    $usx-surface-inverse: #bcd123,
    $usx-text-inverse: #234bcd,
  );
  @use '../src/components/tooltip';
  @use '../src/utilities';
`, {
  url: new URL('file://' + path.join(pkgDir, 'test', 'inline.scss')),
  importers: [new sass.NodePackageImporter(pkgDir)],
  logger: { warn: (message) => sassWarnings.push(message) },
}).css);
expectTooltip(tooltipRules, 'tooltip follows independent inverse roles', '#bcd123', '#234bcd');
for (const selector of ['.bg-surface-inverse', '.before-bg-surface-inverse::before', '.after-bg-surface-inverse::after']) {
  expectDeclaration(tooltipRules, 'inverse utility follows the same surface as tooltip', selector, 'background-color', '#bcd123 !important');
}

function expectCheckableOutline(rules, label, expected) {
  for (const [container, input, pseudo] of [
    ['.usx-checkbox', '.usa-checkbox__input', '.usa-checkbox__label::before'],
    ['.usa-radio.usx-radio', '.usa-radio__input', '.usa-radio__label::before'],
  ]) {
    const outlines = rules.filter((rule) => rule.selector.startsWith(`${container} ${input}:where(`) && rule.selector.endsWith(` + ${pseudo}`));
    const shadows = outlines.filter((rule) => rule.declarations.has('box-shadow')).map((rule) => rule.declarations.get('box-shadow'));
    if (expected === undefined ? shadows.length : !shadows.length || shadows.some((shadow) => shadow !== `0 0 0 2px ${expected}`)) {
      errors.push(`${label}: ${pseudo} outline is ${shadows.join(', ') || 'unset'}, expected ${expected ?? 'unset'}`);
    }
  }
}
expectCheckableOutline(defaultRules, 'unconfigured checkables preserve USWDS ink', undefined);
expectCheckableOutline(customRules, 'shared border scale does not change checkable ink', undefined);
expectCheckableOutline(themedRules, 'runtime checkable component hook', 'var(--usx-checkable-border)');
for (const [role, value] of Object.entries(customBorders)) {
  const selector = `.border-${role}`;
  const token = `--usx-color-border${role === 'default' ? '' : `-${role}`}`;
  expectDeclaration(defaultRules, 'unconfigured utility', selector, 'border-color', undefined);
  expectDeclaration(themedRules, 'runtime border utility', selector, 'border-color', `var(${token}) !important`);
  expectDeclaration(customRules, 'custom Sass border utility', selector, 'border-color', `${value} !important`);
}

// A neutral border must never erase validation or disabled state styling.
for (const selector of ['.usa-input', '.usa-select', '.usa-input-group', '.usa-combo-box__input', '.usa-textarea']) {
  const neutral = customRules.filter((rule) => rule.selector.startsWith(`${selector}:where(`) && rule.declarations.has('border-color'));
  if (!neutral.length) errors.push(`${selector}: missing guarded neutral border`);
  for (const rule of neutral) {
    if (rule.declarations.get('border-color') !== customBorders.default) errors.push(`${selector}: neutral border does not use the default role`);
    for (const state of ['.usa-input--error', '.usa-input--success', ':disabled']) {
      if (!rule.selector.includes(':not(') || !rule.selector.includes(state)) errors.push(`${selector}: neutral border must exclude ${state}`);
    }
  }
  expectDeclaration(customRules, 'no unguarded form border', selector, 'border-color', undefined);
}
for (const selector of ['.usa-input.usx-input', '.usa-select.usx-select', '.usa-textarea.usx-textarea']) {
  expectDeclaration(customRules, 'error border preserved', `${selector}.usa-input--error`, 'border-color', '#a10000');
  expectDeclaration(customRules, 'success border preserved', `${selector}.usa-input--success:not(.usa-input--error)`, 'border-color', '#006100');
}

const componentOverrides = {
  'usx-card-border-color': '#abc123',
  'usx-table-border': '#def456',
  'usx-collection-border': '#789abc',
  'usx-checkable-border': '#ad17ce',
  'usx-process-list-counter-border': '#6a17bc',
  'usx-process-list-counter-text': '#7b28cd',
  'usx-file-input-border': '#612345',
  'usx-input-border': '#b15c2a',
  'usx-textarea-border': '#c26d3b',
  'usx-tooltip-bg': '#7d3f81',
  'usx-tooltip-text': '#f1e2d3',
  'usx-pagination-button-radius': '0',
};
const overrideRules = compileBorders(Object.entries(componentOverrides).map(([name, value]) => `$${name}: ${value},`).join('\n'));
expectDeclaration(overrideRules, 'pagination radius can independently be square', paginationButton, 'border-radius', '0');
expectDeclaration(overrideRules, 'pagination override preserves regular button radius', '.usa-button.usx-button:not(.usa-button--unstyled)', 'border-radius', '0.75rem');
for (const [selector, property, token, role] of borderComponents) {
  expectDeclaration(overrideRules, 'component override precedence', selector, property, componentOverrides[token] ?? customBorders[role]);
}
expectCheckableOutline(overrideRules, 'independent checkable border override', componentOverrides['usx-checkable-border']);
expectDeclaration(overrideRules, 'process counter border override wins independently', processCounter, 'border-color', componentOverrides['usx-process-list-counter-border']);
expectDeclaration(overrideRules, 'process counter text remains independently configurable', processCounter, 'color', componentOverrides['usx-process-list-counter-text']);
expectTooltip(overrideRules, 'explicit tooltip overrides win', componentOverrides['usx-tooltip-bg'], componentOverrides['usx-tooltip-text']);
expectDeclaration(overrideRules, 'tooltip override leaves inverse surface utility independent', '.bg-surface-inverse', 'background-color', '#579135 !important');
for (const selector of ['.usa-input', '.usa-select', '.usa-input-group', '.usa-combo-box__input', '.usa-textarea']) {
  const expected = componentOverrides[selector === '.usa-textarea' ? 'usx-textarea-border' : 'usx-input-border'];
  for (const rule of overrideRules.filter((rule) => rule.selector.startsWith(`${selector}:where(`) && rule.declarations.has('border-color'))) {
    if (rule.declarations.get('border-color') !== expected) errors.push(`${selector}: neutral border ignores its component override`);
  }
}

const inkBorderOptIns = {
  'usx-table-border': 'var(--usx-color-border-subtle)',
  'usx-collection-border': 'var(--usx-color-border)',
  'usx-checkable-border': 'var(--usx-color-border-muted)',
};
const optInRules = compileBorders(Object.entries(inkBorderOptIns).map(([name, value]) => `$${name}: ${value},`).join('\n'));
for (const [selector, property, token, role] of borderComponents) {
  if (role === null) expectDeclaration(optInRules, 'explicit border-role opt-in', selector, property, inkBorderOptIns[token]);
}
expectCheckableOutline(optInRules, 'explicit checkable border-role opt-in', inkBorderOptIns['usx-checkable-border']);

// Step segments communicate state through the same colors as their labels.
// Use distinct text/border palettes to catch accidental border-role fallbacks.
const stepPalette = { pending: '#5a6570', complete: '#193c66', current: '#2463a8', inverse: '#f5f6f7', surface: '#eef2f6' };
const compileStepIndicator = (extra = '') => cssRules(sass.compileString(`
  @use 'pkg:@solexllc/usx-theme/variables' with (
    ${borderConfig}
    $usx-text-muted: ${stepPalette.pending},
    $usx-text-inverse: ${stepPalette.inverse},
    $usx-surface-1: ${stepPalette.surface},
    $usx-color-primary-darker: ${stepPalette.complete},
    $usx-color-primary-dark: ${stepPalette.current},
    ${extra}
  );
  @use '../src/components/step-indicator';
`, {
  url: new URL('file://' + path.join(pkgDir, 'test', 'inline.scss')),
  importers: [new sass.NodePackageImporter(pkgDir)],
  logger: { warn: (message) => sassWarnings.push(message) },
}).css);

function expectStepPalette(rules, label, palette) {
  const base = '.usx-step-indicator';
  const segment = '.usa-step-indicator__segment';
  expectDeclaration(rules, label, `${base} ${segment}::after`, 'background-color', palette.pending);
  expectDeclaration(rules, label, `${base} ${segment}-label`, 'color', palette.pending);
  for (const state of ['complete', 'current']) {
    for (const pseudo of ['::before', '::after']) {
      expectDeclaration(rules, label, `${base} ${segment}--${state}${pseudo}`, 'background-color', palette[state]);
    }
    expectDeclaration(rules, label, `${base} ${segment}--${state} ${segment}-label`, 'color', palette[state]);
    // Base and state bar selectors have equal specificity, so state fills
    // must follow the pending fill to win on completed/current segments.
    const colorIndex = (selector) => rules.findLastIndex((rule) => rule.selector === selector && rule.declarations.has('background-color'));
    if (colorIndex(`${base} ${segment}::after`) >= colorIndex(`${base} ${segment}--${state}::after`)) {
      errors.push(`${label}: pending bar color would override the ${state} state`);
    }
  }
  for (const variant of ['counters', 'counters-sm']) {
    const counterBase = `${base}.usa-step-indicator--${variant}`;
    const pending = `${counterBase} ${segment}::before`;
    expectDeclaration(rules, label, pending, 'background-color', palette.surface);
    expectDeclaration(rules, label, pending, 'color', palette.pending);
    expectDeclaration(rules, label, pending, 'box-shadow', `inset 0 0 0 0.25rem ${palette.ring ?? palette.pending}, 0 0 0 0.25rem ${palette.surface}`);
    for (const state of ['complete', 'current']) {
      const filled = `${counterBase} ${segment}--${state}::before`;
      expectDeclaration(rules, label, filled, 'background-color', palette[state]);
      expectDeclaration(rules, label, filled, 'color', palette.inverse);
      expectDeclaration(rules, label, filled, 'box-shadow', `0 0 0 0.25rem ${palette.surface}`);
    }
  }
  expectDeclaration(rules, label, `${base} .usa-step-indicator__current-step`, 'color', palette.inverse);
}
expectStepPalette(compileStepIndicator(), 'step indicator uses text/state colors', stepPalette);
expectStepPalette(compileStepIndicator('$usx-step-indicator-segment-label-text: #4b5967,'), 'custom pending label also colors bar and ring', { ...stepPalette, pending: '#4b5967' });
expectStepPalette(themedRules, 'runtime step indicator colors', {
  pending: 'var(--usx-text-muted)',
  ring: 'var(--usx-step-indicator-segment-pending-border)',
  complete: 'var(--usx-color-primary-darker)',
  current: 'var(--usx-color-primary-dark)',
  inverse: 'var(--usx-text-inverse)',
  surface: 'var(--usx-step-indicator-bg)',
});

const compileGuard = (body) => sass.compileString(
  `@use 'pkg:@solexllc/usx-theme/variables' as *; .probe { ${body} }`,
  {
    importers: [new sass.NodePackageImporter(pkgDir)],
    logger: { warn: (message) => sassWarnings.push(message) },
  }
).css;

for (const value of ['null', 'false', '0', 'true', '#123456', 'var(--test-token)', '(1px 2px)', '(Arial, sans-serif)', '""']) {
  const guarded = compileGuard(`@if ${value} { color: ${value}; }`);
  const shorthand = compileGuard(`color: usx-when(${value});`);
  if (shorthand !== guarded) errors.push(`usx-when(${value}) differs from an explicit guard`);
}

for (const condition of ['null', 'false', '0', 'true']) {
  const guarded = compileGuard(`@if ${condition} { border: 1px solid red; }`);
  const composite = compileGuard(`border: usx-when(${condition}, 1px solid red);`);
  if (composite !== guarded) errors.push(`usx-when(${condition}, composite) differs from an explicit guard`);
}

for (const w of sassWarnings) errors.push(`sass warning: ${w}`);

if (themeVarRefs(defaultCss).length) {
  errors.push('default build contains theme var() references — unconfigured tokens must be omitted, not var()-wrapped');
}
for (const [label, css] of [['default', defaultCss], ['themed', themedCss]]) {
  if (/:\s*[^;{}]*\bnull\b/.test(css)) errors.push(`${label} build contains a literal "null" value — a composite declaration needs an @if guard`);
}

const seen = new Set();
for (const ref of themeVarRefs(themedCss)) {
  if (ref.fallback) errors.push(`themed build uses a fallback: var(${ref.fallback}) — fallbacks are not allowed`);
  if (!byVar.has(ref.name)) errors.push(`no manifest entry for ${ref.name}`);
  seen.add(ref.name);
}
for (const t of themeManifest) {
  if (!seen.has(t.cssVar) && !UNCONSUMED.has(t.cssVar)) errors.push(`manifest entry ${t.cssVar} never appears in compiled CSS`);
  if (seen.has(t.cssVar) && UNCONSUMED.has(t.cssVar)) errors.push(`${t.cssVar} is listed in UNCONSUMED but is now consumed — remove it from the list`);
  if (t.derivedFrom && !byName.has(t.derivedFrom)) errors.push(`${t.name}: derivedFrom "${t.derivedFrom}" is not a manifest token`);
}

if (errors.length) {
  console.error(`FAIL: theme check (${errors.length} issue(s)):`);
  for (const e of [...new Set(errors)]) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `PASS: theme check — default build fully static; themed build has ${seen.size} bare var(--usx-*) refs covering ${themeManifest.length} manifest entries; no fallbacks or null leaks.`
);
