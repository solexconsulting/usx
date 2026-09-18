import { useState, useCallback, useMemo } from 'react';
import type { RowKey, SelectionMode, TableRowData } from '../types';

export interface UseTableSelectOptions {
  selectionMode: SelectionMode;
  /** Controlled selected keys; when provided the hook doesn't own the state. */
  selectProp?: RowKey[] | null;
  onSelect?: (selected: RowKey[]) => void;
  data?: TableRowData[];
  primaryKey?: string;
  disabled?: RowKey[];
  allowSelectAll?: boolean;
}

const rowKey = (row: TableRowData, primaryKey: string) => row[primaryKey] as RowKey;

export function useTableSelect({
  selectionMode,
  selectProp,
  onSelect,
  data = [],
  primaryKey = 'id',
  disabled = [],
  allowSelectAll = true,
}: UseTableSelectOptions) {
  // onSelect alone (e.g. a Storybook action stub) keeps the hook uncontrolled.
  const isControlled = selectProp !== undefined && selectProp !== null;
  const [internalSelected, setInternalSelected] = useState<Set<RowKey>>(() => new Set(selectProp || []));

  const selectedKeys = useMemo(
    () => (isControlled ? new Set<RowKey>(selectProp || []) : internalSelected),
    [isControlled, selectProp, internalSelected]
  );

  const disabledSet = useMemo(() => new Set(disabled), [disabled]);
  const enabledData = useMemo(
    () => data.filter((row) => !disabledSet.has(rowKey(row, primaryKey))),
    [data, disabledSet, primaryKey]
  );

  const isAllSelected =
    selectionMode === 'checkbox' &&
    enabledData.length > 0 &&
    enabledData.every((row) => selectedKeys.has(rowKey(row, primaryKey)));

  const isIndeterminate =
    selectionMode === 'checkbox' &&
    !isAllSelected &&
    enabledData.some((row) => selectedKeys.has(rowKey(row, primaryKey)));

  const commit = useCallback(
    (next: Set<RowKey>) => {
      if (!isControlled) setInternalSelected(next);
      onSelect?.([...next]);
    },
    [isControlled, onSelect]
  );

  const handleSelect = useCallback(
    (key: RowKey) => {
      if (disabledSet.has(key)) return;
      if (selectionMode === 'radio') {
        commit(new Set([key]));
        return;
      }
      const next = new Set(selectedKeys);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      commit(next);
    },
    [selectionMode, selectedKeys, disabledSet, commit]
  );

  const handleSelectAll = useCallback(() => {
    if (!allowSelectAll || selectionMode !== 'checkbox') return;
    commit(isAllSelected ? new Set() : new Set(enabledData.map((row) => rowKey(row, primaryKey))));
  }, [allowSelectAll, selectionMode, isAllSelected, enabledData, primaryKey, commit]);

  const isSelected = useCallback((key: RowKey) => selectedKeys.has(key), [selectedKeys]);

  return { selectedKeys, handleSelect, handleSelectAll, isSelected, isAllSelected, isIndeterminate };
}
