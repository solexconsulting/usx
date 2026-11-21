import assert from 'node:assert/strict';
import test from 'node:test';
import {
  listComponents,
  listStoryComponents,
  requireComponents,
  storiesFile,
  storiesFiles,
} from './catalog.ts';

test('listComponents returns sorted, unique component directories', () => {
  const components = listComponents();
  assert.ok(components.includes('time-picker'));
  assert.deepEqual(components, [...new Set(components)].sort());
});

test('requireComponents rejects unknown names and keeps known ones in order', () => {
  assert.deepEqual(requireComponents(['tag', 'hint']), ['tag', 'hint']);
  assert.throws(() => requireComponents(['hint', 'nope', 'also-nope']), /nope, also-nope/);
});

test('story discovery returns known components with renderer stories', () => {
  const names = listStoryComponents();
  assert.ok(names.includes('time-picker'));
  for (const name of names) {
    assert.ok(listComponents().includes(name));
    assert.ok(storiesFiles(name, 'React').length > 0);
  }
});

test('story discovery includes attachment lists without requiring item stories', () => {
  assert.ok(listComponents().includes('chat-attachment'));
  assert.ok(!listStoryComponents().includes('chat-attachment'));
  assert.ok(listStoryComponents().includes('chat-attachments'));
  assert.match(storiesFile('chat-attachments', 'React'), /ChatAttachments\.React\.stories\.jsx$/);
});

test('storiesFile finds the single stories file of each kind', () => {
  assert.match(storiesFile('time-picker', 'React'), /TimePicker\.React\.stories\.jsx$/);
  assert.throws(() => storiesFile('no-such-component', 'React'), /found 0/);
  const grouped = storiesFiles('data-table', 'React');
  assert.ok(grouped[0]);
  assert.match(grouped[0], /DataTable\.React\.stories\.jsx$/);
  assert.ok(grouped.some((file) => /DataTable\.Sorting\.React\.stories\.jsx$/.test(file)));
});

test('subcomponent stories resolve beneath the parent component', () => {
  for (const kind of ['React', 'Django', 'HTML'] as const)
    assert.match(
      storiesFile('chat-composer', kind),
      /chat\/subcomponents\/chat-composer\/ChatComposer\./
    );
});
