import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * TableCell — renders a <td> or <th> element.
 *
 * Used both by the compound component API and internally by data-driven rendering.
 */
export default function TableCell({
  as: Tag = 'td',
  align,
  headerAlign,
  colSpan,
  rowSpan,
  scope,
  pin = false,
  dataLabel,
  className = '',
  children,
  ...props
}) {
  const resolvedAlign = Tag === 'th' ? (headerAlign || align) : align;
  const classes = classnames(
    'usx-table__cell',
    resolvedAlign && `usx-table__cell--align-${resolvedAlign}`,
    pin && 'usx-table__cell--pin',
    className,
  );

  return (
    <Tag
      className={classes}
      colSpan={colSpan}
      rowSpan={rowSpan}
      scope={scope}
      data-label={dataLabel}
      {...props}
    >
      {children}
    </Tag>
  );
}

TableCell.propTypes = {
  as: PropTypes.oneOf(['td', 'th']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  headerAlign: PropTypes.oneOf(['left', 'center', 'right']),
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
  scope: PropTypes.string,
  pin: PropTypes.bool,
  dataLabel: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};
