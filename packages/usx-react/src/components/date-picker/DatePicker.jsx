import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

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
  formGroup = true,
  className = '',
  ...props
}) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

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
        className={classNames('usa-date-picker', 'usx-date-picker', className)}
        {...(defaultValue ? { 'data-default-value': defaultValue } : {})}
        {...(minDate ? { 'data-min-date': minDate } : {})}
        {...(maxDate ? { 'data-max-date': maxDate } : {})}
        {...(rangeDate ? { 'data-range-date': rangeDate } : {})}
      >
        <input
          className={
            classNames(
              'usa-input',
              'usx-input',
              {'usa-input--error': !!error},
            )
          }
          id={id}
          name={name || id}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
    </>
  );

  return formGroup ? <FormGroup error={!!error}>{content}</FormGroup> : content;
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
  formGroup: PropTypes.bool,
  className: PropTypes.string,
};
