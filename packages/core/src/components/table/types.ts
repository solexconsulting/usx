// TableColumn type for Table components
export interface TableColumn {
  key: string;
  header?: string | React.ReactNode;
  columns?: TableColumn[];
  hidden?: boolean;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  className?: string;
  headerClassName?: string;
  width?: string | number;
  primary?: boolean;
  render?: (row: Record<string, unknown>, rowIndex: number) => React.ReactNode;
  stackLabel?: string;
  [key: string]: unknown;
}
