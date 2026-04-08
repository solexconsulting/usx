import React from 'react';
import ClassNames from 'classnames';
import Required from '../required/Required';
import './label.scss';

export default function Label({
  htmlFor,
  required = false,
  children = null,
  screenReaderOnly = false,
  className = '',
  classOverride = false,
  ...props
}) {
  const classes = ClassNames(
    'usa-label',
    'usx-label',
    { 'usa-sr-only': screenReaderOnly },
    className
  );

  return (
    <label
      className={classOverride ? className : classes}
      {...htmlFor ? { htmlFor } : {} }
      {...props}
    >
      {required && <Required />}
      {children}
    </label>
  );
}
