import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/select/select.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/select/select.django-snapshot.html?raw';
import { expect, userEvent } from 'storybook/test';
import { storyDefs } from './Select.React.stories.jsx';
import { checkField } from '../../utils/formChecks.js';
import { createAllVariantsPlay, sectionFor, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Select',
  tags: ['USWDS', 'autodocs'],
};

const checks = Object.fromEntries(
  Object.entries(storyDefs).map(([key, def]) => [
    sectionTitle(key),
    async (group) => {
      await checkField(group, def, { tag: 'SELECT', rendersSuccessMessage: true });
      const select = group.querySelector('select');
      await expect(select).toHaveClass('usa-select', 'usx-select');

      // A blank prompt comes first, then the options in order; the default value picks one.
      const options = [...select.options];
      await expect(options[0].value).toBe('');
      await expect(options.slice(1).map((option) => option.textContent.trim())).toEqual(
        def.options.map((option) => option.label)
      );
      await expect(options.slice(1).map((option) => option.value)).toEqual(
        def.options.map((option) => option.value)
      );
      await expect(select.value).toBe(def.value ?? def.defaultValue ?? '');
    },
  ])
);

const play = async (context) => {
  await createAllVariantsPlay(checks)(context);
  await context.step('Choosing', async () => {
    const select = sectionFor(context.canvasElement, 'Default').querySelector('select');
    await userEvent.selectOptions(select, storyDefs.Default.options[1].value);
    await expect(select).toHaveValue(storyDefs.Default.options[1].value);
    await expect(select.selectedOptions[0]).toHaveTextContent(storyDefs.Default.options[1].label);
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
