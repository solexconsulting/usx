import React from 'react';
import ClassNames from 'classnames';
import Button from '../button/Button';
import type { ButtonProps } from '../button/Button';

export type ButtonGroupItemProps = ButtonProps & {
  itemClassName?: string;
};

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  buttonProps?: ButtonGroupItemProps[];
  segmented?: boolean;
  className?: string;
}

export default function ButtonGroup({
  buttonProps = [],
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
      {buttonProps.map(({ itemClassName, ...item }, index) => (
        <li key={index} className={ClassNames('usa-button-group__item', itemClassName)}>
          <Button {...item}>
            {item.children}
          </Button>
        </li>
      ))}
    </ul>
  );
}
