import { useState, useCallback } from 'react';

/**
 * useRowDetails — manages expandable row detail state.
 *
 * @param {object} opts
 * @param {function|object|null} opts.rowDetails
 *   function: (row) => ReactNode
 *   object: { render, expand, onExpand }
 * @param {string} opts.primaryKey
 *
 * @returns {{ expandedRows, toggleRow, isRowExpanded }}
 */
export function useRowDetails({ rowDetails }) {
  const expandProp =
    rowDetails && typeof rowDetails === 'object' ? rowDetails.expand : null;
  const onExpandProp =
    rowDetails && typeof rowDetails === 'object' ? rowDetails.onExpand : null;
  // Controlled mode requires expand array to be explicitly provided.
  const isControlled = expandProp !== undefined && expandProp !== null;

  const [internalExpanded, setInternalExpanded] = useState(
    () => new Set(expandProp || [])
  );

  const expandedRows = isControlled
    ? new Set(expandProp || [])
    : internalExpanded;

  const toggleRow = useCallback((key) => {
    const next = new Set(expandedRows);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    if (isControlled) {
      onExpandProp([...next]);
    } else {
      setInternalExpanded(next);
      if (onExpandProp) onExpandProp([...next]);
    }
  }, [expandedRows, isControlled, onExpandProp]);

  const isRowExpanded = useCallback(
    (key) => expandedRows.has(key),
    [expandedRows]
  );

  return { expandedRows, toggleRow, isRowExpanded };
}
