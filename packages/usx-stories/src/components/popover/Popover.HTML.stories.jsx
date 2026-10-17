import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/popover/popover.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/popover/popover.django-snapshot.html?raw';
import ReactMeta, { storyDefs } from './Popover.React.stories.jsx';

export default {
  decorators: ReactMeta.decorators,
  title: 'HTML/USX/Popover',
  tags: ['USX', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: ReactMeta.parameters.docs.description.component,
      },
    },
  },
};

const disclosureFor = (canvasElement, id) =>
  canvasElement.querySelector(`[id$="${id}"]`).closest('details');
const summaryFor = (canvasElement, id) =>
  disclosureFor(canvasElement, id).querySelector(':scope > summary');
const scopeOf = (canvasElement, id) => within(disclosureFor(canvasElement, id));

// Retry: the assertion can run before the browser reports the just-opened panel as visible.
const expectVisible = (element) => waitFor(() => expect(element).toBeVisible());

// userEvent does not consistently focus native summary elements after synthetic clicks.
const clickSummary = async (canvasElement, id) => {
  const summary = summaryFor(canvasElement, id);
  await userEvent.click(summary);
  summary.focus();
};

const placementSides = ['right', 'top', 'bottom', 'left'];
const placementAlignments = ['start', 'center', 'end'];

const testDefault = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const id = 'popover-default';
  const trigger = summaryFor(canvasElement, id);
  const disclosure = disclosureFor(canvasElement, id);
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  await expect(trigger.tagName).toBe('SUMMARY');
  await expect(trigger.classList).toHaveLength(0);
  await expect(trigger).toHaveAccessibleName('Where is my case number?');
  await expect(disclosure.open).toBe(false);
  await expect(panel).not.toBeVisible();
  await userEvent.click(trigger);
  trigger.focus();
  await expect(disclosure.open).toBe(true);
  await expectVisible(panel);
  await userEvent.keyboard('{Escape}');
  await expect(disclosure.open).toBe(false);
  await expect(trigger).toHaveFocus();
  await userEvent.click(trigger);
  trigger.focus();
  await userEvent.click(
    canvas.getByRole('heading', { name: 'Experimental — do not use in production' })
  );
  await expect(disclosure.open).toBe(false);
};

const testAuthoredTrigger = async ({ canvasElement }) => {
  const id = 'popover-authored-trigger';
  const trigger = summaryFor(canvasElement, id);
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  await expect(trigger.tagName).toBe('SUMMARY');
  await expect([...trigger.classList]).toEqual(
    storyDefs.AuthoredTrigger.summaryProps.className.split(' ')
  );
  await expect(trigger).toHaveAccessibleName('Application 10482 View status and next steps');
  await expect(trigger).not.toHaveAttribute('role');
  await expect(panel).not.toBeVisible();
  await userEvent.click(trigger);
  trigger.focus();
  await expectVisible(panel);
  scopeOf(canvasElement, id).getByRole('link', { name: 'Review application' }).focus();
  await userEvent.keyboard('{Escape}');
  await expect(panel).not.toBeVisible();
  await expect(trigger).toHaveFocus();
};

const testGroupedSummaryProps = async ({ canvasElement }) => {
  const trigger = summaryFor(canvasElement, 'popover-summary-props');
  await expect(trigger).toHaveClass('usa-button', 'usx-button', 'margin-0');
  await expect(trigger).toHaveAccessibleName('Account options menu');
  await expect(trigger).toHaveTextContent('Account options');
};

const testNavigation = async ({ canvasElement }) => {
  const id = 'popover-navigation';
  const scope = scopeOf(canvasElement, id);
  const trigger = summaryFor(canvasElement, id);
  await userEvent.click(trigger);
  trigger.focus();
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  await expectVisible(panel);
  await expect(panel.querySelector('[role="menu"]')).toBeNull();
  await expect(scope.getByRole('navigation', { name: 'Resource links' })).toBeInTheDocument();
  scope.getByRole('link', { name: 'Check eligibility' }).focus();
  await userEvent.keyboard('{Escape}');
  await expect(panel).not.toBeVisible();
  await expect(trigger).toHaveFocus();
};

const testMenuItems = async ({ canvasElement }) => {
  const id = 'popover-menu-items';
  const menu = scopeOf(canvasElement, id);
  const trigger = summaryFor(canvasElement, id);
  await clickSummary(canvasElement, id);
  await expectVisible(menu.getByRole('link', { name: 'All resident services' }));
  await clickSummary(canvasElement, `${id}-0`);
  await expectVisible(menu.getByRole('link', { name: 'Find affordable housing' }));
  await clickSummary(canvasElement, `${id}-0-0`);
  await expectVisible(menu.getByRole('link', { name: 'Apply for rental assistance' }));
  await clickSummary(canvasElement, `${id}-1`);
  await expect(disclosureFor(canvasElement, `${id}-0`).open).toBe(false);
  await expectVisible(menu.getByRole('link', { name: 'Reduced fare transit passes' }));
  await userEvent.keyboard('{Escape}');
  await expect(disclosureFor(canvasElement, `${id}-1`).open).toBe(false);
  await userEvent.keyboard('{Escape}');
  await expect(disclosureFor(canvasElement, id).open).toBe(false);
  await expect(trigger).toHaveFocus();
};

const testWorstCase = async ({ canvasElement }) => {
  const id = 'popover-worst-case';
  const scope = scopeOf(canvasElement, id);
  const trigger = summaryFor(canvasElement, id);
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  await expect(trigger).toHaveAccessibleName('Account and services, 3 notifications');
  await clickSummary(canvasElement, id);
  await expectVisible(panel);
  await expectVisible(scope.getByRole('heading', { level: 2, name: 'Account and services' }));
  await expectVisible(scope.getByText('Offices are closed on public holidays'));
  await expectVisible(scope.getByRole('link', { name: /Sign out of your account/ }));
  await clickSummary(canvasElement, `${id}-0`);
  await clickSummary(canvasElement, `${id}-0-0`);
  await expectVisible(scope.getByRole('link', { name: 'Apply for rental assistance' }));
  await expectVisible(scope.getByText(/Call 311/));
  await userEvent.click(scope.getByText('What to bring').closest('summary'));
  await expectVisible(scope.getByText(/A photo ID/));
  await userEvent.click(scope.getByRole('button', { name: 'Close account menu' }));
  await expect(panel).not.toBeVisible();
  await expect(disclosureFor(canvasElement, `${id}-0`).open).toBe(false);
  await expect(trigger).toHaveFocus();
};

const testActions = async ({ canvasElement }) => {
  const id = 'popover-actions';
  const scope = scopeOf(canvasElement, id);
  await clickSummary(canvasElement, id);
  await expectVisible(scope.getByRole('link', { name: 'Save for later' }));
  await expectVisible(scope.getByRole('link', { name: 'Share record' }));
};

const testRichForm = async ({ canvasElement }) => {
  const id = 'popover-rich-form';
  const scope = scopeOf(canvasElement, id);
  await clickSummary(canvasElement, id);
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  await expectVisible(panel);
  await expect(scope.getByRole('heading', { level: 3, name: 'Filter results' }).id).toMatch(
    /popover-filters-heading$/
  );
  const supportingDetails = panel.querySelector('.usx-details');
  await userEvent.click(supportingDetails.querySelector('summary'));
  supportingDetails.querySelector('summary').focus();
  await expect(supportingDetails.open).toBe(true);
  await userEvent.keyboard('{Escape}');
  await expect(disclosureFor(canvasElement, id).open).toBe(false);
  await expect(supportingDetails.open).toBe(true);
  await clickSummary(canvasElement, id);
  await userEvent.click(scope.getByRole('button', { name: 'Close', exact: true }));
  await expect(panel).not.toBeVisible();
  await expect(summaryFor(canvasElement, id)).toHaveFocus();
};

const testHeadingLevel = async ({ canvasElement }, id, level) => {
  const scope = scopeOf(canvasElement, id);
  await clickSummary(canvasElement, id);
  const heading = scope.getByRole('heading', { level, name: 'Filing deadlines' });
  await expectVisible(heading);
  await expect(heading).toHaveClass('usx-popover__panel-heading');
  await expect(heading.parentElement.id.endsWith(id)).toBe(true);
};

const testAllPlacements = async ({ canvasElement }) => {
  for (const side of placementSides) {
    for (const align of placementAlignments) {
      const id = `popover-${side}-${align}`;
      const disclosure = disclosureFor(canvasElement, id);
      const panel = canvasElement.querySelector(`[id$="${id}"]`);
      await expect(disclosure).toHaveAttribute('data-side', side);
      await expect(disclosure).toHaveAttribute('data-align', align);
      await clickSummary(canvasElement, id);
      await expectVisible(panel);
      await expect(panel).not.toHaveAttribute('style');
    }
  }
};

const testRtlPlacements = async ({ canvasElement }) => {
  for (const align of ['start', 'end']) {
    const id = `popover-rtl-${align}`;
    const disclosure = disclosureFor(canvasElement, id);
    const panel = canvasElement.querySelector(`[id$="${id}"]`);
    await expect(disclosure.matches(':dir(rtl)')).toBe(true);
    await clickSummary(canvasElement, id);
    await expectVisible(panel);
    await expect(panel).not.toHaveAttribute('style');
    const edge = align === 'start' ? 'right' : 'left';
    await expect(panel.getBoundingClientRect()[edge]).toBeCloseTo(
      summaryFor(canvasElement, id).getBoundingClientRect()[edge],
      0
    );
  }
};

const testLongContent = async ({ canvasElement }) => {
  const content = canvasElement.querySelector(
    '[id$="popover-long-content"] .usx-popover__panel-content'
  );
  await expect(content).toHaveClass('usx-popover__scroll');
  await expect(within(content).getAllByRole('link').length).toBeGreaterThan(10);
};

const testResponsiveComposition = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const root = disclosureFor(canvasElement, 'site-menu');
  await clickSummary(canvasElement, 'site-menu');
  await expect(root.open).toBe(true);
  const mobile = canvas.getByTestId('mobile-tree');
  const desktop = canvas.getByTestId('desktop-flyouts');
  if (getComputedStyle(mobile).display !== 'none') {
    await expect(desktop).not.toBeVisible();
    const tree = within(mobile);
    const summaryOf = (name) => tree.getByText(name).closest('summary');
    const housing = summaryOf('Housing').closest('details');
    await userEvent.click(summaryOf('Housing'));
    await expectVisible(tree.getByRole('link', { name: 'Find affordable housing' }));
    await userEvent.click(summaryOf('Help with housing costs'));
    await expectVisible(tree.getByRole('link', { name: 'Apply for rental assistance' }));
    await userEvent.click(summaryOf('Transportation'));
    await expect(housing.open).toBe(false);
    await expectVisible(tree.getByRole('link', { name: 'Reduced fare transit passes' }));
  } else {
    await expect(mobile).not.toBeVisible();
    const flyouts = within(desktop);
    await clickSummary(canvasElement, 'site-menu-flyouts-0');
    await expectVisible(flyouts.getByRole('link', { name: 'Find affordable housing' }));
    await clickSummary(canvasElement, 'site-menu-flyouts-0-0');
    await expectVisible(flyouts.getByRole('link', { name: 'Apply for rental assistance' }));
    await clickSummary(canvasElement, 'site-menu-flyouts-1');
    await expect(disclosureFor(canvasElement, 'site-menu-flyouts-0').open).toBe(false);
    await expect(disclosureFor(canvasElement, 'site-menu-flyouts-1').open).toBe(true);
    await expectVisible(flyouts.getByRole('link', { name: 'Reduced fare transit passes' }));
  }
  await expect(root.open).toBe(true);
};

/** Static snapshots of every React variant, with the same native disclosure behavior. */
export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    const step = (name, fn) => context.step(name, fn);
    await step('Default', () => testDefault(context));
    await step('Authored Trigger', () => testAuthoredTrigger(context));
    await step('Grouped Summary Props', () => testGroupedSummaryProps(context));
    await step('Navigation', () => testNavigation(context));
    await step('Menu Items', () => testMenuItems(context));
    await step('Worst Case', () => testWorstCase(context));
    await step('Actions', () => testActions(context));
    await step('Rich Form', () => testRichForm(context));
    await step('Heading Level Default', () =>
      testHeadingLevel(context, 'popover-heading-default', 2)
    );
    await step('Heading Level H3', () => testHeadingLevel(context, 'popover-heading-h3', 3));
    await step('Heading Level H5', () => testHeadingLevel(context, 'popover-heading-h5', 5));
    await step('All Placements', () => testAllPlacements(context));
    await step('Rtl Placements', () => testRtlPlacements(context));
    await step('Long Content', () => testLongContent(context));
    await step('Responsive Composition', () => testResponsiveComposition(context));
  },
};

/** Static snapshots of every Django variant, with the same native disclosure behavior. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
