import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/legend/legend.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/legend/legend.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './Legend.React.stories.jsx';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Legend',
  tags: ['USWDS', 'autodocs'],
};

const checkLegend = (def) => async (legend) => {
  await expect(legend.tagName).toBe('LEGEND');
  await expect(legend).toHaveClass('usa-legend', 'usx-legend');
  if (def.className) await expect(legend).toHaveClass(...def.className.split(' '));
  await (def.large ? expect(legend) : expect(legend).not).toHaveClass('usa-legend--large');
  await expect(legend).toHaveTextContent(def.text);
  const marker = legend.querySelector('abbr.usx-required');
  await expect(marker !== null).toBe(Boolean(def.required));
  if (marker) await expect(marker).toHaveAttribute('title', 'Required');
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkLegend(def)])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Large legend is larger', async () => {
    const size = (title) =>
      parseFloat(getComputedStyle(sectionFor(context.canvasElement, title)).fontSize);
    await expect(size('Large')).toBeGreaterThan(size('Default'));
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
