import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Label from '../label/Label';
import './input.scss';

export default function Input({
  label = 'Label',
  id,
  placeholder = 'Type here',
  error,
  success,
  disabled,
  characterCount,
  hint,
  textArea=false,
  required=false,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const infoId = characterCount ? `${inputId}-info` : undefined;
  const ariaDescribedBy = [hintId, infoId].filter(Boolean).join(' ') || undefined;

  const hasError = !!error;
  const hasSuccess = !!success;

  const characterCountClasses = 'usa-character-count';
  const formGroupClasses = 'usa-form-group usx-form-group';
  const formGroupErrorClasses = 'usa-form-group--error';
  const inputClasses = 'usa-input usx-input';
  const textareaClasses = 'usa-textarea usx-textarea';
  const inputErrorClasses = 'usa-input--error';
  const textareaErrorClasses = 'usa-textarea--error';
  const inputSuccessClasses = 'usa-input--success';
  const textareaSuccessClasses = 'usa-textarea--success';

  const combinedInputClasses = ClassNames(
    textArea ? textareaClasses : inputClasses,
    hasError && (textArea ? textareaErrorClasses : inputErrorClasses),
    hasSuccess && (textArea ? textareaSuccessClasses : inputSuccessClasses),
    className,
  );

  const combinedFormGroupClasses = ClassNames(
    formGroupClasses,
    hasError && formGroupErrorClasses,
  );

  const InputElement = textArea ? 'textarea' : 'input';

  const inputProps = {
    id: inputId,
    className: combinedInputClasses,
    placeholder,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...props,
  };

  if (!textArea) {
    inputProps.type = 'text';
  }

  if (characterCount) {
    inputProps.maxLength = characterCount.max;
  }

  const content = (
    <>
      <Label htmlFor={inputId} required={required}>
          {label}
      </Label>
      {hint && (
        <span id={hintId} className="usa-hint">
          {hint}
        </span>
      )}
      <InputElement {...inputProps} />
      {characterCount && (
        <span id={infoId} className="usa-character-count__message">
          {characterCount.message}
        </span>
      )}
      {hasError && (
        <span className="usa-error-message">
          {typeof error === 'string' ? error : 'Error message goes here.'}
        </span>
      )}
      {hasSuccess && (
        <span className="usa-success-message">
          {typeof success === 'string' ? success : 'Success message goes here.'}
        </span>
      )}
    </>
  );

  const getFormGroupWrapper = (content) => {
    return (
      <div className={combinedFormGroupClasses}>{content}</div>
    )
  }

  // Character count is outside of form-group
  if (characterCount) {
    return (
      <div className={characterCountClasses}>
        {getFormGroupWrapper(content)}
      </div>
    )
  }

  return getFormGroupWrapper(content);
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  characterCount: PropTypes.shape({
    max: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
  }),
  hint: PropTypes.string,
  textArea: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};