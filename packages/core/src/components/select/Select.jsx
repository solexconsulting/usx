import React from 'react';
import PropTypes from 'prop-types';
import './select.scss';

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
  className = '',
  ...props
}) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const ariaDescribedBy = hintId || undefined;

  const hasError = !!error;
  const hasSuccess = !!success;

  const formGroupClasses = 'usa-form-group usx-form-group';
  const formGroupErrorClasses = 'usa-form-group--error';
  const selectClasses = 'usa-select usx-select';
  const selectErrorClasses = 'usa-input--error';
  const selectSuccessClasses = 'usa-input--success';
  const labelClasses = 'usa-label';

  const combinedSelectClasses = [
    selectClasses,
    hasError && selectErrorClasses,
    hasSuccess && selectSuccessClasses,
    className,
  ].filter(Boolean).join(' ');

  const combinedFormGroupClasses = [
    formGroupClasses,
    hasError && formGroupErrorClasses,
  ].filter(Boolean).join(' ');

  const selectProps = {
    id: selectId,
    name,
    className: combinedSelectClasses,
    disabled,
    defaultValue,
    'aria-describedby': ariaDescribedBy,
    ...props,
  };

  const content = (
    <>
      <label className={labelClasses} htmlFor={selectId}>
        {required && <span title="required" className="text-secondary">*</span>}{label}
      </label>
      {hint && (
        <span id={hintId} className="usa-hint">
          {hint}
        </span>
      )}
      <select {...selectProps}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <span className="usa-error-message">
          {error}
        </span>
      )}
      {hasSuccess && (
        <span className="usa-success-message">
          {success}
        </span>
      )}
    </>
  );

  if (hasError) {
    return (
      <div className={combinedFormGroupClasses}>
        {content}
      </div>
    );
  }

  return content;
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};
