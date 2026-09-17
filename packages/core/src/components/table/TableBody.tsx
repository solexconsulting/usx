import React, { useRef, useEffect, useId } from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import TableRow from './TableRow';
import TableGroup from './TableGroup';
import Icon from '../icon/Icon';
import Spinner from '../spinner/Spinner';
import Checkbox from '../checkbox/Checkbox';
import type { RowKey, TableColumn, TableRowData } from './types';

// ─── Infinite scroll sentinel ─────────────────────────────────────────────────

function OnMoreSentinel({ onMore }: { onMore: () => void }) {
  const sentinelRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onMore]);
  return (
    <tr ref={sentinelRef} className="usx-table__sentinel" aria-hidden="true">
      <td />
    </tr>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDataLabel(col: TableColumn): string | undefined {
  if (typeof col.header === 'string') return col.header;
  return col.stackLabel;
}

// Parent/group columns exist only in the header; body cells render for leaves only.
function getLeafCols(cols: TableColumn[]): TableColumn[] {
  return cols.reduce<TableColumn[]>((acc, col) => {
    if (col.hidden) return acc;
    if (col.columns?.length) return acc.concat(getLeafCols(col.columns));
    return acc.concat(col);
  }, []);
}

// ─── Single data row ─────────────────────────────────────────────────────────

function DataRow({ row, rowIndex }: { row: TableRowData; rowIndex: number }) {
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

  const selectionUidPrefix = useId();
  const key = row[primaryKey] as RowKey;
  const selected = isSelected(key);
  const isDisabled = Array.isArray(disabledKeys) && disabledKeys.includes(key);
  const visibleCols = getLeafCols(columns);
  const hasRowDetails = !!rowDetails;
  const isExpanded = isRowExpanded(key);

  const renderDetail = typeof rowDetails === 'function' ? rowDetails : rowDetails?.render || null;
  const expandLabel = rowDetails && typeof rowDetails === 'object' ? rowDetails.expandLabel : undefined;

  const totalCols = visibleCols.length + (selectionMode ? 1 : 0) + (hasRowDetails ? 1 : 0);

  function handleToggleDetail(e: React.MouseEvent) {
    e.stopPropagation();
    toggleRow(key);
  }

  const isRadio = selectionMode === 'radio';
  const selectionInputId = `${selectionUidPrefix}-select`;

  // Real USWDS checkbox visuals are drawn on the <label> (::before), so use the
  // Checkbox component for identical themed markup. It is internally
  // uncontrolled (defaultChecked), so key it on the selected state to force a
  // remount whenever selection changes programmatically (e.g. "select all").
  const selectionCell = (
    <td key="__selection__" className="usx-table__cell usx-table__cell--selection">
      {isRadio ? (
        <div className="usa-radio usx-table__radio">
          <input
            type="radio"
            id={selectionInputId}
            className="usa-radio__input"
            checked={selected}
            disabled={isDisabled}
            aria-label={`Select row ${rowIndex + 1}`}
            onChange={() => handleSelect(key)}
            onClick={(e) => e.stopPropagation()}
          />
          <label className="usa-radio__label" htmlFor={selectionInputId} />
        </div>
      ) : (
        <Checkbox
          key={selected ? 'checked' : 'unchecked'}
          id={selectionInputId}
          checked={selected}
          disabled={isDisabled}
          ariaLabel={`Select row ${rowIndex + 1}`}
          onChange={() => handleSelect(key)}
          onClick={(e) => e.stopPropagation()}
          className="usx-table__checkbox"
        />
      )}
    </td>
  );

  const detailToggleCell = hasRowDetails ? (
    <td key="__detail-toggle__" className="usx-table__cell usx-table__cell--detail-toggle" onClick={handleToggleDetail}>
      <button
        type="button"
        className={classnames(
          'usa-button usa-button--unstyled',
          'usx-table__detail-toggle',
          'width-full',
          isExpanded && 'usx-table__detail-toggle--expanded'
        )}
        aria-expanded={isExpanded}
        aria-label={
          expandLabel
            ? typeof expandLabel === 'function'
              ? expandLabel(row)
              : expandLabel
            : `${isExpanded ? 'Collapse' : 'Expand'} row details`
        }
      >
        <Icon name={isExpanded ? 'expand_less' : 'expand_more'} aria-hidden="true" />
      </button>
    </td>
  ) : null;

  const dataCells = visibleCols.map((col) => {
    const Tag = col.primary ? 'th' : 'td';
    const cellClasses = classnames('usx-table__cell', col.align && `usx-table__cell--align-${col.align}`, col.className);
    const dataLabel = responsive === 'stack' || responsive === 'stack-header' ? getDataLabel(col) : undefined;
    const content = col.render ? col.render(row, rowIndex) : (row[col.key] as React.ReactNode);

    return (
      <Tag
        key={col.key}
        className={cellClasses}
        scope={col.primary ? 'row' : undefined}
        data-label={dataLabel}
        style={col.width ? { width: col.width } : undefined}
      >
        {content ?? '--'}
      </Tag>
    );
  });

  const cells: React.ReactNode[] = [];
  if (detailToggleCell) cells.push(detailToggleCell);
  if (selectionMode && selectionPosition === 'left') cells.push(selectionCell);
  cells.push(...dataCells);
  if (selectionMode && selectionPosition === 'right') cells.push(selectionCell);

  return (
    <>
      <TableRow rowData={row} selected={selected} disabled={isDisabled}>
        {cells}
      </TableRow>

      {hasRowDetails && isExpanded && renderDetail && (
        <tr className="usx-table__detail-row">
          <td className="usx-table__detail-cell" colSpan={totalCols}>
            {renderDetail(row)}
          </td>
        </tr>
      )}
    </>
  );
}

// ─── TableBody ───────────────────────────────────────────────────────────────

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

/**
 * Renders `<tbody>`. Compound mode: pass children directly. Data-driven mode:
 * renders rows from the table's data, respecting groups.
 */
export default function TableBody({ className = '', children, ...props }: TableBodyProps) {
  const { data, primaryKey, groupBy, groups, placeholder, totalCols, onMore, loading } = useTableContext();
  const bodyClass = classnames('usx-table__body', className);

  if (children) {
    return (
      <tbody className={bodyClass} {...props}>
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

  const renderRows = (rows: TableRowData[]) =>
    rows.map((row, rowIndex) => <DataRow key={(row[primaryKey] as RowKey) ?? rowIndex} row={row} rowIndex={rowIndex} />);

  if (!groupBy) {
    return (
      <tbody className={bodyClass} {...props}>
        {placeholderRow}
        {renderRows(data)}
        {loadingRow}
        {sentinel}
      </tbody>
    );
  }

  return (
    <tbody className={bodyClass} {...props}>
      {placeholderRow}
      {(groups || []).map(({ key, rows }) => (
        <TableGroup key={key} groupKey={key} label={key}>
          {renderRows(rows)}
        </TableGroup>
      ))}
      {loadingRow}
      {sentinel}
    </tbody>
  );
}
