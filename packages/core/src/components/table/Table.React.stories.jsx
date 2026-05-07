import React, { useState } from 'react';
import Table from './Table';

export default {
  title: 'React/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    // Disable the global argTypesRegex action auto-wiring for Table.
    // Table has many on* props (onSort, onSelect, onClickRow, onMore, etc.)
    // that should only be active when a story explicitly provides them.
    // Auto-wiring them makes every row appear clickable and breaks uncontrolled
    // sort/select state by turning those hooks into controlled mode with no
    // backing state.
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

const DOCUMENTS = [
  { id: 1, title: 'Declaration of Independence', description: 'Statement adopted by the Continental Congress declaring independence from the British Empire.', year: 1776 },
  { id: 2, title: 'Bill of Rights', description: 'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.', year: 1791 },
  { id: 3, title: 'Declaration of Sentiments', description: 'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.', year: 1848 },
  { id: 4, title: 'Emancipation Proclamation', description: 'An executive order granting freedom to slaves in designated southern states.', year: 1863 },
];

const DOC_COLUMNS = [
  { key: 'title', header: 'Document title', primary: true },
  { key: 'description', header: 'Description' },
  { key: 'year', header: 'Year', align: 'right' },
];

const STATES = [
  { id: 1, name: 'Hawaii', order: 50, region: 'Pacific', population: 632772 },
  { id: 2, name: 'Alaska', order: 49, region: 'Pacific', population: 226167 },
  { id: 3, name: 'Arizona', order: 48, region: 'Southwest', population: 204354 },
  { id: 4, name: 'New Mexico', order: 47, region: 'Southwest', population: 327301 },
  { id: 5, name: 'Oklahoma', order: 46, region: 'South', population: 1657155 },
  { id: 6, name: 'Utah', order: 45, region: 'West', population: 210779 },
];

const STATE_COLUMNS = [
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

// ─── 1. Standard ──────────────────────────────────────────────────────────────

export const Standard = {
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Historic U.S. documents',
  },
};

// ─── 2. Striped ───────────────────────────────────────────────────────────────

export const Striped = {
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Striped table',
    striped: true,
  },
};

// ─── 3. Borderless ────────────────────────────────────────────────────────────

export const Borderless = {
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Borderless table',
    borderless: true,
  },
};

// ─── 4. Compact ───────────────────────────────────────────────────────────────

export const Compact = {
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Compact table',
    compact: true,
  },
};

// ─── 5. Scrollable ────────────────────────────────────────────────────────────

export const ScrollableHorizontal = {
  name: 'Scrollable (horizontal)',
  args: {
    columns: [
      ...STATE_COLUMNS,
      { key: 'extraA', header: 'Extra A', render: () => 'Lorem ipsum' },
      { key: 'extraB', header: 'Extra B', render: () => 'Dolor sit' },
      { key: 'extraC', header: 'Extra C', render: () => 'Amet consectetur' },
      { key: 'extraD', header: 'Extra D', render: () => 'Adipiscing elit' },
    ],
    data: STATES,
    caption: 'Horizontally scrollable table',
    scrollable: true,
  },
};

export const ScrollableVertical = {
  name: 'Scrollable (vertical / sticky header)',
  args: {
    columns: DOC_COLUMNS,
    data: [...DOCUMENTS, ...DOCUMENTS, ...DOCUMENTS],
    caption: 'Vertically scrollable with sticky header',
    stickyHeader: true,
    height: '250px',
  },
};

// ─── 6. Sticky First Column ───────────────────────────────────────────────────

export const StickyFirstColumn = {
  args: {
    columns: [
      { key: 'name', header: 'State', primary: true },
      ...Array.from({ length: 8 }, (_, i) => ({
        key: `col${i}`,
        header: `Column ${i + 1}`,
        render: () => 'Data value',
      })),
    ],
    data: STATES,
    caption: 'Sticky first column',
    scrollable: true,
    stickyFirstColumn: true,
  },
};

// ─── 7. Responsive Stacked ────────────────────────────────────────────────────

export const ResponsiveStacked = {
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Stacked on mobile',
    responsive: 'stack',
  },
};

export const ResponsiveStackedHeader = {
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'Stacked with header on mobile',
    responsive: 'stack-header',
  },
};

// ─── 8. Sortable ──────────────────────────────────────────────────────────────

export const Sortable = {
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Sortable table — click column headers',
    scrollable: true,
  },
};

export const SortableAll = {
  name: 'Sortable (all columns)',
  args: {
    columns: DOC_COLUMNS,
    data: DOCUMENTS,
    caption: 'All columns sortable via sortable prop',
    sortable: true,
  },
};

export const SortableControlled = {
  name: 'Sortable (controlled)',
  render: () => {
    const [sort, setSort] = useState({ key: 'name', direction: 'asc' });
    return (
      <div>
        <p>Controlled sort: <strong>{sort.key}</strong> {sort.direction}</p>
        <Table
          columns={STATE_COLUMNS}
          data={STATES}
          caption="Controlled sort state"
          sort={sort}
          onSort={setSort}
        />
      </div>
    );
  },
};

// ─── 9. Multi-select (checkbox) ───────────────────────────────────────────────

export const CheckboxSelection = {
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Multi-select with checkboxes',
    selectionMode: 'checkbox',
    allowSelectAll: true,
  },
};

export const CheckboxSelectionRight = {
  name: 'Checkbox (right side)',
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Checkboxes on the right',
    selectionMode: 'checkbox',
    selectionPosition: 'right',
  },
};

export const CheckboxControlled = {
  name: 'Checkbox (controlled)',
  render: () => {
    const [selected, setSelected] = useState([1, 3]);
    return (
      <div>
        <p>Selected IDs: {selected.join(', ') || 'none'}</p>
        <Table
          columns={STATE_COLUMNS}
          data={STATES}
          caption="Controlled multi-select"
          selectionMode="checkbox"
          select={selected}
          onSelect={setSelected}
        />
      </div>
    );
  },
};

// ─── 10. Radio (single select) ────────────────────────────────────────────────

export const RadioSelection = {
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Single-select with radio buttons',
    selectionMode: 'radio',
  },
};

// ─── 11. Disabled rows ────────────────────────────────────────────────────────

export const DisabledRows = {
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Rows 2 and 4 are disabled',
    selectionMode: 'checkbox',
    disabled: [2, 4],
    onClickRow: (row) => alert(`Clicked: ${row.name}`),
  },
};

// ─── 12. Clickable rows ───────────────────────────────────────────────────────

export const ClickableRows = {
  render: () => {
    const [last, setLast] = useState(null);
    return (
      <div>
        {last && <p>Last clicked: <strong>{last.name}</strong></p>}
        <Table
          columns={STATE_COLUMNS}
          data={STATES}
          caption="Click any row"
          onClickRow={(row) => setLast(row)}
        />
      </div>
    );
  },
};

export const ClickableWithSelection = {
  name: 'Clickable + selectable',
  render: () => {
    const [last, setLast] = useState(null);
    const [selected, setSelected] = useState([]);
    return (
      <div>
        <p>Selected: {selected.join(', ') || 'none'} | Last clicked: {last?.name || 'none'}</p>
        <Table
          columns={STATE_COLUMNS}
          data={STATES}
          caption="Clickable rows with checkboxes"
          selectionMode="checkbox"
          select={selected}
          onSelect={setSelected}
          onClickRow={(row) => setLast(row)}
        />
      </div>
    );
  },
};

// ─── 13. Grouped rows ─────────────────────────────────────────────────────────

export const GroupedRows = {
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'States grouped by region',
    groupBy: 'region',
  },
};

export const GroupedCollapsedByDefault = {
  name: 'Grouped (collapsed by default)',
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Groups collapsed by default',
    groupBy: { property: 'region', defaultExpanded: false },
  },
};

// ─── 14. Expandable row details ───────────────────────────────────────────────

export const RowDetails = {
  render: () => (
    <Table
      columns={STATE_COLUMNS}
      data={STATES}
      caption="Click ▼ to expand row details"
      rowDetails={(row) => (
        <div style={{ padding: '0.5rem' }}>
          <strong>{row.name}</strong> was the {row.order}th state admitted to the union,
          with an estimated population of {row.population.toLocaleString()} at admission.
          It is located in the <em>{row.region}</em> region.
        </div>
      )}
    />
  ),
};

export const RowDetailsControlled = {
  name: 'Row details (controlled)',
  render: () => {
    const [expanded, setExpanded] = useState([1]);
    return (
      <div>
        <p>Expanded rows: {expanded.join(', ')}</p>
        <Table
          columns={STATE_COLUMNS}
          data={STATES}
          caption="Controlled row detail expansion"
          rowDetails={{
            render: (row) => <p style={{ padding: '0.5rem' }}>{row.name} — {row.region}</p>,
            expand: expanded,
            onExpand: setExpanded,
          }}
        />
      </div>
    );
  },
};

// ─── 15. Multi-level headers ──────────────────────────────────────────────────

export const MultiLevelHeaders = {
  args: {
    columns: [
      { key: 'name', header: 'State', primary: true },
      {
        key: 'admission',
        header: 'Admission',
        columns: [
          { key: 'order', header: 'Order', align: 'right' },
          { key: 'region', header: 'Region' },
        ],
      },
      {
        key: 'stats',
        header: 'Statistics',
        columns: [
          { key: 'population', header: 'Population', align: 'right', render: (r) => r.population.toLocaleString() },
        ],
      },
    ],
    data: STATES,
    caption: 'Multi-level column headers',
  },
};

// ─── 16. Footer aggregation ───────────────────────────────────────────────────

export const FooterAggregation = {
  args: {
    columns: STATE_COLUMNS,
    data: STATES,
    caption: 'Table with footer aggregation',
    showFooter: true,
  },
};

// ─── 17. Striped + Sortable + Selection ───────────────────────────────────────

export const FullFeatured = {
  render: () => {
    const [selected, setSelected] = useState([]);
    return (
      <div>
        <p>Selected: {selected.join(', ') || 'none'}</p>
        <Table
          columns={STATE_COLUMNS}
          data={STATES}
          caption="Full-featured table"
          striped
          sortable
          scrollable
          selectionMode="checkbox"
          select={selected}
          onSelect={setSelected}
          showFooter
          onClickRow={(row) => console.log('row clicked:', row)}
        />
      </div>
    );
  },
};

// ─── 18. Pagination ───────────────────────────────────────────────────────────

export const PaginatedClientSide = {
  name: 'Paginated (client-side)',
  render: () => {
    const manyRows = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `State ${i + 1}`,
      order: i + 1,
      region: ['Northeast', 'South', 'Midwest', 'West', 'Southwest'][i % 5],
      population: Math.floor(Math.random() * 2000000) + 100000,
    }));
    return (
      <Table
        columns={STATE_COLUMNS}
        data={manyRows}
        caption="50 rows, paginated client-side (20 per page)"
        paginate
      />
    );
  },
};

// ─── 19. Empty state ─────────────────────────────────────────────────────────

export const EmptyState = {
  args: {
    columns: DOC_COLUMNS,
    data: [],
    caption: 'No data available',
    placeholder: 'No records found matching your criteria.',
  },
};

// ─── 20. Compound component mode ─────────────────────────────────────────────

export const CompoundComponents = {
  name: 'Compound component mode',
  render: () => (
    <Table caption="Custom markup via compound components">
      <Table.Head>
        <Table.Row>
          <Table.Cell as="th" scope="col" colSpan={2}>Combined header</Table.Cell>
          <Table.Cell as="th" scope="col" align="right">Year</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell as="th" scope="col">Document title</Table.Cell>
          <Table.Cell as="th" scope="col">Description</Table.Cell>
          <Table.Cell as="th" scope="col" align="right">Year</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {DOCUMENTS.map((doc) => (
          <Table.Row key={doc.id}>
            <Table.Cell as="th" scope="row">{doc.title}</Table.Cell>
            <Table.Cell>{doc.description}</Table.Cell>
            <Table.Cell align="right">{doc.year}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Foot>
        <Table.Row>
          <Table.Cell as="th" scope="row" colSpan={2}>Total documents</Table.Cell>
          <Table.Cell align="right">{DOCUMENTS.length}</Table.Cell>
        </Table.Row>
      </Table.Foot>
    </Table>
  ),
};

// ─── 21. Complex cell content ─────────────────────────────────────────────────

export const ComplexCellContent = {
  render: () => {
    const columns = [
      { key: 'name', header: 'State', primary: true },
      { key: 'region', header: 'Region' },
      { key: 'order', header: 'Order', align: 'right' },
      {
        key: 'population',
        header: 'Population',
        align: 'right',
        render: (row) => (
          <span>
            {row.population.toLocaleString()}
            <span
              title="Visualization"
              style={{
                display: 'inline-block',
                marginLeft: '0.5rem',
                height: '0.75rem',
                width: `${(row.population / 1657155) * 80}px`,
                background: '#1a4480',
                verticalAlign: 'middle',
              }}
            />
          </span>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        data={STATES}
        caption="Complex cell content with inline visualization"
        striped
      />
    );
  },
};

// ─── 22. Infinite scroll with loading spinner ─────────────────────────────────

const ALL_ROWS = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `State ${i + 1}`,
  order: i + 1,
  region: ['Northeast', 'South', 'Midwest', 'West', 'Southwest'][i % 5],
  population: 100000 + (i * 53791) % 1500000,
}));

const PAGE_SIZE = 8;

export const InfiniteScroll = {
  name: 'Infinite scroll (onMore + loading)',
  render: () => {
    const [rows, setRows] = useState(ALL_ROWS.slice(0, PAGE_SIZE));
    const [loading, setLoading] = useState(false);
    const hasMore = rows.length < ALL_ROWS.length;

    function handleMore() {
      if (loading || !hasMore) return;
      setLoading(true);
      setTimeout(() => {
        setRows((prev) => {
          const next = ALL_ROWS.slice(0, prev.length + PAGE_SIZE);
          return next;
        });
        setLoading(false);
      }, 1200);
    }

    return (
      <>
        <p className="usa-hint" style={{ marginBottom: '0.5rem' }}>
          Scroll down inside the table to load more rows.{' '}
          {rows.length} / {ALL_ROWS.length} loaded.
        </p>
        <Table
          columns={STATE_COLUMNS}
          data={rows}
          caption="Infinite scroll — rows load as you scroll"
          scrollable
          height="320px"
          stickyHeader
          onMore={hasMore ? handleMore : undefined}
          loading={loading}
        />
      </>
    );
  },
};

