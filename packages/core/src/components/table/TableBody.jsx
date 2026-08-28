import React, { useRef, useEffect, useId } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTableContext } from './TableContext';
import TableRow from './TableRow';
import TableGroup from './TableGroup';
import Icon from '../icon/Icon';
import Spinner from '../spinner/Spinner';
import Checkbox from '../checkbox/Checkbox';

// ─── Infinite scroll sentinel ─────────────────────────────────────────────────

function OnMoreSentinel({ onMore }) { // eslint-disable-line react/prop-types
  const sentinelRef = useRef(null);
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Get the string value to use for a data-label attribute from a column header. */
function getDataLabel(col) {
  if (typeof col.header === 'string') return col.header;
  return col.stackLabel || null;
}

/**
 * Recursively collect only leaf columns (columns with no `columns` children).
 * Parent/group columns exist only in the header; body cells are rendered for
 * leaf columns exclusively.
 */
function getLeafCols(cols) {
  return cols.reduce((acc, col) => {
    if (col.hidden) return acc;
    if (col.columns?.length) return acc.concat(getLeafCols(col.columns));
    return acc.concat(col);
  }, []);
}

// ─── Single data row ─────────────────────────────────────────────────────────

function DataRow({ row, rowIndex }) { // eslint-disable-line react/prop-types
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
  const key = row[primaryKey];
  const selected = isSelected(key);
  const isDisabled = Array.isArray(disabledKeys) && disabledKeys.includes(key);
  // Only leaf columns produce body cells; parent group columns are header-only.
  const visibleCols = getLeafCols(columns);
  const hasRowDetails = !!rowDetails;
  const isExpanded = isRowExpanded(key);

  // Render function: (row) => ReactNode
  const renderDetail =
    typeof rowDetails === 'function'
      ? rowDetails
      : rowDetails?.render || null;

  // Total columns including aux columns
  const totalCols =
    visibleCols.length +
    (selectionMode ? 1 : 0) +
    (hasRowDetails ? 1 : 0);

  function handleToggleDetail(e) {
    e.stopPropagation();
    toggleRow(key);
  }

  const isRadio = selectionMode === 'radio';
  const selectionInputId = `${selectionUidPrefix}-select`;

  // Real USWDS checkbox/radio visuals are drawn on the `<label>` (via ::before),
  // not the input — use the actual `Checkbox` component (same as TableHead's
  // "select all") so row checkboxes get identical, correctly-themed markup
  // rather than a hand-rolled approximation. `Checkbox` is internally
  // uncontrolled (`defaultChecked`), so key it on the selected state to force
  // a remount whenever selection changes programmatically (e.g. "select all").
  const selectionCell = (
    <td
      key="__selection__"
      className="usx-table__cell usx-table__cell--selection"
    >
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
        //onClick={handleToggleDetail}
      >
        <Icon
          name={isExpanded ? 'expand_less' : 'expand_more'}
          aria-hidden="true"
        />
      </button>
    </td>
  ) : null;

  const dataCells = visibleCols.map((col, colIndex) => {
    const isPrimary = col.primary;
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

  const cells = [];
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

      {/* Expanded detail row */}
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

// ─── TableBody ───────────────────────────────────────────────────────────────

/**
 * TableBody — renders <tbody>.
 *
 * Compound mode: pass children directly.
 * Data-driven mode: renders rows from context.data, respecting groups.
 */
export default function TableBody({ className = '', children, ...props }) {
  const { data, primaryKey, groupBy, groups, placeholder, totalCols, onMore, loading } = useTableContext();

  // Compound component mode — activated when children are explicitly passed.
  // In data-driven mode Table.jsx calls <TableBody /> with no children at all,
  // so this branch is never reached in that path.
  if (children) {
    return (
      <tbody className={classnames('usx-table__body', className)} {...props}>
        {children}
      </tbody>
    );
  }

  // Placeholder row when data is empty
  const placeholderRow =
    data.length === 0 && placeholder ? (
      <tr className="usx-table__placeholder-row">
        <td className="usx-table__placeholder-cell" colSpan={totalCols}>
          {placeholder}
        </td>
      </tr>
    ) : null;

  // Sentinel row for infinite scroll
  const sentinel = onMore ? <OnMoreSentinel onMore={onMore} /> : null;

  // Loading row — shown while the next batch of data is being fetched
  const loadingRow = loading ? (
    <tr className="usx-table__loading-row" aria-live="polite">
      <td className="usx-table__loading-cell" colSpan={totalCols}>
        <Spinner size={3} label="Loading more rows…" />
      </td>
    </tr>
  ) : null;

  // Data-driven flat mode
  if (!groupBy) {
    return (
      <tbody className={classnames('usx-table__body', className)} {...props}>
        {placeholderRow}
        {data.map((row, rowIndex) => (
          <DataRow key={row[primaryKey] ?? rowIndex} row={row} rowIndex={rowIndex} />
        ))}
        {loadingRow}
        {sentinel}
      </tbody>
    );
  }

  // Data-driven grouped mode
  return (
    <tbody className={classnames('usx-table__body', className)} {...props}>
      {placeholderRow}
      {(groups || []).map(({ key, rows }) => (
        <TableGroup key={key} groupKey={key} label={key}>
          {rows.map((row, rowIndex) => (
            <DataRow key={row[primaryKey] ?? rowIndex} row={row} rowIndex={rowIndex} />
          ))}
        </TableGroup>
      ))}
      {loadingRow}
      {sentinel}
    </tbody>
  );
}

TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
