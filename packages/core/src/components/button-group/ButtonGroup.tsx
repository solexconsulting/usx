import React from 'react';
import ClassNames from 'classnames';
import Button from '../button/Button';
import type { ButtonProps } from '../button/Button';
import './button-group.scss';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: ButtonProps[];
  segmented?: boolean;
  className?: string;
}

export default function ButtonGroup({
  items = [],
  segmented = false,
  className = '',
  ...props
}: ButtonGroupProps) {
  const classes = ClassNames(
    'usa-button-group usx-button-group',
    segmented && 'usa-button-group--segmented',
    className
  );
  return (
    <ul className={classes} {...props}>
      {items.map((item, index) => (
        <li key={index} className="usa-button-group__item">
          <Button {...item}>
            {item.children}
          </Button>
        </li>
      ))}
    </ul>
  );
}
