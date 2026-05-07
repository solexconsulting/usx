import { createContext, useContext } from 'react';

export const TableContext = createContext({
  // Column definitions (data-driven mode)
  columns: [],
  // Sorting
  sortState: { key: null, direction: null },
  handleSort: () => {},
  // Selection
  selectionMode: null,
  selectionPosition: 'left',
  selectedKeys: new Set(),
  handleSelect: () => {},
  handleSelectAll: () => {},
  isSelected: () => false,
  isAllSelected: false,
  isIndeterminate: false,
  allowSelectAll: true,
  disabled: [],
  // Row click
  onClickRow: null,
  // Groups
  expandedGroups: new Set(),
  toggleGroup: () => {},
  isGroupExpanded: () => true,
  // Row details
  expandedRows: new Set(),
  toggleRow: () => {},
  isRowExpanded: () => false,
  rowDetails: null,
  // Responsive
  responsive: false,
  // Sticky
  stickyFirstColumn: false,
  // Total column count (for colSpans)
  totalCols: 0,
  // Empty state
  placeholder: null,
  // Infinite scroll
  onMore: null,
  loading: false,
});

export function useTableContext() {
  return useContext(TableContext);
}
