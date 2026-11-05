import React from 'react';
import Table from '../../../../usx-react/src/components/table/Table.tsx';
import config from '../../../../usx-react/src/components/table/config.json';
import { buildArgTypes, componentInit, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { WIDE_TABLE_COLUMNS, WIDE_TABLE_ROWS } from './wideTableData.js';

const REQUEST_TYPES = ['Records search', 'Permit copy', 'License history', 'Inspection report'];
const REQUEST_OFFICES = ['Seattle', 'Portland', 'Phoenix', 'Albuquerque', 'Atlanta', 'Raleigh'];
const STICKY_ROWS = Array.from({ length: 36 }, (_, index) => ({
  request: `${REQUEST_TYPES[index % REQUEST_TYPES.length]} #${1201 + index}`,
  office: REQUEST_OFFICES[index % REQUEST_OFFICES.length],
  received: `2025-${String(1 + Math.floor(index / 3)).padStart(2, '0')}-${String(1 + index % 28).padStart(2, '0')}`,
}));

export const storyDefs = {
  Default: config.default,
  Unenhanced: { ...config.default, id: 'table-unenhanced', columns: config.default.columns.map((column) => ({ ...column, sortable: true })), extraAttributes: { 'data-enhanced': 'true' } },
  Striped: { ...config.default, caption: 'Striped table', striped: true },
  Borderless: { ...config.default, caption: 'Borderless table', borderless: true },
  Compact: { ...config.default, caption: 'Compact table', compact: true },
  Scrollable: { columns: WIDE_TABLE_COLUMNS, data: WIDE_TABLE_ROWS,
    caption: 'Monthly case closures by service office, 2023–2026', scrollable: true },
  Stacked: { ...config.default, caption: 'Stacked table', responsive: 'stack' },
  StackedHeader: { ...config.default, caption: 'Stacked header table', responsive: 'stack-header' },
  StickyHeader: {
    columns: [
      { key: 'request', header: 'Public records request', primary: true },
      { key: 'office', header: 'Service office' },
      { key: 'received', header: 'Date received' },
    ],
    data: STICKY_ROWS,
    caption: 'Public records requests — scroll to keep headings visible',
    stickyHeader: true,
    scrollable: true,
    scrollHeight: '18rem',
  },
  Sortable: { ...config.default, caption: 'Sortable table', columns: config.default.columns.map((column) => ({ ...column, sortable: true })) },
};

export default {
  title: 'React/USWDS/Table',
  component: Table,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props),
  excludeStories: ['storyDefs', 'Unenhanced'],
  decorators: componentInit('table'),
  parameters: { docs: { description: { component: `USWDS table variants with USX theme colors. ${uswdsInitNote('table.init()')}` } } },
};

export const Default = { args: storyDefs.Default };
export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'Every row remains readable in its original order. Column sorting requires the USWDS table script.' } } } };
export const Striped = { args: storyDefs.Striped };
export const Borderless = { args: storyDefs.Borderless };
export const Compact = { args: storyDefs.Compact };
export const Scrollable = { args: storyDefs.Scrollable };
export const Stacked = { args: storyDefs.Stacked };
export const StackedHeader = { args: storyDefs.StackedHeader };
export const StickyHeader = { args: storyDefs.StickyHeader };
export const Sortable = { args: storyDefs.Sortable };
