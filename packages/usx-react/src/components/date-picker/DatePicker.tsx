import React from 'react';
import classNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  extraAttributes?: Record<string, unknown>;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  defaultValue?: string | null;
  value?: string;
  minDate?: string | null;
  maxDate?: string | null;
  rangeDate?: string | null;
  formGroup?: boolean;
}

export default function DatePicker({
  id = 'date-picker',
  name,
  label = null,
  hint = null,
  error = null,
  disabled = false,
  required = false,
  defaultValue = null,
  value,
  minDate = null,
  maxDate = null,
  rangeDate = null,
  formGroup = true,
  className = '',
  extraAttributes,
  ...props
}: DatePickerProps) {
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
        {...extraAttributes}
        className={classNames('usa-date-picker', 'usx-date-picker', className)}
        {...((value ?? defaultValue) ? { 'data-default-value': value ?? defaultValue } : {})}
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

