import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/summary-box/summary-box.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/summary-box/summary-box.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './SummaryBox.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/SummaryBox',
  tags: ['USWDS', 'autodocs'],
};

const checkBox = (def) => async (box) => {
  await expect(box).toHaveClass('usa-summary-box', 'usx-summary-box');
  await expect(box).toHaveAttribute('role', 'region');

  // The region is named by its heading.
  const heading = box.querySelector('.usa-summary-box__heading');
  await expect(heading).toHaveTextContent(def.heading);
  await expect(box.getAttribute('aria-labelledby')).toBe(heading.id);
  await expect(box).toHaveAccessibleName(def.heading);

  // Children replace the content text, which is then not rendered at all.
  const body = box.querySelector('.usa-summary-box__text');
  if (def.children === undefined) await expect(body).toHaveTextContent(def.content);
  else if (def.content) await expect(body).not.toHaveTextContent(def.content);
  if (typeof def.children === 'string') await expect(body).toHaveTextContent(def.children);
};

// These two stories set their own `name`, which becomes the section title.
const titles = {
  WithListComponent: 'Action plan summary',
  WithIconHighlights: 'KPI highlights summary',
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [titles[key] ?? sectionTitle(key), checkBox(def)])
  )
);

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
