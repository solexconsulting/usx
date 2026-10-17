#!/usr/bin/env node
// Backs up and regenerates a component's "All Variants" HTML snapshot from its
// React or Django stories.
//
//   pnpm generate:snapshot <component...>|--all [--source react|django|both] [options]
//
// Output: packages/usx-react/src/components/<component>/<component>.<source>-snapshot.html
// The previous file is copied to .snapshot-backups/<component>/ first.
//
// React source:  each story in <Pascal>.React.stories.* is rendered to static markup.
// Django source: each story in <Pascal>.Django.stories.* is rendered by the Django render
//   server (the same props the story sends), with the story's own wrapper kept intact.
//
// Options:
//   --django-url <url>   Django render server (or env DJANGO_RENDER_URL). Required for django.
//   --id-prefix <text>   Prefix for ids and references (default "react-" / "django-").
//   --out <path>         Write somewhere else (skips the backup).
//   --no-backup          Overwrite without backing up.
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import react from '@vitejs/plugin-react';
import * as prettier from 'prettier';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import {
  BACKUP_DIR,
  REPO_ROOT,
  SECTION_HEADING,
  SOURCES,
  assertComponent,
  findStoriesFile,
  listComponentDirs,
  recordGeneration,
  snapshotPath,
  sourceLabel,
} from './lib/snapshots.js';

const USAGE =
  'Usage: node scripts/generate-snapshot.js <component...>|--all [--source react|django|both] [--django-url <url>] [--id-prefix <text>] [--out <path>] [--no-backup]';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    all: { type: 'boolean', default: false },
    source: { type: 'string', default: 'both' },
    'django-url': { type: 'string' },
    'id-prefix': { type: 'string' },
    out: { type: 'string' },
    'no-backup': { type: 'boolean', default: false },
  },
});

const fail = (message) => {
  console.error(`${message}\n${USAGE}`);
  process.exit(1);
};

const components = values.all ? listComponentDirs() : positionals;
if (!components.length) fail('Name at least one component, or pass --all.');
for (const component of components) {
  try {
    assertComponent(component);
  } catch (error) {
    fail(error.message);
  }
}

if (values.source !== 'both' && !SOURCES.includes(values.source))
  fail('--source must be "react", "django", or "both".');
const sources = values.source === 'both' ? SOURCES : [values.source];
if (values.out && (components.length > 1 || sources.length > 1))
  fail('--out only works with a single component and a single --source.');

const djangoUrl = (values['django-url'] ?? process.env.DJANGO_RENDER_URL ?? '').replace(/\/$/, '');
if (sources.includes('django') && !djangoUrl)
  fail('Django snapshots need --django-url (or env DJANGO_RENDER_URL).');

const DJANGO_MODULE = path.join(REPO_ROOT, 'packages/usx-stories/src/utils/djangoComponent.js');
const DJANGO_STUB_ID = '\0usx-django-snapshot-stub';
const TEST_STUB_ID = '\0usx-storybook-test-stub';
const PREVIEW_STUB_ID = '\0usx-storybook-preview-api-stub';
const SLOT_PATTERN = /<template data-django-slot="(\d+)"><\/template>/g;

// Django stories fetch HTML in the browser. For snapshots, each fetch becomes a placeholder that is
// filled in afterwards, so the story's own render function (and any wrapper) runs unchanged.
const djangoStubSource = `
import React from 'react';
import { serializePropsForDjango } from ${JSON.stringify(`${DJANGO_MODULE}?real`)};
export { serializePropsForDjango };
const slot = (name, props) => {
  const slots = globalThis.__USX_DJANGO_SLOTS__;
  slots.push({ name, props: serializePropsForDjango(props) });
  return { index: slots.length - 1, markup: '<template data-django-slot="' + (slots.length - 1) + '"></template>' };
};
export const djangoComponent = ({ componentName }) => (props) =>
  React.createElement('template', { 'data-django-slot': slot(componentName, props).index });
export const useDjangoRenderedHtml = (name, props) => ({ html: slot(name, props).markup, error: null });
export const useDjangoRenderedFields = (fields) => ({
  html: fields.map(({ componentName, args }) => slot(componentName, args).markup).join('\\n'),
  errors: [],
});
export const fetchComponentHtml = async () => {
  throw new Error('fetchComponentHtml is not available while generating snapshots');
};
`;

const testStubSource = `
const noop = () => {};
export const fn = () => noop;
export const expect = noop;
export const userEvent = {};
export const within = () => ({});
export const waitFor = noop;
`;

// Story hooks read globals and args from the live preview; snapshots render with empty ones.
const previewStubSource = `
const pair = () => [{}, () => {}];
export const useGlobals = pair;
export const useArgs = pair;
export const useParameter = () => undefined;
export const useChannel = () => () => {};
export const useStoryContext = () => ({});
`;

function snapshotStubs() {
  return {
    name: 'usx-snapshot-stubs',
    enforce: 'pre',
    resolveId(request, importer) {
      if (request === 'storybook/test') return TEST_STUB_ID;
      if (request === 'storybook/preview-api') return PREVIEW_STUB_ID;
      if (request.includes('?real') || !/djangoComponent(\.js)?$/.test(request)) return null;
      const resolved =
        importer && request.startsWith('.')
          ? path.resolve(path.dirname(importer), request)
          : request;
      return resolved === DJANGO_MODULE ? DJANGO_STUB_ID : null;
    },
    load(id) {
      if (id === DJANGO_STUB_ID) return djangoStubSource;
      if (id === TEST_STUB_ID) return testStubSource;
      if (id === PREVIEW_STUB_ID) return previewStubSource;
      return null;
    },
  };
}

const startCase = (text) =>
  text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d+)/g, '$1 $2')
    .replace(/_/g, ' ');

// Stories appear in the order they are exported from the source file.
function storyKeys(storiesFile, module) {
  const text = fs.readFileSync(storiesFile, 'utf8');
  const excluded = new Set(module.default?.excludeStories ?? []);
  return [...text.matchAll(/^export const (\w+)/gm)]
    .map((match) => match[1])
    .filter((key) => {
      const story = module[key];
      return (
        !excluded.has(key) &&
        story &&
        !Array.isArray(story) &&
        (typeof story === 'function' ||
          (typeof story === 'object' && ('args' in story || 'render' in story)))
      );
    });
}

// Elements styled with white-space: pre-wrap would change appearance if Prettier re-wrapped their text.
const WHITESPACE_SENSITIVE_CLASSES = ['usx-details__text'];
const whitespaceSensitive = new RegExp(
  `(<[a-z][a-z0-9]*\\b[^>]*\\sclass="[^"]*\\b(?:${WHITESPACE_SENSITIVE_CLASSES.join('|')})\\b)`,
  'g'
);
const protectWhitespace = (html) => html.replace(whitespaceSensitive, '<!-- prettier-ignore -->$1');

const REFERENCE_ATTRIBUTES = [
  'for',
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
];

// Sections share a page in Storybook, so each snapshot gets its own id namespace.
function prefixIds(htmls, prefix) {
  if (!prefix) return htmls;
  const ids = new Set(
    htmls.flatMap((html) => [...html.matchAll(/\sid="([^"]*)"/g)].map((match) => match[1]))
  );
  const prefixTokens = (value) =>
    value
      .split(/\s+/)
      .filter(Boolean)
      .map((token) => prefix + token)
      .join(' ');
  const references = new RegExp(`(\\s(?:${REFERENCE_ATTRIBUTES.join('|')})=")([^"]*)(")`, 'g');
  return htmls.map((html) =>
    html
      .replace(/(\sid=")([^"]*)(")/g, (_, open, value, close) => open + prefix + value + close)
      .replace(references, (_, open, value, close) => open + prefixTokens(value) + close)
      .replace(
        /(<details\b[^>]*?\sname=")([^"]*)(")/g,
        (_, open, value, close) => open + prefix + value + close
      )
      .replace(/(href="#)([^"]+)(")/g, (match, open, value, close) =>
        ids.has(value) ? open + prefix + value + close : match
      )
  );
}

async function fillDjangoSlots(html, label) {
  const slots = globalThis.__USX_DJANGO_SLOTS__;
  const indexes = [...html.matchAll(SLOT_PATTERN)].map((match) => Number(match[1]));
  const rendered = new Map();
  for (const index of indexes) {
    const { name, props } = slots[index];
    const url = `${djangoUrl}/render/${name}/?props=${encodeURIComponent(JSON.stringify(props))}`;
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(
        `Django render failed for "${label}" (${name}): HTTP ${response.status} ${url}`
      );
    rendered.set(index, (await response.text()).trim());
  }
  return html.replace(SLOT_PATTERN, (_, index) => rendered.get(Number(index)));
}

const vite = await createServer({
  root: REPO_ROOT,
  configFile: false,
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  ssr: { noExternal: [/^storybook(\/|$)/] },
  plugins: [snapshotStubs(), react()],
});

async function renderSections(storiesFile, source) {
  globalThis.__USX_DJANGO_SLOTS__ = [];
  const module = await vite.ssrLoadModule(storiesFile);
  const Component = module.default?.component;
  const keys = storyKeys(storiesFile, module);
  if (!keys.length)
    throw new Error(`No stories found in ${path.relative(REPO_ROOT, storiesFile)}.`);

  const titles = [];
  const htmls = [];
  for (const key of keys) {
    const story = module[key];
    const args = story.args ?? {};
    // Rendered inside a component so stories that call hooks work.
    const StoryRender = () => {
      if (typeof story === 'function') return story(args, {});
      return story.render ? story.render(args, {}) : React.createElement(Component, args);
    };
    let html = renderToStaticMarkup(React.createElement(StoryRender));
    if (source === 'django') html = await fillDjangoSlots(html, key);
    titles.push((typeof story === 'function' ? story.storyName : story.name) || startCase(key));
    htmls.push(protectWhitespace(html));
  }
  const prefixed = prefixIds(htmls, values['id-prefix'] ?? `${source}-`);
  return titles.map((title, index) => `${SECTION_HEADING}${title}</h3>\n${prefixed[index]}\n`);
}

async function generate(component, source) {
  const storiesFile = findStoriesFile(component, sourceLabel(source));
  if (!storiesFile) throw new Error(`No ${sourceLabel(source)} stories file found.`);
  const outPath = values.out ? path.resolve(values.out) : snapshotPath(component, source);

  const sections = await renderSections(storiesFile, source);
  const prettierConfig = (await prettier.resolveConfig(outPath)) ?? {};
  const raw = sections.join('\n');
  let output = raw;
  let note = '';
  try {
    output = await prettier.format(raw, { ...prettierConfig, parser: 'html' });
  } catch (error) {
    // Markup Prettier's parser rejects (e.g. a block element inside <p>) is kept as rendered.
    note = ` UNFORMATTED: ${error.message.split('\n')[0]}`;
  }

  if (!values.out && !values['no-backup'] && fs.existsSync(outPath)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, component, `${stamp}.${path.basename(outPath)}`);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.copyFileSync(outPath, backupPath);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, output);
  console.log(
    `Wrote ${path.relative(REPO_ROOT, outPath)} (${sections.length} sections from ${sourceLabel(source)} stories)${note}`
  );
}

const failures = [];
try {
  for (const component of components) {
    for (const source of sources) {
      try {
        await generate(component, source);
        if (!values.out) recordGeneration(component, source, null);
      } catch (error) {
        if (!values.out) recordGeneration(component, source, error.message.split('\n')[0]);
        failures.push({ component, source, message: error.message.split('\n')[0] });
        console.error(
          `FAILED ${component} (${sourceLabel(source)}): ${error.message.split('\n')[0]}`
        );
      }
    }
  }
} finally {
  await vite.close();
}

if (failures.length) {
  console.error(
    `\n${failures.length} of ${components.length * sources.length} snapshot(s) failed.`
  );
  process.exit(1);
}
