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

  const details = render(lib.Details, {
    summaryProps: {
      label: 'Grouped summary',
      className: 'grouped-class',
      markerColor: 'error',
      underlineColor: 'secondary',
      textClassName: 'bold-text',
    },
    text: 'Details body',
  });
  for (const text of ['Grouped summary', 'grouped-class', 'marker-error', 'underline-secondary', 'bold-text']) {
    assert.ok(details.includes(text), text);
  }

  const popover = render(lib.Popover, {
    id: 'summary-props',
    summaryProps: {
      label: 'Grouped trigger',
      className: 'grouped-trigger',
      ariaLabel: 'Accessible grouped trigger',
    },
    children: 'Popover body',
  });
  for (const text of ['Grouped trigger', 'grouped-trigger', 'Accessible grouped trigger']) {
    assert.ok(popover.includes(text), text);
  }
  assert.ok(render(lib.Popover, { id: 'default-summary' }).includes('Open panel'));

  const page = render(lib.Page, { title: 'Services', titleId: 'page-title', eyebrow: 'Programs', children: 'Content' });
  assert.ok(page.includes('aria-labelledby="page-title"'));
  assert.ok(page.includes('<h1 id="page-title" class="usx-page__title"><span class="usx-eyebrow">Programs</span>Services</h1>'));
  for (const title of [undefined, null, '', false, true]) {
    const untitled = render(lib.Page, { title, titleId: 'missing-title', eyebrow: 'Orphan', children: 'Content' });
    assert.ok(!untitled.includes('<h1'));
    assert.ok(!untitled.includes('Orphan'));
    assert.ok(!untitled.includes('aria-labelledby'));
    assert.ok(untitled.includes('Content'));
  }
  assert.ok(render(lib.Page, { title: 'Services', titleId: 'page-title', ariaLabelledby: 'external' }).includes('aria-labelledby="external"'));
  assert.ok(render(lib.Page, { ariaLabelledby: 'external' }).includes('aria-labelledby="external"'));
  assert.ok(render(lib.Page, { title: 0 }).includes('>0</h1>'));
  const richPage = render(lib.Page, {
    title: React.createElement('em', null, 'Services & support'),
    eyebrow: React.createElement('strong', null, 'Category <one>'),
  });
  assert.ok(richPage.includes('<span class="usx-eyebrow"><strong>Category &lt;one&gt;</strong></span><em>Services &amp; support</em>'));
  const textPage = render(lib.Page, { title: '<em>Services</em> & more', eyebrow: '<b>Category</b>' });
  assert.ok(textPage.includes('&lt;em&gt;Services&lt;/em&gt; &amp; more'));
  assert.ok(textPage.includes('&lt;b&gt;Category&lt;/b&gt;'));

  const modal = render(lib.Modal, {
    id: 'modal', heading: 'Review', description: 'Fallback',
    children: React.createElement(React.Fragment, null,
      React.createElement('p', null, 'Details'),
      React.createElement('ul', null, React.createElement('li', null, 'Item'))),
  });
  assert.ok(modal.includes('aria-describedby="modal-description"'));
  assert.ok(modal.includes('<div class="usa-prose usx-prose " id="modal-description"><p>Details</p><ul><li>Item</li></ul></div>'));
  assert.ok(!modal.includes('Fallback'));
  for (const children of [undefined, null]) {
    const body = render(lib.Modal, { id: 'modal', description: 'Simple description', children });
    assert.ok(body.includes(
      '<div class="usa-prose usx-prose "><p id="modal-description">Simple description</p></div>'
    ));
    assert.ok(body.includes('aria-describedby="modal-description"'));
  }
  for (const children of ['', false, true, 0]) {
    const body = render(lib.Modal, { id: 'modal', description: 'Fallback', children });
    assert.ok(!body.includes('Fallback'));
    assert.ok(body.includes('<div class="usa-prose usx-prose " id="modal-description">'));
    if (children === 0) assert.ok(body.includes('id="modal-description">0</div>'));
  }

  const itemProps = {
    id: 'item', title: 'Details', content: 'Item content', expanded: true, headingAs: 'h2',
    headingClassName: 'custom-heading', contentClassName: 'custom-content', handleToggle: onClick,
  };
  const item = render(lib.AccordionItem, itemProps);
  assert.ok(item.includes('<h2 id="item-heading" class="usa-accordion__heading custom-heading">'));
  assert.ok(item.includes('aria-expanded="true" aria-controls="item-content"'));
  assert.ok(item.includes('id="item-content" aria-labelledby="item-heading" class="usa-accordion__content usa-prose custom-content"'));
  assert.ok(!item.includes('hidden=""'));
  const itemTree = lib.AccordionItem(itemProps);
  assert.equal(itemTree.props.children[0].props.children.props.onClick, onClick);
  const accordion = render(lib.Accordion, {
    id: 'group', headingAs: 'h4', headingClassName: 'group-heading', contentClassName: 'group-content',
    items: [{ title: 'First', content: 'First body' }, itemProps],
  });
  assert.ok(accordion.includes('id="group-0-heading"'));
  assert.ok(accordion.includes('aria-controls="group-0-content"'));
  assert.ok(accordion.includes('<h4 id="item-heading" class="usa-accordion__heading group-heading">'));
  assert.ok(accordion.includes('class="usa-accordion__content usa-prose group-content"'));
  assert.ok(!accordion.includes('custom-heading'));
  assert.ok(!accordion.includes('custom-content'));
  for (const children of ['Child', '', false, 0]) {
    const body = render(lib.AccordionItem, { id: 'item', title: 'Title', content: 'Fallback', children });
    assert.ok(!body.includes('Fallback'));
    if (children === 0) assert.ok(body.includes('>0</div>'));
    if (children === 'Child') assert.ok(body.includes('>Child</div>'));
  }
  assert.ok(render(lib.AccordionItem, { id: 'item', title: 'Title', content: 'Fallback', children: null }).includes('Fallback'));
  const nestedChildren = render(lib.Accordion, {
    id: 'group', items: [{ id: 'nested', title: 'Title', content: 'Fallback', children: React.createElement('p', null, 'Child') }],
  });
  assert.ok(nestedChildren.includes('<p>Child</p>'));
  assert.ok(!nestedChildren.includes('Fallback'));

  const section = render(lib.Section, {
    id: 'program-details',
    style: { marginTop: '1rem', color: 'red' },
    title: 'Details',
    headingAs: 'h3',
    content: 'Fallback',
    children: 'Section content',
    'aria-label': 'Program details',
  });
  assert.ok(section.includes('id="program-details"'));
  assert.ok(section.includes('style="margin-top:1rem;color:red"'));
  assert.ok(section.includes('aria-label="Program details"'));
  assert.ok(section.includes('<h3 class="usx-section__title">Details</h3>'));
  assert.ok(section.includes('Section content'));
  assert.ok(!section.includes('Fallback'));
}
console.log('PASS: Card, Hero, Collection, CheckboxGroup, Details, Popover, Page, Modal, Accordion, and Section composition in ESM and CommonJS');
