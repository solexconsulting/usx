import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as esm from '../dist/index.js';

const cjs = createRequire(import.meta.url)('../dist/index.cjs');

for (const { Container } of [esm, cjs]) {
  const render = (props = {}, ...children) => renderToStaticMarkup(React.createElement(Container, props, ...children));
  assert.equal(render({}, 'First', React.createElement('button', null, 'Second')),
    '<div class="usx-container">First<button>Second</button></div>');
  assert.equal(render({ content: 'Fallback' }), '<div class="usx-container">Fallback</div>');
  for (const children of ['', false, 0]) {
    const html = render({ children, content: 'Ignored' });
    assert.ok(!html.includes('Ignored'));
    if (children === 0) assert.ok(html.includes('>0</div>'));
  }

  const responsive = {
    desktop: { gap: '0', align: 'start', float: 'none' },
    tablet: { direction: 'row', wrap: 'wrap', justify: 'space-between', align: 'center' },
  };
  const props = {
    element: 'nav', id: 'actions', ariaLabel: 'Actions', ariaLabelledby: 'actions-title', role: 'group',
    display: 'flex', direction: 'column', gap: '2', responsive, className: 'custom',
  };
  const html = render(props, 'Content');
  assert.ok(html.startsWith('<nav '));
  for (const token of [
    'usx-container--display-flex', 'usx-container--direction-column', 'usx-container--gap-2',
    'tablet:usx-container--direction-row', 'tablet:usx-container--wrap-wrap',
    'tablet:usx-container--justify-space-between', 'tablet:usx-container--align-center',
    'desktop:usx-container--gap-0', 'desktop:usx-container--align-start',
    'desktop:usx-container--float-none', 'custom',
    'id="actions"', 'aria-label="Actions"', 'aria-labelledby="actions-title"', 'role="group"',
  ]) assert.ok(html.includes(token), token);
  assert.ok(html.indexOf('tablet:') < html.indexOf('desktop:'));
  for (const prop of ['responsive', 'display', 'direction', 'gap', 'ariaLabel', 'ariaLabelledby']) assert.ok(!html.includes(` ${prop}=`));
  assert.equal(responsive.tablet.direction, 'row');

  // Each column stays a direct row child; responsive resets must be emitted.
  const grid = render({ gridContainer: 'default' },
    React.createElement(Container, { gridRow: true, gutters: '2', responsive: { desktop: { gutters: '0' } } },
      React.createElement(Container, { column: '12', responsive: { tablet: { column: '6', offset: '3' }, desktop: { column: 'fill', offset: 'none' } } }, 'First'),
      React.createElement(Container, { column: '12', responsive: { tablet: { column: '6' } } }, 'Second')));
  assert.equal((grid.match(/<div/g) ?? []).length, 4);
  for (const token of ['grid-container', 'grid-row grid-gap-2', 'desktop:grid-gap-0',
    'grid-col-12', 'tablet:grid-col-6', 'tablet:grid-offset-3', 'desktop:grid-col-fill', 'desktop:grid-offset-none']) {
    assert.ok(grid.includes(token), token);
  }

  // Persisted CMS payloads can bypass TS: don't generate arbitrary classes or tags.
  const invalid = render({
    element: 'script', gridContainer: 'unknown', gridRow: 'true', display: 'invalid', gap: '2 injected',
    responsive: { tablet: { direction: 'invalid', gridRow: true, className: 'injected' }, widescreen: { display: 'none' } },
  });
  assert.equal(invalid, '<div class="usx-container"></div>');
  assert.equal(render({ responsive: { tablet: null, desktop: ['flex'] } }), '<div class="usx-container"></div>');
  assert.equal(render({ id: false, role: 0, ariaLabel: ['Invalid'], ariaLabelledby: {}, className: ['injected'] }), '<div class="usx-container"></div>');
  assert.equal(render({ style: { display: 'none' }, 'data-extra': 'ignored', 'aria-label': 'ignored' }), '<div class="usx-container"></div>');
  assert.equal(render({ id: '', role: '', ariaLabel: '', ariaLabelledby: '' }), '<div class="usx-container" id="" role="" aria-label="" aria-labelledby=""></div>');
  assert.equal(render({ responsive: { mobileLg: { direction: 'row' }, items: [['mobileLg', { display: 'none' }]] } }),
    '<div class="usx-container mobile-lg:usx-container--direction-row"></div>');
}

console.log('PASS: Container defaults, composition, responsive controls, and CMS input handling (ESM + CJS)');
