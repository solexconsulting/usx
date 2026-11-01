import assert from 'node:assert/strict';
import test from 'node:test';
import type { DjangoClient } from './client.ts';
import { renderWithDjango } from './renderWithDjango.ts';
import { DjangoSession } from './session.ts';

const recordingClient = (): DjangoClient & { calls: string[] } => {
  const calls: string[] = [];
  return {
    calls,
    async render(component, props) {
      calls.push(component);
      return `<${component}>${JSON.stringify(props)}</${component}>`;
    },
  };
};

test('markup without Django components renders once and fetches nothing', async () => {
  const client = recordingClient();
  const html = await renderWithDjango(new DjangoSession((p) => p), client, () => '<p>plain</p>');
  assert.equal(html, '<p>plain</p>');
  assert.deepEqual(client.calls, []);
});

test('a requested component is fetched and its HTML substituted', async () => {
  const session = new DjangoSession((p) => p);
  const client = recordingClient();
  const html = await renderWithDjango(
    session,
    client,
    () => `<main>${session.slotFor('tag', { n: 1 })}</main>`
  );
  assert.equal(html, '<main><tag>{"n":1}</tag></main>');
  assert.deepEqual(client.calls, ['tag']);
});

test('nested requests are fetched in dependency order without wasted fetches', async () => {
  const session = new DjangoSession((p) => p);
  const client = recordingClient();
  const html = await renderWithDjango(session, client, () => {
    const inner = session.htmlFor('inner', {});
    return `<div>${session.slotFor('outer', { children: inner })}</div>`;
  });
  assert.equal(html, '<div><outer>{"children":"<inner>{}</inner>"}</outer></div>');
  assert.deepEqual(client.calls, ['inner', 'outer']);
});

test('the same request made twice is fetched once', async () => {
  const session = new DjangoSession((p) => p);
  const client = recordingClient();
  await renderWithDjango(
    session,
    client,
    () => session.slotFor('a', {}) + session.slotFor('a', {})
  );
  assert.deepEqual(client.calls, ['a']);
});

test('a render that keeps asking for new requests is stopped', async () => {
  const session = new DjangoSession((p) => p);
  let depth = 0;
  await assert.rejects(
    renderWithDjango(session, recordingClient(), () => {
      depth++;
      let html = '';
      for (let level = 0; level < depth; level++) html = session.htmlFor('layer', { level, html });
      return session.slotFor('layer', { depth, html });
    }),
    /nested more than/
  );
});
