import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getAssetUrl, getAssetSrcSet } from '../src/assets.ts';
import * as esm from '../dist/index.js';

const { Alert, Banner, Button, Code, CopyToClipboard, Icon, Spinner, Tooltip } = esm;
const cjs = createRequire(import.meta.url)('../dist/index.cjs');
assert.ok(!('getAssetUrl' in esm));
assert.ok(!('getAssetUrl' in cjs));
assert.ok(!('getAssetSrcSet' in esm));
assert.ok(!('getAssetSrcSet' in cjs));
for (const [source, expected] of [
  ['  small.png 1x, large.png 2x ', '  /assets/small.png 1x, /assets/large.png 2x '],
  ['small.png 1x, /large.png 2x', '/assets/small.png 1x, /assets/large.png 2x'],
  ['small.png, large.png', '/assets/small.png, /assets/large.png'],
  ['small.png 400w, https://example.com/large.png 800w', '/assets/small.png 400w, https://example.com/large.png 800w'],
  ['data:image/png;base64,AAAA 1x, large.png 2x', 'data:image/png;base64,AAAA 1x, /assets/large.png 2x'],
]) assert.equal(getAssetSrcSet(source, '/assets/'), expected);

const responsiveLogo = { fallback: '/logo.svg', sources: [{ srcSet: 'small.svg 1x, large.svg 2x', media: '(min-width: 40em)', sizes: '50vw', type: 'image/svg+xml' }] };
try {
  for (const globalBase of [undefined, '/global/', 'https://cdn.example.com/']) {
    if (globalBase) globalThis.window = { usxBaseUrl: globalBase };
    else delete globalThis.window;
    for (const staticBaseUrl of [undefined, '', '/override/', '/']) {
      const base = staticBaseUrl || globalBase || '/';
      for (const library of [esm, cjs]) {
        const image = renderToStaticMarkup(React.createElement(library.Image, { src: responsiveLogo, staticBaseUrl, caption: 'Logo', href: '/destination' }));
        assert.ok(image.includes(`src="${base}logo.svg"`));
        assert.ok(image.includes(`srcSet="${base}small.svg 1x, ${base}large.svg 2x"`));
        assert.ok(image.includes('sizes="50vw"'));
        assert.ok(!image.toLowerCase().includes('staticbaseurl='));
        const plainImage = renderToStaticMarkup(React.createElement(library.Image, { src: 'logo.svg', srcSet: 'small.svg 1x, large.svg 2x', staticBaseUrl, href: '/destination' }));
        assert.ok(plainImage.includes(`srcSet="${base}small.svg 1x, ${base}large.svg 2x"`));
        assert.ok(plainImage.includes('href="/destination"'));
        for (const src of ['https://example.com/logo.svg', 'data:image/png;base64,AAAA']) {
          assert.ok(renderToStaticMarkup(React.createElement(library.Image, { src, staticBaseUrl })).includes(`src="${src}"`));
        }
        for (const Component of [library.Header, library.Footer]) {
          for (const branding of [{ logo: responsiveLogo, logoInverse: 'inverse.svg' }, { symbol: 'symbol.svg', symbolInverse: 'inverse.svg' }]) {
            const html = renderToStaticMarkup(React.createElement(Component, { branding, staticBaseUrl }));
            assert.ok(html.includes(`src="${base}${branding.logo ? 'logo' : 'symbol'}.svg"`));
            assert.ok(html.includes(`src="${base}inverse.svg"`));
            assert.ok(!html.toLowerCase().includes('staticbaseurl='));
          }
        }
        const footer = renderToStaticMarkup(React.createElement(library.Footer, { staticBaseUrl, socialLinks: [{ icon: 'social.svg', href: '/social', alt: 'Social' }] }));
        assert.ok(footer.includes(`src="${base}social.svg"`));
        assert.ok(footer.includes('href="/social"'));
      }
    }
  }
} finally {
  delete globalThis.window;
}
console.log('PASS: Image, Header, and Footer resolve image paths internally in ESM and CommonJS');
const code = Code({ copyText: 'Code text', staticBaseUrl: '/code-assets/' });
const codeClipboard = code.props.children[1];
assert.equal(codeClipboard.type, CopyToClipboard);
assert.equal(codeClipboard.props.copyText, 'Code text');
assert.equal(codeClipboard.props.staticBaseUrl, '/code-assets/');
assert.ok(!renderToStaticMarkup(Code({})).includes('usx-copy'));
const clipboardProps = { copyText: 'Agency text', label: 'Copy', tooltipProps: { label: React.createElement('strong', null, 'Copy text'), copiedTooltip: 'Done', position: 'left', className: 'custom-tooltip', bodyClassName: 'custom-body', id: 'copy-tooltip' }, className: 'custom-copy', staticBaseUrl: '/assets/' };
const clipboard = CopyToClipboard(clipboardProps);
assert.equal(clipboard.type, Tooltip);
assert.equal(clipboard.props.position, 'left');
assert.equal(clipboard.props.className, 'custom-tooltip');
assert.equal(clipboard.props.bodyClassName, 'custom-body');
assert.equal(clipboard.props.id, 'copy-tooltip');
assert.ok(!('copiedTooltip' in clipboard.props));
const clipboardButton = clipboard.props.children;
assert.equal(clipboardButton.type, Button);
assert.equal(clipboardButton.props.ghost, true);
assert.equal(clipboardButton.props.className, 'usx-copy custom-copy');
for (const icon of clipboardButton.props.children.slice(0, 2)) {
  assert.equal(icon.type, Icon);
  assert.equal(icon.props.staticBaseUrl, '/assets/');
  assert.equal(icon.props.size, 0);
}
const clipboardMarkup = renderToStaticMarkup(clipboard);
assert.equal((clipboardMarkup.match(/role="tooltip"/g) || []).length, 1);
assert.ok(clipboardMarkup.includes('class="usx-copy__tooltip--copy"><strong>Copy text</strong></span>'));
assert.ok(clipboardMarkup.includes('class="usx-copy__tooltip--copied">Done</span>'));
assert.ok(clipboardMarkup.includes('<span class="margin-left-1">Copy</span>'));
assert.equal(CopyToClipboard({}).type, Button);
assert.ok(!renderToStaticMarkup(CopyToClipboard({})).includes('usx-tooltip'));
const copiedOnly = CopyToClipboard({ tooltipProps: { label: null, bodyClassName: 'custom-body' } });
assert.equal(copiedOnly.props.bodyClassName, 'custom-body');
assert.equal(copiedOnly.props.position, undefined);
assert.ok(renderToStaticMarkup(copiedOnly).includes('usa-tooltip__body--top custom-body'));
assert.ok(renderToStaticMarkup(copiedOnly).includes('usx-copy__tooltip--copied">Copied</span>'));
assert.ok(renderToStaticMarkup(CopyToClipboard({ tooltipProps: { label: 'Copy' } })).includes('usx-copy__tooltip--copied">Copied</span>'));
assert.ok(!renderToStaticMarkup(React.createElement(Tooltip, { label: 'Plain tooltip' })).includes('usx-copy'));
assert.equal(getAssetUrl('img/sprite.svg#check'), '/img/sprite.svg#check');
assert.equal(getAssetUrl('/img/sprite.svg#check', '/server-assets///'), '/server-assets/img/sprite.svg#check');

const fixtures = [
  [Banner, {}, ['img/us_flag_small.png', 'img/icon-dot-gov.svg', 'img/icon-https.svg', 'img/sprite.svg#lock']],
  [Icon, { name: 'check' }, ['img/sprite.svg#check']],
  [Icon, { name: 'spinner', source: 'usx' }, ['img/usx-sprite.svg#spinner']],
  [Spinner, {}, ['img/usx-sprite.svg#spinner']],
  [Alert, { onDismiss: () => {} }, ['img/sprite.svg#close']],
  [Code, { copyText: 'test' }, ['img/sprite.svg#content_copy', 'img/sprite.svg#check']],
  [CopyToClipboard, {}, ['img/sprite.svg#content_copy', 'img/sprite.svg#check']],
];
for (const [Component, props, paths] of fixtures) {
  const markup = renderToStaticMarkup(React.createElement(Component, props));
  for (const path of paths) assert.ok(markup.includes(`="/${path}"`));
  const overridden = renderToStaticMarkup(React.createElement(Component, { ...props, staticBaseUrl: '/server-assets/' }));
  for (const path of paths) assert.ok(overridden.includes(`="/server-assets/${path}"`));
  assert.ok(!overridden.toLowerCase().includes('staticbaseurl='));
}
for (const [Component, props, expected] of [
  [Banner, { flagSrc: '/custom/flag.png' }, 'src="/custom/flag.png"'],
  [Icon, { name: 'check', staticUrlPrefix: '#local-' }, 'href="#local-check"'],
  [Spinner, { staticUrlPrefix: '/custom/sprite.svg#' }, 'href="/custom/sprite.svg#spinner"'],
]) {
  const markup = renderToStaticMarkup(React.createElement(Component, props));
  assert.ok(markup.includes(expected));
}

globalThis.window = {};
try {
  let copiedText;
  window.navigator = { clipboard: { writeText: (text) => { copiedText = text; return Promise.resolve(); } } };
  await clipboardButton.props.onClick();
  assert.equal(copiedText, clipboardProps.copyText);
  const codeCopy = CopyToClipboard(codeClipboard.props);
  const codeCopyButton = codeCopy.type === Tooltip ? codeCopy.props.children : codeCopy;
  await codeCopyButton.props.onClick();
  assert.equal(copiedText, 'Code text');
  window.navigator = {};
  assert.doesNotThrow(() => clipboardButton.props.onClick());
  for (const [base, prefix] of [
    [undefined, '/'],
    ['/', '/'],
    ['', '/'],
    ['/application-root', '/application-root/'],
    ['/application-root/', '/application-root/'],
    ['/static/usx///', '/static/usx/'],
    ['https://cdn.example.com/usx', 'https://cdn.example.com/usx/'],
  ]) {
    window.usxBaseUrl = base;
    assert.equal(getAssetUrl('/img/sprite.svg#check', '/override'), '/override/img/sprite.svg#check');
    assert.equal(getAssetUrl('///img/sprite.svg#check', '/override///'), '/override/img/sprite.svg#check');
    assert.equal(getAssetUrl('/img/sprite.svg#check', '/'), '/img/sprite.svg#check');
    assert.equal(getAssetUrl('/img/sprite.svg#check', ''), `${prefix}img/sprite.svg#check`);
    assert.equal(getAssetUrl('img/sprite.svg#check'), `${prefix}img/sprite.svg#check`);
    assert.equal(getAssetUrl('/img/sprite.svg#check'), `${prefix}img/sprite.svg#check`);
    assert.ok(renderToStaticMarkup(React.createElement(cjs.Icon, { name: 'check' })).includes(`href="${prefix}img/sprite.svg#check"`));
    for (const [Component, props, paths] of fixtures) {
      const markup = renderToStaticMarkup(React.createElement(Component, props));
      for (const path of paths) assert.ok(markup.includes(`="${prefix}${path}"`), `${Component.name}: ${path}`);
      for (const [staticBaseUrl, expectedPrefix] of [['/override///', '/override/'], ['/', '/'], ['', prefix]]) {
        const overridden = renderToStaticMarkup(React.createElement(Component, { ...props, staticBaseUrl }));
        for (const path of paths) assert.ok(overridden.includes(`="${expectedPrefix}${path}"`), `${Component.name}: ${staticBaseUrl}: ${path}`);
        assert.ok(!overridden.toLowerCase().includes('staticbaseurl='));
      }
    }
    const customFlag = renderToStaticMarkup(React.createElement(Banner, { flagSrc: '/flags/agency.png', staticBaseUrl: '/override/' }));
    assert.ok(customFlag.includes('src="/override/flags/agency.png"'));
    const customIcon = renderToStaticMarkup(React.createElement(cjs.Icon, { name: 'check', staticUrlPrefix: '#local-' }));
    assert.ok(customIcon.includes('href="#local-check"'));
  }
  for (const asset of ['https://example.com/logo.svg', 'data:image/svg+xml,test']) {
    assert.equal(getAssetUrl(asset), asset);
  }
} finally {
  delete globalThis.window;
}

console.log('PASS: component staticBaseUrl overrides, global/root defaults, normalized paths, and server rendering');