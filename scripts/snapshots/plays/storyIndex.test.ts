import assert from 'node:assert/strict';
import test from 'node:test';
import { findPlayTarget, loadStoryIndex, type IndexEntry } from './storyIndex.ts';

const story = (importPath: string, exportName: string, tags: string[] = []): IndexEntry => ({
  id: `id-${exportName}`,
  type: 'story',
  importPath,
  exportName,
  tags,
});

const HTML = '../../packages/usx-stories/src/components/carousel/Carousel.HTML.stories.jsx';

test('finds the All Variants story of each source and whether it has a play', () => {
  const index = [
    story(HTML, 'AllVariantsReact', ['play-fn']),
    story(HTML, 'AllVariantsDjango'),
    story(HTML.replace('Carousel.HTML', 'Carousel.React'), 'AllVariantsReact', ['play-fn']),
  ];
  assert.deepEqual(findPlayTarget(index, 'carousel', 'react'), {
    kind: 'play',
    storyId: 'id-AllVariantsReact',
  });
  assert.deepEqual(findPlayTarget(index, 'carousel', 'django'), {
    kind: 'no-play',
    storyId: 'id-AllVariantsDjango',
  });
});

test('a component without the story has no target; another component is never matched', () => {
  const index = [story(HTML, 'AllVariantsReact', ['play-fn'])];
  assert.deepEqual(findPlayTarget(index, 'tag', 'react'), { kind: 'no-story' });
  assert.deepEqual(findPlayTarget(index, 'carousel', 'django'), { kind: 'no-story' });
  assert.deepEqual(findPlayTarget(index, 'carousel-extra', 'react'), { kind: 'no-story' });
});

const respond = (body: unknown, status = 200): typeof fetch =>
  (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;

test('loadStoryIndex returns the entries of index.json', async () => {
  const entries = await loadStoryIndex(
    'http://sb.test',
    respond({ entries: { a: story(HTML, 'AllVariantsReact'), junk: 5 } })
  );
  assert.deepEqual(
    entries.map((entry) => entry.id),
    ['id-AllVariantsReact']
  );
});

test('loadStoryIndex explains an unreachable or unexpected server', async () => {
  await assert.rejects(loadStoryIndex('http://sb.test', respond({}, 404)), /HTTP 404/);
  await assert.rejects(loadStoryIndex('http://sb.test', respond({ nope: 1 })), /has no entries/);
  await assert.rejects(
    loadStoryIndex('http://sb.test', (async () => {
      throw new TypeError('refused');
    }) as typeof fetch),
    /Could not reach Storybook/
  );
});
