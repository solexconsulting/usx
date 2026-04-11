import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Label from '../label/Label';
import './input.scss';

export default function Input({
  label,
  id,
  placeholder = 'Type here',
  error,
  success,
  disabled,
  hint='',
  required=false,
  screenReaderOnlyLabel=false,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const hasError = !!error;
  const hasSuccess = !!success;

  const inputClasses = 'usa-input usx-input';
  const inputErrorClasses = 'usa-input--error';
  const inputSuccessClasses = 'usa-input--success';

  const combinedInputClasses = ClassNames(
    inputClasses,
    hasError ? inputErrorClasses : hasSuccess ? inputSuccessClasses : null,
    className,
  );

  const describedByParts = [];
  if (hintId) describedByParts.push(hintId);
  if (hasError && typeof error === 'string') describedByParts.push(`${inputId}-error`);
  if (hasSuccess && typeof success === 'string') describedByParts.push(`${inputId}-success`);

  const inputProps = {
    id: inputId,
    className: combinedInputClasses,
    placeholder,
    disabled,
    required,
    'aria-describedby': describedByParts.length ? describedByParts.join(' ') : undefined,
    'aria-invalid': hasError ? 'true' : undefined,
    ...props,
  };

  return (
    <>
      <Label htmlFor={inputId} screenReaderOnly={screenReaderOnlyLabel} required={required} >
        {label}
      </Label>
      {hint && (
        <span id={hintId} className="usa-hint">
          {hint}
        </span>
      )}
      <input {...inputProps} />
      {hasError ? (
        <span id={`${inputId}-error`} className="usa-error-message" role="alert">
          {error}
        </span>
      ) : hasSuccess ? (
        <span id={`${inputId}-success`} className="usa-success-message" role="status">
          {success}
        </span>
      ) : null}
    </>
  );
}

Input.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  hint: PropTypes.string,
  screenReaderOnlyLabel: PropTypes.bool,
  className: PropTypes.string,
};