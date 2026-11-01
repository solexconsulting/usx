import assert from 'node:assert/strict';
import test from 'node:test';
import { listComponents, requireComponents, storiesFile } from './catalog.ts';

test('listComponents returns sorted, unique component directories', () => {
  const components = listComponents();
  assert.ok(components.includes('time-picker'));
  assert.deepEqual(components, [...new Set(components)].sort());
});

test('requireComponents rejects unknown names and keeps known ones in order', () => {
  assert.deepEqual(requireComponents(['tag', 'hint']), ['tag', 'hint']);
  assert.throws(() => requireComponents(['hint', 'nope', 'also-nope']), /nope, also-nope/);
});

test('storiesFile finds the single stories file of each kind', () => {
  assert.match(storiesFile('time-picker', 'React'), /TimePicker\.React\.stories\.jsx$/);
  assert.throws(() => storiesFile('no-such-component', 'React'), /found 0/);
});
