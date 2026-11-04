# DataTable

`DataTable` is the USX table for interactive data sets. It uses the USWDS `usa-table` base class for table layout, borders, spacing, and caption styling, with `usx-data-table` classes for its richer behavior and USX theme colors. Load the USWDS table stylesheet separately; `@solexllc/usx` does not bundle it. `Table` remains the small USWDS table component.

Set `responsive="stack"` or `responsive="stack-header"` to use the USWDS-style stacked layout below the `mobile-lg` breakpoint (480px). Both modes hide the column header and show each cell's column label above its value. `stack-header` instead shades the first data cell in each row as its heading and omits that cell's repeated label. Set a column's `stackLabel` to customize its mobile label, including when its header is rendered as an element.

Both tables share sorted-column theme tokens. `table-sorted-header-bg` defaults to USWDS's `#97d4ea`, `table-sorted-column-bg` to `#e1f3f8`, and `table-sorted-stripe-bg` to `#c3ebfa`. Their text colors can be set independently with `table-sorted-header-text`, `table-sorted-column-text`, and `table-sorted-stripe-text`. Ordinary striped rows use `table-stripe-text`, which follows `text-ink` by default. `table-border` also follows `text-ink` by default, so inverted sorted-header text does not recolor the grid; it can be overridden separately. `table-sorted-icon-color` and `table-unsorted-icon-color` control the arrow artwork. Set these tokens in a USX theme or override their `--usx-*` custom properties at runtime.

## React

```tsx
<DataTable
  caption="State admissions"
  columns={[
    { key: 'name', header: 'State', primary: true, sortable: true },
    { key: 'order', header: 'Order admitted', sortable: true },
    { key: 'region', header: 'Region' },
  ]}
  data={states}
  searchable
  paginate={{ pageSize: 25, pageSizeOptions: [10, 25, 50] }}
/>
```

The React component renders markup and initial state. Load `@solexllc/usx/js/start` or call `dataTable.init(root)` after mounting it; the same `data-table.mjs` initializer provides search, sorting, pagination, selection, grouped rows, and row details in React, Django, and static HTML. Initial values can be set with `sort`, `select`, `groupBy.expand`, and `rowDetails.expand`. Listen on the `.usx-data-table-shell` for `usx:data-table:sort`, `:select`, `:search`, `:page-change`, `:group-toggle`, `:detail-toggle`, `:row-activate`, and `:more` events. `searchValue(row)` supplies searchable text for a computed cell; `filterable: false` excludes a column from search. `sortValue(row)` supplies a comparable value for custom sorting. Set `clickableRows` to make rows keyboard and pointer activatable.

Rows can set `cellProps` by column key, with `rowSpan`, `colSpan`, `backgroundColor`, and `color`. A row can set `rowProps.backgroundColor` and `rowProps.color`; columns can set `backgroundColor`, `color`, `headerBackgroundColor`, and `headerColor`. You can also apply USX `bg-*` and `text-*` utility classes through `rowProps.className`, column `className` or `headerClassName`, and `cellProps[key].className`. Row classes color the whole row, including its cells. Cell classes take precedence over column classes of the same color family, followed by row classes. Utility colors use `!important`, so they also override inline colors. Spans are clamped to the visible leaf columns and the current group or page. Covered cells are omitted automatically.

Set `align: 'center'` on a column to center text, buttons, avatars, or other compact content horizontally while retaining cell padding and top alignment. Add `verticalAlign: 'middle'` to center it vertically too. `cellProps[columnKey]` can override either setting for a particular row. In compound mode, use `<DataTable.Cell align="center" verticalAlign="middle">`. Selection checkboxes and radios are centered both ways by default; set `selectionVerticalAlign="top"` to keep them at the padded top of tall rows. Their labels remain accessible through input names while the visible controls use a fixed hit area.

For grouped rows with multiple cells, pass `groupBy={{ property, columns, values }}`. `columns` defines the group-row cells; the first contains the disclosure button, and the others can show totals. Set `groupBy.headers` to show a separate top header band with broader labels, so it need not repeat the group-row labels. The spans in each set must add up to the number of visible data columns. `groupBy.rowClassName` applies classes, including `bg-*` and `text-*`, across the whole group row. `values` maps each group key to values by group column key; each value can also be `{ value, backgroundColor, color }`. Regular table `columns` can be nested for additional header levels. `GroupedRows` shows regional case totals; `GroupedMatrix` shows grant outcomes by agency and program.

## Django and static HTML

```django
{% load usx_components %}
{% data_table caption="State admissions" columns=columns data=rows searchable=True paginate=page_options %}{% enddata_table %}
```

Load `@solexllc/usx/js/start` on the page, or call `dataTable.init(root)` from `@solexllc/usx/js/data-table` after inserting markup. It is safe to call `init` more than once. `data-table.html` shows the static markup contract. Django accepts `rowDetailField` for detail content and built-in aggregate names for footer values. React render callbacks produce cell and detail markup during rendering; they do not provide interaction behavior.

The HTML story shows the static reference. React and Django snapshot boards have matching play checks.
