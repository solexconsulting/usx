import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import Ajv from 'ajv';
import { componentContracts } from '../../packages/usx-contracts/src/contracts.js';
import { buildContractManifest, loadComponentConfigs, REPO_ROOT, SCHEMA_PATH } from '../lib/component-configs.js';

const { configs, errors } = loadComponentConfigs();
assert.equal(errors.size, 0);
const manifest = componentContracts;

test('the existing manifest describes every component and each real renderer binding', () => {
  assert.deepEqual(Object.keys(manifest.components).sort(), [...configs.keys()].sort());
  const exports = fs.readFileSync(path.join(REPO_ROOT, 'packages/usx-react/src/index.js'), 'utf8');
  for (const [name, contract] of Object.entries(manifest.components)) {
    assert.ok(exports.includes(`export { default as ${contract.renderers.react.export} }`), name);
    assert.equal(contract.renderers.react.package, '@solexllc/usx-react');
    assert.equal(contract.renderers.django.component, name);
    assert.equal(contract.renderers.django.module, 'usx_django');
    assert.equal(contract.renderers.django.function, 'render_component');
    assert.equal(contract.renderers.django.tag, name.replace(/-/g, '_'));
    assert.ok(fs.existsSync(path.join(REPO_ROOT, 'packages/usx-react/src/components', contract.renderers.django.template)), name);
  }
  assert.equal(manifest.components.sidenav.renderers.react.export, 'SideNav');
});

test('release identities are explicit and separate from component versions', () => {
  for (const name of ['usx-contracts', 'usx-react', 'usx']) {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, `packages/${name}/package.json`), 'utf8'));
    assert.deepEqual(manifest.packages[pkg.name], { registry: 'npm', version: pkg.version });
  }
  assert.equal(manifest.packages['solex-usx-django'].registry, 'pypi');
  assert.ok(manifest.packages['solex-usx-django'].version);
  assert.equal(manifest.schemaVersion, 1);
});

test('example content is preserved separately and never merged into prop defaults', () => {
  for (const [name, config] of configs) {
    const contract = manifest.components[name];
    assert.deepEqual(contract.props, config.props);
    if (Object.hasOwn(config, 'default')) assert.deepEqual(contract.examples, { default: config.default });
    else assert.equal(contract.examples, undefined);
  }
  const slider = manifest.components['range-slider'];
  assert.equal(slider.examples.default.step, 10);
  assert.equal(slider.props.step.default, 1);
});

test('corrected contracts describe composition and actual renderer differences', () => {
  const { button, layout, alert, icon } = manifest.components;
  for (const contract of [button, layout, alert, icon]) assert.equal(contract.version, 2);
  assert.ok(button.props.variant.options.includes('unstyled'));
  assert.equal(button.props.children.type, 'slot');
  for (const name of ['children', 'content', 'leftSidebar', 'rightSidebar']) assert.equal(layout.props[name].type, 'slot');
  for (const contract of [button, alert]) {
    assert.equal(contract.props.style.type, 'object');
    assert.equal(contract.props.style.renderers.django.supported, false);
  }
  assert.deepEqual(icon.props.style.type, ['string', 'object']);
  assert.equal(icon.props.style.renderers.react.type, 'object');
  assert.equal(icon.props.style.renderers.django.type, 'string');
  assert.equal(Object.hasOwn(icon.props.style, 'default'), false);
  // Developer callbacks and HTML-capable slots remain described, not filtered.
  assert.equal(button.props.onClick.type, 'function');
  assert.equal(alert.props.children.type, 'slot');
});

test('source metadata validation rejects malformed renderer annotations', () => {
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  const validate = new Ajv({ allowUnionTypes: true }).compile(schema);
  const config = structuredClone(configs.get('icon'));
  config.props.style.renderers.django.supported = 'yes';
  assert.equal(validate(config), false);
  config.props.style.renderers = { unknown: { type: 'string' } };
  assert.equal(validate(config), false);
});

test('generation rejects a missing or external template instead of publishing a broken binding', () => {
  for (const template of ['missing/template.django.html', '../../package.json']) {
    const changed = new Map(configs);
    changed.set('button', { ...configs.get('button'), template });
    assert.throws(() => buildContractManifest(changed), /Missing or invalid Django template/);
  }
});

test('renderable children are slots, including nested composition and scaffold metadata', () => {
  function check(props, location) {
    for (const [name, prop] of Object.entries(props)) {
      const key = `${location}.${name}`;
      if (name === 'children') {
        // SideNav children are recursive navigation data, not rendered content.
        assert.equal(prop.type, key === 'sidenav.items.items.children' ? 'array' : 'slot', key);
      }
      if (prop.properties) check(prop.properties, key);
      if (prop.items?.properties) check(prop.items.properties, `${key}.items`);
    }
  }
  for (const [name, contract] of Object.entries(manifest.components)) check(contract.props, name);
  for (const name of ['page', 'section', 'breadcrumb', 'prose', 'table', 'in-page-nav']) {
    assert.equal(manifest.components[name].props.children.type, 'slot', name);
  }
  const scaffold = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'scripts/templates/component/config.json'), 'utf8'));
  assert.equal(scaffold.props.children.type, 'slot');
});

test('content slots preserve the distinction from string-only renderer inputs', () => {
  for (const [component, props] of Object.entries({
    page: ['title', 'eyebrow', 'content'],
    section: ['content'],
    attribution: ['media', 'primary', 'secondary'],
    fieldset: ['legend', 'hint', 'error'],
    swap: ['onContent', 'offContent'],
    table: ['caption', 'placeholder'],
  })) {
    for (const prop of props) assert.equal(manifest.components[component].props[prop].type, 'slot', `${component}.${prop}`);
  }
  assert.equal(manifest.components.prose.props.content.type, 'string');
  assert.equal(manifest.components['in-page-nav'].props.content.type, 'string');
  assert.deepEqual(manifest.components['text-area'].props.error.type, ['string', 'boolean']);
  for (const name of ['breadcrumb', 'table', 'in-page-nav']) {
    assert.equal(manifest.components[name].props.children.renderers.django.supported, false);
  }
});

test('Quote references Attribution without duplicating its contract', () => {
  const { props } = manifest.components.quote;
  assert.equal(Object.hasOwn(props, 'attribution'), false);
  assert.equal(props.attributionProps.component, 'attribution');
  assert.equal(props.attributionProps.type, 'object');
  assert.equal(Object.hasOwn(props.attributionProps, 'properties'), false);
  assert.equal(manifest.components[props.attributionProps.component].props.avatarProps.component, 'avatar');
});

test('composed children reference their component contracts', () => {
  const { card, hero, collection, 'checkbox-group': checkboxGroup } = manifest.components;
  for (const [prop, component] of [['tagProps', 'tag'], ['buttonProps', 'button'], ['imageProps', 'image']]) {
    assert.equal(card.props[prop].items.component, component);
  }
  for (const old of ['tags', 'actions', 'images']) assert.equal(Object.hasOwn(card.props, old), false);
  assert.equal(hero.props.buttonProps.component, 'button');
  assert.equal(Object.hasOwn(hero.props, 'button'), false);
  assert.equal(collection.props.items.items.properties.calendarDateProps.component, 'calendar-date');
  assert.equal(Object.hasOwn(collection.props.items.items.properties, 'calendarDate'), false);
  assert.equal(checkboxGroup.props.checkboxProps.items.component, 'checkbox');
  assert.equal(Object.hasOwn(checkboxGroup.props, 'options'), false);
});

test('Callout replaces Block and Quote references its styling contract', () => {
  assert.equal(manifest.components.block, undefined);
  const { callout, quote } = manifest.components;
  assert.deepEqual(callout.props.orientation.options, ['horizontal', 'vertical']);
  assert.equal(callout.props.orientation.default, 'horizontal');
  for (const removed of ['variant', 'quote', 'color', 'attributionProps', 'contentClassName']) {
    assert.equal(Object.hasOwn(callout.props, removed), false);
  }
  assert.equal(callout.props.children.type, 'slot');
  assert.equal(callout.props.content.type, 'slot');
  assert.equal(Object.hasOwn(callout.props.strokeColor, 'default'), false);
  assert.equal(quote.props.calloutProps.component, 'callout');
  assert.deepEqual(quote.props.calloutProps.omit, ['element', 'children', 'content', 'cite']);
});

test('Quote source links reference Link and receive their children from sourceTitle', () => {
  const props = manifest.components.quote.props;
  assert.equal(Object.hasOwn(props, 'cite'), false);
  assert.equal(props.sourceLinkProps.component, 'link');
  assert.deepEqual(props.sourceLinkProps.omit, ['children']);
  assert.equal(props.sourceTitle.type, 'slot');
});
