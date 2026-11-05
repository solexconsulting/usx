import DataTable from '../../../../usx-react/src/components/data-table/DataTable.tsx';
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
  excludeStories: ['storyDefs', 'DOCUMENTS', 'STATES', 'DOC_COLUMNS', 'STATE_COLUMNS', 'Unenhanced'],
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
  { key: 'name', header: 'State', primary: true },
  { key: 'order', header: 'Order admitted', align: 'right', width: '8rem' },
  { key: 'region', header: 'Region' },
  {
    key: 'population',
    header: 'Population at admission',
    align: 'right',
    aggregate: 'sum',
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
  Unenhanced: {
    id: 'data-table-unenhanced', columns: DOC_COLUMNS, data: DOCUMENTS,
    caption: 'Records without JavaScript', searchable: true, sortable: true,
    extraAttributes: { 'usx-data-enhanced': 'true' },
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
    columns: STATE_COLUMNS.map((column, index) => ({ ...column, sortable: index === 0 })),
    data: STATES,
    caption: 'Sort first column',
    scrollable: true,
  },
  SortableAll: {
    id: "sortable-all",
    columns: STATE_COLUMNS.map((column) => ({ ...column, sortable: true })),
    data: STATES,
    caption: 'Sort any column',
    sortable: true,
  },
  InitialSortDescending: {
    id: 'initial-sort-descending',
    columns: STATE_COLUMNS.map((column) => ({ ...column, sortable: true })),
    data: STATES,
    caption: 'States initially sorted by the first column, State, in descending order',
    sort: { key: 'name', direction: 'desc' },
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
    rowDetails: { render: (row) => `${row.name} is in the ${row.region} region.` },
  },
  Footer: {
    id: 'footer',
    columns: STATE_COLUMNS.map((column) => column.key === 'name' ? { ...column, footer: 'Total' } : column),
    data: STATES,
    caption: 'States with population total',
    showFooter: true,
  },
  FooterStatic: {
    id: 'footer-static',
    columns: [
      { key: 'program', header: 'Program', primary: true, footer: 'FY 2026 budget' },
      { key: 'allocation', header: 'Approved allocation', align: 'right', footer: '$8.5M appropriated' },
    ],
    data: [
      { id: 'parks', program: 'Neighborhood parks', allocation: '$2.1M' },
      { id: 'roads', program: 'Local roads', allocation: '$3.4M' },
      { id: 'libraries', program: 'Public libraries', allocation: '$3.0M' },
    ],
    caption: 'Approved city program allocations with a published budget total',
    showFooter: true,
  },
  FooterStatistics: {
    id: 'footer-statistics',
    columns: [
      { key: 'office', header: 'Service center', primary: true, footer: 'All centers' },
      { key: 'requests', header: 'Requests', align: 'right', aggregate: 'sum' },
      { key: 'averageWait', header: 'Average wait (min)', align: 'right', aggregate: 'avg' },
      { key: 'shortestWait', header: 'Shortest wait (min)', align: 'right', aggregate: 'min' },
      { key: 'longestWait', header: 'Longest wait (min)', align: 'right', aggregate: 'max' },
    ],
    data: [
      { id: 'north', office: 'North', requests: 120, averageWait: 12.1, shortestWait: 3, longestWait: 23 },
      { id: 'south', office: 'South', requests: 84, averageWait: 10.2, shortestWait: 4, longestWait: 28 },
      { id: 'east', office: 'East', requests: 95, averageWait: 11.3, shortestWait: 2, longestWait: 26 },
      { id: 'west', office: 'West', requests: 101, averageWait: 13.4, shortestWait: 5, longestWait: 30 },
    ],
    caption: 'Weekly service center metrics with sum, average, minimum, and maximum footers',
    showFooter: true,
    scrollable: true,
  },
  FooterCount: {
    id: 'footer-count',
    columns: [
      { key: 'subject', header: 'Request', primary: true, footer: 'Requests in export' },
      { key: 'number', header: 'Request number', align: 'right', aggregate: 'count' },
      { key: 'status', header: 'Status', footer: 'All statuses' },
    ],
    data: [
      { id: 1021, subject: 'Streetlight repair', number: 1021, status: 'Open' },
      { id: 1022, subject: 'Tree trimming', number: 1022, status: 'In progress' },
      { id: 1023, subject: 'Pothole report', number: 1023, status: 'Closed' },
      { id: 1024, subject: 'Missed collection', number: 1024, status: 'Open' },
    ],
    caption: 'Service requests with a record count in the footer',
    showFooter: true,
  },
};

export const Default = { args: storyDefs.Default };
export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'Every row and header is rendered before JavaScript runs. Without USX enhancement, search is hidden, sorting and pagination are unavailable, and the rows remain readable in source order.' } } } };
export const Striped = { args: storyDefs.Striped };
export const Borderless = { args: storyDefs.Borderless };
export const Compact = { args: storyDefs.Compact };
export const SpanningCells = { args: storyDefs.SpanningCells };
export const SearchablePaginated = { args: storyDefs.SearchablePaginated };
export const RowDetails = { args: storyDefs.RowDetails };
