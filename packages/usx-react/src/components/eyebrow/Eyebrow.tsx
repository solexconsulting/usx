import React from 'react';
import ClassNames from 'classnames';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children = null, className = '', ...props }: EyebrowProps) {
  const classes = ClassNames('usx-eyebrow', className);
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
