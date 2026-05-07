import { useState, useCallback, useMemo } from 'react';

/**
 * useTableSelect — manages row selection state.
 *
 * Supports both checkbox (multi) and radio (single) modes.
 * Uncontrolled by default; controlled when onSelect is provided.
 *
 * @param {object} opts
 * @param {'checkbox'|'radio'|null} opts.selectionMode
 * @param {array|null}  opts.selectProp    Controlled selected key values
 * @param {function}    opts.onSelect      Controlled callback (selectedKeys[]) => void
 * @param {array}       opts.data          Full data array
 * @param {string}      opts.primaryKey    Key field name
 * @param {array}       opts.disabled      Array of primary keys that are disabled
 * @param {boolean}     opts.allowSelectAll
 *
 * @returns selection state and handlers
 */
export function useTableSelect({
  selectionMode,
  selectProp,
  onSelect,
  data = [],
  primaryKey = 'id',
  disabled = [],
  allowSelectAll = true,
}) {
  // Controlled mode requires the select value prop to be explicitly provided.
  // onSelect alone (e.g. a Storybook action stub) keeps us in uncontrolled mode.
  const isControlled = selectProp !== undefined && selectProp !== null;

  const [internalSelected, setInternalSelected] = useState(
    () => new Set(selectProp || [])
  );

  const selectedKeys = useMemo(() => {
    if (isControlled) return new Set(selectProp || []);
    return internalSelected;
  }, [isControlled, selectProp, internalSelected]);

  const disabledSet = useMemo(() => new Set(disabled), [disabled]);

  const enabledData = useMemo(
    () => data.filter((row) => !disabledSet.has(row[primaryKey])),
    [data, disabledSet, primaryKey]
  );

  const isAllSelected =
    selectionMode === 'checkbox' &&
    enabledData.length > 0 &&
    enabledData.every((row) => selectedKeys.has(row[primaryKey]));

  const isIndeterminate =
    selectionMode === 'checkbox' &&
    !isAllSelected &&
    enabledData.some((row) => selectedKeys.has(row[primaryKey]));

  const handleSelect = useCallback((key) => {
    if (disabledSet.has(key)) return;

    let next;
    if (selectionMode === 'radio') {
      next = new Set([key]);
    } else {
      next = new Set(selectedKeys);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
    }

    if (isControlled) {
      onSelect([...next]);
    } else {
      setInternalSelected(next);
      if (onSelect) onSelect([...next]);
    }
  }, [selectionMode, selectedKeys, disabledSet, isControlled, onSelect]);

  const handleSelectAll = useCallback(() => {
    if (!allowSelectAll || selectionMode !== 'checkbox') return;

    let next;
    if (isAllSelected) {
      next = new Set();
    } else {
      next = new Set(enabledData.map((row) => row[primaryKey]));
    }

    if (isControlled) {
      onSelect([...next]);
    } else {
      setInternalSelected(next);
      if (onSelect) onSelect([...next]);
    }
  }, [allowSelectAll, selectionMode, isAllSelected, enabledData, primaryKey, isControlled, onSelect]);

  const isSelected = useCallback((key) => selectedKeys.has(key), [selectedKeys]);

  return {
    selectedKeys,
    handleSelect,
    handleSelectAll,
    isSelected,
    isAllSelected,
    isIndeterminate,
  };
}
