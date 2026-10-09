import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as esm from '../dist/index.js';

const cjs = createRequire(import.meta.url)('../dist/index.cjs');

// Quote must forward the complete Attribution contract in every layout.
for (const library of [esm, cjs]) {
  for (const layout of [{}, { calloutProps: { orientation: 'vertical' } }]) {
    const attributionProps = {
      id: 'block-credit',
      className: 'custom-credit',
      primary: 'Author',
      secondary: 'Role',
      avatarProps: { variant: 'initials', value: 'AB' },
      'data-credit': 'passed-through',
    };
    const html = renderToStaticMarkup(React.createElement(library.Quote, { ...layout, attributionProps }, 'Body'));
    for (const value of ['id="block-credit"', 'custom-credit', 'Author', 'Role', 'AB', 'data-credit="passed-through"']) {
      assert.ok(html.includes(value), value);
    }
    assert.ok(!html.includes('attributionProps='));
    const custom = renderToStaticMarkup(React.createElement(library.Quote, {
      ...layout,
      attributionProps: { ...attributionProps, children: React.createElement('strong', null, 'Custom credit') },
    }));
    assert.ok(custom.includes('<strong>Custom credit</strong>'));
    assert.ok(!custom.includes('Author'));
  }
}
console.log('PASS: Quote forwards Attribution props in ESM and CommonJS');

for (const library of [esm, cjs]) {
  assert.equal(library.Block, undefined);
  const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
  const plain = render(library.Callout, { content: 'Fallback' });
  assert.ok(plain.includes('Fallback'));
  assert.ok(!plain.includes('usx-border-'));
  const styled = render(library.Callout, {
    orientation: 'vertical', strokeColor: 'info', backgroundColor: 'base-lightest',
    textColor: 'primary', indent: 'md', dedent: true, big: true, className: 'custom',
    content: 'Ignored', children: 'Preferred', element: 'aside',
  });
  for (const value of ['<aside', 'usx-callout--vertical', 'usx-border-info', 'bg-base-lightest',
    'text-primary', 'usx-callout--indent-md', 'usx-callout--dedent', 'usx-callout--big', 'custom', 'Preferred']) {
    assert.ok(styled.includes(value), value);
  }
  assert.ok(!styled.includes('Ignored'));
  assert.ok(!render(library.Callout, { children: '', content: 'Ignored' }).includes('Ignored'));
  const quote = render(library.Quote, {
    content: 'Quoted words', sourceLinkProps: { href: 'https://example.com/work' }, sourceTitle: 'Published work',
    attributionProps: { primary: 'Author' }, calloutProps: { strokeColor: 'info' },
  });
  assert.ok(quote.startsWith('<div'));
  assert.ok(quote.startsWith('<div class="usx-quote'));
  assert.ok(quote.includes('<div class="usx-callout'));
  assert.ok(quote.includes('<blockquote'));
  assert.ok(quote.includes('cite="https://example.com/work"'));
  assert.ok(quote.indexOf('</blockquote>') < quote.indexOf('<figcaption'));
  assert.ok(quote.includes('<cite><a href="https://example.com/work" class="usa-link usx-link">Published work</a></cite>'));
  assert.ok(!quote.includes('<cite>Author'));
  const classes = render(library.Quote, {
    className: 'outer-class', calloutProps: { className: 'inner-class' }, content: 'Words',
  });
  assert.ok(classes.startsWith('<div class="usx-quote outer-class"'));
  assert.ok(classes.includes('inner-class'));
}
console.log('PASS: Callout composition and Quote semantics');

for (const library of [esm, cjs]) {
  for (const body of [{ content: 'Quoted words' }, { children: 'Quoted words', content: 'Ignored' }]) {
    const vertical = renderToStaticMarkup(React.createElement(library.Quote, { ...body, calloutProps: { orientation: 'vertical' } }));
    assert.ok(vertical.includes('❝Quoted words❞'));
    assert.ok(!vertical.includes('usx-quote__icon'));
    assert.ok(!vertical.includes('Ignored'));
    const horizontal = renderToStaticMarkup(React.createElement(library.Quote, body));
    assert.ok(horizontal.includes('usx-quote__icon'));
    assert.ok(!horizontal.includes('❝'));
  }
}
console.log('PASS: Vertical quotes wrap content in fancy quotation marks');

for (const library of [esm, cjs]) {
  for (const orientation of ['horizontal', 'vertical']) {
    const tree = library.Quote({ calloutProps: { orientation }, content: 'Words', attributionProps: { primary: 'Author' } });
    assert.equal(tree.type, 'div');
    assert.ok(tree.props.className.includes('usx-quote'));
    const [icon, callout] = tree.props.children;
    assert.equal(Boolean(icon), orientation === 'horizontal');
    assert.equal(callout.type, library.Callout);
    const figure = callout.props.children;
    assert.equal(figure.type, 'figure');
    assert.equal(figure.props.children[0].type, 'blockquote');
    assert.equal(figure.props.children[1].type, 'figcaption');
    assert.equal(figure.props.children[1].props.children[0].type, library.Attribution);
  }
}
console.log('PASS: Icon sits outside Callout; quotation and attribution sit inside');

for (const library of [esm, cjs]) {
  const render = (props) => renderToStaticMarkup(React.createElement(library.Quote, { content: 'Words', ...props }));
  const onClick = () => {};
  const sourceLinkProps = { href: '/source', external: true, className: 'custom-source', onClick, children: 'Ignored' };
  const html = render({ sourceTitle: 'Source title', sourceLinkProps });
  for (const value of ['href="/source"', 'cite="/source"', 'usa-link--external', 'custom-source', 'target="_blank"', 'Source title']) assert.ok(html.includes(value), value);
  assert.ok(!html.includes('Ignored'));
  assert.ok(!html.includes('usx-quote__source'));
  const plain = render({ sourceTitle: 'Unlinked title' });
  assert.ok(plain.includes('<cite>Unlinked title</cite>'));
  assert.ok(!plain.includes('<a '));
  assert.ok(render({ sourceTitle: 'Title', sourceLinkProps: {} }).includes('<cite><a '));
  assert.ok(!render({ sourceLinkProps: { href: '/source' } }).includes('<cite>'));
  const tree = library.Quote({ sourceTitle: 'Title', sourceLinkProps });
  const link = tree.props.children[1].props.children.props.children[1].props.children[1].props.children;
  assert.equal(link.type, library.Link);
  assert.equal(link.props.onClick, onClick);
  assert.equal(link.props.children, 'Title');
}
console.log('PASS: Quote source Link props and unlinked title fallback');
