// theme-check.mjs — the single theme guardrail test for the USX styles.
//
// Compiles both Sass entry points once and asserts the "static by default,
// no fallback" architecture plus manifest parity:
//   1. default build (src/index.scss, hooks null) has zero var(--usx-*) refs —
//      unconfigured tokens are dropped so USWDS defaults show through.
//   2. themed build (src/themed.scss, hooks on) uses only bare var(--usx-*)
//      refs — no compiled-in fallbacks; runtime values come from theme.css.
//   3. neither build leaks a literal "null" (an unguarded composite value).
//   4. every var(--usx-*) in the themed build has a manifest entry.
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
  '--usx-typography-font-family-base',
  '--usx-typography-font-size-base',
  '--usx-typography-font-weight-regular',
  '--usx-typography-font-weight-bold',
  '--usx-typography-line-height-base',
  '--usx-radius-box',
  '--usx-radius-field',
  '--usx-radius-selector',
  '--usx-radius-none',
  '--usx-border-width-md',
]);

// Every `var(--usx-…)` occurrence as { name, fallback }, nested-paren safe.
function usxVarRefs(css) {
  const refs = [];
  const marker = 'var(--usx-';
  let i = 0;
  while ((i = css.indexOf(marker, i)) !== -1) {
    let depth = 0;
    let j = i;
    for (; j < css.length; j++) {
      if (css[j] === '(') depth++;
      else if (css[j] === ')' && --depth === 0) break;
    }
    const inner = css.slice(i + 'var('.length, j);
    const comma = inner.indexOf(',');
    refs.push({ name: (comma === -1 ? inner : inner.slice(0, comma)).trim(), fallback: comma !== -1 ? inner : null });
    i += 'var('.length; // rescan inside for nested var(--usx-*)
  }
  return refs;
}

const errors = [];
const byVar = new Map(themeManifest.map((t) => [t.cssVar, t]));
const byName = new Map(themeManifest.map((t) => [t.name, t]));

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

if (usxVarRefs(defaultCss).length) {
  errors.push('default build contains var(--usx-*) references — unconfigured tokens must be omitted, not var()-wrapped');
}
for (const [label, css] of [['default', defaultCss], ['themed', themedCss]]) {
  if (/:\s*[^;{}]*\bnull\b/.test(css)) errors.push(`${label} build contains a literal "null" value — a composite declaration needs an @if guard`);
}

const seen = new Set();
for (const ref of usxVarRefs(themedCss)) {
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
