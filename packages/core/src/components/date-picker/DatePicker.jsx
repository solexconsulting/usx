import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Required from '../required/Required';

export default function DatePicker({
  id = 'date-picker',
  name,
  label = null,
  hint = null,
  error = null,
  disabled = false,
  required = false,
  defaultValue = null,
  minDate = null,
  maxDate = null,
  rangeDate = null,
  className = '',
  ...props
}) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={classNames('usa-form-group', 'usx-form-group', { 'usa-form-group--error': !!error })}>
      {label && (
        <label className="usa-label usx-label" id={labelId} htmlFor={id}>
          {required && <Required />}
          {label}
        </label>
      )}
      {hint && (
        <div className="usa-hint usx-hint" id={hintId}>
          {hint}
        </div>
      )}
      {error && (
        <span className="usa-error-message usx-error-message" id={errorId} role="alert">
          {error}
        </span>
      )}
      <div
        className={classNames('usa-date-picker', 'usx-date-picker', className)}
        {...(defaultValue ? { 'data-default-value': defaultValue } : {})}
        {...(minDate ? { 'data-min-date': minDate } : {})}
        {...(maxDate ? { 'data-max-date': maxDate } : {})}
        {...(rangeDate ? { 'data-range-date': rangeDate } : {})}
      >
        <input
          className="usa-input usx-input"
          id={id}
          name={name || id}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
    </div>
  );
}

DatePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  hint: PropTypes.node,
  error: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  rangeDate: PropTypes.string,
  className: PropTypes.string,
};
