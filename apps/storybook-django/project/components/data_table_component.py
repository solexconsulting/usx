"""Prepare initial Django DataTable markup from the same props as React."""

from __future__ import annotations

from . import data_table_context as helper
from .core.component import Component


# ── DataTableComponent ────────────────────────────────────────────────────────────

class DataTableComponent(Component):
    name = "data-table"
    template = "data-table/data-table.django.html"
    props_file = "data-table/config.json"

    def get_context(self, props: dict) -> dict:
        columns = list(props.get("columns") or [])
        data = list(props.get("data") or [])

        # sortable: True makes each leaf column sortable unless it opts out.
        if props.get("sortable"):
            def enable_sorting(items):
                return [
                    {**column, "columns": enable_sorting(column["columns"])}
                    if column.get("columns") else
                    {**column, "sortable": column.get("sortable") is not False}
                    for column in items
                ]
            columns = enable_sorting(columns)

        # groupBy can be a plain string or {property: str, defaultExpanded: bool}
        group_by_raw = props.get("groupBy")
        default_expanded = True
        if isinstance(group_by_raw, dict):
            default_expanded = group_by_raw.get("defaultExpanded", True)
            group_by = group_by_raw.get("property") or group_by_raw.get("field")
        else:
            group_by = group_by_raw or None

        selection_mode = props.get("selectionMode") or None
        row_details = bool(props.get("rowDetails"))
        table_ctx = helper.build_table_context(
            columns,
            data,
            group_by=group_by,
            selection_mode=selection_mode,
            row_details=row_details,
        )

        ctx = {**props, **table_ctx}
        leaf_columns = table_ctx['leaf_columns']
        group_columns = (group_by_raw.get('columns') or []) if isinstance(group_by_raw, dict) else []
        group_headers = (group_by_raw.get('headers') or group_columns) if isinstance(group_by_raw, dict) else []
        group_values = group_by_raw.get('values') or {} if isinstance(group_by_raw, dict) else {}
        if table_ctx['groups']:
            groups = []
            for group in table_ctx['groups']:
                cells = []
                for index, column in enumerate(group_columns):
                    raw = group_values.get(group['key'], {}).get(column['key'], group['key'] if index == 0 else '')
                    options = raw if isinstance(raw, dict) else {}
                    cells.append({'column': column, 'value': options.get('value', raw), 'options': options})
                groups.append({**group, 'rows': helper.plan_cells(group['rows'], leaf_columns, props.get('primaryKey') or 'id'), 'groupCells': cells})
            ctx['groups'] = groups
        else:
            ctx['data'] = helper.plan_cells(table_ctx['data'], leaf_columns, props.get('primaryKey') or 'id')
        if isinstance(group_by_raw, dict):
            ctx['groupColumns'] = group_columns
            ctx['groupHeaders'] = group_headers
            ctx['groupRowClassName'] = group_by_raw.get('rowClassName') or ''
        if props.get('paginate'):
            options = props['paginate'] if isinstance(props['paginate'], dict) else {}
            ctx['pageSize'] = int(options.get('pageSize') or 10)
            ctx['pageSizeOptions'] = [{'value': size, 'label': str(size)}
                                      for size in options.get('pageSizeOptions', [10, 25, 50, 100])]
            ctx['totalItems'] = len(data)
            ctx['totalPages'] = max(1, (len(data) + ctx['pageSize'] - 1) // ctx['pageSize'])
            ctx['pages'] = [{'type': 'page', 'page': page}
                            for page in range(1, ctx['totalPages'] + 1)]
        if props.get("showFooter"):
            ctx["footerValues"] = helper.compute_footer(table_ctx["leaf_columns"], data)

        # Pass defaultExpanded for grouped stories
        if group_by:
            ctx["defaultExpanded"] = default_expanded

        return ctx
