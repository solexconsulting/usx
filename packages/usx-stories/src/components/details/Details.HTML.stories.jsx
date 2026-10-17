import React from 'react';
import { expect, userEvent, waitFor } from 'storybook/test';
import reactSnapshot from '../../../../usx-react/src/components/details/details.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/details/details.django-snapshot.html?raw';
import { storyDefs } from './Details.React.stories.jsx';

export default {
  title: 'HTML/USX/Details',
  tags: ['USX', 'autodocs'],
};

// Each snapshot section is an h3 heading followed by the rendered details element.
const sectionFor = (canvasElement, title) =>
  [...canvasElement.querySelectorAll('h3.site-preview-heading')].find(
    (heading) => heading.textContent === title
  ).nextElementSibling;

// Retry: visibility can lag the toggle that opens the disclosure.
const expectVisible = (element) => waitFor(() => expect(element).toBeVisible());

const testDefault = async ({ canvasElement }) => {
  const disclosure = sectionFor(canvasElement, 'Default');
  const content = disclosure.querySelector('.usx-details__content');
  await expect(disclosure).not.toHaveAttribute('open');
  await expect(disclosure.querySelector('.usx-details__text').textContent).toBe(
    storyDefs.Default.text
  );
  await expect(content).not.toBeVisible();
  const summary = disclosure.querySelector('summary');
  await userEvent.click(summary);
  await expectVisible(content);
  await userEvent.click(summary);
  await expect(content).not.toBeVisible();
};

const testRichContent = async ({ canvasElement }) => {
  const disclosure = sectionFor(canvasElement, 'Rich Content');
  const link = disclosure.querySelector('a');
  await expect(link).not.toBeVisible();
  await userEvent.click(disclosure.querySelector('summary'));
  await expectVisible(link);
  await expect(disclosure.querySelectorAll('li')).toHaveLength(2);
  await expect(disclosure.querySelector('.usx-details__text')).toBeNull();
};

const testGroupedSummaryProps = async ({ canvasElement }) => {
  const summary = sectionFor(canvasElement, 'Grouped Summary Props').querySelector('summary');
  await expect(summary).toHaveClass('usx-summary', 'marker-error', 'font-family-mono');
  await expect(summary.querySelector('.usx-summary-text')).toHaveClass(
    'usx-summary-text',
    'border-secondary',
    'text-bold'
  );
  await expect(summary).toHaveTextContent('Summary configured through summaryProps');
};

const testNestedDetails = async ({ canvasElement }) => {
  const root = sectionFor(canvasElement, 'Nested Details');
  const disclosures = [root, ...root.querySelectorAll('details.usx-details')];
  await expect(disclosures).toHaveLength(4);
  for (const disclosure of disclosures) {
    const content = disclosure.querySelector(':scope > .usx-details__content');
    const summary = disclosure.querySelector(':scope > summary');
    const summaryText = summary.querySelector(':scope > .usx-summary-text');
    const borderless = disclosure.classList.contains('usx-details--borderless');
    const noUnderline = summary.classList.contains('usx-summary--no-underline');
    await expect(getComputedStyle(content).borderLeftStyle).toBe(borderless ? 'none' : 'solid');
    await expect(getComputedStyle(summaryText).borderBottomStyle).toBe(
      noUnderline ? 'none' : 'dotted'
    );
  }
};

const play = async (context) => {
  const step = (name, fn) => context.step(name, () => fn(context));
  await step('Default', testDefault);
  await step('Rich Content', testRichContent);
  await step('Grouped Summary Props', testGroupedSummaryProps);
  await step('Nested Details', testNestedDetails);
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
