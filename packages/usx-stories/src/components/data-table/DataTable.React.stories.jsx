import React, { useEffect, useState } from 'react';
import DataTable from '../../../../usx-react/src/components/data-table/DataTable.tsx';
import Avatar from '../../../../usx-react/src/components/avatar/Avatar.tsx';
import Button from '../../../../usx-react/src/components/button/Button.tsx';
import config from '../../../../usx-react/src/components/data-table/config.json';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';
import { WIDE_TABLE_COLUMNS, WIDE_TABLE_ROWS } from '../table/wideTableData.js';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USX/DataTable',
  component: DataTable,
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  decorators: componentInit('dataTable'),
  excludeStories: ['storyDefs', 'DOCUMENTS', 'STATES', 'DOC_COLUMNS', 'STATE_COLUMNS'],
  parameters: {
    actions: { argTypesRegex: null },
    docs: {
      description: {
        component:
          'USX DataTable uses the separately loaded USWDS table base styles, with USX classes for complex data behavior. Data-driven via `columns` + `data`, with a compound component escape hatch for complex markup.',
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

const OFFICE_CASES = [
  { id: 'seattle', region: 'Pacific', office: 'Seattle', city: 'Seattle, WA', open: 48, closed: 112 },
  { id: 'portland', region: 'Pacific', office: 'Portland', city: 'Portland, OR', open: 36, closed: 91 },
  { id: 'phoenix', region: 'Southwest', office: 'Phoenix', city: 'Phoenix, AZ', open: 52, closed: 104 },
  { id: 'albuquerque', region: 'Southwest', office: 'Albuquerque', city: 'Albuquerque, NM', open: 27, closed: 73 },
  { id: 'atlanta', region: 'Southeast', office: 'Atlanta', city: 'Atlanta, GA', open: 61, closed: 130 },
  { id: 'raleigh', region: 'Southeast', office: 'Raleigh', city: 'Raleigh, NC', open: 34, closed: 88 },
];

const OFFICE_COLUMNS = [
  { key: 'office', header: 'Office', primary: true },
  { key: 'city', header: 'Location' },
  { key: 'open', header: 'Open cases', align: 'right' },
  { key: 'closed', header: 'Closed cases', align: 'right' },
];

export const storyDefs = {
  Default: config.default,
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
    columns: WIDE_TABLE_COLUMNS,
    data: WIDE_TABLE_ROWS,
    caption: 'Monthly case closures by service office, 2023–2026',
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
    columns: WIDE_TABLE_COLUMNS,
    data: WIDE_TABLE_ROWS,
    caption: 'Monthly case closures — office stays visible while scrolling',
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
    columns: STATE_COLUMNS.map((column) => ({ ...column, sortable: column.key !== 'region' })),
    data: STATES,
    caption: 'Sort selected columns; Region has no sort control',
    scrollable: true,
  },
  SortableAll: {
    id: "sortable-all",
    columns: STATE_COLUMNS.map((column) => ({ ...column, sortable: undefined })),
    data: STATES,
    caption: 'Sort any column, including Region, with sortable=true',
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
  TopAlignedSelection: {
    id: 'top-aligned-selection',
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Selection controls centered horizontally at the padded top',
    selectionMode: 'checkbox',
    selectionVerticalAlign: 'top',
  },
  GroupedRows: {
    id: "grouped-rows",
    columns: OFFICE_COLUMNS,
    data: OFFICE_CASES,
    caption: 'Illustrative regional service caseload by office',
    groupBy: {
      property: 'region',
      headers: [
        { key: 'service-area', header: 'Service area', colSpan: 2, className: 'bg-surface-3 text-ink' },
        { key: 'regional-workload', header: 'Regional case totals', colSpan: 2, className: 'bg-surface-3 text-ink' },
      ],
      rowClassName: 'bg-surface-2 text-ink',
      columns: [
        { key: 'region', header: 'Region', colSpan: 2 },
        { key: 'open', header: 'Open total', align: 'right' },
        { key: 'closed', header: 'Closed total', align: 'right' },
      ],
      values: {
        Pacific: { open: 84, closed: 203 },
        Southwest: { open: 79, closed: 177 },
        Southeast: { open: 95, closed: 218 },
      },
    },
  },
  GroupedCollapsedByDefault: {
    id: "grouped-collapsed",
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Groups collapsed by default',
    groupBy: { property: 'region', defaultExpanded: false },
  },
  SpanningCells: {
    id: 'spanning-cells',
    columns: [
      { key: 'service', header: 'Service', primary: true,
        className: 'bg-surface-2 text-ink', headerClassName: 'bg-surface-3 text-ink' },
      { key: 'location', header: 'Location' },
      { key: 'monday', header: 'Monday', width: '12rem' },
      { key: 'tuesday', header: 'Tuesday', width: '12rem' },
      { key: 'wednesday', header: 'Wednesday', width: '12rem' },
    ],
    data: [
      { id: 'permits-downtown', service: 'Permit counter', location: 'Downtown',
        monday: 'Closed for staff training', wednesday: '9 a.m.–4 p.m.',
        cellProps: { service: { rowSpan: 2, className: 'bg-primary text-inverse' },
          monday: { colSpan: 2, className: 'bg-warning text-ink' } } },
      { id: 'permits-north', service: 'Permit counter', location: 'North office',
        monday: '9 a.m.–4 p.m.', tuesday: '9 a.m.–4 p.m.', wednesday: '9 a.m.–4 p.m.' },
      { id: 'records-downtown', service: 'Records requests', location: 'Downtown',
        monday: '8 a.m.–5 p.m.', tuesday: '8 a.m.–5 p.m.', wednesday: '8 a.m.–5 p.m.',
        rowProps: { className: 'bg-surface-3 text-ink' } },
    ],
    caption: 'Public service desk hours — the Downtown permit counter is closed Monday and Tuesday',
  },
  GroupedMatrix: {
    id: 'grouped-matrix',
    columns: [
      { key: 'program', header: 'Grant program', primary: true, headerClassName: 'bg-surface-3 text-ink' },
      { key: 'cycle', header: 'Funding cycle' },
      { key: 'applications', header: 'Applications', columns: [
        { key: 'submitted', header: 'Submitted', align: 'right' },
        { key: 'approved', header: 'Approved', align: 'right', className: 'bg-surface-3 text-ink' },
      ] },
      { key: 'funding', header: 'Funding ($ millions)', columns: [
        { key: 'requested', header: 'Requested', align: 'right' },
        { key: 'awarded', header: 'Awarded', align: 'right' },
      ] },
    ],
    data: [
      { id: 'clinics', agency: 'Health and Human Services', program: 'Community health clinics', cycle: '2025', submitted: 120, approved: 86, requested: '22.4', awarded: '17.1',
        cellProps: { awarded: { className: 'bg-success text-inverse' } } },
      { id: 'outreach', agency: 'Health and Human Services', program: 'Rural outreach', cycle: '2025', submitted: 48, approved: 31, requested: '9.6', awarded: '6.3' },
      { id: 'bridges', agency: 'Transportation', program: 'Local bridge repair', cycle: '2025', submitted: 40, approved: 25, requested: '18.0', awarded: '12.5' },
      { id: 'streets', agency: 'Transportation', program: 'Safe streets', cycle: '2025', submitted: 72, approved: 49, requested: '14.2', awarded: '10.1' },
    ],
    caption: 'Illustrative 2025 grant awards by agency and program',
    groupBy: {
      property: 'agency',
      headers: [
        { key: 'portfolio', header: 'Grant portfolio', colSpan: 2, className: 'bg-surface-3 text-ink' },
        { key: 'outcomes', header: 'Fiscal year 2025 outcomes', colSpan: 4, className: 'bg-surface-3 text-ink' },
      ],
      rowClassName: 'bg-surface-2 text-ink',
      columns: [
        { key: 'agency', header: 'Agency', colSpan: 2 },
        { key: 'submitted', header: 'Submitted total', align: 'right' },
        { key: 'approved', header: 'Approved total', align: 'right' },
        { key: 'requested', header: 'Requested total ($m)', align: 'right' },
        { key: 'awarded', header: 'Awarded total ($m)', align: 'right' },
      ],
      values: {
        'Health and Human Services': { submitted: 168, approved: 117, requested: '32.0', awarded: '23.4' },
        Transportation: { submitted: 112, approved: 74, requested: '32.2', awarded: '22.6' },
      },
    },
  },
  SearchablePaginated: {
    id: 'searchable-paginated',
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Search and page through states',
    searchable: true,
    scrollable: true,
    sortable: true,
    paginate: { pageSize: 3, pageSizeOptions: [3, 6, 10] },
    placeholder: 'No matching states',
  },
  RowDetails: {
    id: 'row-details',
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'States with row details',
    rowDetails: { render: (row) => <p>{row.name} is in the {row.region} region.</p> },
  },
  Footer: {
    id: 'footer',
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'States with population total',
    showFooter: true,
  },
};

export const Default = { args: storyDefs.Default };
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

export const SortEvents = {
  name: 'Sort events',
  render: () => {
    const [sort, setSort] = useState({ key: 'name', direction: 'asc' });
    useEffect(() => {
      const update = (event) => {
        if (event.target.querySelector('table')?.id === 'sortable-events') setSort(event.detail);
      };
      document.addEventListener('usx:data-table:sort', update);
      return () => document.removeEventListener('usx:data-table:sort', update);
    }, []);
    return <div><p>Sort: {sort.key} {sort.direction}</p>
      <DataTable {...storyDefs.Sortable} id="sortable-events" sort={{ key: 'name', direction: 'asc' }} /></div>;
  },
};

export const CheckboxSelection = { args: storyDefs.CheckboxSelection };
export const CheckboxSelectionRight = { name: 'Checkbox (right)', args: storyDefs.CheckboxSelectionRight };

export const SelectionEvents = {
  name: 'Selection events',
  render: () => {
    const [selected, setSelected] = useState([1, 3]);
    useEffect(() => {
      const update = (event) => {
        if (event.target.querySelector('table')?.id === 'checkbox-events') setSelected(event.detail.selectedKeys);
      };
      document.addEventListener('usx:data-table:select', update);
      return () => document.removeEventListener('usx:data-table:select', update);
    }, []);
    return <div><p>Selected: {selected.join(', ')}</p>
      <DataTable {...storyDefs.CheckboxSelection} id="checkbox-events" select={[1, 3]} /></div>;
  },
};

export const RadioSelection = { args: storyDefs.RadioSelection };
export const DisabledRows = { args: storyDefs.DisabledRows };
export const TopAlignedSelection = { args: storyDefs.TopAlignedSelection };
export const AlignedContent = {
  name: 'Aligned content',
  args: {
    id: 'aligned-content',
    caption: 'Compact controls and avatars aligned inside padded cells',
    selectionMode: 'checkbox',
    columns: [
      { key: 'name', header: 'Person', primary: true },
      { key: 'description', header: 'Description' },
      { key: 'avatar', header: 'Avatar', align: 'center', verticalAlign: 'middle',
        render: (row) => <Avatar variant="initials" value={row.initials} alt={row.name} /> },
      { key: 'topAction', header: 'Top aligned', align: 'center',
        render: (row) => <Button variant="unstyled" aria-label={`Delete ${row.name}`} iconProps={[{ name: 'delete' }]} /> },
      { key: 'middleAction', header: 'Middle aligned', align: 'center', verticalAlign: 'middle',
        render: (row) => <Button variant="unstyled" aria-label={`Delete ${row.name}`} iconProps={[{ name: 'delete' }]} /> },
    ],
    data: [
      { id: 1, name: 'Ada Lovelace', initials: 'AL', description: 'A long description that makes this row taller than its controls.' },
      { id: 2, name: 'Grace Hopper', initials: 'GH', description: 'Another longer description to show vertical placement within a table row.' },
    ],
  },
};
export const GroupedRows = { args: storyDefs.GroupedRows };
export const GroupedCollapsedByDefault = { name: 'Grouped (collapsed)', args: storyDefs.GroupedCollapsedByDefault };
export const SpanningCells = { args: storyDefs.SpanningCells };
export const GroupedMatrix = { args: storyDefs.GroupedMatrix };
export const SearchablePaginated = { args: storyDefs.SearchablePaginated };
export const RowDetails = { args: storyDefs.RowDetails };
export const Footer = { args: storyDefs.Footer };
