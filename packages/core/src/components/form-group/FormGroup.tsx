import React from 'react';
import ClassNames from 'classnames';
import './form-group.scss';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  className?: string;
}

export default function FormGroup({ children = null, className = '', error = false, ...props }: FormGroupProps) {
  const classes = ClassNames(
    'usa-form-group',
    'usx-form-group',
    {
      'usa-form-group--error': error,
    },
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
