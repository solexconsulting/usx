import React from 'react';
import classnames from 'classnames';

export interface TableColumn {
  key: string;
  header: React.ReactNode;
  /** Render this column's cells as row headers. */
  primary?: boolean;
  /** Allow the USWDS table script to sort this column. */
  sortable?: boolean;
}

export interface TableProps extends Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns?: TableColumn[];
  data?: Record<string, React.ReactNode>[];
  caption?: React.ReactNode;
  striped?: boolean;
  borderless?: boolean;
  compact?: boolean;
  scrollable?: boolean;
  /** Fixed height of the scroll container, when scrollable. */
  scrollHeight?: string;
  stickyHeader?: boolean;
  responsive?: false | 'stack' | 'stack-header';
  /** Use children for hand-authored USWDS table markup instead of columns and data. */
  children?: React.ReactNode;
}

/** A themeable USWDS table. Sorting is supplied by USWDS's table script. */
export default function Table({
  columns = [], data = [], caption, striped = false, borderless = false,
  compact = false, scrollable = false, scrollHeight, stickyHeader = false, responsive = false,
  className, children, ...props
}: TableProps) {
  const hasSorting = !children && columns.some((column) => column.sortable);
  const table = (
    <>
      <table
        {...props}
        className={classnames(
          'usa-table', 'usx-table',
          striped && 'usa-table--striped',
          borderless && 'usa-table--borderless',
          compact && 'usa-table--compact',
          stickyHeader && 'usa-table--sticky-header',
          responsive === 'stack' && 'usa-table--stacked',
          responsive === 'stack-header' && 'usa-table--stacked-header',
          className
        )}
      >
        {children ?? (
          <>
            <caption className="usx-table__caption">{caption || 'Data table'}</caption>
            <thead><tr>{columns.map((column) => (
              <th key={column.key} scope="col" data-sortable={column.sortable ? '' : undefined}>
                {column.header}
              </th>
            ))}</tr></thead>
            <tbody>{data.map((row, index) => (
              <tr key={index}>{columns.map((column) => {
                const Cell = column.primary ? 'th' : 'td';
                const value = row[column.key];
                return <Cell
                  key={column.key}
                  scope={column.primary ? 'row' : undefined}
                  data-label={responsive ? String(column.header) : undefined}
                >{value ?? ''}</Cell>;
              })}</tr>
            ))}</tbody>
          </>
        )}
      </table>
      {hasSorting && <div className="usa-sr-only usa-table__announcement-region" aria-live="polite" />}
    </>
  );
  return scrollable
    ? <div className="usa-table-container--scrollable" tabIndex={0}
      style={scrollHeight ? { height: scrollHeight, overflow: 'auto' } : undefined}>{table}</div>
    : table;
}
