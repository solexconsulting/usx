import { chromium, type Browser } from 'playwright-core';
import { UserError } from '../errors.ts';

/**
 * Launches Playwright's Chromium, or the executable named by PLAYWRIGHT_CHROMIUM_PATH. There is no
 * search for other installed versions: a mismatch is reported so it can be fixed, not worked around.
 */
export async function launchChromium(): Promise<Browser> {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
  try {
    return await chromium.launch({ headless: true, executablePath });
  } catch (error) {
    if (error instanceof Error && /Executable doesn't exist/.test(error.message))
      throw new UserError(
        'Chromium is not installed for this version of Playwright. Run "pnpm exec playwright-core install chromium", or set PLAYWRIGHT_CHROMIUM_PATH.',
        { cause: error }
      );
    throw error;
  }
}
