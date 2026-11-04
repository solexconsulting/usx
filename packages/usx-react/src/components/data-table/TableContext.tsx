import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type {
  GroupBy, GroupColumn, Responsive, RowDetails, RowKey, SelectionMode,
  SortState, TableColumn, TableGroupEntry, TableRowData, VerticalAlign,
} from './types';

/** Render-time data shared by the markup components. Interaction state lives in data-table.mjs. */
export interface TableContextValue {
  id: string;
  columns: TableColumn[];
  data: TableRowData[];
  primaryKey: string;
  sortState: SortState;
  selectionMode: SelectionMode;
  selectionPosition: 'left' | 'right';
  selectionVerticalAlign: VerticalAlign;
  selectedKeys: Set<RowKey>;
  allowSelectAll: boolean;
  disabled: RowKey[];
  clickableRows: boolean;
  groupBy: GroupBy;
  groupColumns: GroupColumn[];
  groupHeaders: GroupColumn[];
  groupValues: Record<string, Record<string, unknown>>;
  groups: TableGroupEntry[] | null;
  expandedGroups: Set<string>;
  expandedRows: Set<RowKey>;
  rowDetails: RowDetails;
  responsive: Responsive;
  totalCols: number;
  placeholder: ReactNode;
  infinite: boolean;
  loading: boolean;
}

export const TableContext = createContext<TableContextValue>({
  id: '', columns: [], data: [], primaryKey: 'id',
  sortState: { key: null, direction: null }, selectionMode: null,
  selectionPosition: 'left', selectionVerticalAlign: 'middle',
  selectedKeys: new Set(), allowSelectAll: true, disabled: [], clickableRows: false,
  groupBy: null, groupColumns: [], groupHeaders: [], groupValues: {}, groups: null,
  expandedGroups: new Set(), expandedRows: new Set(), rowDetails: null,
  responsive: false, totalCols: 0, placeholder: null,
  infinite: false, loading: false,
});

export function useTableContext() {
  return useContext(TableContext);
}
