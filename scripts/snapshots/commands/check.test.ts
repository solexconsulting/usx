import assert from 'node:assert/strict';
import test from 'node:test';
import { compareComponent } from '../compare/compare.ts';
import { findProblems } from './check.ts';

test('a matching component has no problems', () => {
  const comparison = compareComponent(
    { react: [{ title: 'A', html: '<i></i>' }], django: [{ title: 'A', html: '<i></i>' }] },
    undefined
  );
  assert.deepEqual(findProblems(comparison), []);
});

test('missing and incomplete snapshots are problems', () => {
  assert.deepEqual(findProblems(compareComponent({}, undefined)), ['  no snapshots exist']);
  assert.deepEqual(findProblems(compareComponent({ django: [] }, undefined)), [
    '  only the django snapshot exists',
  ]);
});

test('an unexpected difference is listed with its diff; an expected one is not', () => {
  const snapshots = {
    react: [
      { title: 'A', html: '<p>one</p>' },
      { title: 'B', html: '<p>one</p>' },
    ],
    django: [
      { title: 'A', html: '<p>two</p>' },
      { title: 'B', html: '<p>two</p>' },
    ],
  };
  const problems = findProblems(
    compareComponent(snapshots, { ignoreAttributes: [], sections: { B: 'Intended.' } })
  );
  assert.deepEqual(problems, [
    '  "A" is different',
    '    <p>'.replace('    <p>', '      <p>'),
    '    - one',
    '    + two',
    '      </p>',
  ]);
});

test('a stale expectation is a problem', () => {
  const comparison = compareComponent(
    { react: [{ title: 'A', html: '<i></i>' }], django: [{ title: 'A', html: '<i></i>' }] },
    { ignoreAttributes: [], sections: { A: 'Old reason.' } }
  );
  assert.deepEqual(findProblems(comparison), ['  the expectation for "A" is no longer needed']);
});
