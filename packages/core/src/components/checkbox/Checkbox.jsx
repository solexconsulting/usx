import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Label from '../label/Label';
import './checkbox.scss';

export default function Checkbox({
  id,
  name,
  value,
  label,
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
}) {

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
        <span className="usa-error-message" role="alert">
          {error}
        </span>
      ) : hasSuccess ? (
        <span className="usa-success-message text-success" role="status">
          {success}
        </span>
      ) : null}
    </>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  tile: PropTypes.bool,
  small: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};
