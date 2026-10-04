import React from 'react';
import classNames from 'classnames';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  label,
  position = 'top',
  children,
  className = '',
  bodyClassName = '',
  ...props
}) => {
  const validPositions = ['top', 'bottom', 'left', 'right'] as const;
  const normalizedPosition = validPositions.includes(position) ? position : 'top';
  return (
    <span className={classNames('usx-tooltip', className)} {...props}>
      {children}
      <span
        className={classNames('usa-tooltip__body', `usa-tooltip__body--${normalizedPosition}`, bodyClassName)}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
