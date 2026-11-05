"""Prepare the structural context needed to render a Django DataTable.

The browser initializer enhances the rendered table. These helpers plan its
initial headers, cells, groups, and aggregates before JavaScript runs.
"""

from __future__ import annotations

from typing import Any


# ── Grouping ──────────────────────────────────────────────────────────────────

def group_data(data: list[dict], field: str) -> list[dict]:
    """
    Group *data* by *field*, preserving insertion order.

    Returns:
        [{'key': group_value, 'rows': [...]}, ...]

    Preserves the same first-seen group order as React markup.
    Pass groupBy['property'] when the React groupBy prop is an object.
    """
    groups: dict[str, list] = {}
    for row in data:
        key = str(row.get(field, '__ungrouped__'))
        groups.setdefault(key, []).append(row)
    return [{'key': k, 'rows': v} for k, v in groups.items()]


# ── Footer aggregation ────────────────────────────────────────────────────────

def _aggregate(data: list[dict], key: str, agg_type: str) -> Any:
    """
    Compute an aggregate value for *key* across *data*.
    Matches the render-time aggregate in TableFoot.tsx.
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

    Matches the render-time footer in TableFoot.tsx.
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
        else:
            result[key] = '--'
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


def _visible_columns(columns: list[dict]) -> list[dict]:
    result = []
    for column in columns:
        if column.get('hidden'):
            continue
        if column.get('columns'):
            children = _visible_columns(column['columns'])
            if children:
                result.append({**column, 'columns': children})
        else:
            result.append(column)
    return result


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
    visible = _visible_columns(columns)
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

    Matches the visible leaf columns rendered by TableBody.tsx.
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


def merge_cell_classes(column_class: str = '', cell_class: str = '') -> str:
    """Let a cell's bg-* or text-* utility replace its column's color utility."""
    cell_tokens = cell_class.split()
    replaces_background = any(token.startswith('bg-') for token in cell_tokens)
    replaces_text = any(token.startswith('text-') for token in cell_tokens)
    column_tokens = [token for token in column_class.split()
                     if not (replaces_background and token.startswith('bg-'))
                     and not (replaces_text and token.startswith('text-'))]
    return ' '.join(column_tokens + cell_tokens)


def plan_cells(rows: list[dict], columns: list[dict], primary_key: str = 'id') -> list[dict]:
    """Return row copies with cell slots occupied by spans removed.

    Call separately for each group or page so row spans stay within that section.
    """
    occupied = [[False] * len(columns) for _ in rows]
    planned = []
    for row_index, row in enumerate(rows):
        cells = []
        cell_props = row.get('cellProps') or {}
        for column_index, column in enumerate(columns):
            if occupied[row_index][column_index]:
                continue
            options = cell_props.get(column['key']) or {}
            desired_cols = max(1, int(options.get('colSpan') or 1))
            desired_rows = max(1, int(options.get('rowSpan') or 1))
            col_span = 0
            while (col_span < desired_cols and column_index + col_span < len(columns)
                   and not occupied[row_index][column_index + col_span]):
                col_span += 1
            row_span = 0
            while (row_span < desired_rows and row_index + row_span < len(rows)
                   and not any(occupied[row_index + row_span][column_index:column_index + col_span])):
                row_span += 1
            for r in range(row_index, row_index + row_span):
                for c in range(column_index, column_index + col_span):
                    occupied[r][c] = True
            raw_value = row.get(column['key'])
            sort_value = (raw_value if isinstance(raw_value, (str, int, float))
                          and column.get('filterable') is not False else None)
            cells.append({'column': column, 'options': options, 'col_span': col_span,
                          'row_span': row_span,
                          'sort_value': sort_value,
                          'class_name': merge_cell_classes(column.get('className') or '',
                                                           options.get('className') or '')})
        planned.append({**row, 'usxCells': cells,
                        'usxSelectionLabel': f"Select row {row.get(primary_key, row_index + 1)}",
                        'usxSearchText': ' '.join(str(row.get(column['key'], '')) for column in columns
                                                  if column.get('filterable') is not False)})
    return planned


# ── Total column count ────────────────────────────────────────────────────────

def total_col_count(
    columns: list[dict],
    selection_mode: str | None = None,
    row_details: bool = False,
) -> int:
    """
    Return the total <td>/<th> column count including auxiliary columns.
    Matches the render-time total column count in DataTable.tsx.
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
    group_by: str | None = None,
    selection_mode: str | None = None,
    row_details: bool = False,
) -> dict:
    """
    Convenience wrapper: compute all derived context in one call.

    Returns a dict ready to unpack into template context (via **ctx or
    context.update(ctx)).  Individual helpers can still be called separately
    for full control.
    """
    # Header rows (multi-level)
    header_rows = build_header_rows(columns)
    leaf_cols = get_leaf_cols(columns)
    total_cols = total_col_count(columns, selection_mode, row_details)

    # Grouping
    groups = group_data(data, group_by) if group_by else None

    return {
        'header_rows': header_rows,
        'leaf_columns': leaf_cols,
        'total_cols': total_cols,
        'total_depth': len(header_rows),
        'data': data,
        'groups': groups,
    }
