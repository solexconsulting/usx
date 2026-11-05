import React from 'react';
import ClassNames from 'classnames';
import Checkbox, { type CheckboxProps } from '../checkbox/Checkbox';

export type SwitchProps = CheckboxProps & { color?: string };

/** A checkbox with a switch-shaped control. Its form behavior is Checkbox's behavior. */
export default function Switch({ className, labelClassName, color, ...props }: SwitchProps) {
  return (
    <Checkbox
      {...props}
      className={ClassNames('usx-switch', className)}
      labelClassName={ClassNames(labelClassName, color && `before-${color}`)}
    />
  );
}
