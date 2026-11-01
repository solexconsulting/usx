import assert from 'node:assert/strict';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { UserError } from '../errors.ts';
import { attemptPlay, type AttemptOptions } from './attempt.ts';
import { launchChromium } from './browser.ts';

/** A stand-in for Storybook's preview iframe: what happens depends on the story id it is asked for. */
const PAGE = `<!doctype html><script>
  const handlers = {};
  window.__STORYBOOK_ADDONS_CHANNEL__ = {
    on: (event, handler) => (handlers[event] ||= []).push(handler),
  };
  const emit = (event, payload) => (handlers[event] || []).forEach((handler) => handler(payload));
  const scenario = new URLSearchParams(location.search).get('id');
  setTimeout(() => {
    if (scenario === 'pass') emit('storyRendered');
    if (scenario === 'fail') emit('playFunctionThrewException', { message: 'expected 1 to be 0' });
    if (scenario === 'noisy') {
      console.error('something broke');
      fetch('/favicon.ico').finally(() => fetch('/missing.js')).finally(() => emit('storyRendered'));
    }
    if (scenario === 'image') {
      const image = new Image();
      image.onload = () => (image.naturalWidth === 1 ? emit('storyRendered') : emit('storyErrored', { message: 'wrong image' }));
      image.onerror = () => emit('storyErrored', { message: 'image did not load' });
      image.src = 'http://images.invalid/photo.jpg';
    }
  }, 30);
</script>`;

describe('attemptPlay against a fake Storybook', () => {
  let server: http.Server;
  let browser: Browser | undefined;
  let storybookUrl = '';

  const options = (overrides: Partial<AttemptOptions> = {}): AttemptOptions => ({
    storybookUrl,
    timeoutMs: 3000,
    countAssertions: false,
    ...overrides,
  });

  before(async () => {
    server = http.createServer((request, response) => {
      if (request.url?.startsWith('/iframe.html')) {
        response.setHeader('content-type', 'text/html').end(PAGE);
      } else {
        response.statusCode = 404;
        response.end();
      }
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    storybookUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    try {
      browser = await launchChromium();
    } catch (error) {
      if (!(error instanceof UserError)) throw error;
    }
  });

  after(async () => {
    await browser?.close();
    server.close();
  });

  const run = (storyId: string, overrides?: Partial<AttemptOptions>) => {
    if (!browser) throw new Error('skip');
    return attemptPlay(browser, storyId, options(overrides));
  };

  const guarded = (name: string, body: () => Promise<void>): void => {
    it(name, async (context) => {
      if (!browser) return context.skip('Chromium is not available');
      await body();
    });
  };

  guarded('reports a play that finishes as a pass', async () => {
    const attempt = await run('pass');
    assert.equal(attempt.status, 'pass');
    assert.deepEqual(attempt.consoleErrors, []);
  });

  guarded('reports a play Storybook says threw as a failure with its message', async () => {
    const attempt = await run('fail');
    assert.equal(attempt.status, 'fail');
    assert.equal(attempt.message, 'expected 1 to be 0');
  });

  guarded('reports a play that never finishes as an error after the timeout', async () => {
    const attempt = await run('silent', { timeoutMs: 300 });
    assert.equal(attempt.status, 'error');
    assert.match(attempt.message ?? '', /Timed out after 0\.3s/);
  });

  guarded(
    'records page errors with their URL and ignores Storybook’s own missing files',
    async () => {
      const attempt = await run('noisy');
      assert.equal(attempt.status, 'pass');
      const messages = attempt.consoleErrors.map((error) => error.message);
      assert.ok(messages.includes('something broke'));
      assert.ok(attempt.consoleErrors.some((error) => error.url?.endsWith('/missing.js')));
      assert.ok(!attempt.consoleErrors.some((error) => error.url?.endsWith('/favicon.ico')));
    }
  );

  guarded('serves images from other origins without touching the network', async () => {
    assert.equal((await run('image')).status, 'pass');
  });
});
