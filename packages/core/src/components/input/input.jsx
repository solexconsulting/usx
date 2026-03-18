import React from 'react';

export default function Input({
  label = 'Label',
  id,
  type = 'input',
  placeholder = 'Type here',
  error,
  success,
  disabled,
  characterCount,
  hint,
  className = '',
  ...props
}) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const infoId = characterCount ? `${inputId}-info` : undefined;
  const ariaDescribedBy = [hintId, infoId].filter(Boolean).join(' ') || undefined;

  const hasError = !!error;
  const hasSuccess = !!success;
  const isTextarea = type === 'textarea';

  const characterCountClasses = 'usa-character-count usx-character-count';
  const formGroupClasses = 'usa-form-group usx-form-group';
  const formGroupErrorClasses = 'usa-form-group--error usx-form-group--error';
  const inputClasses = 'usa-input usx-input';
  const textareaClasses = 'usa-textarea usx-textarea';
  const inputErrorClasses = 'usa-input--error usx-input--error';
  const textareaErrorClasses = 'usa-textarea--error usx-textarea--error';
  const inputSuccessClasses = 'usa-input--success usx-input--success';
  const textareaSuccessClasses = 'usa-textarea--success usx-textarea--success';

  const labelClasses = 'usa-label usx-label';

  const combinedInputClasses = [
    isTextarea ? textareaClasses : inputClasses,
    hasError && (isTextarea ? textareaErrorClasses : inputErrorClasses),
    hasSuccess && (isTextarea ? textareaSuccessClasses : inputSuccessClasses),
    className,
  ].filter(Boolean).join(' ');

  const combinedFormGroupClasses = [
    formGroupClasses,
    (hasError) && formGroupErrorClasses,
  ].filter(Boolean).join(' ');

  const InputElement = isTextarea ? 'textarea' : 'input';

  const inputProps = {
    id: inputId,
    className: combinedInputClasses,
    placeholder,
    disabled,
    'aria-describedby': ariaDescribedBy,
    ...props,
  };

  if (!isTextarea) {
    inputProps.type = 'text';
  }

  if (characterCount) {
    inputProps.maxLength = characterCount.max;
  }

  const content = (
    <>
      <label className={labelClasses} htmlFor={inputId}>
        {label}
      </label>
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
        <span className="usa-error-message usx-error-message">
          {typeof error === 'string' ? error : 'Error message goes here.'}
        </span>
      )}
      {hasSuccess && (
        <span className="usa-success-message usx-success-message">
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
