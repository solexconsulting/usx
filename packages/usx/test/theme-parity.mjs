// theme-parity.mjs — asserts the "static by default, no fallback" guarantee:
//
// 1. The default build (src/index.scss, all hooks null) contains zero
//    var(--usx-*) references — tokens that aren't configured are simply
//    omitted (Sass drops null declarations), so USWDS/baked defaults show
//    through untouched.
// 2. The themed build (src/themed.scss, all hooks enabled) uses var(--usx-*)
//    with NO fallback — runtime values come solely from usx-theme's
//    generated theme.css (:root), never from a compiled-in fallback.
//
// Usage: node test/theme-parity.mjs   (from packages/usx)

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'usx-theme-parity-'));

function compile(entry, out) {
  execFileSync('npx', ['sass', '--pkg-importer=node', '--no-source-map', '--quiet', entry, out], {
    cwd: pkgDir,
    stdio: ['ignore', 'inherit', 'inherit']
  });
  return fs.readFileSync(out, 'utf8');
}

const defaultCss = compile('src/index.scss', path.join(tmpDir, 'default.css'));
const themedCss = compile('src/themed.scss', path.join(tmpDir, 'themed.css'));

// Assertion 1: the default build is fully static — zero --usx-* var references.
if (defaultCss.includes('var(--usx-')) {
  console.error('FAIL: default build contains var(--usx-*) references — tokens must be omitted, not var()-wrapped, when no hook is configured.');
  process.exit(1);
}

// Assertion 2: also check for a stray literal "null" leaking into CSS — the
// classic symptom of an unguarded composite value (e.g. `1px solid null`).
if (/:\s*[^;{}]*\bnull\b/.test(defaultCss) || /:\s*[^;{}]*\bnull\b/.test(themedCss)) {
  console.error('FAIL: compiled CSS contains a literal "null" value — a composite declaration needs an @if guard.');
  process.exit(1);
}

// Assertion 3: every var(--usx-*) reference in the themed build is bare —
// no fallback. Handles nested parens (e.g. advanced radius chaining to a
// group var).
const marker = 'var(--usx-';
let bareCount = 0;
let i = 0;
while ((i = themedCss.indexOf(marker, i)) !== -1) {
  let depth = 0;
  let j = i;
  for (; j < themedCss.length; j++) {
    if (themedCss[j] === '(') depth++;
    else if (themedCss[j] === ')') {
      depth--;
      if (depth === 0) break;
    }
  }
  const inner = themedCss.slice(i + 'var('.length, j);
  if (inner.includes(',')) {
    console.error(`FAIL: themed build has a fallback on var(${inner}) — no fallbacks are allowed under the no-static architecture.`);
    process.exit(1);
  }
  bareCount++;
  i = j + 1;
}

console.log(`PASS: theme parity — default build is fully static (0 var(--usx-*)); themed build has ${bareCount} bare var(--usx-*) references (no fallbacks); no stray "null" values.`);
fs.rmSync(tmpDir, { recursive: true, force: true });

