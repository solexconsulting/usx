import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

/**
 * TableGroup — renders an expandable group subheader row inside <tbody>.
 *
 * Used both by data-driven mode (internally) and compound component mode.
 */
export default function TableGroup({
  label,
  groupKey,
  expanded: expandedProp,
  onToggle: onToggleProp,
  colSpan,
  className = '',
  children,
  ...props
}) {
  const { toggleGroup, isGroupExpanded, totalCols } = useTableContext();

  // Support uncontrolled (via context) or fully controlled (via props)
  const isExpanded =
    expandedProp !== undefined ? expandedProp : isGroupExpanded(groupKey);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (onToggleProp) {
      onToggleProp(groupKey);
    } else {
      toggleGroup(groupKey);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(e);
    }
  };

  const classes = classnames('usx-table__group-row', className);

  return (
    <>
      <tr className={classes} {...props}>
        <td
          colSpan={colSpan || totalCols || 1}
          className="usx-table__group-cell"
        >
          <div
            className="usx-accordion usa-accordion"
          >
            <h4 className="usa-accordion__heading">
                <button
                    className="usa-accordion__button usx-table__group-toggle"
                    aria-expanded={isExpanded}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                >
                    {label}
                </button>
            </h4>
          </div>
        </td>
      </tr>
      {isExpanded && children}
    </>
  );
}

TableGroup.propTypes = {
  /** Display label for the group header. */
  label: PropTypes.node.isRequired,
  /** Unique key identifying this group (used for context-managed expand state). */
  groupKey: PropTypes.string,
  /** Controlled expanded state. */
  expanded: PropTypes.bool,
  /** Controlled toggle handler. */
  onToggle: PropTypes.func,
  /** colSpan for the group header cell. Defaults to totalCols from context. */
  colSpan: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node,
};
