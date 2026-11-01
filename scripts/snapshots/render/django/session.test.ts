import assert from 'node:assert/strict';
import test from 'node:test';
import { canonicalJson, currentSession, DjangoSession, runWithSession } from './session.ts';

const session = (): DjangoSession => new DjangoSession((props) => props);

test('canonicalJson ignores key order but not array order', () => {
  assert.equal(
    canonicalJson({ b: 1, a: { d: 1, c: 2 } }),
    canonicalJson({ a: { c: 2, d: 1 }, b: 1 })
  );
  assert.notEqual(canonicalJson([1, 2]), canonicalJson([2, 1]));
});

test('an unfetched request yields a stable token, then its HTML once recorded', () => {
  const s = session();
  const token = s.htmlFor('alert', { text: 'hi' });
  assert.match(token, /^__usx_django_[0-9a-f]{16}__$/);
  assert.equal(s.htmlFor('alert', { text: 'hi' }), token);

  const [request] = s.nextBatch();
  assert.ok(request);
  s.record(request, '<div>hi</div>');
  assert.equal(s.htmlFor('alert', { text: 'hi' }), '<div>hi</div>');
});

test('different props or components are different requests', () => {
  const s = session();
  assert.notEqual(s.htmlFor('alert', { a: 1 }), s.htmlFor('alert', { a: 2 }));
  assert.notEqual(s.htmlFor('alert', {}), s.htmlFor('tag', {}));
});

test('fill substitutes fetched requests and leaves the rest as tokens', () => {
  const s = session();
  const first = s.slotFor('a', {});
  const second = s.slotFor('b', {});
  const [a] = s.nextBatch();
  assert.ok(a);
  s.record(a, '<i>a</i>');
  const filled = s.fill(`<p>${first}</p><p>${second}</p>`);
  assert.equal(filled, `<p><i>a</i></p><p>${second}</p>`);
  assert.equal(s.isIncomplete(filled), true);
  assert.equal(s.isIncomplete('<p>done</p>'), false);
});

test('a request built from another request’s token is held back until that one is fetched', () => {
  const s = session();
  const inner = s.htmlFor('inner', {});
  s.htmlFor('outer', { children: inner });
  assert.deepEqual(
    s.nextBatch().map((request) => request.component),
    ['inner']
  );
});

test('requests are recorded afresh each pass', () => {
  const s = session();
  s.htmlFor('a', {});
  s.beginPass();
  assert.deepEqual(s.nextBatch(), []);
});

test('the active session exists only during runWithSession', () => {
  const s = session();
  assert.throws(() => currentSession(), /while generating a snapshot/);
  assert.equal(
    runWithSession(s, () => currentSession()),
    s
  );
  assert.throws(() => currentSession());
});
