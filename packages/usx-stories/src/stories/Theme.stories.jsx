import React, { useMemo, useState, useEffect } from 'react';
import { useGlobals } from 'storybook/preview-api';

import {
  themeManifest,
  baseColorTokens,
  shadesOf,
  resolveTheme,
  themeToCss,
  hslToHex,
  hexToRgb,
  getToken
} from '../utils/themeDerive.js';
import { PRESETS, headerFooterBorderOverrides, headerNavBackgroundOverrides } from '../utils/themePresets.js';
import { systemColors } from '@solexllc/usx-theme/system-colors';


// Showcase components
import Accordion from '../../../core/src/components/accordion/Accordion.jsx';
import Alert from '../../../core/src/components/alert/Alert.tsx';
import Attribution from '../../../core/src/components/attribution/Attribution.tsx';
import Banner from '../../../core/src/components/banner/Banner.tsx';
import Block from '../../../core/src/components/block/Block.tsx';
import Breadcrumb from '../../../core/src/components/breadcrumb/Breadcrumb.tsx';
import Button from '../../../core/src/components/button/Button.tsx';
import ButtonGroup from '../../../core/src/components/button-group/ButtonGroup.tsx';
import Checkbox from '../../../core/src/components/checkbox/Checkbox.tsx';
import Clickable from '../../../core/src/components/clickable/Clickable.tsx';
import Code from '../../../core/src/components/code/Code.tsx';
import Collection from '../../../core/src/components/collection/Collection.tsx';
import CopyToClipboard from '../../../core/src/components/copy-to-clipboard/CopyToClipboard.tsx';
import DatePicker from '../../../core/src/components/date-picker/DatePicker.jsx';
import Eyebrow from '../../../core/src/components/eyebrow/Eyebrow.tsx';
import FileInput from '../../../core/src/components/file-input/FileInput.jsx';
import Footer from '../../../core/src/components/footer/Footer.tsx';
import Header from '../../../core/src/components/header/Header.tsx';
import Hero from '../../../core/src/components/hero/Hero.tsx';
import IconList from '../../../core/src/components/icon-list/IconList.tsx';
import Input from '../../../core/src/components/input/Input.tsx';
import Link from '../../../core/src/components/link/Link.tsx';
import List from '../../../core/src/components/list/List.tsx';
import MiscBanner from '../../../core/src/components/misc-banner/MiscBanner.tsx';
import Pagination from '../../../core/src/components/pagination/Pagination.tsx';
import ProcessList from '../../../core/src/components/process-list/ProcessList.tsx';
import Prose from '../../../core/src/components/prose/Prose.tsx';
import RadioButtons from '../../../core/src/components/radio-buttons/RadioButtons.tsx';
import Search from '../../../core/src/components/search/Search.tsx';
import Select from '../../../core/src/components/select/Select.tsx';
import SideNav from '../../../core/src/components/sidenav/SideNav.tsx';
import SiteAlert from '../../../core/src/components/site-alert/SiteAlert.tsx';
import Spinner from '../../../core/src/components/spinner/Spinner.tsx';
import Status from '../../../core/src/components/status/Status.tsx';
import StepIndicator from '../../../core/src/components/step-indicator/StepIndicator.tsx';
import SummaryBox from '../../../core/src/components/summary-box/SummaryBox.tsx';
import Swap from '../../../core/src/components/swap/Swap.tsx';
import Switch from '../../../core/src/components/switch/Switch.tsx';
import Table from '../../../core/src/components/table/Table.jsx';
import Tag from '../../../core/src/components/tag/Tag.tsx';
import TaskList from '../../../core/src/components/task-list/TaskList.tsx';
import TextArea from '../../../core/src/components/text-area/TextArea.tsx';
import datePicker from '@uswds/uswds/js/usa-date-picker';
import fileInput from '@uswds/uswds/js/usa-file-input';

export default {
  title: 'Documentation/Theme/Playground',
  tags: ['USX'],
  parameters: { layout: 'fullscreen' },
};

// ── Presets ──────────────────────────────────────────────────────────────────
// Preset palette definitions live in ../utils/themePresets.js (shared with
// the Storybook toolbar theme toggle).

// Base color tokens shown in the playground, split into the same groups the
// USWDS design token docs use — plus one USX-specific "Environment colors"
// group (beta/test/dev banner tones) and a "Surface & text colors" group for
// the neutral surface/border/ink roles that don't fit either theme or state.
// Each entry gets its own collapsed row (see ColorGroupRow) that expands to
// reveal the base color's control and all of its derived shades together.
const THEME_COLOR_NAMES = ['color-primary', 'color-secondary', 'color-accent-cool', 'color-accent-warm', 'color-base'];
const STATE_COLOR_NAMES = ['color-info', 'color-warning', 'color-error', 'color-success', 'color-emergency', 'color-disabled', 'color-focus', 'color-visited'];
const ENVIRONMENT_COLOR_NAMES = ['color-beta', 'color-test', 'color-dev'];
// The former single "Surface & text colors" flat list, split into 3
// component-style groups (see SURFACE_TEXT_GROUPS below) — surfaces,
// borders (currently just color-border, but may gain more later) and text
// — since these are sibling tokens rather than a base-color-plus-shades
// relationship.
const SURFACE_COLOR_NAMES = ['surface-1', 'surface-2', 'surface-3'];
const BORDER_COLOR_NAMES = ['color-border'];
const TEXT_COLOR_NAMES = ['text', 'text-muted', 'text-subtle', 'text-inverse'];
const SURFACE_TEXT_COLOR_NAMES = [...SURFACE_COLOR_NAMES, ...BORDER_COLOR_NAMES, ...TEXT_COLOR_NAMES];
const SURFACE_TEXT_GROUPS = [
  { label: 'Surfaces', names: SURFACE_COLOR_NAMES },
  { label: 'Borders', names: BORDER_COLOR_NAMES },
  { label: 'Text', names: TEXT_COLOR_NAMES }
];
const GROUPED_COLOR_NAMES = [
  ...THEME_COLOR_NAMES,
  ...STATE_COLOR_NAMES,
  ...ENVIRONMENT_COLOR_NAMES,
  ...SURFACE_TEXT_COLOR_NAMES
];

const RANDOMIZED = ['color-primary', 'color-secondary', 'color-accent-cool', 'color-accent-warm'];
const SURFACE_NAMES = ['surface-1', 'surface-2', 'surface-3'];

// Fixed x-axis columns for the lightest-\u2192darkest color-scale grid, in
// lightness order. Every row (theme/state color) is laid out against these
// SAME named columns — 'default' matches the base token itself (no
// suffix) — so a cell's position is always identified by a color name (y)
// + one of these labels (x), rather than a per-row computed sort. Colors
// that don't have a given rung (e.g. only color-base has lightest/darkest;
// only primary/secondary have a real vivid) just render a blank cell.
const LIGHTNESS_LADDER_STEPS = [
  { key: 'lightest', label: 'Lightest' },
  { key: 'lighter', label: 'Lighter' },
  { key: 'light', label: 'Light' },
  { key: 'default', label: 'Default' },
  { key: 'dark', label: 'Dark' },
  { key: 'darker', label: 'Darker' },
  { key: 'darkest', label: 'Darkest' }
];

// Builds one row of the color-scale grid: one cell per LIGHTNESS_LADDER_STEPS
// entry, populated only if that shade actually exists in the manifest for
// this base color — otherwise the cell comes back blank (name/hex both
// null) instead of being skipped, so column position stays aligned across
// every row.
function buildScaleRow(baseName, resolved) {
  return LIGHTNESS_LADDER_STEPS.map(({ key }) => {
    const name = key === 'default' ? baseName : `${baseName}-${key}`;
    const token = getToken(name);
    return token ? { name, hex: resolved[name] } : { name: null, hex: null };
  });
}


// Component-scoped tokens (the "hardcoded-hex promotions" in theme-manifest.js)
// grouped by the component they belong to, matched by name prefix. Order here
// is the display order in the "Component colors" section. Any manifest entry
// with group 'component' that doesn't match one of these prefixes still shows
// up, bucketed into a trailing "Other" group, so a newly-added token is never
// silently dropped from the playground.
// Tokens whose effect is conditional on markup/context the name alone
// doesn't convey — surfaced as a tooltip on the control (see ColorControl).
const TOKEN_NOTES = {
  'usx-header-nav-bg': 'only applies when the header uses the .usa-header--extended layout (desktop width)',
  'usx-header-nav-bg-mobile': 'only applies when the header uses the .usa-header--extended layout (mobile off-canvas drawer)'
};

const COMPONENT_COLOR_GROUPS = [
  { label: 'Link', prefix: 'usx-link-' },
  { label: 'Summary Box', prefix: 'usx-summary-box-' },
  { label: 'Accordion', prefix: 'usx-accordion-' },
  { label: 'Banner', prefix: 'usx-banner-' },
  { label: 'Misc Banner', prefix: 'usx-misc-banner-' },
  { label: 'Carousel', prefix: 'usx-carousel-' },
  { label: 'Step Indicator', prefix: 'usx-step-indicator-' },
  { label: 'Task List', prefix: 'usx-task-list-' },
  { label: 'Clickable', prefix: 'usx-clickable-' },
  { label: 'Checkable (Checkbox/Radio/Tile)', prefix: 'usx-checkable-' },
  { label: 'SideNav', prefix: 'usx-sidenav-' },
  { label: 'Header', prefix: 'usx-header-', extra: ['usx-header-nav-bg', 'usx-header-nav-bg-mobile', 'usx-header-nav-link-bg-hover', 'usx-header-nav-link-text', 'usx-header-nav-link-text-mobile', 'usx-header-nav-link-text-hover', 'usx-header-nav-link-text-hover-mobile'] },
  { label: 'Footer', prefix: 'usx-footer-' },
  { label: 'Table', prefix: 'usx-table-' },
  { label: 'Tooltip', prefix: 'usx-tooltip-' },
  { label: 'Icon List', prefix: 'usx-icon-list-' },
  { label: 'Logo', prefix: 'usx-logo-' }
];

// Splits a flat list of component-group tokens into the ordered groups
// above. A token whose `derivedFrom` points at another token already in the
// same group (e.g. usx-carousel-dot-color-hover -> usx-carousel-dot-color)
// is left out of the group's own list here — renderColor() already surfaces
// it as a nested "shades" entry under its base, so listing it again at the
// top level would just show it twice.
function groupComponentColors(tokens) {
  const used = new Set();
  const groups = COMPONENT_COLOR_GROUPS.map(({ label, prefix, extra }) => {
    const members = tokens.filter((t) => t.name.startsWith(prefix) || (extra && extra.includes(t.name)));
    members.forEach((t) => used.add(t.name));
    const names = new Set(members.map((t) => t.name));
    const topLevel = members.filter((t) => !(t.derivedFrom && names.has(t.derivedFrom)));
    return { label, tokens: topLevel };
  }).filter((g) => g.tokens.length > 0);

  const leftover = tokens.filter((t) => !used.has(t.name));
  if (leftover.length > 0) {
    const names = new Set(leftover.map((t) => t.name));
    const topLevel = leftover.filter((t) => !(t.derivedFrom && names.has(t.derivedFrom)));
    groups.push({ label: 'Other', tokens: topLevel });
  }
  return groups;
}


// The summary box sits on its own fixed "info" tint (cyan-5/cyan-20) rather
// than the main surface/text system, so its background never follows a
// randomized dark theme — but its text/link colors DO `derivedFrom` the
// randomized 'text'/'color-primary' bases and would otherwise cascade via
// resolveTheme(), e.g. flipping to white text on a background that stays
// light. Pin all of these to their designed defaults; only its (unrelated)
// radius token is left free to vary.
const SUMMARY_BOX_PINNED_COLORS = [
  'usx-summary-box-bg',
  'usx-summary-box-border-color',
  'usx-summary-box-text',
  'usx-summary-box-link-text',
  'usx-summary-box-link-text-hover',
  'usx-summary-box-link-text-visited'
];

function pinSummaryBoxColors(overrides) {
  SUMMARY_BOX_PINNED_COLORS.forEach((name) => {
    overrides[name] = getToken(name).defaultValue;
  });
}

function randomPalette() {
  const overrides = {};
  RANDOMIZED.forEach((name) => {
    overrides[name] = hslToHex({ h: Math.random() * 360, s: Math.random() * 100, l: Math.random() * 100 });
  });

  // Decide light vs. dark ONCE, up front (~50/50), then generate all three
  // surfaces together within a matching lightness band. Randomizing each
  // surface's lightness independently (the old behavior) could mix a dark
  // surface-1 with still-light surface-2/3, which not only looked broken
  // but also meant a coherent "dark theme" only emerged by chance for
  // whichever single surface got randomized.
  //
  // The three lightness picks are then sorted and assigned in the SAME
  // relative order as the defaults (surface-2 darkest, surface-3 middle,
  // surface-1 lightest — see the surface-1/2/3 role comment above their
  // manifest entries) instead of handed out to whichever surface name came
  // up first. Without this, three independent random draws could just as
  // easily invert that order (e.g. a lighter surface-2 than surface-1), and
  // any component placing them side by side — like the table's
  // header/stripe/body backgrounds — would end up with an arbitrary,
  // incoherent-looking hierarchy instead of a consistent one.
  const isDark = Math.random() < 0.5;
  const hue = Math.random() * 360;
  const saturation = Math.random() * 20;
  const [surfMin, surfMax] = isDark ? [4, 20] : [86, 100];
  const surfaceLightnesses = [0, 0, 0]
    .map(() => surfMin + Math.random() * (surfMax - surfMin))
    .sort((a, b) => a - b);
  overrides['surface-2'] = hslToHex({ h: hue, s: saturation, l: surfaceLightnesses[0] });
  overrides['surface-3'] = hslToHex({ h: hue, s: saturation, l: surfaceLightnesses[1] });
  overrides['surface-1'] = hslToHex({ h: hue, s: saturation, l: surfaceLightnesses[2] });

  // Dividers/borders (table footer rule, sticky-column shadow, header/
  // footer/sidenav/tile rules) live in the same neutral family as the
  // surfaces, one lightness band further in from the extreme — a bit darker
  // than the light surfaces, a bit lighter than the dark ones — so they stay
  // a visible divider against whichever surface tone the theme lands on
  // instead of blending in or vanishing. color-border isn't itself one of
  // the SURFACE_NAMES, so it needs its own explicit override here.
  {
    const [min, max] = isDark ? [22, 38] : [68, 84];
    const lightness = min + Math.random() * (max - min);
    overrides['color-border'] = hslToHex({ h: hue, s: saturation, l: lightness });
  }
  Object.assign(overrides, headerFooterBorderOverrides(), headerNavBackgroundOverrides());

  // A dark surface set → the default dark ink (text) would be unreadable, so
  // swap in a light color instead. Same reasoning for secondary/muted text
  // (text-subtle) and visited links (usx-link-visited-color) — their
  // light-mode defaults are just as illegible against a dark surface.
  // text-inverse must flip the other way (back to a dark ink) so it stays
  // the opposite of text instead of also going light-on-light. The tooltip
  // (whose own defaults are theme-invariant — always a dark chip with light
  // text) then follows text/text-inverse here so it flips right along with
  // the rest of the dark theme instead of staying a dark-on-dark chip.
  if (isDark) {
    overrides['text'] = '#ffffff';
    overrides['text-muted'] = '#d1d1d6';
    overrides['text-subtle'] = '#b9b9bb';
    overrides['text-inverse'] = '#1b1b1b';
    overrides['usx-link-text-visited'] = '#b39ddb';
    overrides['usx-tooltip-bg'] = overrides['text'];
    overrides['usx-tooltip-text'] = overrides['text-inverse'];
    // Same reasoning as the Midnight/Carbon/Borealis presets in
    // themePresets.js: color-base-light is too close to a light 'text' for
    // the calendar icon to stay visible on hover/active.
    overrides['usx-date-picker-button-hover-active-bg'] = '#565c65';
  }
  pinSummaryBoxColors(overrides);
  return overrides;
}

// Same overrides shape as randomPalette(), but every hex value is sourced
// from the real USWDS system-color table (system-colors.generated.js, via
// the familyNames/gradesFor/lookupHex helpers below) instead of arbitrary
// HSL math — so every "random" result is guaranteed to be an actual USWDS
// family/grade combination, not just an arbitrary hex.
const NEUTRAL_FAMILIES = ['gray', 'gray-cool', 'gray-warm'];

function randomSystemPalette() {
  const overrides = {};
  // Family/grade/vivid selections for the RANDOMIZED tokens (all of which
  // have a real systemDefault and render via FamilyGradeColorControl), so
  // the playground's family/grade selects can be synced to match — not just
  // the resulting hex.
  const selections = {};
  RANDOMIZED.forEach((name) => {
    const family = familyNames[Math.floor(Math.random() * familyNames.length)];
    const vivid = familyHasVivid(family) && Math.random() < 0.5;
    const grades = gradesFor(family, vivid);
    const grade = grades[Math.floor(Math.random() * grades.length)];
    overrides[name] = lookupHex(family, grade, vivid);
    selections[name] = { family, grade, vivid };
  });

  // Same "decide dark/light once, then keep the 3 surfaces cohesive"
  // approach as randomPalette(), but sampling from one neutral gray
  // family's real grade scale instead of a continuous HSL lightness ramp.
  // Same reasoning as randomPalette() above for the sort-then-assign step:
  // it keeps surface-2 the darkest of the three, surface-3 the middle, and
  // surface-1 the lightest, regardless of which grades get picked, so the
  // relative hierarchy never inverts.
  const isDark = Math.random() < 0.5;
  const surfaceFamily = NEUTRAL_FAMILIES[Math.floor(Math.random() * NEUTRAL_FAMILIES.length)];
  const surfaceGrades = gradesFor(surfaceFamily, false);
  const pool = isDark ? surfaceGrades.slice(-6) : surfaceGrades.slice(0, 6);
  const surfacePicks = [0, 0, 0]
    .map(() => pool[Math.floor(Math.random() * pool.length)])
    .sort((a, b) => Number(a) - Number(b));
  overrides['surface-2'] = lookupHex(surfaceFamily, surfacePicks[2], false);
  overrides['surface-3'] = lookupHex(surfaceFamily, surfacePicks[1], false);
  overrides['surface-1'] = lookupHex(surfaceFamily, surfacePicks[0], false);

  // Same reasoning as randomPalette() above: a border/divider grade from the
  // same neutral family, one band further in from the surface pool's extreme
  // so it stays a visible divider against whichever surface grade the theme
  // lands on. Falls back to the surface pool itself if the family's scale is
  // too short to have a distinct further-in band.
  const borderPool = (isDark ? surfaceGrades.slice(-12, -6) : surfaceGrades.slice(6, 12)) || [];
  const borderGrades = borderPool.length ? borderPool : pool;
  const borderGrade = borderGrades[Math.floor(Math.random() * borderGrades.length)];
  overrides['color-border'] = lookupHex(surfaceFamily, borderGrade, false);
  Object.assign(overrides, headerFooterBorderOverrides(), headerNavBackgroundOverrides());

  // See randomPalette() above for why text-inverse flips opposite of text
  // and the tooltip follows both.
  if (isDark) {
    overrides['text'] = '#ffffff';
    overrides['text-muted'] = lookupHex('gray-cool', '20') || '#d1d1d6';
    overrides['text-subtle'] = lookupHex('gray-cool', '30') || '#b9b9bb';
    overrides['text-inverse'] = '#1b1b1b';
    overrides['usx-link-text-visited'] = '#b39ddb';
    overrides['usx-tooltip-bg'] = overrides['text'];
    overrides['usx-tooltip-text'] = overrides['text-inverse'];
    // See randomPalette() above for why this can't just chain to
    // color-base-light.
    overrides['usx-date-picker-button-hover-active-bg'] = '#565c65';
  }
  pinSummaryBoxColors(overrides);
  return { overrides, selections };
}

// ── Small UI helpers (playground chrome only — intentionally not themed) ─────

// Scoped stylesheet for the playground's own chrome (interactive states that
// inline styles can't express: hover, focus-visible, the <details> marker).
// This is presentation for the tool itself, not themed USX output.
const PLAYGROUND_CSS = `
.usx-pg { --pg-line: #e5e7eb; --pg-muted: #6b7280; --pg-accent: #2563eb; --pg-accent-soft: rgba(37,99,235,.12); }
.usx-pg-btn {
  font: inherit; font-size: .78rem; font-weight: 500; line-height: 1;
  padding: .45rem .75rem; border-radius: 999px; border: 1px solid var(--pg-line);
  background: #fff; color: #1f2937; cursor: pointer; transition: all .12s ease;
}
.usx-pg-btn:hover { background: #f3f4f6; border-color: #d1d5db; }
.usx-pg-btn:active { transform: translateY(1px); }
.usx-pg-btn:focus-visible { outline: 2px solid var(--pg-accent); outline-offset: 2px; }
.usx-pg-btn.is-active { background: var(--pg-accent); border-color: var(--pg-accent); color: #fff; }
.usx-pg-btn.is-ghost { background: transparent; }
.usx-pg-section { border-bottom: 1px solid var(--pg-line); }
.usx-pg-section:last-child { border-bottom: none; }
.usx-pg-summary {
  display: flex; align-items: center; justify-content: space-between; gap: .5rem;
  list-style: none; cursor: pointer; user-select: none; padding: .85rem .1rem;
  font-size: .74rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
  color: #374151; transition: color .12s ease;
}
.usx-pg-summary::-webkit-details-marker { display: none; }
.usx-pg-summary:hover { color: var(--pg-accent); }
.usx-pg-summary::after {
  content: ''; width: .5rem; height: .5rem; flex-shrink: 0;
  border-right: 2px solid #9ca3af; border-bottom: 2px solid #9ca3af;
  transform: rotate(-45deg); transition: transform .15s ease; margin-right: .2rem;
}
.usx-pg-section[open] > .usx-pg-summary::after { transform: rotate(45deg); }
.usx-pg-count {
  font-weight: 500; font-size: .68rem; text-transform: none; letter-spacing: normal;
  color: var(--pg-muted); background: #f3f4f6; border-radius: 999px; padding: .1rem .45rem;
  margin-right: auto; margin-left: .4rem;
}
.usx-pg-row { display: flex; align-items: center; gap: .55rem; padding: .4rem .5rem; border-radius: 6px; transition: background .12s ease; }
.usx-pg-row:hover { background: #f9fafb; }
.usx-pg-row.is-overridden { background: var(--pg-accent-soft); }
.usx-pg-row.is-overridden:hover { background: var(--pg-accent-soft); }
.usx-pg-swatch {
  width: 1.75rem; height: 1.75rem; border-radius: 50%; padding: 0; cursor: pointer;
  border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); background: none;
  transition: box-shadow .12s ease, transform .12s ease; flex-shrink: 0;
}
.usx-pg-swatch:hover { transform: scale(1.08); box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 0 0 3px var(--pg-accent-soft); }
.usx-pg-swatch:focus-visible { outline: none; box-shadow: 0 0 0 1px rgba(0,0,0,.25), 0 0 0 3px var(--pg-accent); }
.usx-pg-label { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .78rem; color: #1f2937; }
.usx-pg-value { font-size: .7rem; opacity: .65; font-family: ui-monospace, Menlo, monospace; }
.usx-pg-input {
  width: 6rem; font: inherit; font-size: .78rem; font-family: ui-monospace, Menlo, monospace;
  padding: .3rem .45rem; border-radius: 6px; border: 1px solid var(--pg-line); background: #fff;
  transition: border-color .12s ease, box-shadow .12s ease;
}
.usx-pg-input:focus { outline: none; border-color: var(--pg-accent); box-shadow: 0 0 0 3px var(--pg-accent-soft); }
.usx-pg-reset {
  width: 1.3rem; height: 1.3rem; flex-shrink: 0; border: none; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center; font-size: .85rem; line-height: 1;
  background: transparent; color: var(--pg-muted); transition: all .12s ease;
}
.usx-pg-reset:hover { background: #fee2e2; color: #dc2626; }
.usx-pg-shades-toggle { cursor: pointer; font-size: .7rem; color: var(--pg-accent); opacity: .85; margin: .15rem 0 .35rem 2.75rem; }
.usx-pg-shades-toggle:hover { opacity: 1; text-decoration: underline; }
.usx-pg-shades-toggle::-webkit-details-marker { display: none; }
.usx-pg-color-group { border-radius: 6px; margin-bottom: .05rem; }
.usx-pg-color-header {
  display: flex; align-items: center; gap: .55rem; width: 100%;
  padding: .4rem .5rem; border: none; border-radius: 6px; background: none;
  font: inherit; text-align: left; cursor: pointer; transition: background .12s ease;
}
.usx-pg-color-header:hover { background: #f9fafb; }
.usx-pg-color-header.is-overridden { background: var(--pg-accent-soft); }
.usx-pg-color-header.is-overridden:hover { background: var(--pg-accent-soft); }
.usx-pg-color-chevron {
  width: .5rem; height: .5rem; flex-shrink: 0;
  border-right: 2px solid #9ca3af; border-bottom: 2px solid #9ca3af;
  transform: rotate(-45deg); transition: transform .15s ease;
}
.usx-pg-color-group.is-expanded .usx-pg-color-chevron { transform: rotate(45deg); }
.usx-pg-color-body { padding: .1rem .25rem .35rem 1.85rem; display: flex; flex-direction: column; gap: .1rem; }
.usx-pg-row-fg {
  flex-direction: column; align-items: stretch; flex-wrap: nowrap;
  gap: .4rem; padding: .55rem .5rem; border: 1px solid transparent;
}
.usx-pg-row-fg:hover { border-color: var(--pg-line); }
.usx-pg-row-fg.is-overridden { border-color: var(--pg-accent-soft); }
.usx-pg-fg-top { display: flex; align-items: center; gap: .55rem; }
.usx-pg-fg-details {
  display: flex; align-items: center; gap: .5rem; flex-wrap: wrap;
  padding-left: 2.3rem;
}
.usx-pg-fg-hex { margin-left: auto; }
.usx-pg-swatch-static {
  display: inline-block; width: 1.75rem; height: 1.75rem; border-radius: 50%;
  border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); flex-shrink: 0;
}
.usx-pg-select {
  font: inherit; font-size: .72rem; padding: .25rem .35rem; border-radius: 6px;
  border: 1px solid var(--pg-line); background: #fff; color: #1f2937;
}
.usx-pg-select-grade { width: 4rem; }
.usx-pg-select, .usx-pg-select-grade { padding: .32rem .4rem; }
.usx-pg-vivid-toggle {
  display: inline-flex; align-items: center; gap: .2rem; font-size: .68rem;
  color: var(--pg-muted); white-space: nowrap;
}
.usx-pg-mode-toggle {
  font: inherit; font-size: .65rem; font-weight: 600; padding: .2rem .4rem; border-radius: 999px;
  border: 1px solid var(--pg-line); background: #fff; color: var(--pg-muted); cursor: pointer;
  text-transform: uppercase; letter-spacing: .03em; flex-shrink: 0;
}
.usx-pg-mode-toggle:hover { color: var(--pg-accent); border-color: var(--pg-accent); }
.usx-pg-textarea {
  width: 100%; height: 9rem; font: .72rem/1.5 ui-monospace, Menlo, monospace; box-sizing: border-box;
  padding: .6rem; border-radius: 8px; border: 1px solid #2d3339; background: #1e2227; color: #d4d8de; resize: vertical;
}
.usx-pg-textarea:focus { outline: none; border-color: var(--pg-accent); }
.usx-pg-container { display: flex; align-items: flex-start; }
.usx-pg-sidebar {
  width: 24rem; flex-shrink: 0; height: 100vh; position: sticky; top: 0;
  display: flex; flex-direction: column;
}
.usx-pg-sidebar-body { flex: 1; min-height: 0; overflow-y: auto; }
.usx-pg-main { min-height: 100vh; }
.usx-pg-drawer-handle, .usx-pg-drawer-backdrop, .usx-pg-fab, .usx-pg-drawer-close { display: none; }
@media (max-width: 720px) {
  /* align-items: flex-start (set above for the desktop row layout) becomes
     a cross-axis rule once flex-direction flips to column here, so it stops
     items stretching to full width — shrinking .usx-pg-main to its content's
     preferred width and letting the header/nav render (and get clipped) at
     that wider, desktop-intended size instead of the viewport width. */
  .usx-pg-container { flex-direction: column; align-items: stretch; }
  /* Sidebar becomes a bottom-sheet drawer: fixed/off-canvas by default,
     slid into view over the showcase instead of pushing it down the page. */
  .usx-pg-sidebar {
    position: fixed; top: auto; right: 0; bottom: 0; left: 0;
    width: 100%; height: 82vh; max-height: 82vh;
    border-right: none; border-top: 1px solid var(--pg-line);
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 -8px 28px rgba(15, 23, 42, 0.22);
    z-index: 60;
    transform: translateY(100%);
    transition: transform 0.25s ease;
  }
  .usx-pg-sidebar.is-open { transform: translateY(0); }
  .usx-pg-sidebar-body { flex: 1; overflow-y: auto; }
  .usx-pg-main { min-height: 0; padding-bottom: 4.5rem; }
  .usx-pg-drawer-handle {
    display: block; width: 2.5rem; height: 0.3rem; border-radius: 999px;
    background: var(--pg-line); margin: 0.6rem auto 0.1rem; flex-shrink: 0;
  }
  .usx-pg-drawer-close {
    display: inline-flex; align-items: center; justify-content: center;
    width: 1.9rem; height: 1.9rem; border-radius: 50%; border: none;
    background: #f3f4f6; color: #374151; font-size: 1rem; cursor: pointer; flex-shrink: 0;
  }
  .usx-pg-drawer-backdrop {
    display: block; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.45);
    z-index: 50; opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
  }
  .usx-pg-drawer-backdrop.is-open { opacity: 1; pointer-events: auto; }
  .usx-pg-fab {
    display: flex; align-items: center; gap: 0.4rem; position: fixed; right: 1rem; bottom: 1rem;
    z-index: 55; padding: 0.75rem 1.15rem; border-radius: 999px; border: none;
    background: #111827; color: #fff; font: inherit; font-size: 0.8rem; font-weight: 600;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28); cursor: pointer;
  }
  .usx-pg-fab-count {
    background: rgba(255, 255, 255, 0.2); border-radius: 999px; padding: 0.05rem 0.45rem; font-size: 0.72rem;
  }
}
`;

const ui = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #e5e7eb',
    background: '#fff',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '0.85rem'
  },
  sidebarHeader: {
    flexShrink: 0,
    padding: '1.1rem 1.1rem 0.9rem',
    borderBottom: '1px solid #e5e7eb',
    background: '#fafbfc'
  },
  sidebarBody: {
    padding: '0.2rem 1.1rem 1.1rem'
  },
  chipRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.35rem 0' },
  card: {
    border: '1px solid var(--usx-border, #e2e8f0)',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    minWidth: 0
  },
  cardTitle: { margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.6 }
};

function Section({ title, children, open = false, count }) {
  return (
    <details open={open} className="usx-pg-section">
      <summary className="usx-pg-summary">
        <span>{title}</span>
        {count !== undefined && <span className="usx-pg-count">{count}</span>}
      </summary>
      <div style={{ paddingBottom: '0.6rem' }}>{children}</div>
    </details>
  );
}

function ColorControl({ token, value, isOverridden, onChange, onClear }) {
  const note = TOKEN_NOTES[token.name];
  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <input
        type="color"
        aria-label={token.name}
        value={value}
        onChange={(e) => onChange(token.name, e.target.value)}
        className="usx-pg-swatch"
      />
      <span className="usx-pg-label" title={note ? `${token.cssVar} \u2014 ${note}` : token.cssVar}>
        {token.name.replace(/^color-|^usx-/, '')}
      </span>
      <code className="usx-pg-value">{value}</code>
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

const ACCORDION_ICON_POSITION_VALUES = {
  start: {
    position: '1.25rem auto',
    paddingStart: '3.5rem',
    paddingEnd: '1.25rem'
  },
  end: {
    position: 'auto 1.25rem',
    paddingStart: '1.25rem',
    paddingEnd: '2.5rem'
  }
};

function AccordionIconPositionControl({ token, value, isOverridden, onChange, onClear }) {
  const selected = value === ACCORDION_ICON_POSITION_VALUES.end.position ? 'end' : 'start';
  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <span className="usx-pg-label" title={token.cssVar}>Accordion icon position</span>
      <select
        aria-label={token.name}
        className="usx-pg-select"
        value={selected}
        onChange={(e) => {
          const next = ACCORDION_ICON_POSITION_VALUES[e.target.value];
          onChange(token.name, next.position);
          onChange('usx-accordion-icon-padding-start', next.paddingStart);
          onChange('usx-accordion-icon-padding-end', next.paddingEnd);
        }}
      >
        <option value="start">Start</option>
        <option value="end">End</option>
      </select>
      <code className="usx-pg-value">{selected}</code>
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

const LOGO_VARIANT_VALUES = {
  default: { display: 'block', inverse: 'none' },
  inverse: { display: 'none', inverse: 'block' }
};

function LogoVariantControl({ token, value, isOverridden, onChange, onClear }) {
  const selected = value === LOGO_VARIANT_VALUES.inverse.display ? 'inverse' : 'default';
  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <span className="usx-pg-label" title={token.cssVar}>Logo variant</span>
      <select
        aria-label={token.name}
        className="usx-pg-select"
        value={selected}
        onChange={(e) => {
          const next = LOGO_VARIANT_VALUES[e.target.value];
          onChange(token.name, next.display);
          onChange('usx-logo-inverse-display', next.inverse);
        }}
      >
        <option value="default">Default</option>
        <option value="inverse">Inverse (white)</option>
      </select>
      <code className="usx-pg-value">{selected}</code>
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

// System palette helpers — pure lookups against the generated USWDS
// system-color table (system-colors.generated.js). No hand-authored values.
const familyNames = Object.keys(systemColors).sort();

function familyHasVivid(family) {
  return Object.keys(systemColors[family]?.vivid || {}).length > 0;
}

function gradesFor(family, vivid) {
  const scale = vivid ? systemColors[family]?.vivid : systemColors[family]?.grades;
  return Object.keys(scale || {}).sort((a, b) => Number(a) - Number(b));
}

function lookupHex(family, grade, vivid) {
  const scale = vivid ? systemColors[family]?.vivid : systemColors[family]?.grades;
  return (scale && scale[grade]) || null;
}

// Finds the closest real system-palette entry (any grade, vivid or not)
// within `family` to `hex` — used to keep a derived shade a genuine system
// color (matching its base's chosen family) instead of an arbitrary
// HSL-derived hex belonging to no real swatch.
function nearestSystemColor(hex, family) {
  const target = hexToRgb(hex);
  let best = null;
  const consider = (grade, vivid) => {
    const candidateHex = lookupHex(family, grade, vivid);
    if (!candidateHex) return;
    const rgb = hexToRgb(candidateHex);
    const dist = (rgb.r - target.r) ** 2 + (rgb.g - target.g) ** 2 + (rgb.b - target.b) ** 2;
    if (!best || dist < best.dist) best = { grade, vivid, hex: candidateHex, dist };
  };
  gradesFor(family, false).forEach((g) => consider(g, false));
  if (familyHasVivid(family)) gradesFor(family, true).forEach((g) => consider(g, true));
  return best;
}

// Reverse lookup: does `hex` exactly equal a real system swatch (in any
// family)? Lets a plain hex override — from a preset, a pasted value, an
// imported CSS block — be recognized and displayed as a system color
// instead of always falling back to "custom" just because it wasn't picked
// via the family/grade selects this session.
function findSystemColorMatch(hex) {
  const target = hex?.toLowerCase();
  if (!target) return null;
  for (const family of familyNames) {
    for (const grade of gradesFor(family, false)) {
      if (lookupHex(family, grade, false)?.toLowerCase() === target) return { family, grade, vivid: false };
    }
    if (familyHasVivid(family)) {
      for (const grade of gradesFor(family, true)) {
        if (lookupHex(family, grade, true)?.toLowerCase() === target) return { family, grade, vivid: true };
      }
    }
  }
  return null;
}

// Theme/state color tokens with a real USWDS counterpart (token.systemDefault)
// get this control instead of a plain hex picker: family + grade selects
// mirror how USWDS itself points `$theme-color-*` settings at the system
// palette. A "hex" toggle escapes to the existing custom color input for
// off-system branding.
function FamilyGradeColorControl({ token, value, isOverridden, onChange, onClear, selection }) {
  const def = token.systemDefault;
  const [mode, setMode] = useState(isOverridden ? 'custom' : 'system');
  const [family, setFamily] = useState(def.family);
  const [grade, setGrade] = useState(def.grade);
  const [vivid, setVivid] = useState(!!def.vivid);

  // Re-sync the selector to the token's real default whenever its override
  // is cleared externally (Reset all, switching presets, the row's own ×).
  useEffect(() => {
    if (!isOverridden) {
      setMode('system');
      setFamily(def.family);
      setGrade(def.grade);
      setVivid(!!def.vivid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOverridden, token.name]);

  // Sync to an externally-applied family/grade/vivid selection (e.g. the
  // "Random (System)" button), rather than only reacting to the resulting
  // hex value. Keyed on the `selection` object reference so it fires once
  // per external assignment and doesn't fight later manual edits.
  useEffect(() => {
    if (selection) {
      setMode('system');
      setFamily(selection.family);
      setGrade(selection.grade);
      setVivid(!!selection.vivid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const applySystem = (nextFamily, nextGrade, nextVivid) => {
    const hex = lookupHex(nextFamily, nextGrade, nextVivid);
    if (hex) onChange(token.name, hex, { family: nextFamily, grade: nextGrade, vivid: nextVivid });
  };

  return (
    <div className={`usx-pg-row usx-pg-row-fg${isOverridden ? ' is-overridden' : ''}`}>
      <div className="usx-pg-fg-top">
        {mode === 'system' ? (
          <span className="usx-pg-swatch-static" style={{ background: value }} aria-hidden="true" />
        ) : (
          <input
            type="color"
            aria-label={token.name}
            value={value}
            onChange={(e) => onChange(token.name, e.target.value)}
            className="usx-pg-swatch"
          />
        )}
        <span className="usx-pg-label" title={token.cssVar}>
          {token.name.replace(/^color-/, '')}
        </span>
        <code className="usx-pg-value usx-pg-fg-hex">{value}</code>
        <button
          type="button"
          className="usx-pg-mode-toggle"
          title={mode === 'system' ? 'Switch to a custom hex value' : 'Switch to family + grade'}
          onClick={() => {
            const next = mode === 'system' ? 'custom' : 'system';
            setMode(next);
            // Leaving system mode: drop the recorded family/grade so any
            // dependent shade stops treating this as a system color.
            if (next === 'custom') onChange(token.name, value);
          }}
        >
          {mode === 'system' ? 'hex' : 'sys'}
        </button>
        {isOverridden && (
          <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
            ×
          </button>
        )}
      </div>
      {mode === 'system' && (
        <div className="usx-pg-fg-details">
          <select
            aria-label={`${token.name} family`}
            className="usx-pg-select"
            value={family}
            onChange={(e) => {
              const nextFamily = e.target.value;
              const nextVivid = familyHasVivid(nextFamily) ? vivid : false;
              const grades = gradesFor(nextFamily, nextVivid);
              const nextGrade = grades.includes(grade) ? grade : grades[0];
              setFamily(nextFamily);
              setVivid(nextVivid);
              setGrade(nextGrade);
              applySystem(nextFamily, nextGrade, nextVivid);
            }}
          >
            {familyNames.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          <select
            aria-label={`${token.name} grade`}
            className="usx-pg-select usx-pg-select-grade"
            value={grade}
            onChange={(e) => {
              const nextGrade = e.target.value;
              setGrade(nextGrade);
              applySystem(family, nextGrade, vivid);
            }}
          >
            {gradesFor(family, vivid).map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {familyHasVivid(family) && (
            <label className="usx-pg-vivid-toggle">
              <input
                type="checkbox"
                checked={vivid}
                onChange={(e) => {
                  const nextVivid = e.target.checked;
                  const grades = gradesFor(family, nextVivid);
                  const nextGrade = grades.includes(grade) ? grade : grades[0];
                  setVivid(nextVivid);
                  setGrade(nextGrade);
                  applySystem(family, nextGrade, nextVivid);
                }}
              />
              vivid
            </label>
          )}
        </div>
      )}
    </div>
  );
}

// A single collapsed color row within a group (Theme/State/Environment/
// Surface & text colors). Collapsed by default, showing only a swatch +
// name; expanding it reveals the base color's own control plus all of its
// derived shades together, so there's no separate nested "shades" toggle to
// dig through. `expanded`/`onToggleExpand` are lifted to the playground so
// only one color across the whole panel can be open at a time.
function ColorGroupRow({ token, resolved, overrides, systemSelections, onChange, onClear, expanded, onToggleExpand }) {
  const shades = shadesOf(token.name).filter((s) => !GROUPED_COLOR_NAMES.includes(s.name));
  const isOverridden = overrides[token.name] !== undefined || shades.some((s) => overrides[s.name] !== undefined);
  const Control = token.systemDefault ? FamilyGradeColorControl : ColorControl;

  return (
    <div className={`usx-pg-color-group${expanded ? ' is-expanded' : ''}`}>
      <button
        type="button"
        className={`usx-pg-color-header${isOverridden ? ' is-overridden' : ''}`}
        aria-expanded={expanded}
        onClick={onToggleExpand}
      >
        <span className="usx-pg-swatch-static" style={{ background: resolved[token.name] }} aria-hidden="true" />
        <span className="usx-pg-label">{token.name.replace(/^color-/, '')}</span>
        <span className="usx-pg-color-chevron" aria-hidden="true" />
      </button>
      {expanded && (
        <div className="usx-pg-color-body">
          <Control
            token={token}
            value={resolved[token.name]}
            isOverridden={overrides[token.name] !== undefined}
            onChange={onChange}
            onClear={onClear}
            selection={systemSelections[token.name]}
          />
          {shades.map((s) => {
            const ShadeControl = s.systemDefault ? FamilyGradeColorControl : ColorControl;
            return (
              <ShadeControl
                key={s.name}
                token={s}
                value={resolved[s.name]}
                isOverridden={overrides[s.name] !== undefined}
                onChange={onChange}
                onClear={onClear}
                selection={systemSelections[s.name]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// A collapsed group of MULTIPLE distinct color tokens that belong together
// (a component's colors — Link, Accordion, Table, etc. — or, since this
// task, a base-color umbrella like Surfaces/Borders/Text) rather than one
// base color and its derived shades. Deliberately has NO swatch preview in
// the collapsed header — unlike ColorGroupRow, a single swatch can't stand
// in for several unrelated colors (surface-1/2/3, text/text-subtle/
// text-inverse, etc.), so showing one would be misleading. Expanding it
// reveals every member token at once, each rendered via the playground's
// own renderColor (so derived shades, if any, still nest under their own
// base token).
function TokenColorGroup({ label, tokens, overrides, expanded, onToggleExpand, renderColor }) {
  const isOverridden = tokens.some((t) => overrides[t.name] !== undefined);

  return (
    <div className={`usx-pg-color-group${expanded ? ' is-expanded' : ''}`}>
      <button
        type="button"
        className={`usx-pg-color-header${isOverridden ? ' is-overridden' : ''}`}
        aria-expanded={expanded}
        onClick={onToggleExpand}
      >
        <span className="usx-pg-label">{label}</span>
        <span className="usx-pg-count">{tokens.length}</span>
        <span className="usx-pg-color-chevron" aria-hidden="true" />
      </button>
      {expanded && <div className="usx-pg-color-body">{tokens.map(renderColor)}</div>}
    </div>
  );
}

function TextControl({ token, value, isOverridden, onChange, onClear }) {
  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <span className="usx-pg-label" title={token.cssVar}>{token.name}</span>
      <input
        type="text"
        aria-label={token.name}
        value={value}
        onChange={(e) => onChange(token.name, e.target.value)}
        className="usx-pg-input"
      />
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

// Curated set of common font-family stacks offered in the dropdown for any
// `type: 'font-family'` token. "Other…" always falls back to a free-text
// input so any custom stack can still be entered.
const FONT_FAMILY_OPTIONS = [
  { label: 'Source Sans Pro (USWDS default)', value: 'Source Sans Pro Web, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif' },
  { label: 'Public Sans', value: 'Public Sans Web, Helvetica Neue, Helvetica, Roboto, Arial, sans-serif' },
  { label: 'Merriweather (serif)', value: 'Merriweather Web, Georgia, Cambria, "Times New Roman", Times, serif' },
  { label: 'Georgia (serif)', value: 'Georgia, Cambria, "Times New Roman", Times, serif' },
  { label: 'System UI', value: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }
];
const FONT_FAMILY_OTHER = '__other__';

function FontFamilyControl({ token, value, isOverridden, onChange, onClear }) {
  const matchedOption = FONT_FAMILY_OPTIONS.find((o) => o.value === value);
  const [customMode, setCustomMode] = useState(!matchedOption);

  const selectValue = customMode ? FONT_FAMILY_OTHER : (matchedOption ? matchedOption.value : FONT_FAMILY_OTHER);

  return (
    <div className={`usx-pg-row${isOverridden ? ' is-overridden' : ''}`}>
      <span className="usx-pg-label" title={token.cssVar}>{token.name}</span>
      <select
        aria-label={`${token.name} preset`}
        className="usx-pg-select"
        value={selectValue}
        onChange={(e) => {
          const next = e.target.value;
          if (next === FONT_FAMILY_OTHER) {
            setCustomMode(true);
          } else {
            setCustomMode(false);
            onChange(token.name, next);
          }
        }}
      >
        {FONT_FAMILY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
        <option value={FONT_FAMILY_OTHER}>Other…</option>
      </select>
      {customMode && (
        <input
          type="text"
          aria-label={`${token.name} custom value`}
          value={value}
          onChange={(e) => onChange(token.name, e.target.value)}
          className="usx-pg-input"
          placeholder="Enter a custom font-family stack"
        />
      )}
      {isOverridden && (
        <button type="button" className="usx-pg-reset" title="Reset to default" onClick={() => onClear(token.name)}>
          ×
        </button>
      )}
    </div>
  );
}

// ── Showcase fixtures ────────────────────────────────────────────────────────

const accordionItems = [
  { id: 'theme-acc-1', title: 'First section', content: <p>Content of the first section.</p> },
  { id: 'theme-acc-2', title: 'Second section', content: <p>Content of the second section.</p> }
];

const sideNavItems = [
  { text: 'Current page', href: '#', current: true },
  { text: 'Parent link', href: '#', children: [{ text: 'Child link', href: '#' }] },
  { text: 'Another page', href: '#' }
];

const headerNavSections = [
  { title: 'Section one', href: '#' },
  {
    title: 'Section two',
    links: [
      { text: 'Sub-link one', href: '#' },
      { text: 'Sub-link two', href: '#' }
    ]
  },
  { title: 'Section three', href: '#' }
];

const footerNavLinks = [
  { text: 'Primary link', href: '#' },
  { text: 'Primary link', href: '#' },
  { text: 'Primary link', href: '#' },
  { text: 'Primary link', href: '#' }
];

const taskListTasks = [
  { name: 'Submit application', href: '#', tag: { value: 'Done', color: 'success-light', icon: 'check' } },
  { name: 'Upload documents', href: '#', tag: { value: 'In progress', color: 'warning-light' } }
];

const codeLines = [
  { code: 'npm install @solexllc/usx', prefix: '$' },
  { code: 'Done!', prefix: '>', className: 'text-success' }
];

const breadcrumbItems = [
  { label: 'Home', href: '#' },
  { label: 'Section', href: '#' },
  { label: 'Current page', current: true }
];

const processListItems = [
  { heading: 'Create an account', body: 'Fill out the sign-up form to get started.' },
  { heading: 'Confirm your email', body: 'Click the link we send you to verify your address.' },
  { heading: 'Complete your profile', body: 'Add any remaining details to finish setup.' }
];

const listItems = [
  'Unordered list item one',
  'Unordered list item two',
  'Unordered list item three'
];

const collectionItems = [
  {
    href: '#',
    heading: 'Notice of funding opportunity',
    description: 'A short summary describing this collection item.',
    meta: [{ text: 'Jan 1, 2024', datetime: '2024-01-01' }],
    tags: ['Funding']
  },
  {
    href: '#',
    heading: 'Public comment period open',
    description: 'Another short summary describing this collection item.',
    meta: [{ text: 'Feb 1, 2024', datetime: '2024-02-01' }],
    tags: ['Notice']
  }
];

// Collapsed by default (see collectionAccordionItems below) so these bigger
// showcase blocks don't dominate the page on first load.
const listComponentsAccordionItems = [
  {
    id: 'theme-list-components',
    title: 'List components',
    expanded: false,
    content: (
      <>
        <h4 style={{ marginTop: 0 }}>Process list</h4>
        <ProcessList items={processListItems} />
        <h4>Icon list</h4>
        <IconList
          primary
          items={[
            { iconName: 'thumb_up_alt', content: 'No wait times' },
            { iconName: 'verified', content: 'Trusted information' }
          ]}
        />
        <h4>List</h4>
        <List items={listItems} />
      </>
    )
  }
];

const collectionAccordionItems = [
  {
    id: 'theme-collection',
    title: 'Collection',
    expanded: false,
    content: <Collection items={collectionItems} />
  }
];

const tableColumns = [
  { key: 'name', header: 'Document', sortable: true },
  { key: 'year', header: 'Year', align: 'right', sortable: true },
  { key: 'status', header: 'Status', sortable: true }
];

const tableData = [
  { id: 1, name: 'Declaration of Independence', year: 1776, status: 'Signed', era: 'Founding' },
  { id: 2, name: 'Constitution', year: 1787, status: 'Ratified', era: 'Founding' },
  { id: 3, name: 'Bill of Rights', year: 1791, status: 'Ratified', era: 'Founding' },
  { id: 4, name: 'Emancipation Proclamation', year: 1863, status: 'Signed', era: 'Civil War' },
  { id: 5, name: '13th Amendment', year: 1865, status: 'Ratified', era: 'Civil War' },
  { id: 6, name: '19th Amendment', year: 1920, status: 'Ratified', era: 'Modern' }
];

// A quick lightest-→darkest reference for every theme + state base color, so
// a preset/override's whole ramp can be eyeballed at once instead of digging
// through each color's own collapsed shades. Laid out as a real x/y grid —
// x = LIGHTNESS_LADDER_STEPS (fixed column per row), y = color name — so any
// swatch can be located by name + column label; a color missing a given
// rung (e.g. only color-base has lightest/darkest) just leaves that cell
// blank rather than shifting the columns after it. Rows react live to
// `resolved` (theme overrides), same as the rest of the Showcase.
function ColorScaleGrid({ resolved }) {
  const rows = useMemo(
    () =>
      [...THEME_COLOR_NAMES, ...STATE_COLOR_NAMES].map((name) => ({
        name,
        cells: buildScaleRow(name, resolved)
      })),
    [resolved]
  );

  return (
    <div style={{ ...ui.card, breakInside: 'avoid', columnSpan: 'all', marginTop: '1rem' }}>
      <h3 style={ui.cardTitle}>Color scale — lightest to darkest</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `9rem repeat(${LIGHTNESS_LADDER_STEPS.length}, 1fr)`,
          gap: '0.4rem 0.5rem',
          alignItems: 'center'
        }}
      >
        <span />
        {LIGHTNESS_LADDER_STEPS.map((step) => (
          <span
            key={step.key}
            style={{ fontSize: '0.68rem', fontWeight: 600, textAlign: 'center' }}
          >
            {step.label}
          </span>
        ))}

        {rows.map((row) => (
          <React.Fragment key={row.name}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>
              {row.name.replace(/^color-/, '').replace(/-/g, ' ')}
            </span>
            {row.cells.map((cell, i) => (
              <div
                key={`${row.name}-${LIGHTNESS_LADDER_STEPS[i].key}`}
                title={cell.name ? `${cell.name}: ${cell.hex}` : undefined}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}
              >
                <div
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '6px',
                    background: cell.hex || 'transparent',
                    border: cell.hex ? '1px solid rgba(0,0,0,.08)' : '1px dashed rgba(0,0,0,.15)'
                  }}
                />
                {cell.hex && <code style={{ fontSize: '0.58rem', opacity: 0.6 }}>{cell.hex}</code>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}


function Showcase({ resolved }) {
  // Pre-select a row so `usx-table-selected-bg` is visible without user
  // interaction; `groupBy` + `onClickRow` exercise the grouped-row and
  // hover-row color tokens too.
  const [tableSelection, setTableSelection] = useState([2]);

  // DatePicker's calendar toggle button/panel and FileInput's drag-and-drop
  // target are both injected by USWDS's own JS enhancement, not the static
  // React markup, so they need the same init/cleanup as their own stories
  // (see DatePicker.React.stories.jsx / FileInput.React.stories.jsx).
  useEffect(() => {
    datePicker.init();
    fileInput.init();
    return () => {
      datePicker.off();
      fileInput.off();
    };
  }, []);

  return (
    <div style={{ columnWidth: '22rem', columnGap: '1rem' }}>

      <div style={{ columnSpan: 'all', marginBottom: '1rem' }}>
        <Banner tld=".gov" />
        <MiscBanner tone="test" badgeText="test" message="You are viewing a test site." importantLinkText="Production site" importantLinkHref="https://www.google.com" />
        <MiscBanner tone="dev" badgeText="dev" message="You are viewing a dev site." importantLinkText="Production site" importantLinkHref="https://www.google.com" />
        <MiscBanner tone="beta" badgeText="beta" message="You are viewing a beta site." importantLinkText="Production site" importantLinkHref="https://www.google.com" />
        <MiscBanner tone="error" badgeText="oops" message="This banner has no links." />
        <Header
          branding={{ title: 'Project name' }}
          navSections={headerNavSections}
          megamenu={true}
          extended={true}
          secondaryLinks={[{ text: 'Secondary Link', href: '#' }]}
          searchConfig={{ id: 'theme-header-search' }}
        />
        <SiteAlert variant="info" alertHeading="Site-wide notice" alertText="Bringing something to your attention politely." />
        <Hero
          title="A hero heading"
          callout="Bring attention to a project priority"
          backgroundImage="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
          paragraph="Support the callout with some short explanatory text."
          button={{ href: '#', text: 'Call to action' }}
          overlay
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', columnSpan: 'all', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Table</h3>
        <div style={{ overflowX: 'auto' }}>
          <Table
            columns={tableColumns}
            data={tableData}
            groupBy="era"
            selectionMode="checkbox"
            select={tableSelection}
            onSelect={setTableSelection}
            onClickRow={() => {}}
            caption="Founding documents — grouped, sortable, selectable rows"
          />
        </div>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Buttons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Accent cool" variant="accent-cool" />
          <Button label="Accent warm" variant="accent-warm" />
          <Button label="Base" variant="base" />
          <Button label="Outline" variant="outline" />
        </div>
        <ButtonGroup
          segmented
          items={[
            { label: 'Map', variant: 'primary' },
            { label: 'Satellite', variant: 'primary' },
            { label: 'Hybrid', variant: 'primary' }
          ]}
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Forms</h3>
        <Input id="theme-input" label="Text input" placeholder="Type something…" />
        <Input id="theme-input-err" label="With error" error="This field is required" />
        <Select
          id="theme-select"
          label="Dropdown"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' }
          ]}
        />
        <TextArea id="theme-textarea" label="Text area" placeholder="Longer text…" />
        <Checkbox
          id="theme-check-1"
          name="theme-check-1"
          value="1"
          label="Normal checkbox option"
          checked={true}
        />
        <Checkbox
          id="theme-check-2"
          name="theme-check-2"
          value="1"
          label="Tile checkbox option"
          checked={true}
          tile={true}
          description="A checkbox with a description and tile styling."
        />
        <RadioButtons
          name="theme-radios"
          options={[
            { value: 'r1', label: 'Radio A' },
            { value: 'r2', label: 'Radio B' }
          ]}
          defaultValue='r1'
        />
        <RadioButtons
          name="theme-radios-tile"
          tile={true}
          options={[
            { value: 'r1', label: 'Radio A', description: 'This radio button\'s description is appended with "A".' },
            { value: 'r2', label: 'Radio B', description: 'This radio button\'s description is appended with "B".' }
          ]}
          defaultValue='r1'
        />
        <Search id="theme-search" placeholder="Search…" />
        <DatePicker id="theme-date-picker" label="Date picker" hint="mm/dd/yyyy" />
        <FileInput id="theme-file-input" label="File upload" hint="Select one or more files" multiple />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Alerts</h3>
        <Alert variant="info" slim text="An informative status update." />
        <Alert variant="warning" slim text="Something needs your attention." />
        <Alert variant="success" slim text="The task completed successfully." />
        <Alert variant="error" slim text="Something went wrong." />
        <Alert variant="emergency" slim text="Urgent: immediate action required." />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Indicators</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <Tag color="primary">Primary</Tag>
          <Tag color="secondary">Secondary</Tag>
          <Tag color="accent-cool">Cool</Tag>
          <Tag color="accent-warm">Warm</Tag>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Status color="primary" size="md" />
          <Status color="success" size="md" animation="ping" />
          <Status color="warning" size="md" />
          <Status color="error" size="md" />
          <Spinner size={3} label="Loading…" />
          <Switch id="theme-switch" variant="primary" defaultChecked />
          <Switch id="theme-switch-off" variant="primary" />
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Swap onContent="ON" offContent="OFF" />
          <Swap variant="rotate" onContent="Hello" offContent="Goodbye" />
          <Swap variant="flip" onContent="😊" offContent="😞" />
        </div>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Navigation</h3>
        <Breadcrumb items={breadcrumbItems} />
        <SideNav items={sideNavItems} />
        <StepIndicator
          steps={[{ label: 'Personal info' }, { label: 'Documents' }, { label: 'Review' }]}
          currentStep={2}
          variant="counters"
        />
        <Pagination totalItems={120} initialPageSize={10} />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Content</h3>
        <Accordion
          bordered={true}
          items={accordionItems}
        />
        <h4 style={{ margin: 0 }}>
          <Eyebrow>Featured</Eyebrow>
          Section heading
        </h4>
        <SummaryBox heading="Program summary" content="A 12-week initiative to modernize service delivery." />
        <Block variant="callout" color="primary">
          A callout block with themed accents.
        </Block>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <Accordion
          bordered={true}
          items={listComponentsAccordionItems}
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <Accordion
          bordered={true}
          items={collectionAccordionItems}
        />
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Prose</h3>
        <Prose>
          <h2>A prose heading</h2>
          <p>
            Body copy rendered through <em>Prose</em> exercises the shared typography tokens
            (font family, heading scale, line height) alongside a{' '}
            <Link href="javascript:void(0);">standard link</Link> and a{' '}
            <Link href="javascript:void(0);" visited>visited link</Link> inline.
            Alternatively, an <Link href="javascript:void(0);" external>external
            link</Link> has an icon to visually indicate it points to a different site.
          </p>
          <h3>A subheading</h3>
          <ul>
            <li>Unordered list item one</li>
            <li>Unordered list item two</li>
            <ol>
              <li>Ordered list item one</li>
              <li>Ordered list item two</li>
            </ol>
          </ul>
        </Prose>
      </div>

      <div style={{ ...ui.card, breakInside: 'avoid', marginBottom: '1rem' }}>
        <h3 style={ui.cardTitle}>Tasks &amp; utility</h3>
        <TaskList tasks={taskListTasks} />
        <Attribution primary="George Washington" secondary="First President" />
        <Code lines={codeLines} />
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <CopyToClipboard copyText="Example text" tooltip="Copy" copiedTooltip="Copied" label="Copy example" />
        </div>
        <Clickable href="#" className="display-flex flex-column padding-2 border">
          Everything taking up space in this box is clickable, but only the text below appears as a link.
          <Clickable.Link>I look clickable</Clickable.Link>
        </Clickable>
      </div>

      <div style={{ marginTop: '2rem', columnSpan: 'all' }}>
        <Footer
          variant="medium"
          navLinks={footerNavLinks}
          branding={{ title: 'Project name' }}
          contactHeading="Agency name"
          contactPhone="(800) 555-0100"
          contactEmail="info@example.gov"
        />
      </div>

      <ColorScaleGrid resolved={resolved} />
    </div>
  );
}

// ── Playground ───────────────────────────────────────────────────────────────

function ThemePlayground({ initialTheme } = {}) {
  // Seeds the editor from whichever theme is currently active in the
  // Storybook toolbar (see apps/storybook/.storybook/preview.js), so opening
  // the Playground matches the rest of the site instead of always starting
  // from Default. One-time seed only — the toolbar and the Playground's own
  // preset/override controls are independent after that.
  const initialPreset = PRESETS[initialTheme] ? initialTheme : 'Default';
  const [overrides, setOverrides] = useState(() => ({ ...PRESETS[initialPreset] }));
  // Family/grade/vivid selections applied by "Random (System)", keyed by
  // token name — pushed into FamilyGradeColorControl so its selects reflect
  // the chosen system swatch, not just the resulting hex.
  const [systemSelections, setSystemSelections] = useState({});
  const [autoDerive, setAutoDerive] = useState(true);
  const [changedOnly, setChangedOnly] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(initialPreset);
  // Which single color group row (Theme/State colors — each a base color
  // with its own derived shades) is currently expanded — only one may be
  // open across the whole panel at a time, so opening a new one collapses
  // whichever was previously open. Environment colors don't use this (no
  // shades to reveal, so they're rendered flat — see renderColor below) and
  // Surface & text / Component colors use their own group-level state
  // (expandedSurfaceGroup / expandedComponentGroup) since those group
  // several distinct tokens together rather than a base + its shades.
  const [expandedColor, setExpandedColor] = useState(null);
  const toggleColorExpand = (name) => setExpandedColor((prev) => (prev === name ? null : name));
  // Same single-open-at-a-time behavior as expandedColor above, but scoped
  // to the component-color groups (Link, Accordion, Table, etc.) — a
  // separate axis from the base/state/environment/surface colors, so
  // opening a component group doesn't collapse an open theme color and
  // vice versa.
  const [expandedComponentGroup, setExpandedComponentGroup] = useState(null);
  const toggleComponentGroupExpand = (label) =>
    setExpandedComponentGroup((prev) => (prev === label ? null : label));
  // Same pattern again, scoped to the Surfaces/Borders/Text groups under
  // "Surface & text colors" — its own independent single-open axis.
  const [expandedSurfaceGroup, setExpandedSurfaceGroup] = useState(null);
  const toggleSurfaceGroupExpand = (label) =>
    setExpandedSurfaceGroup((prev) => (prev === label ? null : label));
  // Below the 720px breakpoint the sidebar becomes an off-canvas drawer
  // (see .usx-pg-sidebar in PLAYGROUND_CSS) toggled by a floating button, so
  // editing tokens doesn't require scrolling back up past the showcase.
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const autoDeriveMap = useMemo(() => {
    const map = {};
    for (const t of baseColorTokens()) map[t.name] = autoDerive;
    return map;
  }, [autoDerive]);

  const rawResolved = useMemo(() => resolveTheme(overrides, autoDeriveMap), [overrides, autoDeriveMap]);

  // Recognizes an overridden hex as a system color even when it wasn't
  // picked via the family/grade selects this session (e.g. it came from a
  // preset, was typed/pasted, or was re-imported from exported CSS).
  const detectedSelections = useMemo(() => {
    const found = {};
    for (const t of themeManifest) {
      if (!t.systemDefault || systemSelections[t.name]) continue;
      const match = findSystemColorMatch(overrides[t.name]);
      if (match) found[t.name] = match;
    }
    return found;
  }, [overrides, systemSelections]);

  // Explicit picks win over auto-detected ones (same token can't really
  // disagree, but this keeps intent unambiguous).
  const baseSelections = useMemo(
    () => ({ ...detectedSelections, ...systemSelections }),
    [detectedSelections, systemSelections]
  );

  // When a base color was picked via the family/grade control (tracked in
  // baseSelections), its derived shades should also be real system colors
  // from that SAME family — not the shade's own stale default family, and
  // not an arbitrary off-palette hex from the HSL-delta math alone. Snap
  // each non-overridden, system-capable shade to the closest real swatch in
  // the base's chosen family, and record that match so the shade's own
  // family/grade selects can reflect it too.
  const systemShades = useMemo(() => {
    const values = {};
    const selections = {};
    for (const t of themeManifest) {
      if (!t.derivedFrom || !t.systemDefault) continue;
      if (overrides[t.name] !== undefined) continue;
      const base = getToken(t.derivedFrom);
      if (!base || !(autoDeriveMap[base.name] ?? true)) continue;
      const baseSelection = baseSelections[base.name];
      if (!baseSelection) continue;
      const match = nearestSystemColor(rawResolved[t.name], baseSelection.family);
      if (!match) continue;
      values[t.name] = match.hex;
      selections[t.name] = { family: baseSelection.family, grade: match.grade, vivid: match.vivid };
    }
    return { values, selections };
  }, [overrides, baseSelections, autoDeriveMap, rawResolved]);

  const resolved = useMemo(
    () => ({ ...rawResolved, ...systemShades.values }),
    [rawResolved, systemShades]
  );
  // Selections passed down to controls: derived system matches and
  // auto-detected/explicit base picks (explicit wins on conflict).
  const effectiveSelections = useMemo(
    () => ({ ...systemShades.selections, ...baseSelections }),
    [systemShades, baseSelections]
  );
  // Applied as a `:root` rule (not inline styles on a descendant) so that
  // chained custom properties (e.g. `--usx-radius-button: var(--usx-radius-field)`)
  // re-resolve correctly — CSS substitutes var() chains at the declaring
  // element, so overriding a base token from a descendant element would
  // never reach dependents declared on `:root` in theme.css.
  const liveThemeCss = useMemo(() => themeToCss(resolved, { changedOnly: true }), [resolved]);
  const exportCss = useMemo(() => themeToCss(resolved, { changedOnly }), [resolved, changedOnly]);

  const setToken = (name, value, selection) => {
    setActivePreset(null);
    setOverrides((prev) => ({ ...prev, [name]: value }));
    setSystemSelections((prev) => {
      if (selection) return { ...prev, [name]: selection };
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };
  const clearToken = (name) => {
    setActivePreset(null);
    const names = name === 'usx-accordion-icon-position'
      ? [name, 'usx-accordion-icon-padding-start', 'usx-accordion-icon-padding-end']
      : name === 'usx-logo-display'
        ? [name, 'usx-logo-inverse-display']
        : [name];
    setOverrides((prev) => {
      const next = { ...prev };
      names.forEach((tokenName) => delete next[tokenName]);
      return next;
    });
    setSystemSelections((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const applyPreset = (preset) => {
    setActivePreset(preset);
    setOverrides({ ...PRESETS[preset] });
    setSystemSelections({});
  };
  const applyRandom = () => {
    setActivePreset(null);
    setOverrides(randomPalette());
    setSystemSelections({});
  };
  const applyRandomSystem = () => {
    setActivePreset(null);
    const { overrides: nextOverrides, selections } = randomSystemPalette();
    setOverrides(nextOverrides);
    setSystemSelections(selections);
  };
  const resetAll = () => {
    setActivePreset('Default');
    setOverrides({});
    setSystemSelections({});
  };

  const overrideCount = Object.keys(overrides).length;

  const copyCss = async () => {
    await navigator.clipboard.writeText(exportCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadCss = () => {
    const blob = new Blob([exportCss], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usx-theme.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  const colorTokensByName = useMemo(() => new Map(themeManifest.map((t) => [t.name, t])), []);
  const componentColors = themeManifest.filter((t) => t.group === 'component' && !t.internal);
  const componentColorGroups = groupComponentColors(componentColors);
  const surfaceTextGroups = SURFACE_TEXT_GROUPS.map((g) => ({
    label: g.label,
    tokens: g.names.map((n) => colorTokensByName.get(n)).filter(Boolean)
  }));

  const renderColorGroup = (name) => {
    const t = colorTokensByName.get(name);
    if (!t) return null;
    return (
      <ColorGroupRow
        key={name}
        token={t}
        resolved={resolved}
        overrides={overrides}
        systemSelections={effectiveSelections}
        onChange={setToken}
        onClear={clearToken}
        expanded={expandedColor === name}
        onToggleExpand={() => toggleColorExpand(name)}
      />
    );
  };

  const renderColor = (t) => {
    if (t.name === 'usx-accordion-icon-position') {
      return (
        <AccordionIconPositionControl
          key={t.name}
          token={t}
          value={resolved[t.name]}
          isOverridden={overrides[t.name] !== undefined}
          onChange={setToken}
          onClear={clearToken}
        />
      );
    }
    if (t.name === 'usx-logo-display') {
      return (
        <LogoVariantControl
          key={t.name}
          token={t}
          value={resolved[t.name]}
          isOverridden={overrides[t.name] !== undefined}
          onChange={setToken}
          onClear={clearToken}
        />
      );
    }
    const Control = t.systemDefault ? FamilyGradeColorControl : ColorControl;
    return (
      <React.Fragment key={t.name}>
        <Control
          token={t}
          value={resolved[t.name]}
          isOverridden={overrides[t.name] !== undefined}
          onChange={setToken}
          onClear={clearToken}
          selection={effectiveSelections[t.name]}
        />
        {shadesOf(t.name).filter((s) => !GROUPED_COLOR_NAMES.includes(s.name)).length > 0 && (
          <details style={{ marginBottom: '0.25rem' }}>
            <summary className="usx-pg-shades-toggle">shades</summary>
            {shadesOf(t.name).filter((s) => !GROUPED_COLOR_NAMES.includes(s.name)).map((s) => {
              const ShadeControl = s.systemDefault ? FamilyGradeColorControl : ColorControl;
              return (
                <ShadeControl
                  key={s.name}
                  token={s}
                  value={resolved[s.name]}
                  isOverridden={overrides[s.name] !== undefined}
                  onChange={setToken}
                  onClear={clearToken}
                  selection={effectiveSelections[s.name]}
                />
              );
            })}
          </details>
        )}
      </React.Fragment>
    );
  };

  const renderText = (t) => {
    const Control = t.type === 'font-family' ? FontFamilyControl : TextControl;
    return (
      <Control
        key={t.name}
        token={t}
        value={resolved[t.name]}
        isOverridden={overrides[t.name] !== undefined}
        onChange={setToken}
        onClear={clearToken}
      />
    );
  };

  const radiusGroup = themeManifest.filter((t) => t.group === 'radius' && t.name.startsWith('radius-'));
  const radiusAdvanced = themeManifest.filter((t) => t.group === 'radius-advanced');
  const radiusUtility = themeManifest.filter((t) => t.group === 'radius' && t.name.startsWith('r-'));
  const spacingTokens = themeManifest.filter((t) => t.group === 'spacing');
  const borderTokens = themeManifest.filter((t) => t.group === 'border');
  const borderAdvanced = themeManifest.filter((t) => t.group === 'border-advanced');
  const typographyTokens = themeManifest.filter((t) => t.group === 'typography');
  const typographyAdvanced = themeManifest.filter((t) => t.group === 'typography-advanced');

  return (
    <div className="usx-pg usx-pg-container">
      <style>{PLAYGROUND_CSS}</style>
      <div
        className={`usx-pg-drawer-backdrop${mobileDrawerOpen ? ' is-open' : ''}`}
        onClick={() => setMobileDrawerOpen(false)}
      />
      <aside className={`usx-pg-sidebar${mobileDrawerOpen ? ' is-open' : ''}`} style={ui.sidebar}>
        <div className="usx-pg-drawer-handle" />
        <div style={ui.sidebarHeader}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
            <h2 style={{ margin: '0 0 0.2rem', fontSize: '1.05rem' }}>Theme generator</h2>
            <button
              type="button"
              className="usx-pg-drawer-close"
              aria-label="Close theme controls"
              onClick={() => setMobileDrawerOpen(false)}
            >
              ×
            </button>
          </div>
          <p style={{ margin: '0 0 0.85rem', fontSize: '0.75rem', color: '#6b7280' }}>
            Live-edit tokens and export the resulting CSS.
            {overrideCount > 0 && ` · ${overrideCount} changed`}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.7rem' }}>
            {Object.keys(PRESETS).map((p) => (
              <button
                key={p}
                type="button"
                className={`usx-pg-btn${activePreset === p ? ' is-active' : ''}`}
                onClick={() => applyPreset(p)}
              >
                {p}
              </button>
            ))}
            <button type="button" className="usx-pg-btn is-ghost" onClick={applyRandom}>
              🎲 Random
            </button>
            <button type="button" className="usx-pg-btn is-ghost" onClick={applyRandomSystem}>
              🎨 Random (System)
            </button>
            <button type="button" className="usx-pg-btn is-ghost" onClick={resetAll}>
              ↺ Reset
            </button>
          </div>

          <label style={{ ...ui.chipRow, cursor: 'pointer', margin: 0 }}>
            <input type="checkbox" checked={autoDerive} onChange={(e) => setAutoDerive(e.target.checked)} />
            <span className="usx-pg-label">Auto-derive shades from base colors</span>
          </label>
        </div>

        <div className="usx-pg-sidebar-body" style={ui.sidebarBody}>
          <Section title="Theme colors" open count={THEME_COLOR_NAMES.length}>
            {THEME_COLOR_NAMES.map(renderColorGroup)}
          </Section>

          <Section title="State colors" count={STATE_COLOR_NAMES.length}>
            {STATE_COLOR_NAMES.map(renderColorGroup)}
          </Section>

          <Section title="Environment colors" count={ENVIRONMENT_COLOR_NAMES.length}>
            {ENVIRONMENT_COLOR_NAMES.map((name) => renderColor(colorTokensByName.get(name)))}
          </Section>

          <Section title="Surface & text colors" count={SURFACE_TEXT_COLOR_NAMES.length}>
            {surfaceTextGroups.map((g) => (
              <TokenColorGroup
                key={g.label}
                label={g.label}
                tokens={g.tokens}
                overrides={overrides}
                expanded={expandedSurfaceGroup === g.label}
                onToggleExpand={() => toggleSurfaceGroupExpand(g.label)}
                renderColor={renderColor}
              />
            ))}
          </Section>

          <Section title="Radius" count={radiusGroup.length}>
            {radiusGroup.map(renderText)}
          </Section>

          <Section title="Advanced radius" count={radiusAdvanced.length}>
            {radiusAdvanced.map(renderText)}
          </Section>

          <Section title="Utility radius" count={radiusUtility.length}>
            {radiusUtility.map(renderText)}
          </Section>

          <Section title="Spacing" count={spacingTokens.length}>
            {spacingTokens.map(renderText)}
          </Section>

          <Section title="Border" count={borderTokens.length}>
            {borderTokens.map(renderText)}
          </Section>

          <Section title="Advanced border" count={borderAdvanced.length}>
            {borderAdvanced.map(renderText)}
          </Section>

          <Section title="Typography" count={typographyTokens.length}>
            {typographyTokens.map(renderText)}
          </Section>

          <Section title="Component typography" count={typographyAdvanced.length}>
            {typographyAdvanced.map(renderText)}
          </Section>

          <Section title="Component colors" count={componentColors.length}>
            {componentColorGroups.map((g) => (
              <TokenColorGroup
                key={g.label}
                label={g.label}
                tokens={g.tokens}
                overrides={overrides}
                expanded={expandedComponentGroup === g.label}
                onToggleExpand={() => toggleComponentGroupExpand(g.label)}
                renderColor={renderColor}
              />
            ))}
          </Section>

          <Section title="CSS export" open>
            <label style={{ ...ui.chipRow, cursor: 'pointer' }}>
              <input type="checkbox" checked={changedOnly} onChange={(e) => setChangedOnly(e.target.checked)} />
              <span className="usx-pg-label">Changed values only</span>
            </label>
            <textarea readOnly value={exportCss} className="usx-pg-textarea" />
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem' }}>
              <button type="button" className="usx-pg-btn is-active" onClick={copyCss}>
                {copied ? '✓ Copied!' : 'Copy CSS'}
              </button>
              <button type="button" className="usx-pg-btn" onClick={downloadCss}>
                Download
              </button>
            </div>
          </Section>
        </div>
      </aside>

      <style>{liveThemeCss}</style>
      <main
        className="usx-pg-main"
        style={{
          flex: 1,
          minWidth: 0,
          background: resolved['surface-1'],
          color: resolved['text'],
          boxSizing: 'border-box'
        }}
      >
        <Showcase resolved={resolved} />
      </main>

      <button
        type="button"
        className="usx-pg-fab"
        onClick={() => setMobileDrawerOpen((prev) => !prev)}
      >
        {mobileDrawerOpen ? '✕ Close' : '⚙ Customize'}
        {!mobileDrawerOpen && overrideCount > 0 && <span className="usx-pg-fab-count">{overrideCount}</span>}
      </button>
    </div>
  );
}

export const Playground = {
  render: () => {
    // useGlobals is a Storybook preview hook — only callable here, in the
    // story's own render function, not inside a nested component.
    const [globals] = useGlobals();
    return <ThemePlayground initialTheme={globals?.theme} />;
  }
};
