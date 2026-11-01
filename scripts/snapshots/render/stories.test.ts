import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { createStoryElement, listStories } from './stories.ts';

const html = (module: Record<string, unknown>, exportName: string): string =>
  renderToStaticMarkup(createStoryElement(module, exportName));

test('listStories returns stories in source order with Storybook names, honoring excludeStories', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'stories-'));
  const file = path.join(directory, 'Thing.React.stories.jsx');
  fs.writeFileSync(
    file,
    `export default { title: 'T', excludeStories: ['defs'] };
export const defs = { A: 1 };
export const Zebra = { args: {} };
export const Apple = { name: 'Green apple', args: {} };
export const StoryStep1Context = { args: {} };`
  );
  try {
    assert.deepEqual(listStories(file), [
      { exportName: 'Zebra', name: 'Zebra' },
      { exportName: 'Apple', name: 'Green apple' },
      { exportName: 'StoryStep1Context', name: 'Story Step 1 Context' },
    ]);
  } finally {
    fs.rmSync(directory, { recursive: true });
  }
});

test('a story renders the meta component with meta args under story args', () => {
  const Greeting = ({ name, punctuation }: { name: string; punctuation: string }) =>
    `Hello ${name}${punctuation}`;
  const module = {
    default: { component: Greeting, args: { name: 'meta', punctuation: '!' } },
    Story: { args: { name: 'story' } },
  };
  assert.equal(html(module, 'Story'), 'Hello story!');
});

test('a story render function takes precedence, then the meta render function', () => {
  const component = () => 'component';
  assert.equal(
    html({ default: { component, render: () => 'meta' }, S: { render: () => 'story' } }, 'S'),
    'story'
  );
  assert.equal(html({ default: { component, render: () => 'meta' }, S: {} }, 'S'), 'meta');
});

test('a function story is called with its args property', () => {
  const story = Object.assign((args: { n: number }) => `n=${args.n}`, { args: { n: 7 } });
  assert.equal(html({ default: {}, S: story }, 'S'), 'n=7');
});

test('a story with nothing to render is an error', () => {
  assert.throws(() => html({ default: {}, S: {} }, 'S'), /no render function/);
});
