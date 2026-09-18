import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

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
  formGroup = true,
  className = '',
  ...props
}) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [label ? labelId : undefined, hintId, errorId].filter(Boolean).join(' ') || undefined;

  const content = (
    <>
      {label && (
        <Label id={labelId} htmlFor={id} required={required} error={!!error}>
          {label}
        </Label>
      )}
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      <div
        className={
          classNames(
            'usa-time-picker',
            'usx-time-picker',
            {'usx-combo-box--error': !!error},
            className
          )
        }
        {...(minTime ? { 'data-min-time': minTime } : {})}
        {...(maxTime ? { 'data-max-time': maxTime } : {})}
        {...(step ? { 'data-step': step } : {})}
      >
        <input
          className={`usa-input usx-input${error ? ' usa-input--error' : ''}`}
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
    </>
  );

  return formGroup ? <FormGroup error={!!error}>{content}</FormGroup> : content;
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
  formGroup: PropTypes.bool,
  className: PropTypes.string,
};