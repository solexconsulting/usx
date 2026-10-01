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
  assert(queries.includes(`(width < ${tablet}px)`));
  assert(queries.includes(`(min-width: ${tablet}px)`));
  assert(queries.includes('(width < 64em)'));
  assert(queries.includes('(min-width: 64em)'));
  assert(!queries.some((query) => /64rem|40em|40rem/.test(query)));
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
    '.usx-footer > .usa-footer__primary-section > .usa-footer__nav',
    '.usx-footer > .usa-footer__primary-section > .usa-footer__primary-container',
  ]) {
    assert(rulesFor(selector).some((rule) => rule.nodes.some((decl) => decl.prop === 'max-width' && decl.value === `${width}rem`)));
    assert(rulesFor(selector).some((rule) => rule.nodes.some((decl) => decl.prop === 'padding-inline' && decl.value === 'var(--usx-layout-gutter)')));
  }
  assert(!result.loadedUrls.some((url) => url.pathname.includes('/@uswds/uswds/')), 'USX must not compile vendor Sass');
  assert(rulesFor('.usx-footer .usa-sign-up .usa-form').some((rule) => rule.nodes.some((decl) => decl.prop === 'max-width' && decl.value === '100%')));
  assert(rulesFor('.usx-hero--has-overlay').some((rule) => rule.nodes.some((decl) => decl.prop === 'box-shadow' && decl.value.startsWith('inset '))));
  assert(rulesFor('.usx-hero--has-overlay.usx-hero--custom-overlay').some((rule) => rule.nodes.some((decl) => decl.prop === 'box-shadow' && decl.value.includes('var(--hero-overlay-opacity)'))));
  assert(!result.css.includes('.usx-hero--has-overlay::before'));
  for (const selector of ['.usx-hero', '.usx-hero__inner']) {
    assert(rulesFor(selector).every((rule) => !rule.nodes.some((decl) => ['position', 'z-index'].includes(decl.prop))), 'Hero must not introduce a positioned layer over preceding focus outlines');
  }
  const primaryRules = rulesFor('.usa-nav.usx-nav .usa-nav__inner > .usa-nav__primary');
  assert(primaryRules.every((rule) => rule.parent.params === '(min-width: 64em)'));
  assert(primaryRules.some((rule) => rule.nodes.some((decl) => decl.prop === 'margin-inline' && decl.value === '-1rem')));
  assert(rulesFor('.usx-nav').some((rule) => rule.parent.params === '(width < 64em)'));
  assert(rulesFor(':has(> .usa-header--extended) .usx-nav').some((rule) => rule.parent.params === '(min-width: 64em)'));
  assert.equal(result.loadedUrls.filter((url) => /usx-theme\/src\/_variables.scss$/.test(url.pathname)).length, 1);
  process.stdout.write(`PASS: shared layout ${desktop}px / ${tablet}px / ${width}rem / ${gutter}px\n`);
}