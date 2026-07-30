// theme-derive-check.mjs — derivation parity test.
//
// Asserts that for every derived token in the manifest, applying the
// derivation (HSL delta) with the DEFAULT base color reproduces the token's
// default value within rounding tolerance. This guarantees the playground's
// auto-derived shades match the compiled defaults when the base is unchanged.
//
// Usage: node test/theme-derive-check.mjs   (from packages/usx-stories)

import { themeManifest, deriveShade, hexToRgb, getToken } from '../src/utils/themeDerive.js';

const TOLERANCE = 2; // per RGB channel

const errors = [];

for (const t of themeManifest) {
  if (!t.derivedFrom) continue;
  const base = getToken(t.derivedFrom);
  if (!base) {
    errors.push(`${t.name}: derivedFrom "${t.derivedFrom}" is not in the manifest`);
    continue;
  }
  const derived = deriveShade(base.defaultValue, base.defaultValue, t.defaultValue);
  const a = hexToRgb(derived);
  const b = hexToRgb(t.defaultValue);
  const delta = Math.max(Math.abs(a.r - b.r), Math.abs(a.g - b.g), Math.abs(a.b - b.b));
  if (delta > TOLERANCE) {
    errors.push(`${t.name}: identity derivation ${derived} != default ${t.defaultValue} (max channel delta ${delta})`);
  }
}

if (errors.length) {
  console.error(`FAIL: derivation parity (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

const derivedCount = themeManifest.filter((t) => t.derivedFrom).length;
console.log(`PASS: derivation parity — ${derivedCount} derived tokens reproduce their defaults (±${TOLERANCE}/channel).`);
