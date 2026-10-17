import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/tree/tree.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/tree/tree.django-snapshot.html?raw';
import ReactMeta from './Tree.React.stories.jsx';

export default {
  title: 'HTML/USX/Tree',
  tags: ['USX', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: ReactMeta.parameters.docs.description.component,
      },
    },
  },
};

// Each snapshot section is an h3 heading followed by its rendered markup.
const sectionFor = (canvasElement, title) =>
  [...canvasElement.querySelectorAll('h3.site-preview-heading')].find(
    (heading) => heading.textContent === title
  ).nextElementSibling;

// Retry: visibility can lag the toggle that opens the disclosure.
const expectVisible = (element) => waitFor(() => expect(element).toBeVisible());

const summaryOf = (details) => details.querySelector(':scope > summary');

const textStart = (element) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  return range.getBoundingClientRect().left;
};

const testDefault = async ({ canvasElement }) => {
  const list = sectionFor(canvasElement, 'Default');
  const canvas = within(list);
  const branch = canvas.getByText('More application services').closest('details');
  const summary = summaryOf(branch);
  const nestedLink = list.querySelector('a[href="#renew-application"]');
  const detailsLeaf = canvas.getByText('About these services').closest('details');
  const emptyBranch = canvas.getByText('Coming soon').closest('details');

  await expect(list).toHaveClass('usx-tree--raw');
  await expect(canvas.getByText('Applications').tagName).toBe('SPAN');
  await expect(canvas.getByText('Applications')).toHaveClass('usx-tree__label');
  await expect(list.querySelectorAll(':scope > li')).toHaveLength(5);
  await expect(canvas.getByRole('link', { name: 'Check application status' })).toBeVisible();
  await expect(summary).toHaveAccessibleName('More application services');
  // The story data gives "Coming soon" a single text item.
  await expect(emptyBranch.querySelectorAll('li')).toHaveLength(1);
  await expect(detailsLeaf.querySelector('ul')).toBeNull();
  await expect(list.querySelector('[role="tree"], [role="menu"], [role="treeitem"]')).toBeNull();
  await expect(nestedLink).not.toBeVisible();

  await userEvent.click(summary);
  await expect(branch).toHaveAttribute('open');
  await expectVisible(nestedLink);
  await userEvent.click(summary);
  await expect(branch).not.toHaveAttribute('open');
  await expect(nestedLink).not.toBeVisible();
  await userEvent.click(summaryOf(emptyBranch));
  await expect(emptyBranch).toHaveAttribute('open');
  await userEvent.click(summaryOf(detailsLeaf));
  await expectVisible(canvas.getByText('Find applications and support here.'));
};

const testRaw = async ({ canvasElement }) => {
  const list = sectionFor(canvasElement, 'Raw');
  await expect(list).toHaveClass('usx-tree--raw');
  await expect(list).not.toHaveClass('usx-tree--padded');
  await expect(within(list).getByText('Applications')).toHaveClass('usx-tree__label');
};

const testPadded = async ({ canvasElement }) => {
  const list = sectionFor(canvasElement, 'Padded');
  const canvas = within(list);
  const label = await canvas.findByText('Applications');
  const link = canvas.getByRole('link', { name: 'Check application status' });
  const summary = canvas.getByText('More services').closest('summary');
  const branch = summary.closest('details');

  await expect(list).toHaveClass('usx-tree--padded');
  await expect(label).toHaveClass('usx-tree__label');
  await expect(label.parentElement.tagName).toBe('LI');
  await expect(link.getBoundingClientRect().width).toBeCloseTo(
    link.parentElement.getBoundingClientRect().width,
    0
  );
  await expect(summary.getBoundingClientRect().width).toBeCloseTo(
    summary.closest('li').getBoundingClientRect().width,
    0
  );
  await expect(textStart(label)).toBeCloseTo(textStart(link), 0);
  // The summary marker precedes .usx-summary-text, so align with the summary content edge.
  await expect(textStart(label)).toBeCloseTo(
    summary.getBoundingClientRect().left + parseFloat(getComputedStyle(summary).paddingLeft),
    0
  );

  await userEvent.click(summary);
  await expect(branch).toHaveAttribute('open');
  await expect(branch.querySelector('ul.usx-tree')).toHaveClass('usx-tree--padded');
  const nestedLabel = canvas.getByText('Forms');
  const nestedLink = canvas.getByRole('link', { name: 'Renew an application' });
  await expect(nestedLabel).toHaveClass('usx-tree__label');
  await expectVisible(nestedLink);
  await expect(textStart(nestedLabel)).toBeCloseTo(textStart(nestedLink), 0);
};

const testNestedGroups = async ({ canvasElement }) => {
  const canvas = within(sectionFor(canvasElement, 'Nested Groups'));
  const programs = canvas.getByText('Programs').closest('details');
  const housing = canvas.getByText('Housing').closest('details');
  const benefits = canvas.getByText('Benefits').closest('details');
  const services = canvas.getByText('Services').closest('details');

  await expect(programs.contains(housing)).toBe(true);
  await expect(housing.querySelector('a[href="#housing-support"]')).not.toBeNull();

  await userEvent.click(summaryOf(programs));
  await userEvent.click(summaryOf(housing));
  await expect(housing).toHaveAttribute('open');
  await userEvent.click(summaryOf(benefits));
  await expect(housing).not.toHaveAttribute('open');
  await expect(benefits).toHaveAttribute('open');
  await expect(programs).toHaveAttribute('open');
  await userEvent.click(summaryOf(services));
  await expect(programs).not.toHaveAttribute('open');
  await expect(services).toHaveAttribute('open');
};

const testResidentServices = async ({ canvasElement }) => {
  const canvas = within(sectionFor(canvasElement, 'Resident Services'));
  await canvas.findByRole('link', { name: 'All resident services' });
  await expect(canvas.getByRole('navigation', { name: 'Resident services' })).toBeVisible();
  // The snapshot renders every branch closed, so open the housing path first.
  await userEvent.click(canvas.getByText('Housing and neighborhoods').closest('summary'));
  await userEvent.click(canvas.getByText('Help with housing costs').closest('summary'));
  await expectVisible(canvas.getByRole('link', { name: 'Apply for rental assistance' }));
  await userEvent.click(canvas.getByText('Transportation').closest('summary'));
  await expectVisible(canvas.getByRole('link', { name: 'Reduced fare transit passes' }));
  await expectVisible(canvas.getByRole('link', { name: 'Apply for rental assistance' }));
};

const testServiceDirectory = async ({ canvasElement }) => {
  const canvas = within(sectionFor(canvasElement, 'Service Directory'));
  await canvas.findByText('Popular services');
  await expect(canvas.getByText('Permits and licenses').tagName).toBe('SPAN');
  await userEvent.click(canvas.getByText('Start or grow a business'));
  await expectVisible(canvas.getByRole('link', { name: 'Apply for a business license' }));
  await userEvent.click(canvas.getByText('Before you apply'));
  await expectVisible(canvas.getByText(/Have your business address/));
};

const testDocumentLibrary = async ({ canvasElement }) => {
  const canvas = within(sectionFor(canvasElement, 'Document Library'));
  await canvas.findByRole('link', { name: 'Adopted budget (PDF, 2.4 MB)' });
  // The snapshot renders every branch closed, so open the budget years first.
  await userEvent.click(canvas.getByText('Budget and financial reports'));
  await userEvent.click(canvas.getByText('Fiscal year 2026'));
  await userEvent.click(canvas.getByText('Fiscal year 2025'));
  await expectVisible(canvas.getByRole('link', { name: 'Spending data (CSV, 320 KB)' }));
  await userEvent.click(canvas.getByText('Meeting records'));
  await userEvent.click(canvas.getByText('Planning commission'));
  await expectVisible(canvas.getByRole('link', { name: 'October meeting agenda (HTML)' }));
  await expectVisible(canvas.getByRole('link', { name: 'Adopted budget (PDF, 2.4 MB)' }));
};

const testApplicationHelp = async ({ canvasElement }) => {
  const canvas = within(sectionFor(canvasElement, 'Application Help'));
  await canvas.findByText(/Your application number is in the confirmation email/);
  await userEvent.click(canvas.getByText('Uploading supporting documents'));
  const summary = canvas.getByText('What if I do not have a scanner?').closest('summary');
  await userEvent.click(summary);
  await expectVisible(canvas.getByText(/You can use a clear photo/));
};

/** Static snapshots of every React variant, with the same native disclosure behavior. */
const play = async (context) => {
  const step = (name, fn) => context.step(name, () => fn(context));
  await step('Default', testDefault);
  await step('Raw', testRaw);
  await step('Padded', testPadded);
  await step('Nested Groups', testNestedGroups);
  await step('Resident Services', testResidentServices);
  await step('Service Directory', testServiceDirectory);
  await step('Document Library', testDocumentLibrary);
  await step('Application Help', testApplicationHelp);
};

/** Static snapshot of every React variant, with the same native disclosure behavior. */
export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

/** Static snapshot of every Django variant, with the same native disclosure behavior. */
export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
