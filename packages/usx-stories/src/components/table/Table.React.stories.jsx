import React, { useState } from 'react';
import Table from '../../../../core/src/components/table/Table.tsx';
import config from '../../../../core/src/components/table/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Table',
  component: Table,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs', 'DOCUMENTS', 'STATES', 'DOC_COLUMNS', 'STATE_COLUMNS'],
  parameters: {
    actions: { argTypesRegex: null },
    docs: {
      description: {
        component:
          'USX Table component. Data-driven via `columns` + `data`, with a compound component escape hatch for complex markup.',
      },
    },
  },
};

// ─── Shared sample data ────────────────────────────────────────────────────────

export const DOCUMENTS = [
  { id: 1, title: 'Declaration of Independence', description: 'Statement adopted by the Continental Congress declaring independence from the British Empire.', year: 1776 },
  { id: 2, title: 'Bill of Rights', description: 'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.', year: 1791 },
  { id: 3, title: 'Declaration of Sentiments', description: 'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.', year: 1848 },
  { id: 4, title: 'Emancipation Proclamation', description: 'An executive order granting freedom to slaves in designated southern states.', year: 1863 },
];

export const DOC_COLUMNS = [
  { key: 'title', header: 'Document title', primary: true },
  { key: 'description', header: 'Description' },
  { key: 'year', header: 'Year', align: 'right' },
];

export const STATES = [
  { id: 1, name: 'Hawaii', order: 50, region: 'Pacific', population: 632772 },
  { id: 2, name: 'Alaska', order: 49, region: 'Pacific', population: 226167 },
  { id: 3, name: 'Arizona', order: 48, region: 'Southwest', population: 204354 },
  { id: 4, name: 'New Mexico', order: 47, region: 'Southwest', population: 327301 },
  { id: 5, name: 'Oklahoma', order: 46, region: 'South', population: 1657155 },
  { id: 6, name: 'Utah', order: 45, region: 'West', population: 210779 },
];

export const STATE_COLUMNS = [
  { key: 'name', header: 'State', primary: true, sortable: true },
  { key: 'order', header: 'Order admitted', align: 'right', sortable: true, width: '8rem' },
  { key: 'region', header: 'Region', sortable: true },
  {
    key: 'population',
    header: 'Population at admission',
    align: 'right',
    sortable: true,
    render: (row) => row.population.toLocaleString(),
    aggregate: 'sum',
    footer: (data) => data.reduce((s, r) => s + r.population, 0).toLocaleString(),
  },
];

export const storyDefs = {
  Standard: {
    id: "standard",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Historic U.S. documents',
  },
  Striped: {
    id: "striped",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Striped table',
    striped: true,
  },
  Borderless: {
    id: "borderless",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Borderless table',
    borderless: true,
  },
  Compact: {
    id: "compact",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Compact table',
    compact: true,
  },
  ScrollableHorizontal: {
    id: "scrollable-horizontal",
    columns: [...STATE_COLUMNS, { key: 'extraA', header: 'Extra A', render: () => 'Lorem ipsum' }, { key: 'extraB', header: 'Extra B', render: () => 'Dolor sit' }],
    data: STATES,
    caption: 'Horizontally scrollable table',
    scrollable: true,
  },
  ScrollableVertical: {
    id: "scrollable-vertical",
    columns: DOC_COLUMNS,
    data: [...DOCUMENTS, ...DOCUMENTS, ...DOCUMENTS],
    caption: 'Vertically scrollable with sticky header',
    stickyHeader: true,
    height: '250px',
  },
  StickyFirstColumn: {
    id: "sticky-first-column",
    columns: [{ key: 'name', header: 'State', primary: true }, ...Array.from({ length: 8 }, (_, i) => ({ key: `col${i}`, header: `Column ${i + 1}`, render: () => 'Data value' }))],
    data: STATES,
    caption: 'Sticky first column',
    scrollable: true,
    stickyFirstColumn: true,
  },
  ResponsiveStacked: {
    id: "responsive-stacked",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Stacked on mobile',
    responsive: 'stack',
  },
  ResponsiveStackedHeader: {
    id: "responsive-stacked-header",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Stacked with header on mobile',
    responsive: 'stack-header',
  },
  Sortable: {
    id: "sortable",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Sortable table — click column headers',
    scrollable: true,
  },
  SortableAll: {
    id: "sortable-all",
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'All columns sortable via sortable prop',
    sortable: true,
  },
  CheckboxSelection: {
    id: "checkbox-selection",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Multi-select with checkboxes',
    selectionMode: 'checkbox',
    allowSelectAll: true,
  },
  CheckboxSelectionRight: {
    id: "checkbox-selection-right",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Checkboxes on the right',
    selectionMode: 'checkbox',
    selectionPosition: 'right',
  },
  RadioSelection: {
    id: "radio-selection",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Single-select with radio buttons',
    selectionMode: 'radio',
  },
  DisabledRows: {
    id: "disabled-rows",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Rows 2 and 4 are disabled',
    selectionMode: 'checkbox',
    disabled: [2, 4],
  },
  GroupedRows: {
    id: "grouped-rows",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'States grouped by region',
    groupBy: 'region',
  },
  GroupedCollapsedByDefault: {
    id: "grouped-collapsed",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Groups collapsed by default',
    groupBy: { property: 'region', defaultExpanded: false },
  },
};

export const Standard = { args: storyDefs.Standard };
export const Striped = { args: storyDefs.Striped };
export const Borderless = { args: storyDefs.Borderless };
export const Compact = { args: storyDefs.Compact };
export const ScrollableHorizontal = { name: 'Scrollable (horizontal)', args: storyDefs.ScrollableHorizontal };
export const ScrollableVertical = { name: 'Scrollable (vertical)', args: storyDefs.ScrollableVertical };
export const StickyFirstColumn = { args: storyDefs.StickyFirstColumn };
export const ResponsiveStacked = { args: storyDefs.ResponsiveStacked };
export const ResponsiveStackedHeader = { args: storyDefs.ResponsiveStackedHeader };
export const Sortable = { args: storyDefs.Sortable };
export const SortableAll = { name: 'Sortable (all columns)', args: storyDefs.SortableAll };

export const SortableControlled = {
  name: 'Sortable (controlled)',
  render: () => {
    const [sort, setSort] = useState({ key: 'name', direction: 'asc' });
    return <div><p>Sort: {sort.key} {sort.direction}</p><Table {...storyDefs.Sortable} sort={sort} onSort={setSort} /></div>;
  },
};

export const CheckboxSelection = { args: storyDefs.CheckboxSelection };
export const CheckboxSelectionRight = { name: 'Checkbox (right)', args: storyDefs.CheckboxSelectionRight };

export const CheckboxControlled = {
  name: 'Checkbox (controlled)',
  render: () => {
    const [selected, setSelected] = useState([1, 3]);
    return <div><p>Selected: {selected.join(', ')}</p><Table {...storyDefs.CheckboxSelection} select={selected} onSelect={setSelected} /></div>;
  },
};

export const RadioSelection = { args: storyDefs.RadioSelection };
export const DisabledRows = { args: storyDefs.DisabledRows };
export const GroupedRows = { args: storyDefs.GroupedRows };
export const GroupedCollapsedByDefault = { name: 'Grouped (collapsed)', args: storyDefs.GroupedCollapsedByDefault };
