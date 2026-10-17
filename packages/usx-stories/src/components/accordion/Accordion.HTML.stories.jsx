import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/accordion/accordion.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/accordion/accordion.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/Accordion',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`accordion.init()`'),
      },
    },
  },
  decorators: [...componentInit('accordion')],
};

// Retry: visibility can lag the click that toggles the panel.
const expectVisible = (element) => waitFor(() => expect(element).toBeVisible());

const testDefault = async ({ canvasElement }) => {
  const root = canvasElement.querySelector('[id$="accordion-default"]');
  const scope = within(root);
  const button = scope.getByRole('button', { name: /accordion item 1/i });
  const content = scope.getByText(/content for accordion item 1/i);
  const secondButton = scope.getByRole('button', { name: /accordion item 2/i });
  const secondContent = scope.getByText(/content for accordion item 2/i);

  await expect(root).not.toHaveAttribute('data-allow-multiple');
  await expect(content).not.toBeVisible();

  await userEvent.click(button);

  await expectVisible(content);
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await userEvent.click(secondButton);
  await expect(content).not.toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expectVisible(secondContent);
  await userEvent.click(secondButton);
  await expect(secondContent).not.toBeVisible();
  await expect(secondButton).toHaveAttribute('aria-expanded', 'false');
};

const testInitiallyExpanded = async ({ canvasElement }) => {
  const scope = within(canvasElement.querySelector('[id$="accordion-initially-expanded"]'));
  const button = scope.getByRole('button', { name: /accordion item 1/i });
  const content = scope.getByText(/content for accordion item 1/i);
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expectVisible(content);
  await userEvent.click(button);
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(content).not.toBeVisible();
  button.focus();
  await userEvent.keyboard('{Enter}');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expectVisible(content);
};

const testMultiSelectable = async ({ canvasElement }) => {
  const root = canvasElement.querySelector('[id$="accordion-multi"]');
  const scope = within(root);
  const firstButton = scope.getByRole('button', { name: /accordion item 1/i });
  const secondButton = scope.getByRole('button', { name: /accordion item 2/i });
  const firstContent = scope.getByText(/content for accordion item 1/i);
  const secondContent = scope.getByText(/content for accordion item 2/i);

  await expect(root).toHaveAttribute('data-allow-multiple');
  await userEvent.click(firstButton);
  await userEvent.click(secondButton);
  await expectVisible(firstContent);
  await expectVisible(secondContent);
  await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  await expect(secondButton).toHaveAttribute('aria-expanded', 'true');
  await userEvent.click(firstButton);
  await expect(firstContent).not.toBeVisible();
  await expectVisible(secondContent);
  await userEvent.click(secondButton);
};

const testIconStart = async ({ canvasElement }) => {
  const root = canvasElement.querySelector('[id$="accordion-icon-start"]');
  await expect(root).toHaveClass('usa-accordion--icon-start');
  await expect(root).not.toHaveClass('usa-accordion--icon-end');
  await expect(root).not.toHaveAttribute('iconPosition');
};

const testIconEnd = async ({ canvasElement }) => {
  const root = canvasElement.querySelector('[id$="accordion-icon-end"]');
  await expect(root).toHaveClass('usa-accordion--icon-end');
  await expect(root).not.toHaveClass('usa-accordion--icon-start');
  await expect(root).not.toHaveAttribute('iconPosition');
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
  play: async (context) => {
    const step = (name, fn) => context.step(name, () => fn(context));
    await step('Default', testDefault);
    await step('Initially Expanded', testInitiallyExpanded);
    await step('Multi Selectable', testMultiSelectable);
    await step('Icon Start', testIconStart);
    await step('Icon End', testIconEnd);
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
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
  play: AllVariantsReact.play,
};
