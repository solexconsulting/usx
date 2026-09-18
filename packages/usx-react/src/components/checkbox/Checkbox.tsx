import React from 'react';
import ClassNames from 'classnames';
import Label from '../label/Label';
import ErrorMessage from '../error-message/ErrorMessage';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name?: string;
  value?: string;
  label?: string;
  ariaLabel?: string;
  checked?: boolean;
  disabled?: boolean;
  description?: string;
  tile?: boolean;
  small?: boolean;
  error?: string;
  success?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

export default function Checkbox({
  id,
  name,
  value,
  label = '',
  ariaLabel = '',
  checked = false,
  disabled = false,
  description = null,
  tile = false,
  small = false,
  error,
  success,
  className = '',
  onChange,
  required = false,
  ...props
}: CheckboxProps) {
  const hasError = !!error;
  const hasSuccess = !!success;

  const divClasses = ClassNames(
    'usa-checkbox',
    'usx-checkbox',
    { 'usx-checkbox--small': small },
    className
  );

  const inputClasses = ClassNames(
    'usa-checkbox__input',
    { 'usa-checkbox__input--tile': tile }
  );

  return (
    <>
      <div className={divClasses} {...props}>
        <input
          className={inputClasses}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          aria-label={ariaLabel}
          defaultChecked={checked}
          disabled={disabled}
          required={required}
          {...(onChange ? { onChange } : {})}
        />
        <Label className="usa-checkbox__label" classOverride={true} htmlFor={id} required={required}>
          {label}
          {description && (
            <span className="usa-checkbox__label-description">
              {description}
            </span>
          )}
        </Label>
      </div>
      {hasError ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : hasSuccess ? (
        <span className="usa-success-message text-success" role="status">
          {success}
        </span>
      ) : null}
    </>
  );
}
