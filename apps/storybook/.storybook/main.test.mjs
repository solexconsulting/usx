import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import config from './main.js';

test('story filters are opt-in, composable, validated, and development-only', () => {
  const originalPath = process.env.STORYBOOK_STORY_PATH;
  const originalTechnology = process.env.STORYBOOK_TECHNOLOGY;
  const development = { configType: 'DEVELOPMENT' };
  const production = { configType: 'PRODUCTION' };
  try {
    delete process.env.STORYBOOK_STORY_PATH;
    delete process.env.STORYBOOK_TECHNOLOGY;
    const allStories = config.stories([], development);
    assert.deepEqual(config.stories([], production), allStories);
    process.env.STORYBOOK_STORY_PATH = 'components/footer';
    assert.ok(config.stories([], development)[0].includes('/components/footer/'));
    process.env.STORYBOOK_TECHNOLOGY = 'React';
    const patterns = config.stories([], development);
    assert.equal(patterns.length, 2);
    assert.ok(patterns[0].includes('/*.React.stories.'));
    assert.ok(patterns[1].includes('!(*.React|*.Django|*.HTML)'));
    assert.deepEqual(config.stories([], production), allStories);
    delete process.env.STORYBOOK_STORY_PATH;
    assert.ok(!config.stories([], development)[0].includes('/components/footer/'));
    process.env.STORYBOOK_TECHNOLOGY = 'Typo';
    assert.throws(() => config.stories([], development), /STORYBOOK_TECHNOLOGY/);
    process.env.STORYBOOK_TECHNOLOGY = 'React';
    process.env.STORYBOOK_STORY_PATH = '../outside';
    assert.throws(() => config.stories([], development), /STORYBOOK_STORY_PATH/);
  } finally {
    if (originalPath === undefined) delete process.env.STORYBOOK_STORY_PATH;
    else process.env.STORYBOOK_STORY_PATH = originalPath;
    if (originalTechnology === undefined) delete process.env.STORYBOOK_TECHNOLOGY;
    else process.env.STORYBOOK_TECHNOLOGY = originalTechnology;
  }
});

test('Sass fallback leaves JS and runtime CSS to HMR and batches Sass reloads', (context) => {
  const vite = config.viteFinal({});
  const watcher = new EventEmitter();
  const watched = [];
  watcher.add = (directory) => watched.push(directory);
  const httpServer = new EventEmitter();
  const invalidated = [];
  const sent = [];
  const style = { id: '/styles.scss' };
  const script = { id: '/component.tsx' };
  const root = fileURLToPath(new URL('../../../', import.meta.url));
  context.mock.timers.enable({ apis: ['setTimeout'] });

  vite.plugins.find((plugin) => plugin.name === 'usx-sass-watch-reload').configureServer({
    watcher,
    httpServer,
    moduleGraph: {
      idToModuleMap: new Map([['style', style], ['script', script]]),
      invalidateModule: (module) => invalidated.push(module),
    },
    config: { logger: { info() {} } },
    ws: { send: (message) => sent.push(message) },
  });

  assert.ok(watched.includes(`${root}packages/usx-theme/src`));
  assert.equal(vite.server.watch.usePolling, true);
  for (const file of [
    'packages/usx-react/src/components/button/Button.tsx',
    'packages/usx-stories/src/examples/commonArgs.js',
    'packages/usx-theme/dist/theme.css',
    'packages/usx-theme/dist/theme-manifest.json',
    'packages/usx/src-other/unrelated.scss',
  ]) watcher.emit('all', 'change', `${root}${file}`);
  context.mock.timers.tick(500);
  assert.equal(sent.length, 0);

  for (const event of ['add', 'change', 'unlink']) {
    watcher.emit('all', event, `${root}packages/usx-theme/src/_variables.scss`);
    watcher.emit('all', event, `${root}packages/usx-theme/dist/_hooks.scss`);
    context.mock.timers.tick(400);
  }
  assert.equal(sent.length, 3);
  assert.deepEqual(invalidated, [style, style, style]);
  assert.ok(sent.every((message) => message.type === 'full-reload'));

  watcher.emit('all', 'change', `${root}packages/usx/src/components/_footer.scss`);
  httpServer.emit('close');
  context.mock.timers.tick(500);
  assert.equal(sent.length, 3);
  assert.equal(watcher.listenerCount('all'), 0);
});