import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as esm from '../dist/index.js';

const cjs = createRequire(import.meta.url)('../dist/index.cjs');
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
for (const lib of [esm, cjs]) {
  const image = { src: 'photo.jpg', alt: 'Photo', staticBaseUrl: '/custom/', className: 'custom-image', caption: 'Visible caption', hideCaption: false };
  for (const imageProps of [[image], [image, { ...image, src: 'other.jpg' }]]) {
    const html = render(lib.Card, {
      tagProps: [{ value: 'Status', outline: true, className: 'custom-tag' }],
      buttonProps: [{ href: '/go', children: 'Go', variant: 'secondary', id: 'card-action' }],
      imageProps,
    });
    for (const text of ['/custom/photo.jpg', 'custom-image', 'Visible caption', 'custom-tag', 'usa-button--secondary', '/go', 'card-action']) assert.ok(html.includes(text), text);
    assert.ok(!html.includes('usa-sr-only'));
  }
  const nested = render(lib.CardGroup, { cardProps: [{
    title: 'Nested card', tagProps: [{ value: 'Nested tag' }],
    buttonProps: [{ label: 'Nested action', ghost: true }],
    imageProps: [{ src: '/nested.jpg', alt: 'Nested image' }],
  }] });
  for (const text of ['Nested card', 'Nested tag', 'Nested action', '/nested.jpg', 'usx-button--ghost']) assert.ok(nested.includes(text), text);
  const onClick = () => {};
  const hero = lib.Hero({ buttonProps: { children: 'Action', variant: 'secondary', onClick, id: 'hero-action' } });
  const button = hero.props.children.props.children[0].props.children.at(-1);
  assert.equal(button.props.onClick, onClick);
  assert.ok(render(lib.Hero, { buttonProps: button.props }).includes('usa-button--secondary'));
  assert.ok(!render(lib.Hero, { buttonProps: { label: 'Hidden action' }, searchProps: { id: 'hero-search' } }).includes('Hidden action'));
  for (const underCollection of [undefined, false, true]) {
    const html = render(lib.Collection, { items: [{ href: '#', heading: 'Event', calendarDateProps: { datetime: '2026-10-07', ...(underCollection === undefined ? {} : { underCollection }) } }] });
    assert.ok(html.includes('OCT'));
    assert.equal(html.includes('usa-collection__calendar-date'), underCollection !== false);
  }
  const checkboxProps = [{ id: 'custom-id', name: 'individual', label: 'Choice', ariaLabel: 'Accessible choice', required: true, tile: false, small: false, className: 'custom-checkbox', onChange: onClick }, { label: 'Default choice' }];
  const html = render(lib.CheckboxGroup, { id: 'group', name: 'group-name', tile: true, small: true, checkboxProps });
  for (const text of ['custom-id', 'individual', 'Accessible choice', 'required=""', 'custom-checkbox', 'group-1']) assert.ok(html.includes(text), text);
  assert.equal((html.match(/usa-checkbox__input--tile/g) || []).length, 1);
  assert.equal((html.match(/usx-checkbox--small/g) || []).length, 1);
  const group = lib.CheckboxGroup({ checkboxProps });
  const renderedCheckbox = group.props.children.props.children[0];
  assert.equal(renderedCheckbox.props.onChange, onClick);
}
console.log('PASS: Card, Hero, Collection, and CheckboxGroup composition in ESM and CommonJS');
