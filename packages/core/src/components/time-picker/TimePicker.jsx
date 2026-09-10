import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Required from '../required/Required';

export default function TimePicker({
  id = 'appointment-time',
  name,
  label = null,
  hint = null,
  error = null,
  disabled = false,
  ariaDisabled = false,
  required = false,
  defaultValue = null,
  minTime = null,
  maxTime = null,
  step = null,
  className = '',
  ...props
}) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [label ? labelId : undefined, hintId, errorId].filter(Boolean).join(' ') || undefined;

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
        className={classNames('usa-time-picker', 'usx-time-picker', className)}
        {...(minTime ? { 'data-min-time': minTime } : {})}
        {...(maxTime ? { 'data-max-time': maxTime } : {})}
        {...(step ? { 'data-step': step } : {})}
      >
        <input
          className="usa-input usx-input"
          id={id}
          name={name || id}
          type="text"
          aria-describedby={describedBy}
          defaultValue={defaultValue || undefined}
          disabled={disabled}
          aria-disabled={!disabled && ariaDisabled ? 'true' : undefined}
          required={required}
          {...props}
        />
      </div>
    </div>
  );
}

TimePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  hint: PropTypes.node,
  error: PropTypes.node,
  disabled: PropTypes.bool,
  ariaDisabled: PropTypes.bool,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};