import React, { InputHTMLAttributes, ReactNode } from 'react';
import ClassNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string | ReactNode;
  id?: string;
  placeholder?: string;
  error?: string | boolean;
  success?: string | boolean;
  disabled?: boolean;
  hint?: string;
  required?: boolean;
  screenReaderOnlyLabel?: boolean;
  formGroup?: boolean;
  className?: string;
}

export default function Input({
  label,
  id,
  placeholder = 'Type here',
  error,
  success,
  disabled,
  hint = '',
  required = false,
  screenReaderOnlyLabel = false,
  formGroup = true,
  className = '',
  ...props
}: InputProps) {
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

  const describedByParts: string[] = [];
  if (hintId) describedByParts.push(hintId);
  if (hasError && typeof error === 'string') describedByParts.push(`${inputId}-error`);

  const inputProps = {
    id: inputId,
    className: combinedInputClasses,
    placeholder,
    disabled,
    required,
    'aria-describedby': describedByParts.length ? describedByParts.join(' ') : undefined,
    'aria-invalid': hasError ? true : undefined,
    ...props,
  };

  const content = (
    <>
      <Label htmlFor={inputId} screenReaderOnly={screenReaderOnlyLabel} required={required} error={hasError}>
        {label}
      </Label>
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {hasError && typeof error === 'string' && (
        <ErrorMessage id={`${inputId}-error`}>{error}</ErrorMessage>
      )}
      <input {...inputProps} />
    </>
  );

  return formGroup ? (
    <FormGroup error={hasError}>{content}</FormGroup>
  ) : (
    content
  );
}
