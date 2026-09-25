// derive.js — pure JS color derivation + theme serialization.
//
// Shared by build.js (bakes the prebuilt themes in presets.js into
// dist/themes*) and the Storybook Theme Playground (live controls + export).
//
// Derivation model: every derived shade in the manifest records its base token
// (`derivedFrom`). When the user picks a new base color, each shade is
// re-derived by applying the HSL delta between the DEFAULT base and the
// DEFAULT shade to the NEW base value. With the default base, this reproduces
// the default shade exactly (round-trip rounding aside) — see the derivation
// parity test.

import { themeManifest } from './theme-manifest.js';

export { themeManifest };

// ── Color conversion ─────────────────────────────────────────────────────────

export function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((ch) => ch + ch).join('');
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgbToHex({ r, g, b }) {
  const to2 = (v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

export function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb({ h, s, l }) {
  const hn = (((h % 360) + 360) % 360) / 360;
  const sn = Math.max(0, Math.min(100, s)) / 100;
  const ln = Math.max(0, Math.min(100, l)) / 100;
  if (sn === 0) {
    const v = ln * 255;
    return { r: v, g: v, b: v };
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const channel = (t) => {
    let tn = ((t % 1) + 1) % 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };
  return {
    r: channel(hn + 1 / 3) * 255,
    g: channel(hn) * 255,
    b: channel(hn - 1 / 3) * 255
  };
}

export const hexToHsl = (hex) => rgbToHsl(hexToRgb(hex));
export const hslToHex = (hsl) => rgbToHex(hslToRgb(hsl));

// ── Derivation ───────────────────────────────────────────────────────────────

// Re-derive a shade for a new base color by applying the HSL delta between
// the default base and the default shade.
export function deriveShade(newBaseHex, defaultBaseHex, defaultShadeHex) {
  const base = hexToHsl(defaultBaseHex);
  const shade = hexToHsl(defaultShadeHex);
  const next = hexToHsl(newBaseHex);
  if (base.s < 5) {
    // Achromatic default base (e.g. white surfaces, grays): its hue/sat delta
    // to the shade is ill-defined, so shift lightness only. A chromatic new
    // base keeps its own hue/sat; an achromatic one inherits the shade's.
    const keepShadeTint = next.s < 5;
    return hslToHex({
      h: keepShadeTint ? shade.h : next.h,
      s: keepShadeTint ? shade.s : next.s,
      l: next.l + (shade.l - base.l)
    });
  }
  return hslToHex({
    h: next.h + (shade.h - base.h),
    s: next.s + (shade.s - base.s),
    l: next.l + (shade.l - base.l)
  });
}

const byName = new Map(themeManifest.map((t) => [t.name, t]));

// build.js --watch re-imports the manifest with a cache-busting query, so it
// passes its own fresh copy in rather than relying on this module's import.
const indexCache = new WeakMap();
function indexOf(manifest) {
  if (manifest === themeManifest) return byName;
  let idx = indexCache.get(manifest);
  if (!idx) {
    idx = new Map(manifest.map((t) => [t.name, t]));
    indexCache.set(manifest, idx);
  }
  return idx;
}

export function getToken(name) {
  return byName.get(name);
}

// All manifest entries whose `derivedFrom` is `baseName`, restricted to the
// same `group` as the base itself. `derivedFrom` is also used by "component"
// tokens purely to auto-recompute when their underlying color changes (e.g.
// usx-accordion-content-bg → color-light); those aren't true
// palette "shades" and must not be nested under the base's Colors-panel
// control (they already get their own row under Component colors).
export function shadesOf(baseName) {
  const base = byName.get(baseName);
  return themeManifest.filter((t) => t.derivedFrom === baseName && (!base || t.group === base.group));
}

// Base (underived) color tokens — the primary playground controls.
export function baseColorTokens() {
  return themeManifest.filter(
    (t) => t.type === 'color' && !t.derivedFrom && t.group === 'color'
  );
}

// Compute the effective value of every manifest token given user overrides.
//
// overrides:  { [tokenName]: value } — explicit user-set values.
// autoDerive: { [baseName]: boolean } — when true (default), shades of a
//             changed base are re-derived unless individually overridden.
//
// Returns { [tokenName]: effectiveValue }.
export function resolveTheme(overrides = {}, autoDerive = {}, manifest = themeManifest) {
  const index = indexOf(manifest);
  const out = {};
  for (const t of manifest) {
    if (overrides[t.name] !== undefined && overrides[t.name] !== '') {
      out[t.name] = overrides[t.name];
      continue;
    }
    const base = t.derivedFrom && index.get(t.derivedFrom);
    const baseOverride = base && overrides[base.name];
    if (base && baseOverride && (autoDerive[base.name] ?? true)) {
      out[t.name] = deriveShade(baseOverride, base.defaultValue, t.defaultValue);
    } else {
      out[t.name] = t.defaultValue;
    }
  }
  return out;
}

// Build a { '--usx-*': value } style object of CHANGED tokens only.
export function themeToCssVars(resolved) {
  const vars = {};
  for (const t of themeManifest) {
    const value = resolved[t.name];
    if (value !== undefined && value.toLowerCase?.() !== t.defaultValue.toLowerCase()) {
      vars[t.cssVar] = value;
    } else if (value !== undefined && value !== t.defaultValue) {
      vars[t.cssVar] = value;
    }
  }
  return vars;
}

// Ordered [cssVar, value] pairs for a resolved theme (changed-only by default).
export function themeEntries(resolved, { changedOnly = true, manifest = themeManifest } = {}) {
  const entries = [];
  for (const t of manifest) {
    const value = resolved[t.name] ?? t.defaultValue;
    const changed = String(value).toLowerCase() !== t.defaultValue.toLowerCase();
    if (!changedOnly || changed) entries.push([t.cssVar, value]);
  }
  return entries;
}

// `data-theme` attribute value for a display name: "GOV.UK" → "gov-uk".
export function themeSlug(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// `color-scheme` hint for a resolved theme, judged by its page surface:
// tells the browser to render native UI (scrollbars, form controls) to match.
export function colorSchemeOf(resolved) {
  const surface = resolved['surface-1'];
  if (!/^#[0-9a-f]{3,8}$/i.test(surface || '')) return 'light';
  return hexToHsl(surface).l < 50 ? 'dark' : 'light';
}

export function themeSelector(name) {
  return `[data-theme="${themeSlug(name)}"]`;
}

// Generate an exportable CSS block. `selector` defaults to `:root`; pass a
// theme name via `name` to target `[data-theme="<slug>"]` instead.
export function themeToCss(resolved, { changedOnly = true, name, selector, colorScheme, manifest = themeManifest } = {}) {
  const lines = themeEntries(resolved, { changedOnly, manifest }).map(([cssVar, value]) => `  ${cssVar}: ${value};`);
  if (!lines.length && !name) return '/* No changes from the default theme. */\n';
  if (colorScheme) lines.unshift(`  color-scheme: ${colorScheme};`);
  return `${selector || (name ? themeSelector(name) : ':root')} {\n${lines.join('\n')}\n}\n`;
}

// A CSS value written so Sass parses it back to the same text: comma lists
// (font stacks) must be parenthesized or Sass reads them as more map entries.
export function toSassValue(value) {
  const v = String(value);
  return v.includes(',') ? `(${v})` : v;
}

// A `<slug>: ( ... )` map entry for the `$themes` config of
// `pkg:@solexllc/usx-theme/themes` — the same shape the prebuilt registry
// uses, so a Playground export pastes in alongside the built-in themes.
export function themeToSass(resolved, { name = 'custom', changedOnly = true, colorScheme, manifest = themeManifest, indent = '' } = {}) {
  const lines = [`${indent}  color-scheme: ${colorScheme || colorSchemeOf(resolved)},`];
  for (const [cssVar, value] of themeEntries(resolved, { changedOnly, manifest })) {
    lines.push(`${indent}  ${cssVar}: ${toSassValue(value)},`);
  }
  return `${indent}${themeSlug(name)}: (\n${lines.join('\n')}\n${indent}),\n`;
}
