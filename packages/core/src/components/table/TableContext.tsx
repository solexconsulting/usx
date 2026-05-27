import React, { createContext, useContext } from 'react';

export interface TableContextType {
  columns: any[];
  sortState: { key: string | null; direction: 'asc' | 'desc' | null };
  handleSort: (key: string) => void;
  selectionMode: null | 'checkbox' | 'radio';
  selectionPosition: 'left' | 'right';
  selectedKeys: Set<any>;
  handleSelect: (key: any) => void;
  handleSelectAll: () => void;
  isSelected: (key: any) => boolean;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  allowSelectAll: boolean;
  disabled: any[];
  onClickRow: ((row: any, e: React.MouseEvent) => void) | null;
  expandedGroups: Set<any>;
  toggleGroup: (key: any) => void;
  isGroupExpanded: (key: any) => boolean;
  expandedRows: Set<any>;
  toggleRow: (key: any) => void;
  isRowExpanded: (key: any) => boolean;
  rowDetails: any;
  responsive: boolean | 'stack' | 'stack-header';
  stickyFirstColumn: boolean;
  totalCols: number;
  placeholder: React.ReactNode;
  onMore: (() => void) | null;
  loading: boolean;
  data?: any[];
  primaryKey?: string;
  groupBy?: any;
  groups?: any[];
}

export const TableContext = createContext<TableContextType>({
  columns: [],
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
