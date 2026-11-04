import type { TableColumn } from './types';

/** Keep header groups and body columns in sync when nested columns are hidden. */
export function visibleColumns(columns: TableColumn[]): TableColumn[] {
  return columns.flatMap((column) => {
    if (column.hidden) return [];
    if (!column.columns?.length) return [column];
    const children = visibleColumns(column.columns);
    return children.length ? [{ ...column, columns: children }] : [];
  });
}

export function leafColumns(columns: TableColumn[]): TableColumn[] {
  return visibleColumns(columns).flatMap((column) => column.columns?.length ? leafColumns(column.columns) : [column]);
}
