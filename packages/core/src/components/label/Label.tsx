import React, { ReactNode, LabelHTMLAttributes } from 'react';
import ClassNames from 'classnames';
import Required from '../required/Required';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
  error?: unknown;
  children?: ReactNode;
  screenReaderOnly?: boolean;
  className?: string;
  classOverride?: boolean;
}

export default function Label({
  htmlFor,
  required = false,
  error = false,
  children = null,
  screenReaderOnly = false,
  className = '',
  classOverride = false,
  ...props
}: LabelProps) {
  const classes = ClassNames(
    'usa-label',
    'usx-label',
    { 'usa-sr-only': screenReaderOnly, 'usa-label--error': !!error },
    className
  );

  return (
    <label
      className={classOverride ? className : classes}
      {...(htmlFor ? { htmlFor } : {})}
      {...props}
    >
      {required && <Required />}
      {children}
    </label>
  );
}
