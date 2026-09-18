import React, { ReactNode, HTMLAttributes } from 'react';
import ClassNames from 'classnames';

export interface HintProps extends HTMLAttributes<HTMLSpanElement> {
  id?: string;
  children?: ReactNode;
  className?: string;
}

export default function Hint({
  id,
  children = null,
  className = '',
  ...props
}: HintProps) {
  const classes = ClassNames('usa-hint', 'usx-hint', className);

  return (
    <span className={classes} {...(id ? { id } : {})} {...props}>
      {children}
    </span>
  );
}
