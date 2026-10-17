import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/toggle/toggle.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/toggle/toggle.django-snapshot.html?raw';

export default {
  title: 'HTML/USWDS-Inspired/Toggle',
  tags: ['USWDS-Inspired', 'autodocs'],
};

const testPartiallyDisabled = async ({ canvasElement }) => {
  const scope = within(canvasElement.querySelector('[id$="partially-disabled-toggle"]'));
  const first = scope.getByRole('radio', { name: 'Option 1' });
  await userEvent.click(scope.getByText('Option 1', { selector: 'span' }));
  await expect(first).toHaveFocus();
  await userEvent.keyboard('{ArrowRight}');
  await expect(scope.getByRole('radio', { name: 'Option 3' })).toBeChecked();
  await expect(scope.getByRole('radio', { name: 'Option 2' })).toBeDisabled();
  await userEvent.keyboard('{ArrowRight}');
  await expect(first).toBeChecked();
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
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await step('Partially Disabled', () => testPartiallyDisabled(context));
  },
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
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
