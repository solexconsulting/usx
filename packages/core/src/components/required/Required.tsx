import React from 'react';
import './required.scss';
import ClassNames from 'classnames';

export interface RequiredProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const Required: React.FC<RequiredProps> = ({
  title = 'Required',
  children = null,
  className = '',
  ...props
}) => {
  const classes = ClassNames('usx-required', className);
  return (
    <>
      <abbr title={title} className={classes} {...props}>*</abbr>
      {children ? children : ''}
    </>
  );
};

export default Required;
