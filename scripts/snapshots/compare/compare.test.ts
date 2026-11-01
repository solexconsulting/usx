import assert from 'node:assert/strict';
import test from 'node:test';
import type { Section } from '../model/types.ts';
import { compareComponent } from './compare.ts';

const section = (title: string, html: string): Section => ({ title, html });

test('no snapshots is missing; one is incomplete', () => {
  assert.equal(compareComponent({}, undefined).status, 'missing');
  const incomplete = compareComponent({ react: [section('A', '<p>x</p>')] }, undefined);
  assert.equal(incomplete.status, 'incomplete');
  assert.deepEqual(incomplete.present, ['react']);
});

test('sections that differ only by id namespace and markup style are identical', () => {
  const result = compareComponent(
    {
      react: [section('A', '<input id="react-a" class="y x">')],
      django: [section('A', "<input class='x y' id='django-a'/>")],
    },
    undefined
  );
  assert.equal(result.status, 'match');
  assert.deepEqual(
    result.sections.map((s) => s.status),
    ['identical']
  );
});

test('a different section carries a diff and makes the component differ', () => {
  const result = compareComponent(
    { react: [section('A', '<p>one</p>')], django: [section('A', '<p>two</p>')] },
    undefined
  );
  assert.equal(result.status, 'differs');
  const [first] = result.sections;
  assert.equal(first?.status, 'different');
  assert.equal(first?.changedLines, 2);
  assert.deepEqual(
    first?.diff?.filter((line) => line.kind !== 'gap').map((line) => line.kind),
    ['same', 'removed', 'added', 'same']
  );
});

test('sections present on one side only are reported with the side that has them', () => {
  const result = compareComponent(
    {
      react: [section('A', '<i></i>'), section('R', '<i></i>')],
      django: [section('A', '<i></i>'), section('D', '<i></i>')],
    },
    undefined
  );
  assert.deepEqual(
    result.sections.map((s) => [s.title, s.status]),
    [
      ['A', 'identical'],
      ['R', 'react-only'],
      ['D', 'django-only'],
    ]
  );
});

test('expected differences make the component match and carry their reason', () => {
  const result = compareComponent(
    {
      react: [section('A', '<i></i>'), section('R', '<i></i>')],
      django: [section('A', '<i></i>')],
    },
    { ignoreAttributes: [], sections: { R: 'React only.' } }
  );
  assert.equal(result.status, 'match');
  assert.equal(result.sections[1]?.expected, 'React only.');
  assert.deepEqual(result.staleExpectations, []);
});

test('expectations for identical or missing sections are reported as stale', () => {
  const result = compareComponent(
    { react: [section('A', '<i></i>')], django: [section('A', '<i></i>')] },
    { ignoreAttributes: [], sections: { A: 'Was different.', Gone: 'Removed story.' } }
  );
  assert.equal(result.status, 'match');
  assert.deepEqual(result.staleExpectations, ['A', 'Gone']);
});

test('ignored attributes are left out of the comparison', () => {
  const result = compareComponent(
    {
      react: [section('A', '<a href="/one">x</a>')],
      django: [section('A', '<a href="/two">x</a>')],
    },
    { ignoreAttributes: ['href'], sections: {} }
  );
  assert.equal(result.status, 'match');
});

test('duplicate section titles are an error', () => {
  assert.throws(
    () => compareComponent({ react: [section('A', ''), section('A', '')], django: [] }, undefined),
    /react snapshot has two sections titled "A"/
  );
});
