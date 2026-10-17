import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as esm from '../dist/index.js';

const cjs = createRequire(import.meta.url)('../dist/index.cjs');
const render = (component, props = {}) =>
  renderToStaticMarkup(React.createElement(component, props));

const snapshotHeadings = (path) =>
  [
    ...fs
      .readFileSync(new URL(path, import.meta.url), 'utf8')
      .matchAll(/site-preview-heading">([^<]+)/g),
  ].map((match) => match[1]);

assert.deepEqual(snapshotHeadings('../src/components/details/details.html'), [
  'Default',
  'Open',
  'Rich Content',
  'Plain Text',
  'Typography',
  'Colors',
  'Mono Color',
  'Borderless',
  'No Summary Underline',
  'Minimal Decoration',
  'Custom Styles',
  'Custom Content Styles',
  'Tough On The Eyes',
  'Nested Details',
]);
assert.deepEqual(snapshotHeadings('../src/components/error-page/error-page.html'), [
  'Default',
  'Permission Denied',
  'Session Expired',
  'Unexpected Error',
  'Service Unavailable',
  'Too Many Requests',
  'Client Page Fallback',
  'Custom Recovery Content',
  'Technical Details',
  'Minimal',
  'Cats',
]);

for (const library of [esm, cjs]) {
  const diagnosticText = `Traceback (most recent call last):
  File "/app/records.py", line 42, in save
ValueError: A <script> tag & invalid input were rejected.`;

  const collapsedDetails = render(library.Details, {
    summary: 'Technical details',
    text: diagnosticText,
  });
  assert.ok(collapsedDetails.startsWith('<details class="usx-details">'));
  assert.ok(!collapsedDetails.startsWith('<details class="usx-details" open'));
  assert.ok(
    collapsedDetails.includes(
      '<summary class="usx-summary"><span class="usx-summary-text">Technical details</span></summary>'
    )
  );
  assert.ok(collapsedDetails.includes('Traceback (most recent call last):\n'));
  assert.ok(collapsedDetails.includes('&lt;script&gt; tag &amp; invalid input'));
  assert.ok(!collapsedDetails.includes('<script>'));
  assert.ok(!collapsedDetails.includes('<code'));
  assert.ok(!collapsedDetails.includes('<pre'));
  assert.ok(
    collapsedDetails.includes('<div class="usx-details__content"><p class="usx-details__text">')
  );

  const openDetails = render(library.Details, {
    text: diagnosticText,
    summary: 'Exception traceback',
    open: true,
    className: 'custom-details',
  });
  assert.ok(openDetails.startsWith('<details class="usx-details custom-details" open="">'));
  assert.ok(openDetails.includes('>Exception traceback</span></summary>'));
  assert.ok(
    render(library.Details, { summary: 'More information', text: '' }).includes(
      '<p class="usx-details__text"></p>'
    )
  );

  const customSummary = render(library.Details, {
    summary: 'Help',
    summaryClassName: 'padding-1',
    summaryTextClassName: 'text-bold',
  });
  assert.ok(customSummary.includes('<summary class="usx-summary padding-1">'));
  assert.ok(
    customSummary.includes('<span class="usx-summary-text text-bold">Help</span>')
  );

  const hostileDetails = render(library.Details, {
    text: '</p><script>alert("details")</script> &lt;already escaped&gt;',
    summary: '</summary><script>alert("summary")</script> & details',
  });
  assert.ok(hostileDetails.includes('&lt;/p&gt;&lt;script&gt;'));
  assert.ok(hostileDetails.includes('&lt;/summary&gt;&lt;script&gt;'));
  assert.ok(hostileDetails.includes('&amp;lt;already escaped&amp;gt;'));
  assert.ok(!hostileDetails.includes('<script>'));
  assert.equal((hostileDetails.match(/<summary/g) || []).length, 1);
  assert.equal((hostileDetails.match(/<p[ >]/g) || []).length, 1);

  const diagnosticReport =
    '\n\nRequest status: failed\n  Reference: JOB-1204\n\tItems processed: 0\n';
  const reportTree = library.Details({ text: diagnosticReport, summary: '' });
  const reportChildren = React.Children.toArray(reportTree.props.children);
  assert.equal(reportChildren[0].type, 'summary');
  assert.equal(reportChildren[0].props.children.type, 'span');
  assert.equal(reportChildren[0].props.children.props.children, 'Details');
  assert.equal(reportChildren[1].type, 'div');
  assert.equal(reportChildren[1].props.children.type, 'p');
  assert.equal(reportChildren[1].props.children.props.children, diagnosticReport);

  const richDetails = render(library.Details, {
    summary: 'Before you apply',
    text: 'This fallback should not appear.',
    children: React.createElement(
      'ul',
      null,
      React.createElement(
        'li',
        null,
        React.createElement('a', { href: '/guidance' }, 'Read the guidance')
      )
    ),
  });
  assert.ok(richDetails.includes('<ul><li><a href="/guidance">Read the guidance</a></li></ul>'));
  assert.ok(!richDetails.includes('This fallback should not appear.'));
  assert.ok(!richDetails.includes('usx-details__text'));
  for (const children of ['', false, true]) {
    const emptyChildren = render(library.Details, {
      summary: 'More information',
      text: 'Hidden fallback',
      children,
    });
    assert.ok(emptyChildren.includes('<div class="usx-details__content"></div>'));
    assert.ok(!emptyChildren.includes('Hidden fallback'));
  }
  assert.ok(
    render(library.Details, { summary: 'Count', children: 0 }).includes(
      '<div class="usx-details__content">0</div>'
    )
  );
  assert.ok(
    render(library.Details, {
      summary: 'More information',
      text: 'Visible fallback',
      children: null,
    }).includes('<p class="usx-details__text">Visible fallback</p>')
  );

  for (const noContentBorder of [false, true]) {
    for (const noSummaryUnderline of [false, true]) {
      const styled = render(library.Details, {
        summary: 'Supporting information',
        text: 'More information',
        markerColor: 'primary',
        underlineColor: 'secondary',
        contentBorderColor: 'accent-cool',
        noContentBorder,
        noSummaryUnderline,
        className: 'margin-top-3',
        contentClassName: 'font-family-mono',
      });
      assert.equal(styled.includes('usx-details--borderless'), noContentBorder);
      assert.equal(styled.includes('usx-details--no-underline'), noSummaryUnderline);
      assert.ok(styled.includes('class="usx-summary marker-primary"'));
      assert.ok(styled.includes('class="usx-summary-text border-secondary"'));
      assert.ok(
        styled.includes(
          `class="usx-details__content${noContentBorder ? '' : ' border-accent-cool'} font-family-mono"`
        )
      );
      assert.ok(styled.includes('margin-top-3'));
    }
  }

  const minimal = render(library.ErrorPage);
  assert.ok(minimal.startsWith('<main id="main-content" class="usx-page usx-error-page"'));
  assert.ok(!minimal.includes('tabindex='));
  assert.ok(minimal.includes('aria-labelledby="main-content-title"'));
  assert.ok(minimal.includes('id="main-content-title" class="usx-page__title"'));
  assert.ok(minimal.includes('class="usx-page__content"'));
  assert.ok(minimal.includes('class="usa-prose usx-prose usx-error-page__body"'));
  assert.ok(!minimal.includes('usx-container'));
  assert.ok(!minimal.includes('grid-container'));
  assert.equal((minimal.match(/<h1/g) || []).length, 1);
  assert.ok(minimal.includes('We couldn’t complete your request'));
  assert.ok(!minimal.includes('role="alert"'));
  assert.ok(!minimal.includes('usx-error-page__actions'));
  assert.ok(!minimal.includes('usx-error-page__support'));
  assert.ok(!minimal.includes('usx-error-page__meta'));
  assert.ok(!minimal.includes('usx-error-page__cat'));
  assert.ok(!minimal.includes('https://http.cat/'));
  assert.ok(!minimal.includes('usx-details'));
  assert.doesNotThrow(() => render(library.ErrorPage, { actions: null, supportLinks: null }));

  const zeroCode = render(library.ErrorPage, { errorCode: 0, cats: true });
  assert.ok(
    zeroCode.includes(
      '<strong>Error code:</strong> <span class="usx-error-page__meta-value">0</span>'
    )
  );
  assert.ok(!zeroCode.includes('https://http.cat/'));
  assert.equal(zeroCode, render(library.ErrorPage, { errorCode: 0, cats: false }));

  const withCat = render(library.ErrorPage, {
    title: 'Page not found',
    errorCode: '404',
    cats: true,
  });
  assert.ok(withCat.includes('class="usx-image"'));
  assert.ok(withCat.includes('src="https://http.cat/404"'));
  assert.ok(withCat.includes('alt="Cat illustration for HTTP error 404"'));

  const customCatAlt = render(library.ErrorPage, {
    title: 'Service unavailable',
    errorCode: 503,
    cats: true,
    catAlt: 'A waiting cat & a service notice',
  });
  assert.ok(customCatAlt.includes('src="https://http.cat/503"'));
  assert.ok(customCatAlt.includes('alt="A waiting cat &amp; a service notice"'));

  assert.ok(!render(library.ErrorPage, { cats: true }).includes('https://http.cat/'));
  for (const errorCode of ['CUSTOM', 200, 505, 999]) {
    const correspondingCat = render(library.ErrorPage, {
      title: 'Request failed',
      errorCode,
      cats: true,
    });
    assert.ok(correspondingCat.includes(`https://http.cat/${errorCode}`), String(errorCode));
  }

  const full = render(library.ErrorPage, {
    id: 'request-error',
    title: 'Request <failed>',
    description: 'The service could not process A & B.',
    guidance: 'Try one of these options.',
    actions: [
      { label: 'Go home', href: '/', variant: 'primary' },
      {
        label: 'External status (opens in a new tab)',
        href: 'https://status.example.gov',
        variant: 'outline',
        isExternal: true,
      },
    ],
    supportHeading: 'Get help',
    supportText: 'Share the reference ID with support.',
    supportLinks: [
      { label: 'Email support', href: 'mailto:support@example.gov' },
      {
        label: 'External help (opens in a new tab)',
        href: 'https://help.example.gov',
        external: true,
      },
    ],
    errorCode: 500,
    referenceId: 'REF-1234567890-ABCDEFGHIJ',
    detailsProps: {
      summary: 'Technical details',
      text: diagnosticText,
      className: 'custom-details',
    },
    children: React.createElement('p', null, 'Your draft is safe.'),
    className: 'custom-error-page',
  });
  for (const value of [
    'id="request-error"',
    'custom-error-page',
    'Request &lt;failed&gt;',
    'A &amp; B',
    'Your draft is safe.',
    'usa-button-group usx-button-group usx-error-page__actions',
    'usa-button--primary',
    'usa-button--outline',
    'usa-link usx-link',
    'request-error-support-heading',
    'Error code:',
    'Reference ID:',
    'REF-1234567890-ABCDEFGHIJ',
    'usx-details usx-error-page__details font-family-mono font-mono-sm custom-details',
    '&lt;script&gt; tag &amp; invalid input',
  ])
    assert.ok(full.includes(value), value);
  assert.ok(full.indexOf('Go home') < full.indexOf('External status (opens in a new tab)'));
  assert.equal((full.match(/target="_blank"/g) || []).length, 2);
  assert.ok(!full.includes('<failed>'));
  assert.ok(!full.includes('<script>'));

  const tree = library.ErrorPage({
    title: 'Request failed',
    actions: [{ label: 'Go home', href: '/' }],
  });
  assert.equal(tree.type, library.Page);
  assert.equal(tree.props.id, 'main-content');
  assert.equal(tree.props.titleId, 'main-content-title');
  assert.equal(tree.props.tabIndex, undefined);
  const pageChildren = React.Children.toArray(tree.props.children);
  assert.equal(pageChildren[0].type, library.Prose);
  assert.ok(pageChildren.some((child) => child.type === library.ButtonGroup));

  const catTree = library.ErrorPage({ title: 'Page not found', errorCode: 404, cats: true });
  const catProse = React.Children.toArray(catTree.props.children).find(
    (child) => child.type === library.Prose
  );
  const catProseChildren = React.Children.toArray(catProse.props.children);
  assert.ok(catProseChildren.some((child) => child.type === library.Image));

  const detailsTree = library.ErrorPage({
    title: 'Request failed',
    detailsProps: { summary: 'Technical details', text: diagnosticText },
  });
  const detailsProse = React.Children.toArray(detailsTree.props.children).at(-1);
  assert.equal(detailsProse.type, library.Prose);
  assert.ok(
    React.Children.toArray(detailsProse.props.children).some(
      (child) => child.type === library.Details
    )
  );

  const labelledPage = render(library.Page, {
    id: 'account-page',
    title: 'Account',
    titleId: 'account-title',
    tabIndex: -1,
    ariaLabelledby: 'custom-label',
    content: 'Page content',
  });
  assert.ok(labelledPage.includes('tabindex="-1"'));
  assert.ok(labelledPage.includes('aria-labelledby="custom-label"'));
  assert.ok(labelledPage.includes('<h1 id="account-title" class="usx-page__title">Account</h1>'));
}

console.log(
  'PASS: Page, ErrorPage, and Details semantics, composition, and safe text in ESM and CommonJS'
);
