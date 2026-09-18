import React from 'react';
import classnames from 'classnames';
import { useTableContext } from './TableContext';

// `onToggle` exists on HTMLAttributes as a DOM event; the group API redefines it.
export interface TableGroupProps extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'onToggle'> {
  /** Display label for the group header. */
  label: React.ReactNode;
  /** Unique key identifying this group (used for context-managed expand state). */
  groupKey: string;
  /** Controlled expanded state; omit to use the table's own group state. */
  expanded?: boolean;
  /** Controlled toggle handler. */
  onToggle?: (groupKey: string) => void;
  /** colSpan for the group header cell. Defaults to totalCols from context. */
  colSpan?: number;
}

/** Expandable group subheader row inside `<tbody>`. */
export default function TableGroup({
  label,
  groupKey,
  expanded: expandedProp,
  onToggle: onToggleProp,
  colSpan,
  className = '',
  children,
  ...props
}: TableGroupProps) {
  const { toggleGroup, isGroupExpanded, totalCols } = useTableContext();

  const isExpanded = expandedProp !== undefined ? expandedProp : isGroupExpanded(groupKey);

  const handleToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (onToggleProp) onToggleProp(groupKey);
    else toggleGroup(groupKey);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(e);
    }
  };

  return (
    <>
      <tr className={classnames('usx-table__group-row', className)} {...props}>
        <td colSpan={colSpan || totalCols || 1} className="usx-table__group-cell">
          <div className="usx-accordion usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
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
