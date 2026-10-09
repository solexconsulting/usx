import React from 'react';
import ClassNames from 'classnames';

export interface SwapProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'active' | 'rotate' | 'flip';
  onContent?: React.ReactNode;
  offContent?: React.ReactNode;
  includeInput?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onClassName?: string;
  offClassName?: string;
}

const Swap: React.FC<SwapProps> = ({
  children = null,
  className = '',
  variant = 'default',
  onContent = 'ON',
  offContent = 'OFF',
  includeInput = true,
  inputProps = {},
  onClassName = '',
  offClassName = '',
  ...props
}) => {
  const variantClass = variant !== 'default' ? `usx-swap--${variant}` : '';
  const classes = ClassNames('usx-swap', variantClass, className);
  const onClasses = ClassNames('usx-swap-on', onClassName);
  const offClasses = ClassNames('usx-swap-off', offClassName);

  const content = children || (
    <>
      {includeInput ? <input type="checkbox" autoComplete="off" {...inputProps} /> : null}
      <span className={onClasses}>{onContent}</span>
      <span className={offClasses}>{offContent}</span>
    </>
  );

  return (
    <label className={classes} {...props}>
      {content}
    </label>
  );
};

export default Swap;
