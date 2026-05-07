import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

/**
 * TableRow — renders a <tr> element.
 *
 * In data-driven mode this is created internally. In compound component mode
 * the consumer renders it directly.
 */
export default function TableRow({
  rowData = null,
  selected = false,
  disabled = false,
  className = '',
  onClick,
  children,
  ...props
}) {
  const { onClickRow } = useTableContext();

  const isClickable = !!(onClick || onClickRow);
  const classes = classnames(
    'usx-table__row',
    selected && 'usx-table__row--selected',
    disabled && 'usx-table__row--disabled',
    isClickable && !disabled && 'usx-table__row--clickable',
    className,
  );

  function handleClick(e) {
    if (disabled) return;
    if (onClick) onClick(e);
    if (onClickRow && rowData) onClickRow(rowData, e);
  }

  function handleKeyDown(e) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  }

  const interactiveProps =
    isClickable && !disabled
      ? {
          tabIndex: 0,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
        }
      : {};

  return (
    <tr className={classes} {...interactiveProps} {...props}>
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  /** The data object for this row (passed to onClickRow). */
  rowData: PropTypes.object,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
