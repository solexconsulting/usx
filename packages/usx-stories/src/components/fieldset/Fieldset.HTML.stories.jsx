import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/fieldset/fieldset.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/fieldset/fieldset.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Fieldset.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Fieldset',
  tags: ['USWDS', 'autodocs'],
};

const hasClass = (element, name, expected) =>
  (expected ? expect(element) : expect(element).not).toHaveClass(name);

const checkFieldset = (def) => async (fieldset) => {
  await expect(fieldset.tagName).toBe('FIELDSET');
  await expect(fieldset).toHaveClass('usa-fieldset', 'usx-fieldset');
  if (def.className) await expect(fieldset).toHaveClass(...def.className.split(' '));

  const legend = fieldset.querySelector(':scope > legend');
  if (def.legend) {
    await expect(legend).toHaveClass('usa-legend', 'usx-legend');
    await expect(legend).toHaveTextContent(def.legend);
    await hasClass(legend, 'usa-legend--large', Boolean(def.largeLegend));
    await expect(legend.querySelector('abbr.usx-required') !== null).toBe(Boolean(def.required));
    await expect(fieldset).toHaveAccessibleName(new RegExp(`${def.legend}$`));
    // The legend is the first child, which is what lets it name the group.
    await expect(fieldset.firstElementChild).toBe(legend);
  } else {
    await expect(legend).toBeNull();
  }

  // A disabled fieldset disables everything inside it.
  await expect(fieldset.disabled).toBe(Boolean(def.disabled));
  for (const control of fieldset.querySelectorAll('input, select, textarea, button')) {
    await (def.disabled ? expect(control) : expect(control).not).toBeDisabled();
  }
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkFieldset(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Large legend is larger', async () => {
    const size = (title) =>
      parseFloat(
        getComputedStyle(sectionFor(context.canvasElement, title).querySelector('legend')).fontSize
      );
    await expect(size('Large Legend')).toBeGreaterThan(size('Default'));
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play,
};
