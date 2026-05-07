import { useState, useCallback, useMemo } from 'react';

/**
 * Default comparator — handles strings, numbers, and anything that can be
 * compared via < / >.
 */
function defaultCompareFn(a, b, key) {
  const va = a[key];
  const vb = b[key];
  if (va === null || va === undefined) return 1;
  if (vb === null || vb === undefined) return -1;
  if (typeof va === 'string' && typeof vb === 'string') {
    return va.localeCompare(vb);
  }
  if (va < vb) return -1;
  if (va > vb) return 1;
  return 0;
}

/**
 * Cycles: null → 'asc' → 'desc' → null
 */
function nextDirection(current) {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}

/**
 * useTableSort — manages single-column sort state.
 *
 * @param {object} opts
 * @param {object|null}   opts.sortProp      Controlled sort value: { key, direction }
 * @param {function|null} opts.onSort        Controlled sort callback ({ key, direction }) => void
 * @param {array}         opts.columns       ColumnDef array (for accessing sortFn)
 * @param {array}         opts.data          Original unsorted data array
 *
 * @returns {{ sortState, handleSort, sortedData }}
 */
export function useTableSort({ sortProp, onSort, columns = [], data = [] }) {
  // Controlled mode requires the sort value prop to be explicitly provided.
  // If only onSort is present (e.g. a Storybook action stub), we stay uncontrolled
  // and fire onSort as a notification callback instead.
  const isControlled = sortProp !== undefined && sortProp !== null;

  const [internalSort, setInternalSort] = useState({ key: null, direction: null });

  const sortState = isControlled ? sortProp : internalSort;

  const handleSort = useCallback((key) => {
    const currentDirection = sortState.key === key ? sortState.direction : null;
    const direction = nextDirection(currentDirection);
    const next = { key: direction ? key : null, direction };
    if (isControlled) {
      if (onSort) onSort(next);
    } else {
      setInternalSort(next);
      if (onSort) onSort(next); // notify even in uncontrolled mode
    }
  }, [sortState, isControlled, onSort]);

  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction) return data;
    const colDef = columns.find((c) => c.key === sortState.key);
    const compareFn = colDef?.sortFn
      ? (a, b) => colDef.sortFn(a, b, sortState.direction)
      : (a, b) => defaultCompareFn(a, b, sortState.key);

    const sorted = [...data].sort(compareFn);
    if (sortState.direction === 'desc') sorted.reverse();
    return sorted;
  }, [data, sortState, columns]);

  return { sortState, handleSort, sortedData };
}
