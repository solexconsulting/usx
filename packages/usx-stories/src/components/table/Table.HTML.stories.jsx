import React from 'react';
import markup from '../../../../usx-react/src/components/table/table.html?raw';
import reactSnapshot from '../../../../usx-react/src/components/table/table.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/table/table.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { componentInit } from '../../utils/storyHelpers.jsx';
import { sectionFor } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/Table',
  tags: ['USWDS', 'autodocs'],
  decorators: componentInit('table'),
  parameters: { docs: { description: { component: 'Canonical USWDS table markup with USX theme colors.' } } },
};

export const Default = {
  parameters: { docs: { source: { code: markup } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: markup }} />,
};

const tableFor = (canvas, title) => {
  const section = sectionFor(canvas, title);
  return section.matches('table') ? section : section.querySelector('table');
};

const play = async ({ canvasElement, step }) => {
  await waitFor(() => expect(document.body).toHaveAttribute('data-usx-ready', 'true'));

  await step('USWDS table variants', async () => {
    await expect(tableFor(canvasElement, 'Default').querySelectorAll('tbody tr')).toHaveLength(3);
    for (const [title, modifier] of [
      ['Striped', 'usa-table--striped'],
      ['Borderless', 'usa-table--borderless'],
      ['Compact', 'usa-table--compact'],
      ['Stacked', 'usa-table--stacked'],
      ['Stacked Header', 'usa-table--stacked-header'],
      ['Sticky Header', 'usa-table--sticky-header'],
    ]) {
      await expect(tableFor(canvasElement, title)).toHaveClass(modifier);
    }
    for (const title of ['Scrollable', 'Sticky Header']) {
      await expect(sectionFor(canvasElement, title)).toHaveClass('usa-table-container--scrollable');
    }
    const wide = sectionFor(canvasElement, 'Scrollable');
    await expect(tableFor(canvasElement, 'Scrollable').querySelectorAll('thead th')).toHaveLength(50);
    await expect(wide.scrollWidth).toBeGreaterThan(wide.clientWidth);

    const sticky = sectionFor(canvasElement, 'Sticky Header');
    const stickyTable = tableFor(canvasElement, 'Sticky Header');
    await expect(sticky.style.height).toBe('18rem');
    await expect(sticky.style.overflow).toBe('auto');
    await expect(stickyTable.querySelectorAll('tbody tr')).toHaveLength(36);
    await expect(sticky.scrollHeight).toBeGreaterThan(sticky.clientHeight);
    sticky.scrollTop = 120;
    await waitFor(() => expect(Math.abs(stickyTable.tHead.getBoundingClientRect().top - sticky.getBoundingClientRect().top)).toBeLessThan(4));
  });

  await step('USWDS sorting', async () => {
    const table = tableFor(canvasElement, 'Sortable');
    const titleHeader = table.querySelector('thead th[data-sortable]');
    await waitFor(() => expect(titleHeader.querySelector('.usa-table__header__button')).toBeTruthy());
    const button = titleHeader.querySelector('.usa-table__header__button');
    await userEvent.click(button);
    await expect(titleHeader).toHaveAttribute('aria-sort', 'ascending');
    await expect(table.querySelector('tbody tr:first-child th')).toHaveTextContent('Bill of Rights');
    await userEvent.click(button);
    await expect(titleHeader).toHaveAttribute('aria-sort', 'descending');
    await expect(table.querySelector('tbody tr:first-child th')).toHaveTextContent('Emancipation Proclamation');
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play,
};
