import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Toggle } from '../dist/index.js';

const render = (props) => renderToStaticMarkup(React.createElement(Toggle, props));
for (const value of [0, '']) {
  const html = render({ options: [0, '', 'other'], value, defaultValue: 'other', ariaLabel: 'Choices' });
  assert.equal((html.match(/checked=""/g) || []).length, 1);
  assert.ok(html.includes(`value="${value}"`));
}
const markup = renderToStaticMarkup(React.createElement(React.Fragment, null,
  React.createElement(Toggle, { options: ['Yes', 'No'], ariaLabel: 'First' }),
  React.createElement(Toggle, { options: ['Yes', 'No'], ariaLabel: 'Second' }),
));
const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length);
const icons = render({ id: 'transport', ariaLabel: 'Transport', variant: 'icon', options: [{ value: 'bike', icon: 'directions_bike', label: 'Bike' }] });
assert.ok(icons.includes('role="radiogroup"'));
assert.ok(icons.includes('aria-label="Transport"'));
assert.ok(!icons.includes('<fieldset'));
assert.ok(!icons.includes('<legend'));
assert.ok(icons.includes('class="usx-toggle usa-button-group usx-toggle--icon"'));
assert.ok(icons.includes('usa-sr-only">Bike</span>'));
assert.ok(icons.includes('for="transport-option-0"'));
assert.ok(icons.includes('class="usa-button usx-button usa-button--primary usx-toggle__button"'));
assert.ok(render({ disabled: true, required: true, options: ['One'] }).includes('disabled="" required=""'));
console.log('PASS: Toggle selection, identities, labels, and native form attributes');
