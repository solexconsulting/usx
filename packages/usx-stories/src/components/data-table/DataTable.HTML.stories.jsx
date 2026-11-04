import React from 'react';
import markup from '../../../../usx-react/src/components/data-table/data-table.html?raw';
import reactSnapshot from '../../../../usx-react/src/components/data-table/data-table.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/data-table/data-table.django-snapshot.html?raw';
import { expect, userEvent, waitFor } from 'storybook/test';
import { componentInit } from '../../utils/storyHelpers.jsx';
import { sectionElements } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USX/DataTable',
  tags: ['USX', 'autodocs'],
  decorators: componentInit('dataTable'),
  parameters: { docs: { description: { component: 'Static HTML reference enhanced by the USX data-table initializer.' } } },
};

export const Default = {
  parameters: { docs: { source: { code: markup } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: markup }} />,
};

const findInSection = (canvas, title, selector) =>
  sectionElements(canvas, title)
    .map((element) => element.matches(selector) ? element : element.querySelector(selector))
    .find(Boolean);

const tableFor = (canvas, title) => findInSection(canvas, title, 'table.usx-data-table');

const checkMarkup = async ({ canvasElement, step }) => {
  await waitFor(() => expect(document.body).toHaveAttribute('data-usx-ready', 'true'));

  await step('Table layout and scrolling', async () => {
    await expect(tableFor(canvasElement, 'Default').querySelectorAll('tbody .usx-data-table__row')).toHaveLength(4);
    for (const [title, modifier] of [
      ['Striped', 'usx-data-table--striped'],
      ['Borderless', 'usx-data-table--borderless'],
      ['Compact', 'usx-data-table--compact'],
      ['Responsive Stacked', 'usx-data-table--stacked'],
      ['Responsive Stacked Header', 'usx-data-table--stacked-header'],
    ]) {
      await expect(tableFor(canvasElement, title)).toHaveClass(modifier);
    }
    for (const title of ['Scrollable (horizontal)', 'Scrollable (vertical)', 'Searchable Paginated']) {
      await expect(findInSection(canvasElement, title, '.usx-data-table-container--scrollable')).toHaveAttribute('tabindex', '0');
    }
    for (const title of ['Scrollable (horizontal)', 'Sticky First Column']) {
      const table = tableFor(canvasElement, title);
      const container = findInSection(canvasElement, title, '.usx-data-table-container--scrollable');
      await expect(table.querySelectorAll('thead th')).toHaveLength(50);
      await expect(container.scrollWidth).toBeGreaterThan(container.clientWidth);
    }
    await expect(tableFor(canvasElement, 'Sticky First Column')).toHaveClass('usx-data-table--sticky-first-col');
  });

  await step('Selection uses USX controls', async () => {
    const checkboxTable = tableFor(canvasElement, 'Checkbox Selection');
    await expect(checkboxTable.querySelectorAll('.usx-checkbox.usx-checkbox--small')).toHaveLength(7);
    await expect(checkboxTable.querySelector('.usa-form-group')).toBeNull();
    await expect(tableFor(canvasElement, 'Radio Selection').querySelectorAll('.usx-radio--small')).toHaveLength(6);
  });

  await step('Grouped headers and spanning cells', async () => {
    const groups = tableFor(canvasElement, 'Grouped Rows');
    await expect(groups.querySelectorAll('thead tr')).toHaveLength(2);
    await expect(groups.querySelector('thead tr:first-child')).toHaveTextContent('Regional case totals');
    await expect(groups.querySelector('thead tr:first-child')).not.toHaveTextContent('Open cases');
    const groupRow = groups.querySelector('.usx-data-table__group-row');
    await expect(groupRow.cells.length).toBeGreaterThan(1);
    await expect(groupRow).toHaveClass('bg-surface-2', 'text-ink');
    for (const cell of groupRow.cells) {
      await expect(getComputedStyle(cell).backgroundColor).toBe(getComputedStyle(groupRow).backgroundColor);
    }

    const matrix = tableFor(canvasElement, 'Grouped Matrix');
    await expect(matrix.querySelectorAll('thead tr')).toHaveLength(3);
    await expect(matrix.querySelector('thead tr:first-child')).toHaveTextContent('Fiscal year 2025 outcomes');
    await expect(matrix.querySelector('thead tr:first-child')).not.toHaveTextContent('Submitted');
    const matrixGroup = matrix.querySelector('.usx-data-table__group-row');
    for (const cell of matrixGroup.cells) {
      await expect(getComputedStyle(cell).backgroundColor).toBe(getComputedStyle(matrixGroup).backgroundColor);
    }

    const spanning = tableFor(canvasElement, 'Spanning Cells');
    const service = spanning.querySelector('tbody [rowspan="2"]');
    await expect(service).toHaveClass('bg-primary', 'text-inverse');
    await expect(service).not.toHaveClass('bg-surface-2');
    await expect(spanning.querySelector('tbody [colspan="2"]')).toHaveClass('bg-warning', 'text-ink');
    await expect(spanning.querySelector('tbody tr.usx-data-table__row.bg-surface-3')).toBeTruthy();
    await expect(spanning.querySelector('tbody [data-column-key="service"]:not([rowspan])')).toHaveClass('bg-surface-2', 'text-ink');
  });

  await step('Column sorting and table-wide sorting differ', async () => {
    const selective = tableFor(canvasElement, 'Sortable');
    const all = tableFor(canvasElement, 'Sortable (all columns)');
    await expect(selective.querySelector('th[data-column-key="region"] .usx-data-table__sort-button')).toBeNull();
    await expect(all.querySelector('th[data-column-key="region"] .usx-data-table__sort-button')).toBeTruthy();
    await expect(selective.querySelectorAll('th[data-usx-sortable]')).toHaveLength(3);
    await expect(all.querySelectorAll('th[data-usx-sortable]')).toHaveLength(4);
  });

  await step('Event and alignment examples render in both snapshot flavors', async () => {
    const sortEvents = tableFor(canvasElement, 'Sort events');
    const selectionEvents = tableFor(canvasElement, 'Selection events');
    const aligned = tableFor(canvasElement, 'Aligned content');
    await expect(sortEvents.querySelector('th[data-column-key="name"]')).toHaveAttribute('aria-sort', 'ascending');
    await expect(selectionEvents.querySelectorAll('tbody input[type="checkbox"]:checked')).toHaveLength(2);
    await expect(aligned.querySelector('tbody .usx-data-table__cell--align-center.usx-data-table__cell--valign-middle')).toBeTruthy();
  });

  await step('Details, search, and paging markup', async () => {
    const details = tableFor(canvasElement, 'Row Details');
    const toggle = details.querySelector('.usx-data-table__detail-toggle');
    await expect(toggle).toHaveClass('usa-button');
    await expect(toggle.querySelector('use').getAttribute('href')).toMatch(/#expand_more$/);
    await expect(details.querySelector(`[id="${toggle.getAttribute('aria-controls')}"]`)).toBeTruthy();
    await expect(findInSection(canvasElement, 'Searchable Paginated', '.usx-data-table__toolbar input')).toBeTruthy();
    await expect(findInSection(canvasElement, 'Searchable Paginated', '.usx-data-table__pagination')).toBeTruthy();
  });
};

const checkBehavior = async ({ canvasElement, step }) => {
  await step('Sorting changes row order', async () => {
    const table = tableFor(canvasElement, 'Sortable');
    const sortEvents = [];
    table.closest('[data-usx-data-table]').addEventListener('usx:data-table:sort', (event) => sortEvents.push(event.detail));
    const header = table.querySelector('th[data-column-key="name"]');
    const button = header.querySelector('.usx-data-table__sort-button');
    await expect(button).toBeTruthy();
    await userEvent.click(button);
    await expect(header).toHaveAttribute('aria-sort', 'ascending');
    await expect(table.querySelector('tbody .usx-data-table__row:first-child th')).toHaveTextContent('Alaska');
    await userEvent.click(button);
    await expect(header).toHaveAttribute('aria-sort', 'descending');
    await expect(table.querySelector('tbody .usx-data-table__row:first-child th')).toHaveTextContent('Utah');
    await userEvent.click(button);
    await expect(header).not.toHaveAttribute('aria-sort');
    await expect(table.querySelector('tbody .usx-data-table__row:first-child th')).toHaveTextContent('Hawaii');
    await expect(sortEvents.map((event) => event.direction)).toEqual(['asc', 'desc', null]);
  });

  await step('Partial selection updates select-all', async () => {
    const table = tableFor(canvasElement, 'Checkbox Selection');
    const selected = [];
    table.closest('[data-usx-data-table]').addEventListener('usx:data-table:select', (event) => selected.push(event.detail.selectedKeys));
    const first = table.querySelector('tbody input[type="checkbox"]');
    const all = table.querySelector('thead input[type="checkbox"]');
    await userEvent.click(table.querySelector(`label[for="${first.id}"]`));
    await expect(first).toBeChecked();
    await expect(all.indeterminate).toBe(true);
    await expect(selected[0]).toContain(first.value);
    await userEvent.click(table.querySelector(`label[for="${all.id}"]`));
    await expect(all).toBeChecked();
    await expect(all.indeterminate).toBe(false);
  });

  await step('Search and pagination keep the toolbar still', async () => {
    const table = tableFor(canvasElement, 'Searchable Paginated');
    const toolbar = findInSection(canvasElement, 'Searchable Paginated', '.usx-data-table__toolbar');
    const pagination = findInSection(canvasElement, 'Searchable Paginated', '.usx-data-table__pagination');
    const scroll = findInSection(canvasElement, 'Searchable Paginated', '.usx-data-table-container--scrollable');
    await expect(scroll.contains(toolbar)).toBe(false);
    await expect(scroll.contains(pagination)).toBe(false);
    await expect(table.querySelectorAll('tbody .usx-data-table__row:not([hidden])')).toHaveLength(3);
    await userEvent.click(pagination.querySelector('.usa-pagination__next-page'));
    await expect(table.querySelector('tbody .usx-data-table__row:not([hidden]) th')).toHaveTextContent('New Mexico');
    await userEvent.type(toolbar.querySelector('input'), 'Alaska');
    await expect(table.querySelectorAll('tbody .usx-data-table__row:not([hidden])')).toHaveLength(1);
    await expect(pagination.querySelector('.usx-pagination__summary')).toHaveTextContent('1 of 1');
  });

  await step('Group and detail buttons control their rows', async () => {
    const groupTable = tableFor(canvasElement, 'Grouped (collapsed)');
    const groupButton = groupTable.querySelector('.usx-data-table__group-toggle');
    const groupContent = groupTable.querySelector(`[id="${groupButton.getAttribute('aria-controls')}"]`);
    await expect(groupButton).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(groupButton);
    await expect(groupButton).toHaveAttribute('aria-expanded', 'true');
    await expect(groupContent).not.toHaveAttribute('hidden');

    const details = tableFor(canvasElement, 'Row Details');
    const detailButton = details.querySelector('.usx-data-table__detail-toggle');
    const panel = details.querySelector(`[id="${detailButton.getAttribute('aria-controls')}"]`);
    await expect(panel).toHaveAttribute('hidden');
    await userEvent.click(detailButton);
    await expect(detailButton).toHaveAttribute('aria-expanded', 'true');
    await expect(panel).not.toHaveAttribute('hidden');
  });
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: { docs: { source: { code: reactSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
  play: async (context) => {
    await checkMarkup(context);
    await checkBehavior(context);
  },
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: { docs: { source: { code: djangoSnapshot } } },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
  play: async (context) => {
    await checkMarkup(context);
    await checkBehavior(context);
  },
};
