import React from 'react';
import classNames from 'classnames';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  label,
  position = 'top',
  children,
  className = '',
  ...props
}) => {
  const validPositions = ['top', 'bottom', 'left', 'right'] as const;
  const normalizedPosition = validPositions.includes(position) ? position : 'top';
  return (
    <span className={classNames('usx-tooltip', className)} {...props}>
      {children}
      <span
        className={`usa-tooltip__body usa-tooltip__body--${normalizedPosition}`}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
