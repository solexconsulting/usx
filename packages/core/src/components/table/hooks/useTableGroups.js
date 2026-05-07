import { useState, useCallback, useMemo } from 'react';

/**
 * useTableGroups — manages group expand/collapse state and groups data.
 *
 * @param {object} opts
 * @param {string|object|null} opts.groupBy
 *   string: the property name to group by
 *   object: { property, expand, onExpand, defaultExpanded }
 * @param {array}  opts.data  Full (sorted) data array
 *
 * @returns {{ groups, expandedGroups, toggleGroup, isGroupExpanded }}
 */
export function useTableGroups({ groupBy, data = [] }) {
  const groupByProp = typeof groupBy === 'string' ? groupBy : groupBy?.property;
  const expandProp = typeof groupBy === 'object' ? groupBy?.expand : null;
  const onExpandProp = typeof groupBy === 'object' ? groupBy?.onExpand : null;
  const defaultExpandedProp =
    typeof groupBy === 'object' ? groupBy?.defaultExpanded : true;

  // Controlled mode requires expand array to be explicitly provided.
  const isControlled = expandProp !== undefined && expandProp !== null;

  // Build initial expanded state
  const [internalExpanded, setInternalExpanded] = useState(() => {
    if (expandProp) return new Set(expandProp);
    if (defaultExpandedProp === false) return new Set();
    // Default: all expanded
    const keys = new Set();
    if (groupByProp) {
      data.forEach((row) => {
        const val = row[groupByProp];
        if (val !== undefined) keys.add(String(val));
      });
    }
    return keys;
  });

  const expandedGroups = isControlled
    ? new Set(expandProp || [])
    : internalExpanded;

  const toggleGroup = useCallback((key) => {
    const next = new Set(expandedGroups);
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
  }, [expandedGroups, isControlled, onExpandProp]);

  const isGroupExpanded = useCallback(
    (key) => expandedGroups.has(String(key)),
    [expandedGroups]
  );

  // Build groups: array of { key, rows }
  const groups = useMemo(() => {
    if (!groupByProp) return null;
    const map = new Map();
    data.forEach((row) => {
      const key = String(row[groupByProp] ?? '__ungrouped__');
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(row);
    });
    return [...map.entries()].map(([key, rows]) => ({ key, rows }));
  }, [data, groupByProp]);

  return { groups, expandedGroups, toggleGroup, isGroupExpanded };
}
