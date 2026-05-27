import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import TableRow from './TableRow';
import TableGroup from './TableGroup';
import Icon from '../icon/Icon';
import Spinner from '../spinner/Spinner';

function OnMoreSentinel({ onMore }: { onMore: () => void }) {
  const sentinelRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (!onMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) onMore(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onMore]);
  return <tr ref={sentinelRef} className="usx-table__sentinel" aria-hidden="true"><td /></tr>;
}

function getDataLabel(col: any) {
  if (typeof col.header === 'string') return col.header;
  return col.stackLabel || null;
}

function getLeafCols(cols: any[]): any[] {
  return cols.reduce((acc: any[], col: any) => {
    if (col.hidden) return acc;
    if (col.columns?.length) return acc.concat(getLeafCols(col.columns));
    return acc.concat(col);
  }, []);
}

function DataRow({ row, rowIndex }: { row: any; rowIndex: number }) {
  const {
    columns,
    primaryKey,
    selectionMode,
    selectionPosition,
    isSelected,
    handleSelect,
    disabled: disabledKeys,
    responsive,
    rowDetails,
    toggleRow,
    isRowExpanded,
  } = useTableContext();
  const key = row[primaryKey];
  const selected = isSelected(key);
  const isDisabled = Array.isArray(disabledKeys) && disabledKeys.includes(key);
  const visibleCols = getLeafCols(columns);
  const hasRowDetails = !!rowDetails;
  const isExpanded = isRowExpanded(key);
  const renderDetail =
    typeof rowDetails === 'function'
      ? rowDetails
      : rowDetails?.render || null;
  const totalCols =
    visibleCols.length +
    (selectionMode ? 1 : 0) +
    (hasRowDetails ? 1 : 0);
  function handleToggleDetail(e: React.MouseEvent) {
    e.stopPropagation();
    toggleRow(key);
  }
  const inputProps = {
    type: selectionMode === 'radio' ? 'radio' : 'checkbox',
    className: selectionMode === 'radio' ? 'usx-table__radio' : 'usx-table__checkbox',
    checked: selected,
    disabled: isDisabled,
    'aria-label': `Select row ${rowIndex + 1}`,
    onChange: () => handleSelect(key),
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
  };
  const selectionCell = (
    <td
      key="__selection__"
      className="usx-table__cell usx-table__cell--selection"
    >
      <input {...inputProps} />
    </td>
  );
  const detailToggleCell = hasRowDetails ? (
    <td
      key="__detail-toggle__" className="usx-table__cell usx-table__cell--detail-toggle"
      onClick={handleToggleDetail}
    >
      <button
        type="button"
        className={classnames(
          'usa-button usa-button--unstyled',
          'usx-table__detail-toggle',
          'width-full',
          isExpanded && 'usx-table__detail-toggle--expanded',
        )}
        aria-expanded={isExpanded}
        aria-label={
          rowDetails?.expandLabel
            ? (typeof rowDetails.expandLabel === 'function'
                ? rowDetails.expandLabel(row)
                : rowDetails.expandLabel)
            : `${isExpanded ? 'Collapse' : 'Expand'} row details`
        }
      >
        <Icon
          name={isExpanded ? 'expand_less' : 'expand_more'}
          aria-hidden="true"
        />
      </button>
    </td>
  ) : null;
  const dataCells = visibleCols.map((col: any, colIndex: number) => {
    const isPrimary = col.primary || (colIndex === 0 && !columns.some((c: any) => c.primary));
    const Tag = isPrimary ? 'th' : 'td';
    const cellClasses = classnames(
      'usx-table__cell',
      col.align && `usx-table__cell--align-${col.align}`,
      col.className,
    );
    const dataLabel = (responsive === 'stack' || responsive === 'stack-header')
      ? getDataLabel(col)
      : null;
    const content = col.render ? col.render(row, rowIndex) : row[col.key];
    return (
      <Tag
        key={col.key}
        className={cellClasses}
        scope={isPrimary ? 'row' : undefined}
        data-label={dataLabel || undefined}
        style={col.width ? { width: col.width } : undefined}
      >
        {content ?? '--'}
      </Tag>
    );
  });
  const cells = [] as React.ReactNode[];
  if (hasRowDetails) cells.push(detailToggleCell);
  if (selectionMode && selectionPosition === 'left') cells.push(selectionCell);
  cells.push(...dataCells);
  if (selectionMode && selectionPosition === 'right') cells.push(selectionCell);
  return (
    <>
      <TableRow
        rowData={row}
        selected={selected}
        disabled={isDisabled}
      >
        {cells}
      </TableRow>
      {hasRowDetails && isExpanded && renderDetail && (
        <tr className="usx-table__detail-row">
          <td
            className="usx-table__detail-cell"
            colSpan={totalCols}
          >
            {renderDetail(row)}
          </td>
        </tr>
      )}
    </>
  );
}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children?: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ className = '', children, ...props }) => {
  const { data, primaryKey, groupBy, groups, placeholder, totalCols, onMore, loading } = useTableContext();
  if (children) {
    return (
      <tbody className={classnames('usx-table__body', className)} {...props}>
        {children}
      </tbody>
    );
  }
  const placeholderRow =
    data.length === 0 && placeholder ? (
      <tr className="usx-table__placeholder-row">
        <td className="usx-table__placeholder-cell" colSpan={totalCols}>
          {placeholder}
        </td>
      </tr>
    ) : null;
  const sentinel = onMore ? <OnMoreSentinel onMore={onMore} /> : null;
  const loadingRow = loading ? (
    <tr className="usx-table__loading-row" aria-live="polite">
      <td className="usx-table__loading-cell" colSpan={totalCols}>
        <Spinner size={3} label="Loading more rows…" />
      </td>
    </tr>
  ) : null;
  if (!groupBy) {
    return (
      <tbody className={classnames('usx-table__body', className)} {...props}>
        {placeholderRow}
        {data.map((row: any, rowIndex: number) => (
          <DataRow key={row[primaryKey] ?? rowIndex} row={row} rowIndex={rowIndex} />
        ))}
        {loadingRow}
        {sentinel}
      </tbody>
    );
  }
  return (
    <tbody className={classnames('usx-table__body', className)} {...props}>
      {placeholderRow}
      {(groups || []).map(({ key, rows }: any) => (
        <TableGroup key={key} groupKey={key} label={key}>
          {rows.map((row: any, rowIndex: number) => (
            <DataRow key={row[primaryKey] ?? rowIndex} row={row} rowIndex={rowIndex} />
          ))}
        </TableGroup>
      ))}
      {loadingRow}
      {sentinel}
    </tbody>
  );
};

export default TableBody;
