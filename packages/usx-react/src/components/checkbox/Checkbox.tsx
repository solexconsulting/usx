import React from 'react';
import ClassNames from 'classnames';
import Label from '../label/Label';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name?: string;
  value?: string;
  label?: string;
  ariaLabel?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  description?: string;
  tile?: boolean;
  small?: boolean;
  error?: string;
  success?: string;
  className?: string;
  labelClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  formGroup?: boolean;
}

export default function Checkbox({
  id,
  name,
  value,
  label = '',
  ariaLabel = '',
  checked,
  defaultChecked,
  disabled = false,
  description = '',
  tile = false,
  small = false,
  error,
  success,
  className = '',
  labelClassName = '',
  onChange,
  required = false,
  formGroup = true,
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

  const inputClasses = ClassNames('usa-checkbox__input', { 'usa-checkbox__input--tile': tile });

  const content = (
    <>
      <div className={divClasses} {...props}>
        <input
          className={inputClasses}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          aria-label={ariaLabel || undefined}
          {...(checked !== undefined && onChange
            ? { checked }
            : { defaultChecked: checked ?? defaultChecked })}
          disabled={disabled}
          required={required}
          {...(onChange ? { onChange } : {})}
        />
        <Label
          className={ClassNames('usa-checkbox__label', labelClassName)}
          classOverride={true}
          htmlFor={id}
          required={required}
        >
          {label}
          {description && <span className="usa-checkbox__label-description">{description}</span>}
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

  return formGroup ? <FormGroup error={hasError}>{content}</FormGroup> : content;
}
