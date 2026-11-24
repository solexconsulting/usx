import React from 'react';
import ClassNames from 'classnames';

export interface SwapProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'active' | 'rotate' | 'flip';
  /** Button mode toggles aria-pressed and swaps content after JavaScript enhancement. */
  as?: 'label' | 'button';
  /** Initial state for button mode. */
  defaultPressed?: boolean;
  /** Stable accessible name for button mode. */
  ariaLabel?: string;
  disabled?: boolean;
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
  as = 'label',
  defaultPressed = false,
  ariaLabel,
  disabled = false,
  onContent = 'ON',
  offContent = 'OFF',
  includeInput = true,
  inputProps = {},
  onClassName = '',
  offClassName = '',
  ...props
}) => {
  const variantClass = variant !== 'default' ? `usx-swap--${variant}` : '';
  const classes = ClassNames(
    'usx-swap',
    variantClass,
    as === 'button' && 'usa-button usx-button usx-swap--button',
    className
  );
  const onClasses = ClassNames('usx-swap-on', onClassName);
  const offClasses = ClassNames('usx-swap-off', offClassName);

  const content = children || (
    <>
      {as === 'label' && includeInput ? (
        <input type="checkbox" autoComplete="off" {...inputProps} />
      ) : null}
      <span className={onClasses}>{onContent}</span>
      <span className={offClasses}>{offContent}</span>
    </>
  );

  if (as === 'button') {
    return (
      <button
        type="button"
        className={classes}
        aria-pressed={defaultPressed}
        aria-label={ariaLabel}
        disabled={disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
  return (
    <label className={classes} {...props}>
      {content}
    </label>
  );
};

export default Swap;
