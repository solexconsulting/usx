import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/text-area/text-area.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/text-area/text-area.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './TextArea.React.stories.jsx';
import { checkField } from '../../utils/formChecks.js';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/TextArea',
  tags: ['USWDS', 'autodocs'],
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    async (group) => {
      await checkField(group, def, { tag: 'TEXTAREA' });
      await expect(group.querySelector('textarea')).toHaveClass('usa-textarea', 'usx-textarea');
    },
  ])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Typing', async () => {
    const area = sectionFor(context.canvasElement, 'Default').querySelector('textarea');
    await userEvent.type(area, 'Line one{enter}Line two');
    await expect(area).toHaveValue('Line one\nLine two');
    const disabled = sectionFor(context.canvasElement, 'Disabled').querySelector('textarea');
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
