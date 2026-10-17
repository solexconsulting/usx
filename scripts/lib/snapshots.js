// Shared helpers for the "All Variants" snapshot scripts (generate-snapshot,
// snapshot-report): file naming, story discovery, and section parsing.
import fs from 'node:fs';
import path from 'node:path';
import {
  COMPONENTS_DIR,
  REPO_ROOT,
  STORIES_DIR,
  listComponentDirs,
  toPascal,
} from './component-configs.js';

export { REPO_ROOT, listComponentDirs, toPascal };

export const SOURCES = ['react', 'django'];
export const BACKUP_DIR = path.join(REPO_ROOT, '.snapshot-backups');
export const REPORT_DIR = path.join(REPO_ROOT, 'reports');
export const SECTION_HEADING = '<h3 class="site-preview-heading">';

export const sourceLabel = (source) => (source === 'react' ? 'React' : 'Django');

// <component>.react-snapshot.html / <component>.django-snapshot.html, beside the component.
export const snapshotPath = (dir, source) =>
  path.join(COMPONENTS_DIR, dir, `${dir}.${source}-snapshot.html`);

// Stories live in packages/usx-stories: <Pascal>.<React|Django|HTML>.stories.<ext>.
export function findStoriesFile(dir, kind) {
  const dirPath = path.join(STORIES_DIR, dir);
  if (!fs.existsSync(dirPath)) return null;
  const pattern = new RegExp(`^.+\\.${kind}\\.stories\\.(jsx|tsx|js|ts)$`);
  const match = fs.readdirSync(dirPath).find((file) => pattern.test(file));
  return match ? path.join(dirPath, match) : null;
}

export function assertComponent(dir) {
  if (!listComponentDirs().includes(dir)) {
    throw new Error(
      `Unknown component "${dir}". Expected a directory name under packages/usx-react/src/components.`
    );
  }
}

// Splits a snapshot into { title, body } sections, one per site-preview-heading.
export function parseSections(html) {
  return html
    .split(SECTION_HEADING)
    .slice(1)
    .map((chunk) => {
      const end = chunk.indexOf('</h3>');
      return { title: chunk.slice(0, end), body: chunk.slice(end + '</h3>'.length).trim() };
    });
}

// ---- Comparison helpers -------------------------------------------------------------------

const TAG_PATTERN =
  /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s"'<>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/g;
const ATTRIBUTE_PATTERN = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
const REFERENCE_ATTRIBUTES = new Set([
  'id',
  'for',
  'name',
  'aria-controls',
  'aria-labelledby',
  'aria-describedby',
  'aria-owns',
  'aria-details',
  'aria-errormessage',
  'aria-activedescendant',
  'commandfor',
  'popovertarget',
  'data-usx-popover-close',
  'form',
  'list',
  'headers',
]);
const SELF_CLOSING_SVG = new Set([
  'path',
  'use',
  'circle',
  'rect',
  'line',
  'polyline',
  'polygon',
  'ellipse',
]);
const SNAPSHOT_PREFIX = /^(react|django)-/;
const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };

const decodeEntities = (text) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => NAMED_ENTITIES[name]);

function canonicalAttributes(source, ignoreAttributes = []) {
  const attributes = [];
  for (const match of source.matchAll(ATTRIBUTE_PATTERN)) {
    const name = match[1].toLowerCase();
    if (ignoreAttributes.includes(name)) continue;
    // React wires handlers in JS, so inline handlers (Django) would always show as differences.
    if (/^on[a-z]+$/.test(name)) continue;
    let value = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
    if (REFERENCE_ATTRIBUTES.has(name))
      value = value
        .split(/\s+/)
        .map((token) => token.replace(SNAPSHOT_PREFIX, ''))
        .join(' ');
    else if (name === 'href' || name === 'src')
      value = value.replace(/^#(react|django)-/, '#').replace(/^(?:\.{0,2}\/)+(?=[^/#])/, '');
    else if (name === 'srcset')
      value = value
        .split(',')
        .map((entry) => entry.trim().replace(/^(?:\.{0,2}\/)+(?=[^/#])/, ''))
        .join(', ');
    else if (name === 'class') value = value.split(/\s+/).filter(Boolean).sort().join(' ');
    // An empty value attribute is the same as none.
    if (name === 'value' && !(match[2] ?? match[3] ?? match[4])) continue;
    // hidden="hidden" and a bare hidden are the same attribute.
    attributes.push(value === '' || value === name ? name : `${name}="${value}"`);
  }
  return attributes.sort().join(' ');
}

// Reduces markup to one token per line so React and Django output can be compared without
// noise from attribute order, whitespace, comments, entity styles, or the id prefix.
export function canonicalize(rawHtml, ignoreAttributes = []) {
  // Inline scripts only wire behavior that React attaches in JS.
  const html = rawHtml.replace(/<script\b[\s\S]*?<\/script>/g, '');
  const lines = [];
  const pushText = (text) => {
    const collapsed = decodeEntities(text).replace(/\s+/g, ' ').trim();
    if (collapsed) lines.push(collapsed);
  };
  let last = 0;
  for (const match of html.matchAll(TAG_PATTERN)) {
    pushText(html.slice(last, match.index));
    last = match.index + match[0].length;
    if (match[0].startsWith('<!--')) continue;
    const [, closing, name, attributes] = match;
    // <path></path> and <path /> are the same element.
    if (closing && SELF_CLOSING_SVG.has(name.toLowerCase())) continue;
    lines.push(
      closing
        ? `</${name.toLowerCase()}>`
        : `<${[name.toLowerCase(), canonicalAttributes(attributes, ignoreAttributes)].filter(Boolean).join(' ')}>`
    );
  }
  pushText(html.slice(last));
  return lines;
}

// Minimal LCS line diff: returns [{ type: ' ' | '-' | '+', line }].
export function diffLines(before, after) {
  const rows = before.length + 1;
  const cols = after.length + 1;
  const table = new Uint32Array(rows * cols);
  for (let i = before.length - 1; i >= 0; i--) {
    for (let j = after.length - 1; j >= 0; j--) {
      table[i * cols + j] =
        before[i] === after[j]
          ? table[(i + 1) * cols + j + 1] + 1
          : Math.max(table[(i + 1) * cols + j], table[i * cols + j + 1]);
    }
  }
  const result = [];
  let i = 0;
  let j = 0;
  while (i < before.length && j < after.length) {
    if (before[i] === after[j]) {
      result.push({ type: ' ', line: before[i] });
      i++;
      j++;
    } else if (table[(i + 1) * cols + j] >= table[i * cols + j + 1])
      result.push({ type: '-', line: before[i++] });
    else result.push({ type: '+', line: after[j++] });
  }
  while (i < before.length) result.push({ type: '-', line: before[i++] });
  while (j < after.length) result.push({ type: '+', line: after[j++] });
  return result;
}

// Compares section-by-section (matched on heading). Each result has a status of
// "identical", "different", "react-only" or "django-only", plus a diff for "different".
export function compareSnapshots(reactHtml, djangoHtml, ignoreAttributes = []) {
  const react = parseSections(reactHtml);
  const django = parseSections(djangoHtml);
  const results = [];
  const used = new Set();
  for (const section of react) {
    const counterpart = django.find(
      (candidate, index) => !used.has(index) && candidate.title === section.title
    );
    if (!counterpart) {
      results.push({ title: section.title, status: 'react-only' });
      continue;
    }
    used.add(django.indexOf(counterpart));
    const reactLines = canonicalize(section.body, ignoreAttributes);
    const djangoLines = canonicalize(counterpart.body, ignoreAttributes);
    const diff = diffLines(reactLines, djangoLines);
    const changed = diff.filter((entry) => entry.type !== ' ').length;
    results.push({
      title: section.title,
      status: changed ? 'different' : 'identical',
      changed,
      diff: changed ? diff : undefined,
    });
  }
  django.forEach((section, index) => {
    if (!used.has(index)) results.push({ title: section.title, status: 'django-only' });
  });
  return results;
}

// Keeps `context` unchanged lines around each change and collapses the rest into { type: 'gap', count }.
export function trimContext(diff, context = 3) {
  const keep = new Array(diff.length).fill(false);
  diff.forEach((entry, index) => {
    if (entry.type === ' ') return;
    for (let i = Math.max(0, index - context); i <= Math.min(diff.length - 1, index + context); i++)
      keep[i] = true;
  });
  const result = [];
  let skipped = 0;
  diff.forEach((entry, index) => {
    if (keep[index]) {
      if (skipped) result.push({ type: 'gap', count: skipped });
      skipped = 0;
      result.push(entry);
    } else skipped++;
  });
  if (skipped) result.push({ type: 'gap', count: skipped });
  return result;
}

// Snapshot generation failures, recorded by generate-snapshot so the report can explain missing snapshots.
export const GENERATION_LOG = path.join(REPORT_DIR, 'snapshot-generation.json');

export function readGenerationFailures() {
  return fs.existsSync(GENERATION_LOG) ? JSON.parse(fs.readFileSync(GENERATION_LOG, 'utf8')) : {};
}

export function recordGeneration(component, source, message) {
  const failures = readGenerationFailures();
  if (message) failures[component] = { ...failures[component], [source]: message };
  else if (failures[component]) {
    delete failures[component][source];
    if (!Object.keys(failures[component]).length) delete failures[component];
  }
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(GENERATION_LOG, `${JSON.stringify(failures, null, 2)}\n`);
}
