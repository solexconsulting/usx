import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/input/input.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/input/input.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './Input.React.stories.jsx';
import { checkField } from '../../utils/formChecks.js';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Input',
  tags: ['USWDS', 'autodocs'],
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    async (group) => {
      await checkField(group, def, { tag: 'INPUT' });
      await expect(group.querySelector('input').type).toBe('text');
      await expect(group.querySelector('input')).toHaveValue(def.value ?? def.defaultValue ?? '');
    },
  ])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Typing', async () => {
    const input = sectionFor(context.canvasElement, 'Default').querySelector('input');
    await userEvent.type(input, 'Jane Doe');
    await expect(input).toHaveValue('Jane Doe');
    // A disabled input cannot be focused or typed into.
    const disabled = sectionFor(context.canvasElement, 'Disabled').querySelector('input');
    await userEvent.type(disabled, 'nope');
    await expect(disabled).toHaveValue('');
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
