#!/usr/bin/env node
// Builds the data behind the Snapshot Report page (Storybook: Reports / Snapshot Report) for every
// component's "All Variants" snapshots:
//   - whether the React and Django snapshots exist,
//   - how the two compare, section by section (ignoring attribute order, whitespace, and the
//     react-/django- id prefix),
//   - whether each snapshot story's play test passes in a real browser (needs a running Storybook).
//
//   pnpm snapshot:report [--component details,tree] [--storybook-url <url>] [--skip-play] [--out <file>]
//
// Output: reports/snapshot-report.json, which Storybook serves at /reports/ and the report page reads.
// The report always lists every component. With --component only those rows are refreshed (and with
// --skip-play their previous play results are kept); the rest keep their previous rows, each stamped
// with when it was compared (comparedAt) and last played (playedAt).
// Env: STORYBOOK_URL is used when --storybook-url is not given. Without either, play tests are
// reported as "not run".
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';
import {
  REPO_ROOT,
  REPORT_DIR,
  SOURCES,
  compareSnapshots,
  readGenerationFailures,
  trimContext,
  listComponentDirs,
  snapshotPath,
  sourceLabel,
} from './lib/snapshots.js';

const USAGE =
  'Usage: node scripts/snapshot-report.js [--component a,b] [--storybook-url <url>] [--skip-play] [--play-timeout <ms>] [--out <file>]';

const { values } = parseArgs({
  options: {
    component: { type: 'string' },
    'storybook-url': { type: 'string' },
    'skip-play': { type: 'boolean', default: false },
    'play-timeout': { type: 'string', default: '60000' },
    out: { type: 'string' },
  },
});

const allComponents = listComponentDirs();
const components = values.component
  ? values.component
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
  : allComponents;
const unknown = components.filter((name) => !allComponents.includes(name));
if (unknown.length) {
  console.error(`Unknown component(s): ${unknown.join(', ')}\n${USAGE}`);
  process.exit(1);
}

const storybookUrl = (values['storybook-url'] ?? process.env.STORYBOOK_URL ?? '').replace(
  /\/$/,
  ''
);
const playTimeout = Number(values['play-timeout']);
const outPath = path.resolve(values.out ?? path.join(REPORT_DIR, 'snapshot-report.json'));

// ---- Snapshot comparison ------------------------------------------------------------------

function readSnapshots(dir) {
  return Object.fromEntries(
    SOURCES.map((source) => {
      const file = snapshotPath(dir, source);
      return [source, fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null];
    })
  );
}

// Differences that are intentional, with the reason (scripts/snapshot-expected.json). A
// component's reserved "$ignoreAttributes" list drops those attributes from its comparison.
const EXPECTED = JSON.parse(
  fs.readFileSync(new URL('./snapshot-expected.json', import.meta.url), 'utf8')
);

function compareComponent(dir) {
  const snapshots = readSnapshots(dir);
  const present = SOURCES.filter((source) => snapshots[source] !== null);
  const generation = readGenerationFailures()[dir] ?? {};
  if (present.length === 0) return { status: 'no-snapshots', present, sections: [], generation };
  if (present.length === 1) return { status: 'incomplete', present, sections: [], generation };
  const sections = compareSnapshots(
    snapshots.react,
    snapshots.django,
    EXPECTED[dir]?.$ignoreAttributes
  ).map((section) => {
    const trimmed = section.diff ? { ...section, diff: trimContext(section.diff) } : section;
    const reason = section.status === 'identical' ? undefined : EXPECTED[dir]?.[section.title];
    return reason ? { ...trimmed, expected: reason } : trimmed;
  });
  const status = sections.every((section) => section.status === 'identical' || section.expected)
    ? 'match'
    : 'differs';
  return { status, present, sections, generation };
}

// ---- Play tests ---------------------------------------------------------------------------

const ANSI = new RegExp(`${String.fromCharCode(27)}\\[[0-9;]*m`, 'g');
const cleanMessage = (message) =>
  String(message ?? '')
    .replace(ANSI, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 600);

async function loadStoryIndex() {
  const response = await fetch(`${storybookUrl}/index.json`);
  if (!response.ok)
    throw new Error(`Could not read ${storybookUrl}/index.json (HTTP ${response.status}).`);
  return Object.values((await response.json()).entries).filter((entry) => entry.type === 'story');
}

// Storybook announces play completion on its channel; no console scraping or fixed waits.
const watchPlay = () => {
  window.__usxPlay = { done: false, error: null };
  const finish = (error) => {
    if (window.__usxPlay.done) return;
    window.__usxPlay = { done: true, error: error ?? null };
  };
  const timer = setInterval(() => {
    const channel = window.__STORYBOOK_ADDONS_CHANNEL__;
    if (!channel) return;
    clearInterval(timer);
    channel.on('storyRendered', () => finish());
    channel.on('playFunctionThrewException', (error) => finish(error?.message ?? String(error)));
    channel.on('storyThrewException', (error) => finish(error?.message ?? String(error)));
    channel.on('storyErrored', (error) =>
      finish(error?.title ?? error?.description ?? 'Story errored')
    );
    channel.on('storyMissing', () => finish('Story missing'));
  }, 5);
};

async function runPlay(browser, story) {
  const page = await browser.newPage();
  try {
    await page.addInitScript(watchPlay);
    await page.goto(`${storybookUrl}/iframe.html?id=${story.id}&viewMode=story`, {
      timeout: 30000,
    });
    await page.waitForFunction(() => window.__usxPlay?.done, undefined, { timeout: playTimeout });
    const { error } = await page.evaluate(() => window.__usxPlay);
    return error ? { status: 'fail', message: cleanMessage(error) } : { status: 'pass' };
  } catch (error) {
    return { status: 'error', message: cleanMessage(error.message) };
  } finally {
    await page.close();
  }
}

// Playwright wants the exact Chromium build it shipped with. If that one is not installed, fall back
// to any Chromium already downloaded (newest first) rather than failing.
async function launchBrowser(chromium) {
  const configuredPath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
  try {
    return await chromium.launch({ headless: true, executablePath: configuredPath || undefined });
  } catch (error) {
    if (configuredPath || !/Executable doesn't exist/.test(error.message)) throw error;
    const browsersDir =
      process.env.PLAYWRIGHT_BROWSERS_PATH || path.join(os.homedir(), '.cache', 'ms-playwright');
    const installed = fs.existsSync(browsersDir)
      ? fs
          .readdirSync(browsersDir)
          .filter((name) => /^chromium-\d+$/.test(name))
          .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]))
          .map((name) => path.join(browsersDir, name, 'chrome-linux64', 'chrome'))
          .find((candidate) => fs.existsSync(candidate))
      : undefined;
    if (!installed)
      throw new Error(
        `${error.message}\nRun "pnpm exec playwright-core install chromium" or set PLAYWRIGHT_CHROMIUM_PATH.`
      );
    return chromium.launch({ headless: true, executablePath: installed });
  }
}

async function collectPlayResults(dirs) {
  const results = Object.fromEntries(
    dirs.map((dir) => [
      dir,
      Object.fromEntries(SOURCES.map((source) => [source, { status: 'not-run' }])),
    ])
  );
  if (values['skip-play'] || !storybookUrl) return results;

  const stories = await loadStoryIndex();
  const { chromium } = await import('playwright-core');
  const browser = await launchBrowser(chromium);
  try {
    for (const dir of dirs) {
      for (const source of SOURCES) {
        const story = stories.find(
          (entry) =>
            entry.importPath.includes(`/components/${dir}/`) &&
            /\.HTML\.stories\./.test(entry.importPath) &&
            entry.id.endsWith(`--all-variants-${source}`)
        );
        if (!story) results[dir][source] = { status: 'no-story' };
        else if (!story.tags?.includes('play-fn'))
          results[dir][source] = { status: 'no-play', storyId: story.id };
        else {
          process.stdout.write(`play ${dir} (${sourceLabel(source)})... `);
          results[dir][source] = { ...(await runPlay(browser, story)), storyId: story.id };
          console.log(results[dir][source].status);
        }
      }
    }
  } finally {
    await browser.close();
  }
  return results;
}

const playRequested = !values['skip-play'] && Boolean(storybookUrl);
const play = await collectPlayResults(components);

const previousRows = new Map();
let previousStorybookUrl = null;
if (fs.existsSync(outPath)) {
  try {
    const previousReport = JSON.parse(fs.readFileSync(outPath, 'utf8'));
    previousStorybookUrl = previousReport.storybookUrl ?? null;
    for (const row of previousReport.rows ?? []) previousRows.set(row.component, row);
  } catch {
    // An unreadable report is rebuilt from scratch.
  }
}

const NOT_RUN = () =>
  Object.fromEntries(SOURCES.map((source) => [source, { status: 'not-run' }]));

// Latest modification time of the component's snapshot files.
function snapshotsAt(dir) {
  const times = SOURCES.map((source) => snapshotPath(dir, source))
    .filter((file) => fs.existsSync(file))
    .map((file) => fs.statSync(file).mtime);
  return times.length ? new Date(Math.max(...times)).toISOString() : null;
}

const generatedAt = new Date().toISOString();
const rows = allComponents.map((component) => {
  const previous = previousRows.get(component);
  const selected = components.includes(component);
  if (!selected && previous) return previous;

  // Selected rows are recompared; a component with no previous row is compared once so it is listed.
  const ranPlay = selected && playRequested;
  const checkedAt = ranPlay ? generatedAt : null;
  return {
    component,
    comparison: compareComponent(component),
    comparedAt: generatedAt,
    snapshotsAt: snapshotsAt(component),
    play: ranPlay
      ? Object.fromEntries(
          SOURCES.map((source) => [source, { ...play[component][source], checkedAt }])
        )
      : (previous?.play ?? NOT_RUN()),
    playedAt: ranPlay ? generatedAt : (previous?.playedAt ?? null),
  };
});

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  `${JSON.stringify({ generatedAt, storybookUrl: storybookUrl || previousStorybookUrl, rows }, null, 2)}\n`
);
console.log(
  `Wrote ${path.relative(REPO_ROOT, outPath)} (${rows.length} components, ${components.length} refreshed)`
);
if (storybookUrl)
  console.log(`View it at ${storybookUrl}/?path=/story/reports-snapshot-report--default`);
