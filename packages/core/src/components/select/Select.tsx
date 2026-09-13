// import React from 'react';
import { SelectHTMLAttributes } from 'react';
import ClassNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  id?: string;
  name?: string;
  options?: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  formGroup?: boolean;
  className?: string;
}

export default function Select({
  label,
  id,
  name,
  options = [],
  defaultValue,
  placeholder = 'Select an option',
  error,
  success,
  hint,
  disabled = false,
  required = false,
  formGroup = true,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = `${selectId}-error`;

  const hasError = !!error;
  const hasSuccess = !!success;

  const selectClasses = 'usa-select usx-select';
  const selectErrorClasses = 'usa-input--error';
  const selectSuccessClasses = 'usa-input--success';

  const combinedSelectClasses = ClassNames(
    selectClasses,
    hasError && selectErrorClasses,
    hasSuccess && selectSuccessClasses,
    className,
  );

  const describedByParts: string[] = [];
  if (hintId) describedByParts.push(hintId);
  if (hasError) describedByParts.push(errorId);

  const selectProps = {
    id: selectId,
    name,
    className: combinedSelectClasses,
    disabled,
    defaultValue,
    'aria-describedby': describedByParts.length ? describedByParts.join(' ') : undefined,
    'aria-invalid': hasError ? true : undefined,
    ...props,
  };

  const content = (
    <>
      <Label htmlFor={selectId} required={required}>
        {label}
      </Label>
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {hasError && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      <select {...selectProps}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasSuccess && (
        <span className="usa-success-message">
          {success}
        </span>
      )}
    </>
  );

  return formGroup ? (
    <FormGroup error={hasError}>{content}</FormGroup>
  ) : (
    content
  );
}
