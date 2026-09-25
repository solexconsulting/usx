import React from 'react';
import ClassNames from 'classnames';
import Legend from '../legend/Legend';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode;
  largeLegend?: boolean;
  required?: boolean;
  disabled?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  hintId?: string;
  errorId?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Fieldset({
  legend = null,
  largeLegend = false,
  required = false,
  disabled = false,
  hint = null,
  error = null,
  hintId,
  errorId,
  children = null,
  className = '',
  ...props
}: FieldsetProps) {
  const classes = ClassNames(
    'usa-fieldset',
    'usx-fieldset',
    className
  );

  return (
    <fieldset className={classes} {...(disabled ? { disabled: true } : {})} {...props}>
      {legend && (
        <Legend
          text={legend}
          required={required}
          large={largeLegend}
          className={error ? 'usa-label--error' : undefined}
        />
      )}
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      {children}
    </fieldset>
  );
}
