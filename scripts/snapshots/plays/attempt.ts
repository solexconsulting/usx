import type { Browser, Page } from 'playwright-core';
import { errors } from 'playwright-core';
import type { ConsoleError } from '../model/results.ts';
import { collectConsoleErrors } from './consoleErrors.ts';
import { installProbe, type ProbeState } from './probe.ts';
import { cleanMessage } from './text.ts';

export interface AttemptOptions {
  readonly storybookUrl: string;
  readonly timeoutMs: number;
  /** Also count matcher calls. This instruments the play, which can change its timing. */
  readonly countAssertions: boolean;
}

/** One run of one play. */
export interface Attempt {
  readonly status: 'pass' | 'fail' | 'error';
  readonly message?: string;
  readonly durationMs: number;
  readonly consoleErrors: readonly ConsoleError[];
  readonly assertions?: number;
}

const NAVIGATION_TIMEOUT_MS = 30_000;

// 1x1 transparent PNG, standing in for every image that is not served by Storybook itself.
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64'
);

/**
 * Plays must not depend on the internet: images from other origins (picsum.photos, the USWDS site)
 * get a fixed placeholder and any other outside request an empty response.
 */
async function isolateFromNetwork(page: Page, storybookUrl: string): Promise<void> {
  const own = new URL(storybookUrl).origin;
  await page.route('**/*', (route) => {
    const request = route.request();
    if (new URL(request.url()).origin === own) return route.continue();
    return request.resourceType() === 'image'
      ? route.fulfill({ status: 200, contentType: 'image/png', body: PLACEHOLDER_PNG })
      : route.fulfill({ status: 204 });
  });
}

export async function attemptPlay(
  browser: Browser,
  storyId: string,
  options: AttemptOptions
): Promise<Attempt> {
  const started = Date.now();
  const page = await browser.newPage();
  const consoleErrors = collectConsoleErrors(page);
  const finished = (result: Omit<Attempt, 'durationMs' | 'consoleErrors'>): Attempt => ({
    ...result,
    durationMs: Date.now() - started,
    consoleErrors: consoleErrors(),
  });

  try {
    await isolateFromNetwork(page, options.storybookUrl);
    await page.addInitScript(installProbe, options.countAssertions);
    const instrument = options.countAssertions ? '&instrument=true' : '';
    await page.goto(
      `${options.storybookUrl}/iframe.html?id=${storyId}&viewMode=story${instrument}`,
      {
        timeout: NAVIGATION_TIMEOUT_MS,
        // The play announces itself on Storybook's channel, so waiting for every image to load is needless.
        waitUntil: 'domcontentloaded',
      }
    );
    await page.waitForFunction(() => window.__usxPlay?.done === true, undefined, {
      timeout: options.timeoutMs,
    });
    const { error, assertions } = await page.evaluate(
      (): ProbeState => window.__usxPlay as ProbeState
    );
    const counted = options.countAssertions ? { assertions } : {};
    return error === null
      ? finished({ status: 'pass', ...counted })
      : finished({ status: 'fail', message: cleanMessage(error), ...counted });
  } catch (error) {
    const timedOut = error instanceof errors.TimeoutError;
    const message = timedOut
      ? `Timed out after ${options.timeoutMs / 1000}s waiting for the play to finish.`
      : cleanMessage(error instanceof Error ? error.message : String(error));
    return finished({ status: 'error', message });
  } finally {
    await page.close();
  }
}
