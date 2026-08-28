export interface TableContextType {
  id: string;
  columns: TableColumn[];
  sortState: { key: string | null; direction: 'asc' | 'desc' | null };
  handleSort: (key: string) => void;
  selectionMode: null | 'checkbox' | 'radio';
  selectionPosition: 'left' | 'right';
  selectedKeys: Set<string | number>;
  handleSelect: (key: string | number) => void;
  handleSelectAll: () => void;
  isSelected: (key: string | number) => boolean;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  allowSelectAll: boolean;
  disabled: (string | number)[];
  onClickRow: ((row: Record<string, unknown>, e: React.MouseEvent) => void) | null;
  expandedGroups: Set<string | number>;
  toggleGroup: (key: string | number) => void;
  isGroupExpanded: (key: string | number) => boolean;
  expandedRows: Set<string | number>;
  toggleRow: (key: string | number) => void;
  isRowExpanded: (key: string | number) => boolean;
  rowDetails: { render?: (row: Record<string, unknown>) => React.ReactNode; expandLabel?: string | ((row: Record<string, unknown>) => string) } | null;
  responsive: boolean | 'stack' | 'stack-header';
  stickyFirstColumn: boolean;
  totalCols: number;
  placeholder: React.ReactNode;
  onMore: (() => void) | null;
  loading: boolean;
  data?: Record<string, unknown>[];
  primaryKey?: string;
  groupBy?: string;
  groups?: { key: string; rows: Record<string, unknown>[] }[];
}

export const TableContext = createContext<TableContextType>({
  id: '',
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
