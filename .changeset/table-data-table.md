---
"@solexllc/usx": minor
"@solexllc/usx-react": minor
"@solexllc/usx-theme": minor
"@solexllc/usx-contracts": minor
---

Split the former advanced Table API into a themeable USWDS Table and a new USX DataTable. DataTable adds grouped and spanning cells, multilevel headers, sorting, search, selection, pagination, row details, and responsive layouts. Update the Django templates, static initializer, theme tokens, component contracts, stories, snapshots, and play coverage. Existing advanced Table usages should migrate to DataTable.

DataTable React now renders markup and initial state only. The shared USX JavaScript initializer owns interaction for React, Django, and static HTML. Replace React interaction callbacks with `usx:data-table:*` event listeners; use `sortValue(row)` for custom sortable values.

Grouped tables can set `groupBy.headers` independently from their group-row cells and `groupBy.rowClassName` for a uniform group color. Rows, columns, and cells accept USX `bg-*` and `text-*` classes, with cell colors taking precedence over column colors.

The USWDS Table accepts `scrollHeight` to give its existing scroll container a fixed height, including for sticky headers.

React and Django DataTable now emit matching complete HTML before JavaScript runs. The shared `data-table.mjs` initializer applies the initial sort and later interactions to either renderer. The Django package keeps table layout planning in a Python runtime module and packages templates through the normal generator without template-specific setup checks.

Organize the React and Django DataTable stories into Sorting, Grouping, Responsive, Selection, and Footers folders. Add footer examples for published values, totals, summary statistics, and record counts.
