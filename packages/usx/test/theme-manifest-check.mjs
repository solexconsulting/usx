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
  '--usx-color-primary-lighter',
  '--usx-color-base-hover',
  '--usx-color-base-active',
  '--usx-color-base-100',
  '--usx-spacing-sm',
  '--usx-typography-font-family-base',
  '--usx-typography-font-size-base',
  '--usx-typography-font-weight-regular',
  '--usx-typography-font-weight-bold',
  '--usx-typography-line-height-base',
  // Semantic radius groups: components reference their own per-component
  // hook only (e.g. --usx-button-radius); the group var is consumed
  // indirectly via theme.css's fallback chain (--usx-button-radius:
  // var(--usx-radius-field)), never directly in compiled component CSS.
  '--usx-radius-box',
  '--usx-radius-field',
  '--usx-radius-selector',
  '--usx-radius-none',
  // Shared border-color group token: components reference their own
  // per-component hook only (e.g. --usx-tile-border-color); the group var
  // is consumed indirectly via theme.css's fallback chain
  // (--usx-tile-border-color: var(--usx-color-border)), never directly.
  '--usx-color-border'
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
