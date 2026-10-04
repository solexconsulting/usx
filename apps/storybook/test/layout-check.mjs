import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import config from '../.storybook/main.js';

const require = createRequire(import.meta.url);
const postcss = createRequire(require.resolve('stylelint'))('postcss');
const root = fileURLToPath(new URL('../../../', import.meta.url));
const options = config.viteFinal({}).css.preprocessorOptions.scss;

sass.compile(fileURLToPath(new URL('../.storybook/styles.scss', import.meta.url)), options);

const preview = readFileSync(new URL('../.storybook/preview.js', import.meta.url), 'utf8');
assert.match(preview, /import ["']@uswds\/uswds\/css\/uswds\.min\.css["']/);
const vendor = postcss.parse(readFileSync(require.resolve('@uswds/uswds/css/uswds.min.css'), 'utf8'));
for (const [selector, breakpoint] of [
  ['.desktop\\:display-none', '64em'],
  ['.tablet\\:grid-col-6', '40em'],
  ['.usa-menu-btn', '64em'],
]) {
  let found = false;
  vendor.walkRules((rule) => {
    if (rule.selectors.includes(selector) && rule.parent.params?.includes(`min-width:${breakpoint}`)) found = true;
  });
  assert(found, `Upstream breakpoint changed: ${selector}`);
}

for (const [desktop, tablet, width, gutter] of [
  [1024, 640, 64, 32],
  [880, 560, 72, 40],
  [1200, 720, 80, 24],
]) {
  const result = sass.compileString(`
    @use 'pkg:@solexllc/usx-theme/hooks' with (
      $usx-layout-breakpoint: ${desktop}px,
      $breakpoint-mobile: ${tablet}px,
      $breakpoint-tablet: ${tablet}px,
      $usx-layout-max-width: ${width}rem,
      $usx-layout-gutter-default: ${gutter}px
    );
    @use 'pkg:@solexllc/usx-theme/variables' as usx;
    @use 'apps/storybook/.storybook/styles';
    .mobile-probe { @include usx.at-media('mobile') { display: block; } }
  `, {
    ...options,
    loadPaths: [root],
    quietDeps: true,
  });
  const css = postcss.parse(result.css);
  const queries = [];
  css.walkAtRules('media', (rule) => queries.push(rule.params));
  assert(queries.includes(`(width < ${desktop}px)`));
  assert(queries.includes(`(min-width: ${desktop}px)`));
  assert(queries.includes(`(min-width: ${tablet}px)`));
  assert(queries.includes('(width < 64em)'));
  assert(queries.includes('(min-width: 64em)'));
  assert(!queries.some((query) => /64rem|40rem/.test(query)));
  css.walkAtRules('media', (media) => {
    if (!media.params.includes('40em')) return;
    assert.equal(media.params, '(width < 40em)');
    media.walkRules((rule) => assert(rule.selectors.every((selector) => selector.startsWith(':where(.usx-footer)')), 'Fixed 40em compatibility query must be Footer-only'));
  });
  if (desktop !== 1024) assert(!queries.some((query) => /1024px/.test(query)));
  if (tablet !== 640) assert(!queries.some((query) => /640px/.test(query)));

  const rulesFor = (selector) => {
    const rules = [];
    css.walkRules((rule) => { if (rule.selectors.includes(selector)) rules.push(rule); });
    assert(rules.length, `Missing selector: ${selector}`);
    return rules;
  };
  css.walkRules((rule) => assert(!rule.selectors.some((selector) => /\.(desktop|tablet)\\:/.test(selector)), 'USX must not rebuild vendor responsive utilities'));
  for (const selector of [
    '.usa-nav.usx-nav .usa-nav__inner',
    '.usa-banner.usx-banner .usa-banner__inner',
    '.usa-banner.usx-banner .usa-banner__content',
    '.usx-hero__inner',
    '.usx-footer > .grid-container',
    '.usx-footer > .usa-footer__primary-section > .grid-container',
    '.usx-footer > .usa-footer__secondary-section > .grid-container',
  ]) {
    assert(rulesFor(selector).some((rule) => rule.nodes.some((decl) => decl.prop === 'max-width' && decl.value === `${width}rem`)));
    assert(rulesFor(selector).some((rule) => rule.nodes.some((decl) => decl.prop === 'padding-inline' && decl.value === 'var(--usx-layout-gutter)')));
  }
  assert(!result.loadedUrls.some((url) => url.pathname.includes('/@uswds/uswds/')), 'USX must not compile vendor Sass');
  assert(rulesFor('.usx-footer .usa-sign-up .usa-form').some((rule) => rule.nodes.some((decl) => decl.prop === 'max-width' && decl.value === '100%')));
  for (const [selector, property, value] of [
    [':where(.usx-footer) .usa-footer__nav', 'max-width', `${width}rem`],
    [':where(.usx-footer) .usa-footer__primary-container', 'max-width', `${width}rem`],
    ['.usx-footer', '--footer-gutter', 'var(--usx-layout-gutter-mobile)'],
    ['.usx-footer', '--footer-gap-limit', 'var(--footer-gutter)'],
    [':where(.usx-footer) .grid-row.grid-gap-1', 'margin-inline', 'calc(-1 * min(0.25rem, var(--footer-gap-limit)))'],
    [':where(.usx-footer) .grid-row.grid-gap-2 > *', 'padding-inline', 'min(0.5rem, var(--footer-gap-limit))'],
    [':where(.usx-footer) .grid-row.grid-gap-4', 'margin-inline', 'calc(-1 * min(1rem, var(--footer-gap-limit)))'],
    [':where(.usx-footer) .grid-row.grid-gap-4 > *', 'padding-inline', 'min(1rem, var(--footer-gap-limit))'],
  ]) {
    assert(rulesFor(selector).some((rule) => rule.nodes.some((decl) => decl.prop === property && decl.value === value)), `Missing Footer token mapping: ${selector} ${property}`);
  }
  for (const [selector, property, value, media] of [
    ['.usx-footer', '--footer-gutter', 'var(--usx-layout-gutter)', `(min-width: ${desktop}px)`],
    [':where(.usx-footer) .usa-footer__nav', 'padding-inline', 'var(--footer-gutter)', '(min-width: 30em)'],
    [':where(.usx-footer) .usa-footer__primary-container', 'padding-inline', 'var(--footer-gutter)', '(min-width: 64em)'],
    [':where(.usx-footer) .usa-footer__primary-link', 'padding-inline', 'var(--footer-gutter)', '(width < 30em)'],
    [':where(.usx-footer).usa-footer--slim .usa-footer__address', 'padding-inline', 'var(--footer-gutter)', '(width < 30em)'],
    [':where(.usx-footer).usa-footer--big .usa-footer__primary-content--collapsible .usa-list--unstyled', 'padding-inline', 'var(--footer-gutter)', '(width < 30em)'],
    [':where(.usx-footer).usa-footer--big .usa-footer__nav', 'margin-inline', 'calc(-1 * var(--footer-gutter))', '(width < 40em)'],
    [':where(.usx-footer) .usa-footer__nav', '--footer-gap-limit', '0px', '(width < 30em)'],
    [':where(.usx-footer) .usa-footer__primary-link', 'border-top', 'var(--usx-footer-primary-link-border-top)', '(width < 30em)'],
    [':where(.usx-footer) .usa-footer__nav', 'border-bottom', 'var(--usx-footer-nav-border-bottom)', '(width < 30em)'],
    [':where(.usx-footer).usa-footer--big .usa-footer__nav', 'border-bottom', 'var(--usx-footer-nav-border-bottom)', '(width < 40em)'],
    [':where(.usx-footer).usa-footer--slim .usa-footer__address', '--footer-gap-limit', '0px', '(min-width: 30em) and (width < 64em)'],
  ]) {
    assert(rulesFor(selector).some((rule) => rule.parent.params === media && rule.nodes.some((decl) => decl.prop === property && decl.value === value)), `Missing Footer responsive mapping: ${selector} ${media}`);
  }
  for (const [media, gap] of [[undefined, '0.5rem'], ['(min-width: 64em)', '1rem']]) {
    const halfGap = `min(${gap}, var(--footer-gap-limit))`;
    for (const [selector, property, value] of [
      [':where(.usx-footer) .grid-row.grid-gap', 'margin-inline', `calc(-1 * ${halfGap})`],
      [':where(.usx-footer) .grid-row.grid-gap > *', 'padding-inline', halfGap],
    ]) {
      assert(rulesFor(selector).some((rule) => rule.parent.params === media && rule.nodes.some((decl) => decl.prop === property && decl.value === value)), `Footer grid gap must fit its gutter: ${selector} ${media}`);
    }
  }
  assert(rulesFor('.usx-footer').every((rule) => !rule.nodes.some((decl) => /overflow/.test(decl.prop) && /hidden|clip/.test(decl.value))), 'Footer must not hide overflow or clip focus outlines');
  assert(!readFileSync(new URL('../../../packages/usx/src/components/_layout.scss', import.meta.url), 'utf8').includes('footer'), 'Footer sizing must live in its owning stylesheet');
  assert(rulesFor('.usx-hero--has-overlay').some((rule) => rule.nodes.some((decl) => decl.prop === 'box-shadow' && decl.value.startsWith('inset '))));
  assert(rulesFor('.usx-hero--has-overlay.usx-hero--custom-overlay').some((rule) => rule.nodes.some((decl) => decl.prop === 'box-shadow' && decl.value.includes('var(--hero-overlay-opacity)'))));
  assert(!result.css.includes('.usx-hero--has-overlay::before'));
  for (const selector of ['.usx-hero', '.usx-hero__inner']) {
    assert(rulesFor(selector).every((rule) => !rule.nodes.some((decl) => ['position', 'z-index'].includes(decl.prop))), 'Hero must not introduce a positioned layer over preceding focus outlines');
  }
  const primaryRules = rulesFor('.usa-nav.usx-nav .usa-nav__inner > .usa-nav__primary');
  for (const [selector, property, value, media] of [
    ['.usx-header', 'border-top', 'var(--usx-header-border-top)', undefined],
    ['.usx-header', 'border-bottom', 'var(--usx-header-border-bottom)', undefined],
    ['.usx-header', 'border-bottom', 'var(--usx-header-border-bottom-mobile)', '(width < 64em)'],
    ['.usx-header.usa-header--extended', 'border-bottom', 'none', '(min-width: 64em)'],
    ['.usx-header .usa-navbar', 'border-bottom', 'none', undefined],
    ['.usx-nav', 'border-top', 'none', '(width < 64em)'],
    ['.usx-nav', 'border-bottom', 'var(--usx-header-nav-border-bottom-mobile)', '(width < 64em)'],
    ['.usx-header.usa-header--extended + .usx-nav', 'border-top', 'var(--usx-header-border-separator)', '(min-width: 64em)'],
    ['.usx-header.usa-header--extended > .usx-nav', 'border-bottom', 'var(--usx-header-border-bottom)', '(min-width: 64em)'],
    ['.usa-nav.usx-nav .usa-nav__primary-item', 'border-top', 'var(--usx-header-nav-item-border)', '(width < 64em)'],
    ['.usa-nav.usx-nav .usa-nav__submenu-item', 'border-top', 'var(--usx-header-nav-item-border)', '(width < 64em)'],
    ['.usa-nav.usx-nav .usa-nav__secondary-item + .usa-nav__secondary-item', 'border-left', 'var(--usx-header-nav-item-border)', '(min-width: 64em)'],
    ['.usx-footer', 'border-top', 'var(--usx-footer-border-top)', undefined],
    ['.usx-footer', 'border-bottom', 'var(--usx-footer-border-bottom)', undefined],
    ['.usx-footer .usa-footer__primary-section', 'border-top', 'var(--usx-footer-primary-section-border-top)', undefined],
    ['.usx-footer .usa-footer__secondary-section', 'border-top', 'var(--usx-footer-secondary-section-border-top)', undefined],
    ['.usx-footer > .usa-footer__primary-section:first-child', 'border-top', 'none', undefined],
    ['.usx-footer > .usa-footer__secondary-section:first-child', 'border-top', 'none', undefined],
  ]) {
    assert(rulesFor(selector).some((rule) => rule.parent.params === media && rule.nodes.some((decl) => decl.prop === property && decl.value === value)), `Missing border role: ${selector} ${property} ${value}`);
  }
  assert(primaryRules.every((rule) => rule.parent.params === '(min-width: 64em)'));
  assert(primaryRules.some((rule) => rule.nodes.some((decl) => decl.prop === 'margin-inline' && decl.value === '-1rem')));
  assert(rulesFor('.usx-nav').some((rule) => rule.parent.params === '(width < 64em)'));
  assert(rulesFor(':has(> .usa-header--extended) .usx-nav').some((rule) => rule.parent.params === '(min-width: 64em)'));
  assert.equal(result.loadedUrls.filter((url) => /usx-theme\/src\/_variables.scss$/.test(url.pathname)).length, 1);
  process.stdout.write(`PASS: shared layout ${desktop}px / ${tablet}px / ${width}rem / ${gutter}px\n`);
}