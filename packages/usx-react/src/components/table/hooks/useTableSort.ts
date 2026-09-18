import { useState, useCallback, useMemo } from 'react';
import type { SortDirection, SortState, TableColumn, TableRowData } from '../types';

function defaultCompareFn(a: TableRowData, b: TableRowData, key: string): number {
  const va = a[key];
  const vb = b[key];
  if (va === null || va === undefined) return 1;
  if (vb === null || vb === undefined) return -1;
  if (typeof va === 'string' && typeof vb === 'string') return va.localeCompare(vb);
  if ((va as number) < (vb as number)) return -1;
  if ((va as number) > (vb as number)) return 1;
  return 0;
}

// null → 'asc' → 'desc' → null
function nextDirection(current: SortDirection): SortDirection {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}

export interface UseTableSortOptions {
  /** Controlled sort value; when provided the hook doesn't own the state. */
  sortProp?: SortState | null;
  onSort?: (next: SortState) => void;
  columns?: TableColumn[];
  data?: TableRowData[];
}

export function useTableSort({ sortProp, onSort, columns = [], data = [] }: UseTableSortOptions) {
  // onSort alone (e.g. a Storybook action stub) keeps the hook uncontrolled.
  const isControlled = sortProp !== undefined && sortProp !== null;
  const [internalSort, setInternalSort] = useState<SortState>({ key: null, direction: null });
  const sortState = isControlled ? sortProp : internalSort;

  const handleSort = useCallback(
    (key: string) => {
      const currentDirection = sortState.key === key ? sortState.direction : null;
      const direction = nextDirection(currentDirection);
      const next: SortState = { key: direction ? key : null, direction };
      if (!isControlled) setInternalSort(next);
      onSort?.(next);
    },
    [sortState, isControlled, onSort]
  );

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;
    const sortKey = sortState.key;
    const colDef = columns.find((c) => c.key === sortKey);
    const compareFn = colDef?.sortFn
      ? (a: TableRowData, b: TableRowData) => colDef.sortFn!(a, b, sortState.direction)
      : (a: TableRowData, b: TableRowData) => defaultCompareFn(a, b, sortKey);
    const sorted = [...data].sort(compareFn);
    if (sortState.direction === 'desc') sorted.reverse();
    return sorted;
  }, [data, sortState, columns]);

  return { sortState, handleSort, sortedData };
}
