import React, { ReactNode, HTMLAttributes } from 'react';
import ClassNames from 'classnames';

export interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
  id?: string;
  children?: ReactNode;
  className?: string;
}

export default function ErrorMessage({
  id,
  children = null,
  className = '',
  ...props
}: ErrorMessageProps) {
  const classes = ClassNames('usa-error-message', 'usx-error-message', className);

  return (
    <span className={classes} role="alert" {...(id ? { id } : {})} {...props}>
      {children}
    </span>
  );
}
