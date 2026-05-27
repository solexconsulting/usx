import React, { ReactNode, HTMLAttributes } from 'react';
import ClassNames from 'classnames';
import Required from '../required/Required';
import './legend.scss';

export interface LegendProps extends HTMLAttributes<HTMLLegendElement> {
  text?: string | undefined;
  required?: boolean;
  large?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function Legend({
  text,
  required = false,
  large = false,
  children = null,
  className = '',
  ...props
}: LegendProps) {
  const classes = ClassNames(
    'usa-legend',
    'usx-legend',
    { 'usa-legend--large': large },
    className
  );

  return (
    <legend className={classes} {...props}>
      {required && <Required />}
      {children || text}
    </legend>
  );
}
