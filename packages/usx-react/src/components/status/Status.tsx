import React from 'react';
import ClassNames from 'classnames';

export interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'primary' | 'accent-cool' | 'accent-warm' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animation?: 'ping' | 'pulse' | 'bounce';
  className?: string;
}

const Status: React.FC<StatusProps> = ({
  color = undefined,
  size = undefined,
  animation = undefined,
  className = '',
  ...props
}) => {
  const classes = ClassNames(
    'usx-status',
    color && `text-${color}`,
    size && `usx-status--${size}`,
    animation && `usx-${animation}`,
    className
  );
  return <span className={classes} {...props} />;
};

export default Status;
