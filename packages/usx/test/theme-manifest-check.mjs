// theme-manifest-check.mjs — asserts the theme manifest stays in sync with
// the themed (hooks-enabled) compiled CSS:
//
// 1. Every var(--usx-*) reference in the themed build is bare (no fallback)
//    and belongs to a manifest entry.
// 2. Every manifest entry appears at least once in the themed build, unless
//    listed in UNCONSUMED (published for downstream Sass consumers only).
//
// Usage: node test/theme-manifest-check.mjs   (from packages/usx)

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'usx-theme-manifest-'));
const outFile = path.join(tmpDir, 'usx.css');

execFileSync('npx', ['sass', '--pkg-importer=node', '--no-source-map', '--quiet', 'src/themed.scss', outFile], {
  cwd: pkgDir,
  stdio: ['ignore', 'inherit', 'inherit']
});
const css = fs.readFileSync(outFile, 'utf8');

const byVar = new Map(themeManifest.map((t) => [t.cssVar, t]));
const seen = new Set();
const errors = [];

// Tokens published by the theme layer but not (yet) consumed by any usx
// component CSS. Still themeable for downstream Sass consumers. If one of
// these starts appearing in compiled CSS, remove it from this list.
const UNCONSUMED = new Set([
  '--usx-color-primary-light',
  '--usx-color-primary-vivid',
  '--usx-color-secondary-lighter',
  '--usx-color-secondary-light',
  '--usx-color-secondary-vivid',
  '--usx-color-secondary-dark',
  '--usx-color-accent-cool-lighter',
  '--usx-color-accent-cool-dark',
  '--usx-color-accent-cool-darker',
  '--usx-color-accent-warm-lighter',
  '--usx-color-accent-warm-dark',
  '--usx-color-accent-warm-darker',
  '--usx-color-base-lightest',
  '--usx-color-base-lighter',
  '--usx-color-base-light',
  '--usx-color-base-dark',
  '--usx-color-base-darkest',
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
  // State colors only consumed indirectly, via theme.css's fallback chain
  // (e.g. --usx-link-visited-color: var(--usx-color-visited)), never
  // referenced directly in compiled component CSS — same as color-border.
  '--usx-color-focus',
  '--usx-color-visited',
  '--usx-spacing-sm',
  '--usx-typography-font-family-base',
  '--usx-typography-font-size-base',
  '--usx-typography-font-weight-regular',
  '--usx-typography-font-weight-bold',
  '--usx-typography-line-height-base',
  // Semantic radius groups: components reference their own per-component
  // hook only (e.g. --usx-radius-button); the group var is consumed
  // indirectly via theme.css's fallback chain (--usx-radius-button:
  // var(--usx-radius-field)), never directly in compiled component CSS.
  '--usx-radius-box',
  '--usx-radius-field',
  '--usx-radius-selector',
  '--usx-radius-none',
  // Shared border-color group token: components reference their own
  // per-component hook only (e.g. --usx-tile-border-color); the group var
  // is consumed indirectly via theme.css's fallback chain
  // (--usx-tile-border-color: var(--usx-color-border)), never directly.
  '--usx-color-border',
  // Same reasoning as the radius groups above: components reference their
  // own per-component hook only (e.g. --usx-task-list-outer-border-width);
  // the group var is consumed indirectly via theme.css's fallback chain,
  // never directly in compiled component CSS.
  '--usx-border-width-md'
]);

// Walk every var(--usx-*) occurrence, extracting the name (nested-paren safe).
// No fallback is allowed under the no-static architecture.
const marker = 'var(--usx-';
let i = 0;
while ((i = css.indexOf(marker, i)) !== -1) {
  let depth = 0;
  let j = i;
  for (; j < css.length; j++) {
    if (css[j] === '(') depth++;
    else if (css[j] === ')') {
      depth--;
      if (depth === 0) break;
    }
  }
  const inner = css.slice(i + 'var('.length, j);
  const comma = inner.indexOf(',');
  const cssVar = (comma === -1 ? inner : inner.slice(0, comma)).trim();

  if (comma !== -1) {
    errors.push(`${cssVar} used with a fallback (var(${inner})) — fallbacks are not allowed`);
  }

  const entry = byVar.get(cssVar);
  if (!entry) {
    errors.push(`no manifest entry for ${cssVar}`);
  } else {
    seen.add(cssVar);
  }
  i = i + 'var('.length; // rescan inside for nested var(--usx-*), if any
}

for (const t of themeManifest) {
  if (!seen.has(t.cssVar) && !UNCONSUMED.has(t.cssVar)) {
    errors.push(`manifest entry ${t.cssVar} never appears in compiled CSS`);
  }
}

fs.rmSync(tmpDir, { recursive: true, force: true });

if (errors.length) {
  console.error(`FAIL: theme manifest drift (${errors.length} issue(s)):`);
  for (const e of [...new Set(errors)]) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`PASS: theme manifest — ${themeManifest.length} entries all match compiled CSS (bare var() refs, no fallbacks).`);
