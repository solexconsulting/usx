import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import { buildArgTypes } from '../../utils/storyHelpers';
import config from './config.json';
import table from '@uswds/uswds/js/usa-table';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Table',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component:
          'Server-rendered USX Table. Pre-compute `header_rows`, `leaf_columns`, and `total_cols` ' +
          'in your view using `table_helper.build_table_context()` and pass the result as template context.',
      },
    },
  },
};

// ─── Shared sample data ────────────────────────────────────────────────────────

const DOCUMENTS = [
  { id: 1, title: 'Declaration of Independence', description: 'Statement adopted by the Continental Congress.', year: 1776 },
  { id: 2, title: 'Bill of Rights', description: 'The first ten amendments of the U.S. Constitution.', year: 1791 },
  { id: 3, title: 'Declaration of Sentiments', description: 'Written during the Seneca Falls Convention.', year: 1848 },
  { id: 4, title: 'Emancipation Proclamation', description: 'Executive order granting freedom to slaves.', year: 1863 },
];

const STATES = [
  { id: 1, name: 'Hawaii',     order: 50, region: 'Pacific',    population: 632772 },
  { id: 2, name: 'Alaska',     order: 49, region: 'Pacific',    population: 226167 },
  { id: 3, name: 'Arizona',    order: 48, region: 'Southwest',  population: 204354 },
  { id: 4, name: 'New Mexico', order: 47, region: 'Southwest',  population: 327301 },
  { id: 5, name: 'Oklahoma',   order: 46, region: 'South',      population: 1657155 },
  { id: 6, name: 'Utah',       order: 45, region: 'West',       population: 210779 },
];

// Pre-computed header / leaf structures (mirrors table_helper output)
const DOC_COLUMNS = [
  { key: 'title',       header: 'Document title', primary: true },
  { key: 'description', header: 'Description' },
  { key: 'year',        header: 'Year', align: 'right' },
];

const STATE_COLUMNS = [
  { key: 'name',       header: 'State',                   primary: true, sortable: true },
  { key: 'order',      header: 'Order admitted',           align: 'right', sortable: true, width: '8rem' },
  { key: 'region',     header: 'Region',                  sortable: true },
  { key: 'population', header: 'Population at admission', align: 'right', sortable: true,
    aggregate: 'sum', footer: STATES.reduce((s, r) => s + r.population, 0).toLocaleString() },
];

// Build flat header_rows for a single-level column list
function singleLevelHeaderRows(columns) {
  return [columns.map((col) => ({ col, row_span: 1, col_span: 1 }))];
}

const DOC_HEADER_ROWS  = singleLevelHeaderRows(DOC_COLUMNS);
const STATE_HEADER_ROWS = singleLevelHeaderRows(STATE_COLUMNS);

const STATE_LEAF_COLS  = STATE_COLUMNS;
const DOC_LEAF_COLS    = DOC_COLUMNS;

// ─── 1. Standard ──────────────────────────────────────────────────────────────

export const Standard = {
  args: {
    columns:      DOC_COLUMNS,
    data:         DOCUMENTS,
    caption:      'Historical documents',
    header_rows:  DOC_HEADER_ROWS,
    leaf_columns: DOC_LEAF_COLS,
    total_cols:   DOC_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table'),
};

// ─── 2. Striped ────────────────────────────────────────────────────────────────

export const Striped = {
  args: { ...Standard.args, striped: true, caption: 'Striped rows' },
  render: djangoComponent('table'),
};

// ─── 3. Borderless ─────────────────────────────────────────────────────────────

export const Borderless = {
  args: { ...Standard.args, borderless: true, caption: 'Borderless' },
  render: djangoComponent('table'),
};

// ─── 4. Compact ────────────────────────────────────────────────────────────────

export const Compact = {
  args: { ...Standard.args, compact: true, caption: 'Compact' },
  render: djangoComponent('table'),
};

// ─── 5. Scrollable (horizontal) ───────────────────────────────────────────────

const WIDE_COLUMNS = [
  { key: 'name', header: 'State', primary: true },
  ...Array.from({ length: 8 }, (_, i) => ({
    key: `col${i}`, header: `Column ${i + 1}`,
  })),
];
const WIDE_DATA = STATES.map((s) => ({
  ...s, ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`col${i}`, 'Data value'])),
}));

export const ScrollableHorizontal = {
  args: {
    columns:      WIDE_COLUMNS,
    data:         WIDE_DATA,
    caption:      'Horizontal scroll',
    scrollable:   true,
    header_rows:  singleLevelHeaderRows(WIDE_COLUMNS),
    leaf_columns: WIDE_COLUMNS,
    total_cols:   WIDE_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table'),
};

// ─── 6. Sticky header ─────────────────────────────────────────────────────────

export const StickyHeader = {
  args: {
    ...Standard.args,
    caption:       'Sticky header',
    scrollable:    true,
    height:        '200px',
    stickyHeader:  true,
    data:          [...DOCUMENTS, ...DOCUMENTS, ...DOCUMENTS],
  },
  render: djangoComponent('table'),
};

// ─── 7. Sticky first column ────────────────────────────────────────────────────

export const StickyFirstColumn = {
  args: {
    ...ScrollableHorizontal.args,
    caption:            'Sticky first column',
    stickyFirstColumn:  true,
  },
  render: djangoComponent('table'),
};

// ─── 8. Responsive stacked ────────────────────────────────────────────────────

export const ResponsiveStacked = {
  args: { ...Standard.args, responsive: 'stack', caption: 'Responsive — stacked' },
  render: djangoComponent('table'),
};

// ─── 9. Responsive stacked header ─────────────────────────────────────────────

export const ResponsiveStackedHeader = {
  args: { ...Standard.args, responsive: 'stack-header', caption: 'Responsive — stacked header' },
  render: djangoComponent('table'),
};

// ─── 10a. Sortable (USWDS uncontrolled) ──────────────────────────────────────
// Plain data-sortable headers (no pre-rendered button/icon); USWDS JS injects
// button/icon behavior at runtime.

export const SortableUswdsUncontrolled = {
  name: 'Sortable (USWDS uncontrolled)',
  args: {
    id:           "django-table-sortable-uncontrolled",
    columns:      STATE_COLUMNS,
    data:         STATES,
    caption:      'Sortable table — USWDS handles sort client-side',
    header_rows:  singleLevelHeaderRows(STATE_COLUMNS),
    leaf_columns: STATE_COLUMNS,
    total_cols:   STATE_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table', (container) => {
    table.init(container);
  }),
};

// ─── 10b. Sortable (JS-controlled) ──────────────────────────────────────────────
// Demonstrates controlled sort via a named JS function (handleTableSort).
// The function receives the column key and is responsible for re-rendering the
// component with updated sort state (mirroring React's onSort callback).

export const SortableControlled = {
  name: 'Sortable (JS-controlled)',
  args: {
    columns:      STATE_COLUMNS.map((col) => ({ ...col, sort_direction: col.key === 'name' ? 'asc' : null })),
    data:         [...STATES].sort((a, b) => a.name.localeCompare(b.name)),
    caption:      'Controlled sort — handled by handleTableSort',
    onSort:       'handleTableSort',
    header_rows:  singleLevelHeaderRows(STATE_COLUMNS.map((col) => ({ ...col, sort_direction: col.key === 'name' ? 'asc' : null }))),
    leaf_columns: STATE_COLUMNS.map((col) => ({ ...col, sort_direction: col.key === 'name' ? 'asc' : null })),
    total_cols:   STATE_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table'),
};

// ─── 11. Checkbox selection ────────────────────────────────────────────────────

export const CheckboxSelection = {
  args: {
    ...Standard.args,
    caption:       'Checkbox selection',
    selectionMode: 'checkbox',
    select:        [1, 3],
    total_cols:    DOC_COLUMNS.length + 1,
  },
  render: djangoComponent('table'),
};

// ─── 12. Radio selection ──────────────────────────────────────────────────────

export const RadioSelection = {
  args: {
    ...Standard.args,
    caption:       'Radio selection',
    selectionMode: 'radio',
    select:        [2],
    total_cols:    DOC_COLUMNS.length + 1,
  },
  render: djangoComponent('table'),
};

// ─── 13. Disabled rows ────────────────────────────────────────────────────────

export const DisabledRows = {
  args: {
    ...CheckboxSelection.args,
    caption:  'Disabled rows (IDs 2 and 4)',
    disabled: [2, 4],
  },
  render: djangoComponent('table'),
};

// ─── 14. Clickable rows (block-link, no JS) ───────────────────────────────────

const CLICKABLE_DATA = DOCUMENTS.map((d) => ({ ...d, url: `#doc-${d.id}` }));

export const ClickableRows = {
  args: {
    ...Standard.args,
    caption:     'Clickable rows (block-link pattern)',
    data:        CLICKABLE_DATA,
    onClickRow:  true,
    rowUrlField: 'url',
    total_cols:  DOC_COLUMNS.length,
  },
  render: djangoComponent('table'),
};

// ─── 15. Grouped rows ─────────────────────────────────────────────────────────

export const GroupedRows = {
  args: {
    id:           "table-grouped-rows",
    columns:      STATE_COLUMNS,
    data:         STATES,
    caption:      'Grouped by region',
    groups:       [
      { key: 'Pacific',   rows: STATES.filter((s) => s.region === 'Pacific') },
      { key: 'Southwest', rows: STATES.filter((s) => s.region === 'Southwest') },
      { key: 'South',     rows: STATES.filter((s) => s.region === 'South') },
      { key: 'West',      rows: STATES.filter((s) => s.region === 'West') },
    ],
    header_rows:  STATE_HEADER_ROWS,
    leaf_columns: STATE_LEAF_COLS,
    total_cols:   STATE_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table'),
};

// ─── 16. Grouped rows — collapsed by default ──────────────────────────────────

export const GroupedCollapsedByDefault = {
  args: {
    ...GroupedRows.args,
    id:      "table-grouped-rows-collapsed",
    caption: 'Groups collapsed by default',
    defaultExpanded: false,
  },
  render: djangoComponent('table'),
};

// ─── 17. Row details (<details>/<summary>, no JS) ─────────────────────────────

const DETAIL_DATA = DOCUMENTS.map((d) => ({
  ...d,
  detail: `Full text of ${d.title} (${d.year}): ${d.description}`,
}));

export const RowDetails = {
  args: {
    ...Standard.args,
    caption:        'Expandable row details',
    data:           DETAIL_DATA,
    rowDetails:     true,
    rowDetailField: 'detail',
    expandedRows:   [1],
    total_cols:     DOC_COLUMNS.length + 1,
  },
  render: djangoComponent('table'),
};

// ─── 18. Multi-level headers ──────────────────────────────────────────────────

const MULTI_COLUMNS = [
  { key: 'name',   header: 'State',   primary: true },
  { key: 'order',  header: 'Order',   align: 'right' },
  {
    key: 'stats', header: 'Statistics',
    columns: [
      { key: 'region',     header: 'Region' },
      { key: 'population', header: 'Population', align: 'right' },
    ],
  },
];
const MULTI_HEADER_ROWS = [
  [
    { col: MULTI_COLUMNS[0], row_span: 2, col_span: 1 },
    { col: MULTI_COLUMNS[1], row_span: 2, col_span: 1 },
    { col: MULTI_COLUMNS[2], row_span: 1, col_span: 2 },
  ],
  [
    { col: MULTI_COLUMNS[2].columns[0], row_span: 1, col_span: 1 },
    { col: MULTI_COLUMNS[2].columns[1], row_span: 1, col_span: 1 },
  ],
];
const MULTI_LEAF_COLS = [
  MULTI_COLUMNS[0],
  MULTI_COLUMNS[1],
  MULTI_COLUMNS[2].columns[0],
  MULTI_COLUMNS[2].columns[1],
];

export const MultiLevelHeaders = {
  args: {
    columns:      MULTI_COLUMNS,
    data:         STATES,
    caption:      'Multi-level column headers',
    header_rows:  MULTI_HEADER_ROWS,
    leaf_columns: MULTI_LEAF_COLS,
    total_cols:   MULTI_LEAF_COLS.length,
    total_depth:  2,
  },
  render: djangoComponent('table'),
};

// ─── 19. Footer aggregation ────────────────────────────────────────────────────

export const FooterAggregation = {
  args: {
    columns:      STATE_COLUMNS,
    data:         STATES,
    caption:      'Footer with aggregation',
    showFooter:   true,
    footerValues: {
      name:       'Total',
      order:      '',
      region:     '',
      population: STATES.reduce((s, r) => s + r.population, 0).toLocaleString(),
    },
    header_rows:  STATE_HEADER_ROWS,
    leaf_columns: STATE_LEAF_COLS,
    total_cols:   STATE_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table'),
};

// ─── 20. Empty state ──────────────────────────────────────────────────────────

export const EmptyState = {
  args: {
    columns:      DOC_COLUMNS,
    data:         [],
    caption:      'No data',
    placeholder:  'No records found matching your criteria.',
    header_rows:  DOC_HEADER_ROWS,
    leaf_columns: DOC_LEAF_COLS,
    total_cols:   DOC_COLUMNS.length,
    total_depth:  1,
  },
  render: djangoComponent('table'),
};

// ─── 21. Loading state ────────────────────────────────────────────────────────

export const LoadingState = {
  args: {
    ...Standard.args,
    caption: 'Loading (spinner row)',
    loading: true,
  },
  render: djangoComponent('table'),
};
