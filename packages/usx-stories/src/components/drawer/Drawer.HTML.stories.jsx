import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/drawer/drawer.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/drawer/drawer.django-snapshot.html?raw';
import { storyDefs } from './Drawer.React.stories.jsx';
import { componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USX/Drawer',
  tags: ['USX', 'autodocs'],
  decorators: [...componentInit('drawer')],
  parameters: {
    docs: {
      description: {
        component:
          'These static HTML examples use the browser’s native dialog commands, `command="show-modal"` and `command="close"`. Load `@solexllc/usx/js/start` for backdrop dismissal. Keep a visible heading for the dialog name, and choose initial focus to suit the task.',
      },
    },
  },
};

const dialogOf = (canvasElement, id) => canvasElement.querySelector(`[id$="${id}"]`);

// Retry: the assertion can run before the browser reports the just-opened dialog as visible.
const expectVisible = (element) => waitFor(() => expect(element).toBeVisible());
const expectHidden = (element) => waitFor(() => expect(element).not.toBeVisible());
const clickBackdrop = (dialog) => {
  const bounds = dialog.getBoundingClientRect();
  const x = bounds.left > 0 ? bounds.left - 1 : bounds.right + 1;
  dialog.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    clientX: x,
    clientY: bounds.top + bounds.height / 2,
  }));
};

// Modal drawers make the rest of the page inert, so close one before the next step.
const reset = (dialog) => dialog.close();

const testDefault = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open application details' });
  const dialog = dialogOf(canvasElement, 'drawer-default');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toHaveClass(...storyDefs.Default.triggerClassName.split(' '));
  await expect(trigger).toHaveAttribute('commandfor', dialog.id);
  await expect(trigger).toHaveAttribute('command', 'show-modal');
  trigger.focus();
  await userEvent.keyboard('{Enter}');
  await expectVisible(canvas.getByRole('dialog', { name: 'Application details' }));
  await expect(dialog.matches(':modal')).toBe(true);
  await expect(within(dialog).getByText('In review')).toHaveClass('usx-tag');
  await expect(within(dialog).getByRole('heading', { name: 'Housing support application' })).toBeVisible();
  await expect(within(dialog).getByRole('link', { name: 'View application timeline' })).toHaveAttribute('href', '#application-timeline');
  const heading = within(dialog).getByRole('heading', { level: 2, name: 'Application details' });
  await expect(heading).toHaveFocus();
  trigger.focus();
  await expect(heading).toHaveFocus();
  // The close button is first in DOM order, placed like the corner close button of the Header's mobile navigation.
  await userEvent.tab({ shift: true });
  const closeButton = within(dialog).getByRole('button', { name: 'Close' });
  await expect(closeButton).toHaveFocus();
  await expect(closeButton).toHaveClass('usx-drawer__close');
  await expect(dialog.firstElementChild).toBe(closeButton);
  await userEvent.keyboard(' ');
  await expectHidden(dialog);
  await expect(trigger).toHaveFocus();
  // USWDS's header script must not treat the drawer's close button as its own and lock scrolling.
  await expect(document.body).not.toHaveClass('usa-js-mobile-nav--active');
  await userEvent.click(trigger);
  await expectVisible(dialog);
  clickBackdrop(dialog);
  await expectHidden(dialog);
  await expect(trigger).toHaveFocus();
};

const testMenuIconTrigger = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: 'Open site menu' });
  const dialog = dialogOf(canvasElement, 'drawer-menu-icon-trigger');
  await expect(trigger).toHaveClass('usa-button', 'usa-button--primary', 'display-block');
  await expect(trigger.querySelector('use').getAttribute('href')).toMatch(/#menu$/);
  await expect(trigger.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  await expect(trigger).toHaveAttribute('commandfor', dialog.id);
  await userEvent.click(trigger);
  await expectVisible(canvas.getByRole('dialog', { name: 'Site menu' }));
  await expect(within(dialog).getByRole('navigation', { name: 'Site menu' })).toBeVisible();
  await userEvent.click(within(dialog).getByText('Services'));
  await expect(within(dialog).getByRole('link', { name: 'Apply for a service' })).toHaveAttribute('href', '#apply');
  await expect(document.body).not.toHaveClass('usa-js-mobile-nav--active');
  await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
  await expectHidden(dialog);
  await expect(trigger).toHaveFocus();
};

const testAllSides = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  for (const args of storyDefs.Sides) {
    const dialog = dialogOf(canvasElement, `${args.id}`);
    await userEvent.click(canvas.getByRole('button', { name: args.label }));
    await expectVisible(canvas.getByRole('dialog', { name: args.heading }));
    await expect(dialog).toHaveAttribute('data-side', args.side);
    const scope = within(dialog);
    if (args.side === 'inline-start') {
      await expect(scope.getByRole('navigation', { name: 'Departments' })).toBeVisible();
      await expect(scope.getByRole('link', { name: 'Transportation' })).toHaveAttribute('href', '#transportation');
    } else if (args.side === 'inline-end') {
      await expect(scope.getByRole('heading', { name: 'Streetlight repair' })).toBeVisible();
      await expect(scope.getByRole('link', { name: 'View request history' })).toHaveAttribute('href', '#request-history');
    } else if (args.side === 'top') {
      await expect(scope.getByRole('heading', { name: 'Online payments are temporarily unavailable' })).toBeVisible();
      await expect(scope.getByRole('link', { name: 'Check service updates' })).toHaveAttribute('href', '#service-updates');
    } else {
      await expect(dialog.querySelectorAll('.usx-task-list > li')).toHaveLength(2);
      await expect(scope.getByRole('link', { name: /Renew parking permit/ })).toHaveAttribute('href', '#renew-parking');
    }
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    await expectHidden(dialog);
  }
};

const testAllSizes = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  for (const args of storyDefs.Sizes) {
    const dialog = dialogOf(canvasElement, args.id);
    await expect(dialog).toHaveAttribute('data-size', args.size);
    await userEvent.click(canvas.getByRole('button', { name: args.label }));
    await expectVisible(canvas.getByRole('dialog', { name: args.heading }));
    const scope = within(dialog);
    if (args.size === 'compact') {
      await expect(scope.getByRole('navigation', { name: 'Account shortcuts' })).toBeVisible();
      await expect(scope.getByRole('link', { name: 'Saved services' })).toHaveAttribute('href', '#saved-services');
    } else if (args.size === 'default') {
      await expect(scope.getByRole('heading', { name: 'Service center visit' })).toBeVisible();
      await expect(scope.getByRole('link', { name: 'Reschedule appointment' })).toHaveAttribute('href', '#reschedule-appointment');
    } else {
      await expect(dialog.querySelectorAll('.usx-task-list > li')).toHaveLength(3);
      await expect(scope.getByRole('link', { name: /Upload income documents/ })).toHaveAttribute('href', '#upload-income');
    }
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    await expectHidden(dialog);
  }
};

const testRichForm = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-rich-form');
  const scope = within(dialog);
  await userEvent.click(canvas.getByRole('button', { name: 'Filter programs' }));
  await expectVisible(canvas.getByRole('dialog', { name: 'Filter programs' }));
  const search = scope.getByRole('textbox', { name: 'Search term' });
  await expect(search).toHaveFocus();
  await userEvent.type(search, 'housing');
  await userEvent.click(scope.getByRole('checkbox', { name: 'Open' }));
  await userEvent.click(scope.getByRole('checkbox', { name: 'Accepting applications' }));
  await userEvent.click(scope.getByRole('button', { name: 'Apply filters' }));
  await expectHidden(dialog);
  await expect(dialog.returnValue).toBe('apply');
};

const testServiceNavigation = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-service-navigation');
  await userEvent.click(canvas.getByRole('button', { name: 'Browse services' }));
  await expectVisible(canvas.getByRole('dialog', { name: 'Services' }));
  await expect(dialog).toHaveAttribute('data-size', 'wide');
  const scope = within(dialog);
  const search = scope.getByRole('searchbox', { name: 'Search' });
  await expect(search.closest('form')).toHaveAttribute('action', '/search');
  await userEvent.type(search, 'rental');
  await expect(search).toHaveValue('rental');

  const navigation = scope.getByRole('navigation', { name: 'Service sections' });
  await expect(navigation.querySelectorAll('.usx-tree--padded').length).toBeGreaterThan(3);
  await expect(scope.getByRole('link', { name: 'Apply for rental assistance' })).toBeVisible();
  await userEvent.click(scope.getByText('Food assistance'));
  await expect(scope.getByRole('link', { name: 'Apply for food benefits' })).toBeVisible();
  await expect(scope.getByRole('link', { name: 'Morgan Lee account' })).toHaveAttribute(
    'href',
    '#account'
  );
  await expect(scope.getByRole('link', { name: 'Morgan Lee' })).toHaveAttribute('href', '#account');
  reset(dialog);
};

const testRounded = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-rounded');
  await expect(dialog).toHaveClass('usx-drawer__panel--rounded');
  await expect(dialogOf(canvasElement, 'drawer-default')).not.toHaveClass(
    'usx-drawer__panel--rounded'
  );
  await userEvent.click(canvas.getByRole('button', { name: 'Get support' }));
  await expectVisible(canvas.getByRole('dialog', { name: 'Contact support' }));
  await expect(within(dialog).getByRole('heading', { name: 'Talk to a specialist' })).toBeVisible();
  await expect(within(dialog).getByRole('link', { name: 'Visit the support center' })).toHaveAttribute('href', '#support-center');
  // The end-edge drawer rounds the corners that face the page content.
  await expect(getComputedStyle(dialog).borderStartStartRadius).not.toBe('0px');
  reset(dialog);
};

const testActionRequired = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const dialog = dialogOf(canvasElement, 'drawer-action-required');
  await expect(dialog).toHaveAttribute('closedby', 'none');
  await expect(within(dialog).queryByRole('button', { name: 'Close' })).toBeNull();
  await userEvent.click(canvas.getByRole('button', { name: 'Review terms' }));
  await expectVisible(canvas.getByRole('dialog', { name: 'Review the terms' }));
  await expect(within(dialog).getByRole('heading', { name: 'Before you continue' })).toBeVisible();
  await expect(within(dialog).getByRole('link', { name: 'Read the privacy notice' })).toHaveAttribute('href', '#privacy-notice');
  await userEvent.keyboard('{Escape}');
  await expect(dialog).toBeVisible();
  clickBackdrop(dialog);
  await expect(dialog).toBeVisible();
  await userEvent.click(within(dialog).getByRole('button', { name: 'Accept' }));
  await expectHidden(dialog);
};

const testDisabled = async ({ canvasElement }) => {
  const trigger = within(canvasElement).getByRole('button', {
    name: 'View annual account statement',
  });
  await expect(trigger).toBeDisabled();
  const dialog = dialogOf(canvasElement, 'drawer-disabled');
  await expect(dialog).not.toBeVisible();
  await expect(dialog).toHaveTextContent('Your statement will be available here after processing is complete.');
};

/** Static snapshots of every React variant, using the same native dialog commands. */
export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await expect(context.canvasElement.querySelector('[popover], [popovertarget]')).toBeNull();
    await step('Default', () => testDefault(context));
    await step('Menu Icon Trigger', () => testMenuIconTrigger(context));
    await step('All Sides', () => testAllSides(context));
    await step('All Sizes', () => testAllSizes(context));
    await step('Rich Form', () => testRichForm(context));
    await step('Service Navigation', () => testServiceNavigation(context));
    await step('Rounded', () => testRounded(context));
    await step('Action Required', () => testActionRequired(context));
    await step('Disabled', () => testDisabled(context));
  },
};

/** Static snapshots of every Django variant, using the same native dialog commands. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
