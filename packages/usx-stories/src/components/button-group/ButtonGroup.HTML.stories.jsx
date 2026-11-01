import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/button-group/button-group.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/button-group/button-group.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './ButtonGroup.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/ButtonGroup',
  tags: ['USWDS', 'autodocs'],
};

const checkGroup = (def) => async (group) => {
  await expect(group.tagName).toBe('UL');
  await expect(group).toHaveClass('usa-button-group', 'usx-button-group');
  await (def.segmented ? expect(group) : expect(group).not).toHaveClass(
    'usa-button-group--segmented'
  );

  const items = [...group.children];
  await expect(items).toHaveLength(def.buttonProps.length);
  for (const [index, props] of def.buttonProps.entries()) {
    await expect(items[index]).toHaveClass('usa-button-group__item');
    const button = items[index].querySelector('button.usa-button');
    await expect(button).toHaveClass(`usa-button--${props.variant}`);
    await expect(button.textContent.trim()).toBe(props.label);
    const icons = [...button.querySelectorAll('svg use')].map(
      (use) => use.getAttribute('href').split('#')[1]
    );
    await expect(icons).toEqual((props.iconProps ?? []).map((icon) => icon.name));
  }

  // Segmented groups butt the buttons together; plain groups keep a gap between them.
  for (let i = 1; i < items.length; i++) {
    const gap = items[i].getBoundingClientRect().left - items[i - 1].getBoundingClientRect().right;
    if (def.segmented) await expect(gap).toBeLessThanOrEqual(0);
    else await expect(gap).toBeGreaterThan(0);
  }
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkGroup(def)])
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
