import { useState, useCallback, useMemo } from 'react';
import type { RowDetails, RowKey } from '../types';

export interface UseRowDetailsOptions {
  rowDetails: RowDetails;
}

export function useRowDetails({ rowDetails }: UseRowDetailsOptions) {
  const config = rowDetails && typeof rowDetails === 'object' ? rowDetails : null;
  const expandProp = config?.expand;
  const onExpandProp = config?.onExpand;
  const isControlled = expandProp !== undefined && expandProp !== null;

  const [internalExpanded, setInternalExpanded] = useState<Set<RowKey>>(() => new Set(expandProp || []));
  const expandedRows = useMemo(
    () => (isControlled ? new Set<RowKey>(expandProp || []) : internalExpanded),
    [isControlled, expandProp, internalExpanded]
  );

  const toggleRow = useCallback(
    (key: RowKey) => {
      const next = new Set(expandedRows);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      if (!isControlled) setInternalExpanded(next);
      onExpandProp?.([...next]);
    },
    [expandedRows, isControlled, onExpandProp]
  );

  const isRowExpanded = useCallback((key: RowKey) => expandedRows.has(key), [expandedRows]);

  return { expandedRows, toggleRow, isRowExpanded };
}
