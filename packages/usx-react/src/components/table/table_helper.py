"""
table_helper.py — Server-side data utilities for the Django Table component.

These functions replace the React hooks (useTableSort, useTableGroups, etc.).
A view calls the relevant helpers before rendering, then passes the results as
template context.  Zero Django dependencies — importable and testable anywhere.
"""

from __future__ import annotations

import math
from typing import Any


# ── Sorting ───────────────────────────────────────────────────────────────────

def _sort_key(row: dict, key: str):
    """
    Null-safe sort key matching useTableSort's defaultCompareFn:
    - None / missing values sort last.
    - Strings compared case-insensitively (localeCompare approximation).
    - Numbers compared numerically.
    """
    val = row.get(key)
    if val is None:
        return (1, '')      # nulls last
    if isinstance(val, str):
        return (0, val.lower())
    return (0, val)


def sort_data(data: list[dict], key: str, direction: str = 'asc') -> list[dict]:
    """
    Return a stable-sorted copy of *data* on *key*.

    direction: 'asc' (default) or 'desc'.
    Matches the sort + optional .reverse() in useTableSort.js.
    """
    sorted_rows = sorted(data, key=lambda row: _sort_key(row, key))
    if direction == 'desc':
        sorted_rows.reverse()
    return sorted_rows


# ── Grouping ──────────────────────────────────────────────────────────────────

def group_data(data: list[dict], field: str) -> list[dict]:
    """
    Group *data* by *field*, preserving insertion order.

    Returns:
        [{'key': group_value, 'rows': [...]}, ...]

    Matches the Map-based grouping in useTableGroups.js.
    Pass groupBy['property'] when the React groupBy prop is an object.
    """
    groups: dict[str, list] = {}
    for row in data:
        key = str(row.get(field, '__ungrouped__'))
        groups.setdefault(key, []).append(row)
    return [{'key': k, 'rows': v} for k, v in groups.items()]


# ── Pagination ────────────────────────────────────────────────────────────────

def paginate_table(data: list, page: int = 1, page_size: int = 10) -> dict:
    """
    Slice *data* for the requested *page*.

    Returns a dict suitable for spreading into template context:
    {
        'rows':         sliced list for this page,
        'total':        len(data),
        'current_page': page (clamped),
        'total_pages':  ceil(total / page_size),
        'page_size':    page_size,
    }

    Pass 'rows' as 'data' and the rest into the pagination sub-template.
    """
    total = len(data)
    total_pages = max(1, math.ceil(total / page_size)) if total else 1
    page = max(1, min(page, total_pages))
    start = (page - 1) * page_size
    return {
        'rows': data[start: start + page_size],
        'total': total,
        'current_page': page,
        'total_pages': total_pages,
        'page_size': page_size,
    }


# ── Footer aggregation ────────────────────────────────────────────────────────

def _aggregate(data: list[dict], key: str, agg_type: str) -> Any:
    """
    Compute an aggregate value for *key* across *data*.
    Matches the aggregate() helper in TableFoot.jsx.
    """
    vals = []
    for row in data:
        try:
            v = float(row[key])
            vals.append(v)
        except (KeyError, TypeError, ValueError):
            pass

    if not vals:
        return '--'

    if agg_type == 'sum':
        result = sum(vals)
    elif agg_type == 'avg':
        result = round(sum(vals) / len(vals), 2)
    elif agg_type == 'min':
        result = min(vals)
    elif agg_type == 'max':
        result = max(vals)
    elif agg_type == 'count':
        result = len(vals)
    else:
        return '--'

    # Return int when the result is a whole number
    return int(result) if result == int(result) else result


def compute_footer(columns: list[dict], data: list[dict]) -> dict:
    """
    Return a {col_key: rendered_value} dict for the tfoot row.

    Each column may define:
        col['footer']    — a literal value or callable(data) -> value
        col['aggregate'] — one of 'sum', 'avg', 'min', 'max', 'count'

    Matches the logic in TableFoot.jsx.
    """
    result = {}
    for col in columns:
        key = col.get('key')
        if not key:
            continue
        if 'footer' in col:
            footer = col['footer']
            result[key] = footer(data) if callable(footer) else footer
        elif col.get('aggregate'):
            result[key] = _aggregate(data, key, col['aggregate'])
    return result


# ── Header rows (multi-level) ─────────────────────────────────────────────────

def _get_depth(columns: list[dict]) -> int:
    """Maximum nesting depth. Leaf columns count as depth 1."""
    max_d = 1
    for col in columns:
        if col.get('columns'):
            d = 1 + _get_depth(col['columns'])
            if d > max_d:
                max_d = d
    return max_d


def _get_leaf_count(col: dict) -> int:
    """Number of leaf columns under *col* (or 1 if it is itself a leaf)."""
    if not col.get('columns'):
        return 1
    return sum(_get_leaf_count(c) for c in col['columns'])


def build_header_rows(columns: list[dict]) -> list[list[dict]]:
    """
    Flatten a (possibly nested) column list into per-level header rows.

    Returns:
        [
            [{'col': {...}, 'row_span': 2, 'col_span': 1}, ...],  # level 0
            [{'col': {...}, 'row_span': 1, 'col_span': 3}, ...],  # level 1
        ]

    Pure Python port of buildHeaderRows() + traverse() in TableHead.jsx.
    """
    visible = [c for c in columns if not c.get('hidden')]
    total_depth = _get_depth(visible)
    rows: list[list] = [[] for _ in range(total_depth)]

    def traverse(cols: list[dict], level: int) -> None:
        for col in cols:
            is_leaf = not col.get('columns')
            row_span = (total_depth - level) if is_leaf else 1
            col_span = 1 if is_leaf else _get_leaf_count(col)
            rows[level].append({
                'col': col,
                'row_span': row_span,
                'col_span': col_span,
            })
            if not is_leaf:
                traverse(col['columns'], level + 1)

    traverse(visible, 0)
    return rows


# ── Leaf columns ──────────────────────────────────────────────────────────────

def get_leaf_cols(columns: list[dict]) -> list[dict]:
    """
    Recursively collect only leaf columns (no 'columns' children).
    Skips hidden columns.

    Matches getLeafCols() in TableBody.jsx.
    """
    result = []
    for col in columns:
        if col.get('hidden'):
            continue
        if col.get('columns'):
            result.extend(get_leaf_cols(col['columns']))
        else:
            result.append(col)
    return result


# ── Total column count ────────────────────────────────────────────────────────

def total_col_count(
    columns: list[dict],
    selection_mode: str | None = None,
    row_details: bool = False,
) -> int:
    """
    Return the total <td>/<th> column count including auxiliary columns.
    Matches the totalCols useMemo in Table.jsx.
    """
    count = len(get_leaf_cols(columns))
    if selection_mode:
        count += 1
    if row_details:
        count += 1
    return count


# ── Convenience: full table context builder ───────────────────────────────────

def build_table_context(
    columns: list[dict],
    data: list[dict],
    *,
    sort: dict | None = None,
    group_by: str | None = None,
    selection_mode: str | None = None,
    row_details: bool = False,
    page: int = 1,
    page_size: int = 10,
    paginate: bool = False,
) -> dict:
    """
    Convenience wrapper: compute all derived context in one call.

    Returns a dict ready to unpack into template context (via **ctx or
    context.update(ctx)).  Individual helpers can still be called separately
    for full control.
    """
    # Sort
    if sort and sort.get('key') and sort.get('direction'):
        data = sort_data(data, sort['key'], sort['direction'])

    # Header rows (multi-level)
    header_rows = build_header_rows(columns)
    leaf_cols = get_leaf_cols(columns)
    total_cols = total_col_count(columns, selection_mode, row_details)

    # Grouping
    groups = group_data(data, group_by) if group_by else None

    # Pagination
    pagination = None
    if paginate:
        pag = paginate_table(data, page=page, page_size=page_size)
        data = pag['rows']
        pagination = {
            'current_page': pag['current_page'],
            'total_pages': pag['total_pages'],
            'total': pag['total'],
            'page_size': pag['page_size'],
        }

    return {
        'header_rows': header_rows,
        'leaf_columns': leaf_cols,
        'total_cols': total_cols,
        'total_depth': len(header_rows),
        'data': data,
        'groups': groups,
        'sort': sort or {},
        'pagination': pagination,
    }
