// useLiveTokenValues.js — reads the *actual* resolved value of every
// @solexllc/usx-theme token from the live :root cascade, so documentation
// pages can show what the currently active Storybook theme (toolbar preset,
// or the Playground's own edits) really renders — not just each token's
// static default.
//
// Custom properties don't resolve nested var() references at computed-value
// time (e.g. `--usx-color-primary-hover: var(--usx-color-primary-dark)`
// reads back literally as that string, never the dark color itself) — that
// substitution only happens once a custom property is used by a real CSS
// property. So a plain getComputedStyle read isn't enough; this follows the
// var() chain manually until it bottoms out at a literal value.
import { useEffect, useState } from 'react';
import { themeManifest } from '@solexllc/usx-theme/theme-manifest';

const VAR_REF = /^var\((--[\w-]+)\)$/;

function readRawValues() {
  const declared = new Map();

  // Read declared CSS rules from styleSheets (in reverse order so later style tags/presets take priority)
  try {
    for (let s = document.styleSheets.length - 1; s >= 0; s--) {
      const sheet = document.styleSheets[s];
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (!rules) continue;
        for (let r = rules.length - 1; r >= 0; r--) {
          const rule = rules[r];
          const sel = rule.selectorText;
          if (sel && (sel === ':root' || sel === '[data-theme]' || sel.includes(':root'))) {
            for (let i = 0; i < rule.style.length; i++) {
              const name = rule.style[i];
              if (name.startsWith('--usx-') && !declared.has(name)) {
                const val = rule.style.getPropertyValue(name).trim();
                if (val) declared.set(name, val);
              }
            }
          }
        }
      } catch {
        // Skip cross-origin stylesheets if inaccessible
      }
    }
  } catch {
    // document.styleSheets can throw in non-browser environments
  }

  const computed = getComputedStyle(document.documentElement);
  const raw = new Map();
  for (const t of themeManifest) {
    const declaredVal = declared.get(t.cssVar);
    if (declaredVal) {
      raw.set(t.cssVar, declaredVal);
    } else {
      const computedVal = computed.getPropertyValue(t.cssVar).trim();
      raw.set(t.cssVar, computedVal !== '' ? computedVal : t.defaultValue);
    }
  }
  return raw;
}

function resolveChain(cssVar, raw, seen) {
  const value = raw.get(cssVar);
  if (value === undefined) return undefined;
  const match = VAR_REF.exec(value);
  if (!match || seen.has(cssVar)) return value;
  const resolved = resolveChain(match[1], raw, new Set(seen).add(cssVar));
  return resolved ?? value;
}

// `themeKey` (e.g. the toolbar's `context.globals.theme`) is only used as an
// effect dependency, to force a re-read whenever the active theme changes.
export function useLiveTokenValues(themeKey) {
  const [values, setValues] = useState(() => ({ raw: new Map(), resolved: new Map() }));

  useEffect(() => {
    const rawMap = readRawValues();
    const resolvedMap = new Map();
    for (const t of themeManifest) {
      resolvedMap.set(t.name, resolveChain(t.cssVar, rawMap, new Set()) ?? t.defaultValue);
    }
    setValues({ raw: rawMap, resolved: resolvedMap });
  }, [themeKey]);

  return values;
}

export function getLiveValue(values, token) {
  if (values && values.resolved) {
    return values.resolved.get(token.name) ?? token.defaultValue;
  }
  if (values && typeof values.get === 'function') {
    return values.get(token.name) ?? token.defaultValue;
  }
  return token.defaultValue;
}

export function getRawLiveValue(values, token) {
  if (values && values.raw) {
    const val = values.raw.get(token.cssVar);
    return (val !== undefined && val !== '') ? val : token.defaultValue;
  }
  if (values && typeof values.get === 'function') {
    return values.get(token.name) ?? token.defaultValue;
  }
  return token.defaultValue;
}
