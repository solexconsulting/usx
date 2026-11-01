import type { Page } from 'playwright-core';
import type { ConsoleError } from '../model/results.ts';
import { cleanMessage } from './text.ts';

/** Storybook's own files that every story requests and none provides. */
const STORYBOOK_NOISE = /\/(env-config\.js|favicon\.ico)$/;
const MAX_DISTINCT = 10;

/** Records the errors the page logs from now on; call the result for what was seen so far. */
export function collectConsoleErrors(page: Page): () => ConsoleError[] {
  const counts = new Map<string, ConsoleError>();
  const note = (text: string, url: string | undefined): void => {
    if (url !== undefined && STORYBOOK_NOISE.test(url)) return;
    const message = cleanMessage(text.split('\n')[0] ?? '', 300);
    const key = `${message}\0${url ?? ''}`;
    const seen = counts.get(key);
    counts.set(
      key,
      seen ? { ...seen, count: seen.count + 1 } : { message, ...(url ? { url } : {}), count: 1 }
    );
  };
  page.on('console', (entry) => {
    if (entry.type() === 'error') note(entry.text(), entry.location().url || undefined);
  });
  page.on('pageerror', (error) => note(error.message, undefined));
  return () => [...counts.values()].slice(0, MAX_DISTINCT);
}
