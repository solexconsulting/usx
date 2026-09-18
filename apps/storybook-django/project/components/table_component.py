"""
Custom Django component for the USX Table.

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
    Locate and import table_helper.py from packages/usx-react/src/components/table/.
    Walks parent directories looking for the repo root (pnpm-workspace.yaml).
    """
    here = Path(__file__).resolve()
    for parent in here.parents:
        candidate = parent / "packages" / "usx-react" / "src" / "components" / "table" / "table_helper.py"
        if candidate.exists():
            spec = importlib.util.spec_from_file_location("usx_table_helper", str(candidate))
            mod = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(mod)
            return mod
    raise ImportError(
        "Could not locate table_helper.py. Expected at "
        "packages/usx-react/src/components/table/table_helper.py relative to the repo root."
    )


def _get_helper():
    global _table_helper
    if _table_helper is None:
        _table_helper = _load_table_helper()
    return _table_helper


# ── TableComponent ────────────────────────────────────────────────────────────

class TableComponent(Component):
    name = "table"
    template = "table/table.django.html"
    props_file = "table/config.json"

    def get_context(self, props: dict) -> dict:
        helper = _get_helper()

        columns = list(props.get("columns") or [])
        data = list(props.get("data") or [])

        # sortable: True makes every column sortable (React shorthand prop)
        if props.get("sortable"):
            columns = [{**c, "sortable": True} for c in columns]

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

        # Pass defaultExpanded for grouped stories
        if group_by:
            ctx["defaultExpanded"] = default_expanded

        return ctx


# Register — must happen at module import time so autodiscovery in step 4 can
# find this instance and overwrite any template-only registration for 'table'.
_registry["table"] = TableComponent()
