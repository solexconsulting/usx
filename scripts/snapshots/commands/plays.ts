import { parseArgs } from 'node:util';
import { UserError } from '../errors.ts';
import { listComponents, requireComponents } from '../model/catalog.ts';
import type { PlayResult } from '../model/results.ts';
import { SOURCES, SOURCE_LABELS, type ComponentName, type Source } from '../model/types.ts';
import { mapConcurrent } from '../pool.ts';
import { attemptPlay, type AttemptOptions } from '../plays/attempt.ts';
import { launchChromium } from '../plays/browser.ts';
import { executePlay, withHistory } from '../plays/execute.ts';
import { playInputHash } from '../plays/inputs.ts';
import { wantsRun, type RunFilters } from '../plays/select.ts';
import { findPlayTarget, loadStoryIndex, type IndexEntry } from '../plays/storyIndex.ts';
import { playStore, resultKey } from '../results/stores.ts';
import type { Command } from './command.ts';
import { wholeNumber } from './options.ts';
import { writeReport } from './report.ts';

const OPTIONS = {
  all: { type: 'boolean' },
  changed: { type: 'boolean' },
  failed: { type: 'boolean' },
  'storybook-url': { type: 'string' },
  concurrency: { type: 'string' },
  retries: { type: 'string' },
  timeout: { type: 'string' },
  'count-assertions': { type: 'boolean' },
} as const;

interface Task {
  readonly component: ComponentName;
  readonly source: Source;
  readonly storyId: string;
}

/** The plays to run: every component's playable "All Variants" story that passes the filters. */
function selectTasks(
  components: readonly ComponentName[],
  index: readonly IndexEntry[],
  filters: RunFilters
): Task[] {
  const store = playStore();
  return components.flatMap((component) =>
    SOURCES.flatMap((source) => {
      const target = findPlayTarget(index, component, source);
      if (target.kind !== 'play') return [];
      const stored = store.read(resultKey(component, source));
      const wanted = wantsRun(filters, stored, () => playInputHash(component, source));
      return wanted ? [{ component, source, storyId: target.storyId }] : [];
    })
  );
}

function describe(task: Task, result: PlayResult): string {
  const seconds = `${(result.durationMs / 1000).toFixed(1)}s`;
  const flakiness =
    result.status === 'flaky' ? `passed on attempt ${result.attempts}, first failure:` : '';
  const notes = [flakiness, result.message].filter(Boolean).join(' ');
  return `${result.status.padEnd(6)} ${task.component} (${SOURCE_LABELS[task.source]}) ${seconds}${notes ? ` - ${notes}` : ''}\n`;
}

export const plays: Command = {
  name: 'plays',
  summary:
    'Run the All Variants play tests in a browser, record the results and rebuild the report.',
  usage:
    'plays [component...]|--all [--changed] [--failed] [--storybook-url <url>] [--concurrency <n>] [--retries <n>] [--timeout <ms>] [--count-assertions]',
  async run(argv, write) {
    const { values, positionals } = parseArgs({
      args: [...argv],
      options: OPTIONS,
      allowPositionals: true,
    });
    const storybookUrl = (values['storybook-url'] ?? process.env.STORYBOOK_URL ?? '').replace(
      /\/$/,
      ''
    );
    if (!storybookUrl) throw new UserError('Pass --storybook-url or set STORYBOOK_URL.');
    const concurrency = wholeNumber('concurrency', values.concurrency, 4, 1);
    const retries = wholeNumber('retries', values.retries, 1, 0);
    const timeoutMs = wholeNumber('timeout', values.timeout, 60_000, 1);

    if (values.all && positionals.length)
      throw new UserError('Pass component names or --all, not both.');
    const components = positionals.length ? requireComponents(positionals) : listComponents();
    const tasks = selectTasks(components, await loadStoryIndex(storybookUrl), {
      changed: values.changed === true,
      failed: values.failed === true,
    });
    if (tasks.length === 0) {
      write('Nothing to run.\n');
      await writeReport(storybookUrl);
      return 0;
    }

    const store = playStore();
    const options: AttemptOptions = { storybookUrl, timeoutMs, countAssertions: false };
    const browser = await launchChromium();
    try {
      const results = await mapConcurrent(tasks, concurrency, async (task) => {
        const key = resultKey(task.component, task.source);
        const inputHash = playInputHash(task.component, task.source);
        let result = await executePlay(() => attemptPlay(browser, task.storyId, options), retries);
        if (values['count-assertions'] && (result.status === 'pass' || result.status === 'flaky')) {
          // Counting instruments the play, so it is a separate run that cannot change the outcome.
          const counted = await attemptPlay(browser, task.storyId, {
            ...options,
            countAssertions: true,
          });
          if (counted.assertions !== undefined)
            result = { ...result, assertions: counted.assertions };
        }
        result = withHistory(result, store.read(key)?.result);
        store.write(key, { inputHash, recordedAt: new Date().toISOString(), result });
        write(describe(task, result));
        return result;
      });

      const failing = results.filter((r) => r.status === 'fail' || r.status === 'error').length;
      const flaky = results.filter((r) => r.status === 'flaky').length;
      write(`${results.length} play(s) run: ${failing} failing, ${flaky} flaky.\n`);
      await writeReport(storybookUrl);
      return failing === 0 ? 0 : 1;
    } finally {
      await browser.close();
    }
  },
};
