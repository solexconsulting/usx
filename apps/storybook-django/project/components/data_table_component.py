"""
Custom Django component for the USX DataTable.

The table Django template requires several pre-computed variables that are not
present in the raw JSON props sent by Storybook:

    header_rows   — built by build_header_rows(columns)
    leaf_columns  — built by get_leaf_cols(columns)
    total_cols    — built by total_col_count(...)
    total_depth   — len(header_rows)

Without these, table_body receives leaf_columns=None and renders zero data cells
(only the selection/detail auxiliary columns appear).

This component overrides get_context() to call table_helper.build_table_context()
and merge the derived values into the template context before rendering.
"""

from __future__ import annotations

import importlib.util
import logging
from pathlib import Path

from .core.component import Component
from .core.registry import _registry

logger = logging.getLogger(__name__)


# ── Lazy-load table_helper from the packages directory ───────────────────────

_table_helper = None


def _load_table_helper():
    """
    Locate and import table_helper.py from packages/usx-react/src/components/data-table/.
    Walks parent directories looking for the repo root (pnpm-workspace.yaml).
    """
    here = Path(__file__).resolve()
    bundled_helper = here.parent / "templates" / "data-table" / "table_helper.py"
    if bundled_helper.is_file():
        spec = importlib.util.spec_from_file_location("usx_table_helper", str(bundled_helper))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        return mod
    for parent in here.parents:
        candidate = parent / "packages" / "usx-react" / "src" / "components" / "data-table" / "table_helper.py"
        if candidate.exists():
            spec = importlib.util.spec_from_file_location("usx_table_helper", str(candidate))
            mod = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(mod)
            return mod
    raise ImportError(
        "Could not locate table_helper.py. Expected at "
        "packages/usx-react/src/components/data-table/table_helper.py relative to the repo root."
    )


def _get_helper():
    global _table_helper
    if _table_helper is None:
        _table_helper = _load_table_helper()
    return _table_helper


# ── DataTableComponent ────────────────────────────────────────────────────────────

class DataTableComponent(Component):
    name = "data-table"
    template = "data-table/data-table.django.html"
    props_file = "data-table/config.json"

    def get_context(self, props: dict) -> dict:
        helper = _get_helper()

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
        sort = props.get("sort") or {}

        try:
            table_ctx = helper.build_table_context(
                columns,
                data,
                sort=sort if sort.get("key") else None,
                group_by=group_by,
                selection_mode=selection_mode,
                row_details=row_details,
            )
        except Exception:
            logger.exception("table_helper.build_table_context() failed; falling back to empty context")
            table_ctx = {
                "header_rows": [],
                "leaf_columns": columns,
                "total_cols": len(columns),
                "total_depth": 1,
                "data": data,
                "groups": None,
                "sort": sort,
                "pagination": None,
            }

        ctx = {**props, **table_ctx}
        leaf_columns = table_ctx['leaf_columns']
        group_columns = group_by_raw.get('columns') or [] if isinstance(group_by_raw, dict) else []
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
            ctx['pageSizeOptions'] = [{'value': str(size), 'label': str(size)}
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


# Register — must happen at module import time so autodiscovery in step 4 can
# find this instance and overwrite any template-only registration for 'table'.
_registry["data-table"] = DataTableComponent()
