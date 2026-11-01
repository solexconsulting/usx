import assert from 'node:assert/strict';
import test from 'node:test';
import { createDjangoClient } from './client.ts';

const responding = (body: string, status = 200): typeof fetch =>
  (async () => new Response(body, { status })) as typeof fetch;

test('requests the render endpoint with url-encoded props and trims the body', async () => {
  let requested = '';
  const client = createDjangoClient('http://django.test:9090/', (async (url: string) => {
    requested = url;
    return new Response('  <p>hi</p>\n');
  }) as unknown as typeof fetch);
  assert.equal(await client.render('alert', { text: 'a b' }), '<p>hi</p>');
  assert.equal(
    requested,
    'http://django.test:9090/render/alert/?props=%7B%22text%22%3A%22a%20b%22%7D'
  );
});

test('a failing response is an error that names the component and status', async () => {
  const client = createDjangoClient('http://django.test', responding('nope', 500));
  await assert.rejects(client.render('alert', {}), /Django failed to render "alert": HTTP 500/);
});

test('a network error is retried once, then reported', async () => {
  let attempts = 0;
  const flaky = (async () => {
    attempts++;
    if (attempts === 1) throw new TypeError('socket hang up');
    return new Response('ok');
  }) as typeof fetch;
  assert.equal(await createDjangoClient('http://django.test', flaky).render('a', {}), 'ok');

  const down = (async () => {
    throw new TypeError('connect ECONNREFUSED');
  }) as typeof fetch;
  await assert.rejects(
    createDjangoClient('http://django.test', down).render('a', {}),
    /Could not reach the Django render server/
  );
});
