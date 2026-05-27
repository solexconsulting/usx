import React from 'react';
import './swap.scss';

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
  const classes = ['usx-swap', variantClass, className].filter(Boolean).join(' ');
  const onClasses = ['usx-swap-on', onClassName].filter(Boolean).join(' ');
  const offClasses = ['usx-swap-off', offClassName].filter(Boolean).join(' ');

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
