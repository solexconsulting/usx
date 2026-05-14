import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Label from '../label/Label';
import './text-area.scss';

export default function TextArea({
  label = null,
  id,
  placeholder = '',
  disabled = false,
  required = false,
  defaultValue = '',
  hint = null,
  screenReaderOnlyLabel = false,
  error = null,
  success = null,
  className = '',
  ...props
}) {
  const textAreaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  const hasSuccess = !!success;
  const classes = ClassNames(
    'usa-textarea', 'usx-textarea',
    hasError ? 'usa-input--error' : hasSuccess ? 'usa-input--success' : null,
    className,
  );
  const hintId = hint ? `${textAreaId}-hint` : undefined;

  const describedByParts = [];
  if (hintId) describedByParts.push(hintId);
  if (hasError && typeof error === 'string') describedByParts.push(`${textAreaId}-error`);
  if (hasSuccess && typeof success === 'string') describedByParts.push(`${textAreaId}-success`);

  return (
    <>
      {label && (
        <Label htmlFor={textAreaId} required={required} screenReaderOnly={screenReaderOnlyLabel}>
          {label}
        </Label>
      )}
      {hint && (
        <span id={hintId} className="usa-hint">
          {hint}
        </span>
      )}
      <textarea
        id={textAreaId}
        className={classes}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        {...(required ? { required: true } : {})}
        aria-describedby={describedByParts.length ? describedByParts.join(' ') : undefined}
        aria-invalid={hasError ? 'true' : undefined}
        {...props}
      />
      {hasError && typeof error === 'string' && (
        <span id={`${textAreaId}-error`} className="usa-error-message" role="alert">
          {error}
        </span>
      )}
      {hasSuccess && typeof success === 'string' && (
        <span id={`${textAreaId}-success`} className="usa-success-message" role="status">
          {success}
        </span>
      )}
    </>
  );
}

TextArea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  hint: PropTypes.string,
  screenReaderOnlyLabel: PropTypes.bool,
  className: PropTypes.string,
};
