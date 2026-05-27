import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

export interface TableGroupProps extends React.HTMLAttributes<HTMLTableRowElement> {
  label: React.ReactNode;
  groupKey?: string;
  expanded?: boolean;
  onToggle?: (key: string) => void;
  colSpan?: number;
  className?: string;
  children?: React.ReactNode;
}

const TableGroup: React.FC<TableGroupProps> = ({
  label,
  groupKey,
  expanded: expandedProp,
  onToggle: onToggleProp,
  colSpan,
  className = '',
  children,
  ...props
}) => {
  const { toggleGroup, isGroupExpanded, totalCols } = useTableContext();
  const isExpanded =
    expandedProp !== undefined ? expandedProp : (groupKey ? isGroupExpanded(groupKey) : true);
  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (onToggleProp && groupKey) {
      onToggleProp(groupKey);
    } else if (groupKey) {
      toggleGroup(groupKey);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
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
          <div className="usa-accordion">
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
};

export default TableGroup;
