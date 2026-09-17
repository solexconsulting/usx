import { useState, useCallback, useMemo } from 'react';
import type { GroupBy, RowKey, TableGroupEntry, TableRowData } from '../types';

export interface UseTableGroupsOptions {
  groupBy: GroupBy;
  data?: TableRowData[];
}

export function useTableGroups({ groupBy, data = [] }: UseTableGroupsOptions) {
  const config = typeof groupBy === 'object' && groupBy !== null ? groupBy : null;
  const groupByProp = typeof groupBy === 'string' ? groupBy : config?.property;
  const expandProp = config?.expand;
  const onExpandProp = config?.onExpand;
  const defaultExpanded = config ? config.defaultExpanded : true;

  const isControlled = expandProp !== undefined && expandProp !== null;

  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() => {
    if (expandProp) return new Set(expandProp.map(String));
    if (defaultExpanded === false) return new Set();
    const keys = new Set<string>();
    if (groupByProp) {
      for (const row of data) {
        const val = row[groupByProp];
        if (val !== undefined) keys.add(String(val));
      }
    }
    return keys;
  });

  const expandedGroups = useMemo(
    () => (isControlled ? new Set((expandProp || []).map(String)) : internalExpanded),
    [isControlled, expandProp, internalExpanded]
  );

  const toggleGroup = useCallback(
    (key: string) => {
      const next = new Set(expandedGroups);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      if (!isControlled) setInternalExpanded(next);
      onExpandProp?.([...next] as RowKey[]);
    },
    [expandedGroups, isControlled, onExpandProp]
  );

  const isGroupExpanded = useCallback((key: string) => expandedGroups.has(String(key)), [expandedGroups]);

  const groups = useMemo<TableGroupEntry[] | null>(() => {
    if (!groupByProp) return null;
    const map = new Map<string, TableRowData[]>();
    for (const row of data) {
      const key = String(row[groupByProp] ?? '__ungrouped__');
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(row);
    }
    return [...map.entries()].map(([key, rows]) => ({ key, rows }));
  }, [data, groupByProp]);

  return { groups, expandedGroups, toggleGroup, isGroupExpanded };
}
