// themes-check.mjs — guardrail for the prebuilt-themes output.
//
//   1. every non-empty preset has a dist/themes/<slug>.css and appears in
//      dist/themes/all.css, each token there is a manifest cssVar, and the
//      values match a fresh resolveTheme() of the preset.
//   2. the Sass module (src/_themes.scss) compiles from a config fixture and
//      emits: :root for $default, a prefers-color-scheme block for
//      $prefersdark, one [data-theme] block per listed theme, user overrides
//      applied, and the union fill (every block declares the same tokens).
//   3. the Playground's Sass export round-trips through the module.
//   4. `pkg:@solexllc/usx-theme/themes` resolves unambiguously through Sass's
//      NodePackageImporter (a sibling `themes.css` export once broke this).
//   5. Sass emits no warnings.
//
// Usage: node test/themes-check.mjs   (from packages/usx-theme; also `pnpm test`)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import * as sass from 'sass';
import { themeManifest } from '../src/theme-manifest.js';
import { PRESETS } from '../src/presets.js';
import { getToken, shadesOf, resolveTheme, themeEntries, themeSlug, themeToCss, themeToCssVars, themeToSass } from '../src/derive.js';

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(pkgDir, 'dist');
const failures = [];
const fail = (msg) => failures.push(msg);

const cssVars = new Set(themeManifest.map((t) => t.cssVar));

for (const token of themeManifest) {
  if (/^(?:--)?usx-/.test(token.name) || /^(?:--)?usx-/.test(token.derivedFrom ?? '')) fail(`${token.name}: manifest configuration names must omit the namespace`);
  if (!token.cssVar.startsWith('--usx-')) fail(`${token.name}: public CSS variable lost its namespace`);
}
const canonicalConfig = { 'color-primary': '#3764a1', 'card-bg': '#123456', 'font-family': '"Example", Arial, sans-serif' };
const canonicalTheme = resolveTheme(canonicalConfig);
for (const [name, value] of Object.entries(canonicalConfig)) {
  if (canonicalTheme[name] !== value || getToken(name)?.name !== name) fail(`${name}: canonical configuration or token lookup failed`);
}
if (!shadesOf('color-primary').some((token) => token.name === 'color-primary-dark')) fail('canonical shade lookup lost the primary dark shade');
if (Object.keys(canonicalTheme).some((key) => /^(?:--)?usx-/.test(key))) fail('resolved themes must expose only canonical configuration names');

function expectConfigRejection(label, key, run) {
  try {
    run();
    fail(`${label}: invalid configuration key ${key} was accepted`);
  } catch (error) {
    if (!String(error.message).includes('Unknown theme configuration key') || !String(error.message).includes(key)) fail(`${label}: unexpected invalid-key error: ${error.message}`);
  }
}
for (const key of ['usx-color-primary', '--usx-color-primary', 'usx-card-bg', '--usx-card-bg', 'unknown-token']) {
  if (getToken(key) !== undefined || shadesOf(key).length) fail(`${key}: noncanonical token lookup must not resolve`);
  for (const [name, serialize] of Object.entries({ resolveTheme, themeEntries, themeToCssVars, themeToCss, themeToSass })) {
    expectConfigRejection(name, key, () => serialize({ ...canonicalConfig, [key]: '#abcdef' }));
  }
  expectConfigRejection('autoDerive', key, () => resolveTheme(canonicalConfig, { 'color-primary': true, [key]: false }));
}
const originalPrimaryDark = getToken('color-primary-dark')?.defaultValue;
if (canonicalTheme['color-primary-dark'] === originalPrimaryDark) fail('canonical base override must still derive its palette shades');
if (resolveTheme(canonicalConfig, { 'color-primary': false })['color-primary-dark'] !== originalPrimaryDark) fail('canonical autoDerive flag did not disable derivation');
const canonicalCssVars = themeToCssVars(canonicalTheme);
if (canonicalCssVars['--usx-card-bg'] !== '#123456' || Object.keys(canonicalCssVars).some((key) => !key.startsWith('--usx-'))) fail('CSS style exports must retain prefixed variable names');
if (!themeToCss(canonicalTheme).includes('--usx-card-bg: #123456;')) fail('CSS text export must retain prefixed variable names');
const canonicalSass = themeToSass(canonicalTheme, { name: 'Canonical Config' });
if (!/^\s+card-bg: #123456,/m.test(canonicalSass) || /^\s+(?:--)?usx-[\w-]+:/m.test(canonicalSass)) fail('Sass configuration export must use canonical keys');

// The border roles are independent of text/palette colors and remain live
// CSS aliases at the component layer, so scoped theme overrides propagate.
const borderDefaults = {
  'color-border': '#565c65',
  'color-border-subtle': '#dfe1e2',
  'color-border-muted': '#a9aeb1',
  'color-border-inverse': '#ffffff',
};
const borderParents = {
  'card-border-color': 'color-border-subtle',
  'checkable-tile-border': 'color-border-muted',
  'file-input-border': 'color-border-muted',
  'file-input-item-border': 'color-border-muted',
  'in-page-nav-border': 'color-border-muted',
  'pagination-button-border': 'color-border-muted',
  'range-slider-track-border': 'color-border',
  'range-slider-thumb-border': 'color-border',
  'sidenav-border': 'color-border-subtle',
  'task-list-border': 'color-border-subtle',
};
const resolvedDefault = resolveTheme();
const inverseAliases = {
  'surface-inverse': 'var(--usx-text-ink)',
  'tooltip-bg': 'var(--usx-surface-inverse)',
  'tooltip-text': 'var(--usx-text-inverse)',
};
for (const [name, value] of Object.entries(inverseAliases)) {
  if (resolvedDefault[name] !== value) fail(`${name}: missing live inverse-role alias`);
}
for (const [name, value] of Object.entries(borderDefaults)) {
  const token = themeManifest.find((entry) => entry.name === name);
  if (resolvedDefault[name] !== value || token?.type !== 'color') fail(`${name}: missing border color or incorrect default`);
  if (token?.derivedFrom) fail(`${name}: semantic border role must be independently configurable`);
}
for (const [name, parent] of Object.entries(borderParents)) {
  if (resolvedDefault[name] !== `var(--usx-${parent})`) fail(`${name}: border must follow ${parent}`);
}
if (resolvedDefault['step-indicator-segment-pending-border'] !== 'var(--usx-text-muted)') {
  fail('pending step indicator ring must follow its muted label text');
}
if (resolvedDefault['process-list-counter-border'] !== 'var(--usx-text-ink)') {
  fail('process counter border must inherit text-ink by default');
}
const inkBorders = ['table-border', 'collection-border', 'checkable-border'];
for (const name of inkBorders) {
  if (resolvedDefault[name] !== 'currentColor') fail(`${name}: default border must retain the component's ink color`);
}
for (const name of ['header-border-separator', 'header-border-bottom-mobile', 'header-nav-item-border', 'footer-primary-link-border-top', 'footer-nav-border-bottom']) {
  if (resolvedDefault[name] !== 'var(--usx-border-width-sm) solid var(--usx-color-border-subtle)') fail(`${name}: divider must follow the subtle border role`);
}
if (themeManifest.some((token) => token.group === 'component' && token.defaultValue.includes('var(--usx-color-border-inverse)'))) {
  fail('inverse border must remain available without changing default component borders');
}

const customBorderScale = {
  'color-border': '#135791',
  'color-border-subtle': '#246802',
  'color-border-muted': '#357913',
  'color-border-inverse': '#468024',
};
const scaleOnlyTheme = resolveTheme(customBorderScale);
if (scaleOnlyTheme['step-indicator-segment-pending-border'] !== 'var(--usx-text-muted)') {
  fail('shared border overrides must not change the pending step indicator ring');
}
if (scaleOnlyTheme['process-list-counter-border'] !== 'var(--usx-text-ink)') {
  fail('shared border overrides must not change the process counter ink outline');
}
for (const name of inkBorders) {
  if (scaleOnlyTheme[name] !== 'currentColor') fail(`${name}: changing shared border roles must not change its ink border`);
}
const customBorderOverrides = {
  ...customBorderScale,
  'table-border': '#def456',
  'collection-border': '#579135',
  'checkable-border': '#ad17ce',
  'process-list-counter-border': '#6a17bc',
  'process-list-counter-text': '#7b28cd',
};
const customBorderTheme = resolveTheme(customBorderOverrides);
for (const [name, value] of Object.entries(customBorderOverrides)) {
  if (customBorderTheme[name] !== value) fail(`${name}: explicit border override was not preserved`);
}
for (const [name, parent] of Object.entries(borderParents)) {
  if (!(name in customBorderOverrides) && customBorderTheme[name] !== `var(--usx-${parent})`) fail(`${name}: custom scale broke its runtime border alias`);
}
for (const name of inkBorders) {
  const value = 'var(--usx-color-border)';
  if (resolveTheme({ [name]: value })[name] !== value) fail(`${name}: explicit opt-in to a shared border role was not preserved`);
}

const headerBorders = {
  'header-border-top': '3px solid #005ea2',
  'header-border-bottom': '4px solid #237a3b',
  'header-border-separator': '2px dashed #a72f10',
  'header-border-bottom-mobile': '5px solid #8a3575',
  'header-nav-border-bottom-mobile': '6px solid #d1980b',
  'header-nav-item-border': 'none',
};
const resolvedBorders = resolveTheme(headerBorders);
for (const [name, value] of Object.entries(headerBorders)) {
  if (resolvedBorders[name] !== value) fail(`${name}: full border override was not preserved`);
  if (!themeManifest.some((token) => token.name === name && token.type === 'string')) fail(`${name}: border must be a string token, not a color`);
}

const footerBorders = {
  'footer-border-top': '3px solid #005ea2',
  'footer-border-bottom': '4px solid #237a3b',
  'footer-primary-section-border-top': '2px dashed #a72f10',
  'footer-secondary-section-border-top': '5px dotted #8a3575',
  'footer-primary-link-border-top': '2px dashed #237a3b',
  'footer-nav-border-bottom': '3px solid #d1980b',
};
for (const [name, value] of Object.entries(footerBorders)) {
  if (resolveTheme(footerBorders)[name] !== value) fail(`${name}: full border override was not preserved`);
  if (resolveTheme({ [name]: 'none' })[name] !== 'none') fail(`${name}: border could not be disabled`);
  if (!themeManifest.some((token) => token.name === name && token.type === 'string')) fail(`${name}: border must be a string token, not a color`);
}

const generatedFiles = fs.readdirSync(distDir, { recursive: true })
  .map((file) => path.join(distDir, file))
  .filter((file) => fs.statSync(file).isFile());
const previousWrites = new Map(generatedFiles.map((file) => [file, fs.statSync(file).mtimeMs]));
execFileSync(process.execPath, [path.join(pkgDir, 'build.js')]);
for (const [file, modified] of previousWrites) {
  if (fs.statSync(file).mtimeMs !== modified) fail(`unchanged build rewrote ${path.relative(distDir, file)}`);
}

const darkVisitedColors = { Borealis: '#c9a8ff', Midnight: '#b39ddb', Carbon: '#b39ddb' };
const visitedAlias = 'var(--usx-color-visited)';
const editedVisitedState = '#713bc6';
const editedVisitedLink = '#bc528d';
for (const [name, preset] of Object.entries(PRESETS)) {
  if (Object.keys(preset).some((key) => /^(?:--)?usx-/.test(key))) fail(`${name}: preset configuration keys must be canonical`);
  const resolved = resolveTheme(preset);
  if (resolved['pagination-button-radius'] !== 'var(--usx-radius-button)') fail(`${name}: pagination must inherit the shared button radius`);
  for (const token of ['tooltip-bg', 'tooltip-text']) {
    if (resolved[token] !== inverseAliases[token]) fail(`${name}: ${token} must inherit its inverse role`);
  }
  if (resolved['link-text-visited'] !== visitedAlias) fail(`${name}: visited links must inherit the shared visited state`);
  if (darkVisitedColors[name] && resolved['color-visited'] !== darkVisitedColors[name]) fail(`${name}: existing dark visited color changed`);

  const edited = resolveTheme({ ...preset, 'color-visited': editedVisitedState });
  if (edited['color-visited'] !== editedVisitedState || edited['link-text-visited'] !== visitedAlias) fail(`${name}: editing the shared visited state detached visited links`);
  const explicit = resolveTheme({ ...preset, 'color-visited': editedVisitedState, 'link-text-visited': editedVisitedLink });
  if (explicit['color-visited'] !== editedVisitedState || explicit['link-text-visited'] !== editedVisitedLink) fail(`${name}: explicit visited-link override must remain independent of the shared state`);

  const expectedFilter = ['Borealis', 'Midnight', 'Carbon'].includes(name)
    ? 'brightness(0) invert(1)' : 'none';
  if (resolved['footer-social-icon-filter'] !== expectedFilter) fail(`${name}: footer social icon filter mismatch`);
  if (resolved['footer-social-bg'] !== 'var(--usx-surface-2)') fail(`${name}: footer social background must follow surface-2`);
  if (resolved['footer-social-bg-hover'] !== 'var(--usx-surface-1)') fail(`${name}: footer social hover must follow surface-1`);
  if (['Borealis', 'Midnight', 'Carbon'].includes(name)) {
    for (const token of Object.keys(borderDefaults)) {
      if (!preset[token]) fail(`${name}: dark preset must define ${token}`);
    }
    if (new Set(['color-border', 'color-border-subtle', 'color-border-muted'].map((token) => resolved[token])).size !== 3) fail(`${name}: dark border roles must remain distinct`);
  }
}

// Parses `selector { decl; decl; }` blocks into [{ selector, decls: Map }].
// The one nested rule we emit (`@media (prefers-color-scheme: dark) { :root
// {…} }`) is flattened to a synthetic `@dark` selector first.
function parseBlocks(css) {
  const flat = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([^}]*)\}\s*\}/g, '@dark {$1}');
  const blocks = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(flat))) {
    const decls = new Map();
    for (const line of m[2].split(';')) {
      const idx = line.indexOf(':');
      if (idx > 0) decls.set(line.slice(0, idx).trim(), line.slice(idx + 1).trim());
    }
    blocks.push({ selector: m[1].trim(), decls });
  }
  return blocks;
}

// ── 1. dist/themes ──────────────────────────────────────────────────────────
const primitiveBlocks = parseBlocks(fs.readFileSync(path.join(distDir, 'tokens.css'), 'utf8'));
const primitiveVars = primitiveBlocks.flatMap((block) => [...block.decls.keys()]);
if (!primitiveVars.length) fail('primitive CSS export contains no variables');
for (const cssVar of primitiveVars) {
  if (!cssVar.startsWith('--usx-primitive-')) fail(`${cssVar}: primitive CSS variables must use their distinct namespace`);
  if (cssVars.has(cssVar)) fail(`${cssVar}: primitive and semantic CSS variables must not collide`);
}
const primitiveModule = fs.readFileSync(path.join(distDir, 'tokens.js'), 'utf8');
const primitiveData = JSON.parse(primitiveModule.match(/^module\.exports\s*=\s*([\s\S]*);\s*$/)?.[1] || '{}');
for (const group of ['color', 'spacing', 'typography', 'radius']) {
  const expected = JSON.parse(fs.readFileSync(path.join(pkgDir, 'src', 'primitives', `${group}.json`), 'utf8'));
  if (JSON.stringify(primitiveData[group]) !== JSON.stringify(expected)) fail(`${group}: JavaScript primitive token data changed during CSS namespacing`);
}
const allThemesCss = fs.readFileSync(path.join(distDir, 'themes', 'all.css'), 'utf8');
if (fs.existsSync(path.join(distDir, 'themes.css'))) fail('dist/themes.css must not exist — it makes pkg:.../themes ambiguous (see build.js)');
for (const [name, overrides] of Object.entries(PRESETS)) {
  const slug = themeSlug(name);
  if (slug === 'all') fail(`${name}: slug "all" collides with dist/themes/all.css`);
  const expected = new Map(themeEntries(resolveTheme(overrides)));
  const file = path.join(distDir, 'themes', `${slug}.css`);
  if (expected.size === 0) {
    if (fs.existsSync(file)) fail(`${slug}: preset changes nothing but dist/themes/${slug}.css exists`);
    continue;
  }
  if (!fs.existsSync(file)) {
    fail(`${slug}: missing dist/themes/${slug}.css`);
    continue;
  }
  const [block] = parseBlocks(fs.readFileSync(file, 'utf8'));
  if (block.selector !== `[data-theme="${slug}"]`) fail(`${slug}: selector is ${block.selector}`);
  if (!['light', 'dark'].includes(block.decls.get('color-scheme'))) fail(`${slug}: missing color-scheme`);
  block.decls.delete('color-scheme');
  for (const [cssVar, value] of block.decls) {
    if (!cssVars.has(cssVar)) fail(`${slug}: ${cssVar} is not a manifest token`);
    if (expected.get(cssVar) !== value) fail(`${slug}: ${cssVar} is ${value}, expected ${expected.get(cssVar)}`);
  }
  for (const cssVar of expected.keys()) {
    if (!block.decls.has(cssVar)) fail(`${slug}: ${cssVar} missing from dist/themes/${slug}.css`);
  }
  if (!allThemesCss.includes(`[data-theme="${slug}"]`)) fail(`${slug}: missing from dist/themes/all.css`);
}

// ── 2. Sass module ──────────────────────────────────────────────────────────
const sassWarnings = [];
const compile = (source) =>
  sass.compileString(source, {
    url: new URL('file://' + path.join(pkgDir, 'test', 'fixtures', 'inline.scss')),
    logger: { warn: (message) => sassWarnings.push(message.split('\n')[0]) }
  }).css;

for (const key of ['usx-card-bg', '--usx-card-bg', 'unknown-token']) {
  for (const source of [
    `@use '../../src/themes' with ($themes: (custom: (card-bg: #123456, ${key}: #abcdef)));`,
    `@use '../../src/themes'; @include themes.theme((card-bg: #123456, ${key}: #abcdef));`,
  ]) {
    try {
      compile(source);
      fail(`sass: invalid configuration key ${key} was accepted`);
    } catch (error) {
      if (!String(error.message).includes('is not a themeable token') || !String(error.message).includes(key)) fail(`sass: unexpected invalid-key error: ${error.message.split('\n')[0]}`);
    }
  }
}

const fixture = fs.readFileSync(path.join(pkgDir, 'test', 'fixtures', 'themes-config.scss'), 'utf8');
const blocks = parseBlocks(compile(fixture));
for (const block of blocks) {
  if ([...block.decls.keys()].some((key) => key !== 'color-scheme' && !key.startsWith('--usx-'))) fail('sass: canonical configuration emitted an unprefixed CSS property');
}
const bySelector = (sel) => blocks.find((b) => b.selector === sel || b.selector.endsWith(sel));

const root = blocks.find((b) => b.selector === ':root');
const dark = blocks.find((b) => b.selector === '@dark');
const forest = bySelector('[data-theme=forest]');
const carbon = bySelector('[data-theme=carbon]');
const acme = bySelector('[data-theme=acme]');
const tenant = bySelector('.tenant-x');

if (!root) fail('sass: no :root block for $default');
if (!dark) fail('sass: no prefers-color-scheme block for $prefersdark');
for (const [label, block] of Object.entries({ forest, carbon, acme, tenant })) {
  if (!block) fail(`sass: no block for ${label}`);
}
if (root && acme) {
  if (root.decls.get('--usx-color-primary') !== '#b00020') fail('sass: $default (acme) not applied on :root');
  if (root.decls.get('--usx-font-family') !== '"Acme Sans", Helvetica, sans-serif') fail('sass: quoted font list not preserved');
}
if (dark && dark.decls.get('--usx-color-primary') !== '#ff0000') fail('sass: user override on prebuilt carbon not applied in prefersdark');
if (carbon && carbon.decls.get('color-scheme') !== 'dark') fail('sass: carbon color-scheme should be dark');
if (forest && forest.decls.get('--usx-color-primary') !== '#2e7d32') fail('sass: forest primary wrong');
if (tenant && tenant.decls.get('--usx-color-secondary') !== '#123456') fail('sass: theme() mixin output wrong');

// Union fill: every emitted theme block declares exactly the same tokens.
const themed = [root, dark, forest, carbon, acme].filter(Boolean);
const keySets = themed.map((b) => [...b.decls.keys()].sort().join(','));
if (new Set(keySets).size !== 1) fail('sass: theme blocks do not share the same token set (union fill broken)');
if (acme && acme.decls.get('--usx-color-secondary') !== '#d83933') fail('sass: union fill did not fall back to the :root default');

// Unknown theme names must error, custom ones must have tokens.
try {
  compile("@use '../../src/themes' with ($themes: (nope,));");
  fail('sass: unknown theme name did not @error');
} catch (e) {
  if (!String(e.message).includes('unknown theme')) fail(`sass: unexpected error for unknown theme: ${e.message.split('\n')[0]}`);
}

// ── 3. Playground Sass export round-trip ────────────────────────────────────
const canonicalRoundTrip = parseBlocks(compile(`@use '../../src/themes' with ($themes: (\n${canonicalSass}));`));
const canonicalCopy = canonicalRoundTrip.find((block) => block.selector.endsWith('[data-theme=canonical-config]'));
for (const [cssVar, value] of themeEntries(canonicalTheme)) {
  if (canonicalCopy?.decls.get(cssVar) !== value) fail(`sass: canonical configuration round-trip lost ${cssVar}`);
}
const exported = themeToSass(resolveTheme(PRESETS.Forest), { name: 'Forest Copy' });
const roundTrip = parseBlocks(compile(`@use '../../src/themes' with ($themes: (\n${exported}));`));
const copy = roundTrip.find((b) => b.selector.endsWith('[data-theme=forest-copy]'));
if (!copy) fail('sass: Playground export did not produce a [data-theme=forest-copy] block');
else {
  for (const [cssVar, value] of themeEntries(resolveTheme(PRESETS.Forest))) {
    if (copy.decls.get(cssVar) !== value) fail(`sass export: ${cssVar} is ${copy.decls.get(cssVar)}, expected ${value}`);
  }
}

const borderExport = themeToSass(customBorderTheme, { name: 'Custom Borders' });
const borderRoundTrip = parseBlocks(compile(`@use '../../src/themes' with ($themes: (\n${borderExport}));`));
const customBorders = borderRoundTrip.find((block) => block.selector.endsWith('[data-theme=custom-borders]'));
if (!customBorders) fail('sass: border scale export did not produce a theme block');
else {
  for (const [name, value] of Object.entries(customBorderOverrides)) {
    const cssVar = `--usx-${name}`;
    if (customBorders.decls.get(cssVar) !== value) fail(`sass: ${name} border override did not survive export/import`);
  }
}

// Export both cases together so union fill must retain the shared-state
// alias for the inherited case while preserving an explicit link override.
const visitedCases = [
  { name: 'Visited State', overrides: { ...PRESETS.Midnight, 'color-visited': editedVisitedState }, linkColor: visitedAlias },
  { name: 'Visited Link', overrides: { ...PRESETS.Midnight, 'color-visited': editedVisitedState, 'link-text-visited': editedVisitedLink }, linkColor: editedVisitedLink },
];
const visitedExport = visitedCases.map(({ name, overrides }) => themeToSass(resolveTheme(overrides), { name })).join('\n');
const visitedBlocks = parseBlocks(compile(`@use '../../src/themes' with ($themes: (\n${visitedExport}));`));
for (const { name, linkColor } of visitedCases) {
  const block = visitedBlocks.find((entry) => entry.selector.endsWith(`[data-theme=${themeSlug(name)}]`));
  if (!block) fail(`sass: ${name} export did not produce a theme block`);
  else {
    if (block.decls.get('--usx-color-visited') !== editedVisitedState) fail(`sass: ${name} lost the shared visited-state edit`);
    if (block.decls.get('--usx-link-text-visited') !== linkColor) fail(`sass: ${name} changed visited-link inheritance during export/import`);
  }
}

const tooltipPalette = { ...PRESETS.Carbon, 'surface-inverse': '#bcd123', 'text-inverse': '#234bcd' };
const tooltipCases = [
  { name: 'Tooltip Inherited', overrides: tooltipPalette, background: inverseAliases['tooltip-bg'], text: inverseAliases['tooltip-text'] },
  { name: 'Tooltip Explicit', overrides: { ...tooltipPalette, 'tooltip-bg': '#7d3f81', 'tooltip-text': '#f1e2d3' }, background: '#7d3f81', text: '#f1e2d3' },
];
const tooltipExport = tooltipCases.map(({ name, overrides, background, text }) => {
  const resolved = resolveTheme(overrides);
  if (resolved['tooltip-bg'] !== background || resolved['tooltip-text'] !== text) fail(`${name}: inverse palette changes broke tooltip inheritance or explicit overrides`);
  return themeToSass(resolved, { name });
}).join('\n');
const tooltipBlocks = parseBlocks(compile(`@use '../../src/themes' with ($themes: (\n${tooltipExport}));`));
for (const { name, background, text } of tooltipCases) {
  const block = tooltipBlocks.find((entry) => entry.selector.endsWith(`[data-theme=${themeSlug(name)}]`));
  if (!block) fail(`sass: ${name} export did not produce a theme block`);
  else {
    if (block.decls.get('--usx-surface-inverse') !== '#bcd123' || block.decls.get('--usx-text-inverse') !== '#234bcd') fail(`sass: ${name} lost its inverse palette`);
    if (block.decls.get('--usx-tooltip-bg') !== background || block.decls.get('--usx-tooltip-text') !== text) fail(`sass: ${name} changed tooltip inheritance during export/import`);
  }
}

// ── 4. pkg: resolution from a consumer ──────────────────────────────────────
// Self-reference doesn't resolve from inside the package, so resolve from a
// sibling workspace package that depends on us (packages/usx).
const consumerDir = path.join(path.dirname(pkgDir), 'usx');
try {
  const css = sass.compileString("@use 'pkg:@solexllc/usx-theme/themes' with ($themes: (forest,));", {
    url: new URL('file://' + path.join(consumerDir, 'src', 'inline.scss')),
    importers: [new sass.NodePackageImporter(consumerDir)],
    logger: { warn: (message) => sassWarnings.push(message.split('\n')[0]) }
  }).css;
  if (!css.includes('[data-theme=forest]')) fail('pkg: import of themes compiled but emitted no forest block');
} catch (e) {
  fail(`pkg:@solexllc/usx-theme/themes failed to resolve: ${String(e.message).split('\n')[0]}`);
}

// ── 5. warnings ─────────────────────────────────────────────────────────────
for (const w of sassWarnings) fail(`sass warning: ${w}`);

if (failures.length) {
  console.error(`themes-check: ${failures.length} failure(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`themes-check: OK (${Object.keys(PRESETS).length} presets, ${blocks.length} compiled blocks)`);
