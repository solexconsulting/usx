import React from 'react';
import ClassNames from 'classnames';
import Label from '../label/Label';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
  hint?: string;
  screenReaderOnlyLabel?: boolean;
  error?: React.ReactNode;
  success?: React.ReactNode;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
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
}) => {
  const textAreaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  const hasSuccess = !!success;
  const classes = ClassNames(
    'usa-textarea', 'usx-textarea',
    hasError ? 'usa-input--error' : hasSuccess ? 'usa-input--success' : null,
    className,
  );
  const hintId = hint ? `${textAreaId}-hint` : undefined;
  const describedByParts: string[] = [];
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
};

export default TextArea;
