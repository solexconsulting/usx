import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/drawer/drawer.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/drawer/drawer.django-snapshot.html?raw';
import { storyDefs } from './Drawer.React.stories.jsx';

export default {
  title: 'HTML/USX/Drawer',
  tags: ['USX', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'These static HTML examples use the browser’s native dialog commands. Modal drawers use `command="show-modal"` and `command="close"`; modeless drawers use the Popover API. Keep a visible heading for the dialog name, and choose initial focus to suit the task.',
      },
    },
  },
};

const dialogOf = (canvasElement, id) => canvasElement.querySelector(`[id$="${id}"]`);

// Retry: the assertion can run before the browser reports the just-opened dialog as visible.
const expectVisible = (element) => waitFor(() => expect(element).toBeVisible());
const expectHidden = (element) => waitFor(() => expect(element).not.toBeVisible());

// Modal drawers make the rest of the page inert, so close one before the next step.
const reset = (dialog) => dialog.close();

const testDefault = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open application details' });
  const dialog = dialogOf(canvasElement, 'drawer-default');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toHaveAttribute('commandfor', dialog.id);
  await expect(trigger).toHaveAttribute('command', 'show-modal');
  trigger.focus();
  await userEvent.keyboard('{Enter}');
  await expectVisible(canvas.getByRole('dialog', { name: 'Application details' }));
  await expect(dialog.matches(':modal')).toBe(true);
  const heading = within(dialog).getByRole('heading', { level: 2, name: 'Application details' });
  await expect(heading).toHaveFocus();
  trigger.focus();
  await expect(heading).toHaveFocus();
  await userEvent.tab();
  await expect(within(dialog).getByRole('button', { name: 'Close' })).toHaveFocus();
  await userEvent.keyboard(' ');
  await expectHidden(dialog);
  await expect(trigger).toHaveFocus();
};

const testAllSides = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  for (const args of storyDefs.Sides) {
    const dialog = dialogOf(canvasElement, `${args.id}`);
    await userEvent.click(canvas.getByRole('button', { name: args.label }));
    await expectVisible(canvas.getByRole('dialog', { name: args.heading }));
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    await expectHidden(dialog);
  }
};

const testModeless = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open reference guide' });
  const dialog = dialogOf(canvasElement, 'drawer-modeless');
  await expect(trigger).toHaveAttribute('popovertarget', dialog.id);
  await userEvent.click(trigger);
  await expectVisible(canvas.getByRole('dialog', { name: 'Reference guide' }));
  await expect(dialog.matches(':popover-open')).toBe(true);
  await expect(dialog.matches(':modal')).toBe(false);
  const otherTask = canvas.getByRole('button', { name: 'Other page task' });
  otherTask.focus();
  await expect(otherTask).toHaveFocus();
  await expect(dialog.matches(':popover-open')).toBe(true);
  await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  await expectHidden(dialog);
};

const testRichForm = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-rich-form');
  const scope = within(dialog);
  await userEvent.click(canvas.getByRole('button', { name: 'Filter programs' }));
  await expectVisible(canvas.getByRole('dialog', { name: 'Filter programs' }));
  const search = scope.getByRole('searchbox', { name: 'Search term' });
  await expect(search).toHaveFocus();
  await userEvent.type(search, 'housing');
  await userEvent.click(scope.getByRole('checkbox', { name: 'Open' }));
  await userEvent.click(scope.getByRole('button', { name: 'Apply filters' }));
  await expectHidden(dialog);
  await expect(dialog.returnValue).toBe('apply');
};

const testNestedPopover = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-nested-popover');
  const popover = dialogOf(canvasElement, 'drawer-related-actions');
  const disclosure = popover.closest('details');
  const summary = disclosure.querySelector(':scope > summary');
  await userEvent.click(canvas.getByRole('button', { name: 'Open service details' }));
  await expectVisible(dialog);
  await userEvent.click(summary);
  summary.focus();
  await expect(disclosure.open).toBe(true);
  await expectVisible(popover);
  await userEvent.keyboard('{Escape}');
  await expect(disclosure.open).toBe(false);
  await expect(summary).toHaveFocus();
  await expectVisible(dialog);
  await userEvent.click(summary);
  await userEvent.click(canvas.getByRole('button', { name: 'Close related actions' }));
  await expectHidden(popover);
  await expect(disclosure.open).toBe(false);
  await expect(summary).toHaveFocus();
  await expectVisible(dialog);
  await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  await expectHidden(dialog);
};

const testLongContent = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-long-content');
  await userEvent.click(canvas.getByRole('button', { name: 'Browse all programs' }));
  await expectVisible(canvas.getByRole('dialog', { name: 'All programs' }));
  await expect(canvas.getByRole('link', { name: 'Program 40' })).toBeInTheDocument();
  reset(dialog);
};

const testRtl = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open start drawer' });
  await userEvent.click(trigger);
  const dialog = canvas.getByRole('dialog', { name: 'Start drawer' });
  await expect(dialog.matches(':dir(rtl)')).toBe(true);
  await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
};

const testDisabled = async ({ canvasElement }) => {
  const trigger = within(canvasElement).getByRole('button', {
    name: 'Open unavailable information',
  });
  await expect(trigger).toBeDisabled();
  await expect(dialogOf(canvasElement, 'drawer-disabled')).not.toBeVisible();
};

const testIconTrigger = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open account details' });
  await expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  await userEvent.click(trigger);
  await expectVisible(canvas.getByRole('dialog', { name: 'Account details' }));
  reset(dialogOf(canvasElement, 'drawer-icon-trigger'));
};

const testCustomTrigger = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Edit profile' });
  await expect(trigger).not.toHaveAttribute('aria-label');
  await userEvent.click(trigger);
  await expectVisible(canvas.getByRole('dialog', { name: 'Edit profile' }));
  reset(dialogOf(canvasElement, 'drawer-custom-trigger'));
};

/** Static snapshots of every React variant, using the same native dialog commands. */
export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await step('Default', () => testDefault(context));
    await step('All Sides', () => testAllSides(context));
    await step('Modeless', () => testModeless(context));
    await step('Rich Form', () => testRichForm(context));
    await step('Nested Popover', () => testNestedPopover(context));
    await step('Long Content', () => testLongContent(context));
    await step('Rtl', () => testRtl(context));
    await step('Disabled', () => testDisabled(context));
    await step('Icon Trigger', () => testIconTrigger(context));
    await step('Custom Trigger', () => testCustomTrigger(context));
  },
};

/** Static snapshots of every Django variant, using the same native dialog commands. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
