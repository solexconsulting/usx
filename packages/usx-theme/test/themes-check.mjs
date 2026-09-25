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
import * as sass from 'sass';
import { themeManifest } from '../src/theme-manifest.js';
import { PRESETS } from '../src/presets.js';
import { resolveTheme, themeEntries, themeSlug, themeToSass } from '../src/derive.js';

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(pkgDir, 'dist');
const failures = [];
const fail = (msg) => failures.push(msg);

const cssVars = new Set(themeManifest.map((t) => t.cssVar));

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

const fixture = fs.readFileSync(path.join(pkgDir, 'test', 'fixtures', 'themes-config.scss'), 'utf8');
const blocks = parseBlocks(compile(fixture));
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
const exported = themeToSass(resolveTheme(PRESETS.Forest), { name: 'Forest Copy' });
const roundTrip = parseBlocks(compile(`@use '../../src/themes' with ($themes: (\n${exported}));`));
const copy = roundTrip.find((b) => b.selector.endsWith('[data-theme=forest-copy]'));
if (!copy) fail('sass: Playground export did not produce a [data-theme=forest-copy] block');
else {
  for (const [cssVar, value] of themeEntries(resolveTheme(PRESETS.Forest))) {
    if (copy.decls.get(cssVar) !== value) fail(`sass export: ${cssVar} is ${copy.decls.get(cssVar)}, expected ${value}`);
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
