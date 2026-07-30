import React from 'react';
import ClassNames from 'classnames';
import Legend from '../legend/Legend';

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string | null;
  largeLegend?: boolean;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function Fieldset({
  legend = null,
  largeLegend = false,
  required = false,
  disabled = false,
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
      {legend && <Legend text={legend} required={required} large={largeLegend} />}
      {children}
    </fieldset>
  );
}
