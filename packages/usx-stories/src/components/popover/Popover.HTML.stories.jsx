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
    canvas.getByText('This content following the popover should be covered when it opens.')
  );
  await expect(disclosure.open).toBe(false);
};

const testPersistent = async ({ canvasElement }) => {
  const id = 'popover-persistent';
  const disclosure = disclosureFor(canvasElement, id);
  const trigger = summaryFor(canvasElement, id);
  await expect(disclosure.dataset.usxPopoverDismissOnOutside).toBe('false');
  await userEvent.click(trigger);
  await expect(disclosure.open).toBe(true);
  canvasElement.ownerDocument.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await expect(disclosure.open).toBe(true);
  summaryFor(canvasElement, 'popover-default').focus();
  await expect(disclosure.open).toBe(true);
  disclosure.querySelector('[data-usx-popover-close]').focus();
  await userEvent.keyboard('{Escape}');
  await expect(disclosure.open).toBe(false);
  await expect(trigger).toHaveFocus();
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

const testShowCloseIcon = async ({ canvasElement }) => {
  const id = 'popover-close-icon';
  const disclosure = disclosureFor(canvasElement, id);
  const trigger = summaryFor(canvasElement, id);
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  const header = panel.querySelector(':scope > .usx-popover__header');
  await expect(header.querySelector('h2')).toHaveTextContent('Panel with close icon');
  const close = header.querySelector('.usx-popover__header-close');
  await expect(close).toHaveAccessibleName('Close panel');
  await expect(close.querySelector('use')).toHaveAttribute('href', expect.stringMatching(/#close$/));
  await clickSummary(canvasElement, id);
  await expectVisible(panel);
  await userEvent.click(close);
  await expect(disclosure.open).toBe(false);
  await expect(trigger).toHaveFocus();
};

const testPanelShape = async ({ canvasElement }, id, panelShape) => {
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  await expect(panel).toHaveClass('usx-popover__panel');
  await expect(panel.classList.contains('usx-popover__panel--square')).toBe(
    panelShape === 'square'
  );
  await clickSummary(canvasElement, id);
  await expectVisible(panel);
  const style = getComputedStyle(panel);
  await expect(style.paddingTop).toBe(style.paddingBottom);
  await expect(style.paddingLeft).toBe(style.paddingRight);
  const content = panel.querySelector('.usx-popover__panel-content');
  if (panelShape === 'square') {
    await expect(style.borderTopLeftRadius).toBe('0px');
    await expect(style.paddingTop).toBe(style.paddingLeft);
    if (content) await expect(getComputedStyle(content).marginLeft).toBe('0px');
  } else {
    await expect(parseFloat(style.borderTopLeftRadius)).toBeGreaterThan(0);
    await expect(parseFloat(style.paddingTop)).toBeGreaterThan(parseFloat(style.paddingLeft));
    if (content) await expect(parseFloat(getComputedStyle(content).marginLeft)).toBeGreaterThan(0);
  }
};

const testMenuItems = async ({ canvasElement }, id = 'popover-menu-items') => {
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

const testMixedMenuItems = async ({ canvasElement }) => {
  const id = 'popover-mixed-menu-items';
  const trigger = summaryFor(canvasElement, id);
  await clickSummary(canvasElement, id);
  const menu = disclosureFor(canvasElement, id).querySelector('.usx-popover__menu');
  const rows = menu.querySelectorAll(':scope > li > .usx-popover__menu-item');
  await expect(rows).toHaveLength(4);
  await expect(rows[0].tagName).toBe('BUTTON');
  await expect(rows[0]).toHaveAttribute('type', 'button');
  await expect(rows[0]).not.toHaveClass('usa-button', 'usx-button');
  await expect(rows[0]).toHaveTextContent('Copy record');
  await expect(rows[0].querySelector('use')).toHaveAttribute(
    'href',
    expect.stringMatching(/#content_copy$/)
  );
  await expect(rows[1].tagName).toBe('A');
  await expect(rows[1]).toHaveAttribute(
    'href',
    expect.stringMatching(/#(?:react-|django-)?record-10482$/)
  );
  await expect(rows[2].tagName).toBe('SPAN');
  await expect(rows[3].tagName).toBe('BUTTON');
  await expect(rows[3]).toBeDisabled();
  rows[0].dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' }));
  const outside = summaryFor(canvasElement, 'popover-default');
  outside.focus();
  await expect(disclosureFor(canvasElement, id).open).toBe(true);
  trigger.focus();
  trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Tab' }));
  outside.focus();
  await expect(disclosureFor(canvasElement, id).open).toBe(false);
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

const testLinks = async ({ canvasElement }) => {
  const id = 'popover-links';
  const scope = scopeOf(canvasElement, id);
  await clickSummary(canvasElement, id);
  const savedRecords = scope.getByRole('link', { name: 'Saved records' });
  const sharingOptions = scope.getByRole('link', { name: 'Sharing options' });
  await expectVisible(savedRecords);
  await expectVisible(sharingOptions);
  await expect(savedRecords).toHaveAttribute('href', '#saved-records');
  await expect(sharingOptions).toHaveAttribute('href', '#sharing-options');
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

const testHeadingAs = async ({ canvasElement }, id, level) => {
  const scope = scopeOf(canvasElement, id);
  await clickSummary(canvasElement, id);
  const heading = scope.getByRole('heading', { level, name: 'Filing deadlines' });
  await expectVisible(heading);
  await expect(heading).toHaveClass('usx-popover__panel-heading');
  await expect(heading.closest('.usx-popover__header').parentElement.id.endsWith(id)).toBe(true);
};

const testHeaderActions = async ({ canvasElement }) => {
  const id = 'popover-header-actions';
  const root = disclosureFor(canvasElement, id);
  const trigger = summaryFor(canvasElement, id);
  await clickSummary(canvasElement, id);
  const panel = canvasElement.querySelector(`[id$="${id}"]`);
  const header = panel.querySelector(':scope > .usx-popover__header');
  await expect(header).not.toBeNull();
  await expect(header.querySelector('h2')).toHaveTextContent('Record 10482');
  const back = header.querySelector('.usx-popover__header-left-actions > button');
  await expect(back).toHaveAccessibleName('Back to records');
  await expect(
    back.compareDocumentPosition(header.querySelector('h2')) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
  const actions = header.querySelector('.usx-popover__header-right-actions > .usx-popover');
  await expect(actions).not.toBeNull();
  await userEvent.click(actions.querySelector('summary'));
  await expect(actions.open).toBe(true);
  await expect(actions.querySelector('button.usx-popover__menu-item')).toHaveTextContent(
    'Copy record'
  );
  const close = header.querySelector('[data-usx-popover-close]');
  for (const action of [back, actions.querySelector('summary'), close]) {
    await expect(action).toHaveClass('usa-button--unstyled', 'usx-popover__header-action');
    await expect(action).not.toHaveClass('usx-button--ghost');
  }
  await expect(close).toHaveAccessibleName('Close record');
  await expect(close.getAttribute('data-usx-popover-close')).toBe(panel.id);
  await userEvent.click(close);
  await expect(root.open).toBe(false);
  await expect(trigger).toHaveFocus();
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
    await step('Persistent', () => testPersistent(context));
    await step('Rounded Panel', () => testPanelShape(context, 'popover-panel-rounded', 'rounded'));
    await step('Square Panel', () => testPanelShape(context, 'popover-panel-square', 'square'));
    await step('Authored Trigger', () => testAuthoredTrigger(context));
    await step('Grouped Summary Props', () => testGroupedSummaryProps(context));
    await step('Show Close Icon', () => testShowCloseIcon(context));
    await step('Header Actions', () => testHeaderActions(context));
    await step('Menu Items', () => testMenuItems(context));
    await step('Mixed Menu Items', () => testMixedMenuItems(context));
    await step('Square Menu Items', async () => {
      await testMenuItems(context, 'popover-square-menu-items');
      await testPanelShape(context, 'popover-square-menu-items', 'square');
      const rounded = getComputedStyle(
        context.canvasElement.querySelector('[id$="popover-menu-items"]')
      );
      const square = getComputedStyle(
        context.canvasElement.querySelector('[id$="popover-square-menu-items"]')
      );
      await expect(square.paddingLeft).toBe(rounded.paddingLeft);
      await expect(parseFloat(square.paddingTop)).toBeLessThan(parseFloat(rounded.paddingTop));
      const panels = disclosureFor(
        context.canvasElement,
        'popover-square-menu-items'
      ).querySelectorAll('.usx-popover__panel');
      await expect(
        [...panels].every((panel) => panel.classList.contains('usx-popover__panel--square'))
      ).toBe(true);
    });
    await step('Worst Case', () => testWorstCase(context));
    await step('Links', () => testLinks(context));
    await step('Rich Form', () => testRichForm(context));
    await step('Heading Level Default', () => testHeadingAs(context, 'popover-heading-default', 2));
    await step('Heading Level H3', () => testHeadingAs(context, 'popover-heading-h3', 3));
    await step('Heading Level H5', () => testHeadingAs(context, 'popover-heading-h5', 5));
    await step('All Placements', () => testAllPlacements(context));
    await step('Rtl Placements', () => testRtlPlacements(context));
    await step('Long Content', () => testLongContent(context));
    await step('Responsive Composition', () => testResponsiveComposition(context));
    await step('Navigation Bar', () => testPanelShape(context, 'site-nav-services', 'square'));
  },
};

/** Static snapshots of every Django variant, with the same native disclosure behavior. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: AllVariantsReact.play,
};
