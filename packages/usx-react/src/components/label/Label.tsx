import React, { ReactNode, LabelHTMLAttributes } from 'react';
import ClassNames from 'classnames';
import Required from '../required/Required';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  id?: string;
  htmlFor?: string;
  required?: boolean;
  error?: unknown;
  children?: ReactNode;
  screenReaderOnly?: boolean;
  className?: string;
  classOverride?: boolean;
}

export default function Label({
  id,
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
      id={id || undefined}
      className={classOverride ? className : classes}
      htmlFor={htmlFor || undefined}
      {...props}
    >
      {required && <Required />}
      {children}
    </label>
  );
}
