import { createContext, useContext } from 'react';
import type { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import type {
  GroupBy,
  Responsive,
  RowDetails,
  RowKey,
  SelectionMode,
  SortState,
  TableColumn,
  TableGroupEntry,
  TableRowData,
} from './types';

export interface TableContextValue {
  id: string;
  columns: TableColumn[];
  data: TableRowData[];
  primaryKey: string;
  sortState: SortState;
  handleSort: (key: string) => void;
  selectionMode: SelectionMode;
  selectionPosition: 'left' | 'right';
  selectedKeys: Set<RowKey>;
  handleSelect: (key: RowKey) => void;
  handleSelectAll: () => void;
  isSelected: (key: RowKey) => boolean;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  allowSelectAll: boolean;
  disabled: RowKey[];
  onClickRow: ((row: TableRowData, e: MouseEvent | KeyboardEvent) => void) | null;
  groupBy: GroupBy;
  groups: TableGroupEntry[] | null;
  expandedGroups: Set<string>;
  toggleGroup: (key: string) => void;
  isGroupExpanded: (key: string) => boolean;
  expandedRows: Set<RowKey>;
  toggleRow: (key: RowKey) => void;
  isRowExpanded: (key: RowKey) => boolean;
  rowDetails: RowDetails;
  responsive: Responsive;
  stickyFirstColumn: boolean;
  totalCols: number;
  placeholder: ReactNode;
  onMore: (() => void) | null;
  loading: boolean;
}

export const TableContext = createContext<TableContextValue>({
  id: '',
  columns: [],
  data: [],
  primaryKey: 'id',
  sortState: { key: null, direction: null },
  handleSort: () => {},
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
  onClickRow: null,
  groupBy: null,
  groups: null,
  expandedGroups: new Set(),
  toggleGroup: () => {},
  isGroupExpanded: () => true,
  expandedRows: new Set(),
  toggleRow: () => {},
  isRowExpanded: () => false,
  rowDetails: null,
  responsive: false,
  stickyFirstColumn: false,
  totalCols: 0,
  placeholder: null,
  onMore: null,
  loading: false,
});

export function useTableContext() {
  return useContext(TableContext);
}
