import React, { useState } from 'react';
import ClassNames from 'classnames';
import FormGroup from '../form-group/FormGroup';
import Input from '../input/Input';
import TextArea from '../text-area/TextArea';

export interface CharacterCountProps {
  id?: string;
  label?: React.ReactNode;
  max: number;
  hardLimit?: boolean;
  hint?: React.ReactNode;
  error?: string | boolean | null;
  success?: string | boolean | null;
  disabled?: boolean;
  required?: boolean;
  screenReaderOnlyLabel?: boolean;
  placeholder?: string;
  textArea?: boolean;
  className?: string;
  [key: string]: unknown;
}

export default function CharacterCount({
  id,
  label = null,
  max,
  hardLimit = false,
  hint = null,
  error = null,
  success = null,
  disabled = false,
  required = false,
  screenReaderOnlyLabel = false,
  placeholder = '',
  textArea = false,
  className = '',
  ...props
}: CharacterCountProps) {
  const [currentLength, setCurrentLength] = useState(0);

  const fieldId = id || `character-count-${Math.random().toString(36).substr(2, 9)}`;
  const infoId = `${fieldId}-info`;
  const hintId = hint ? `${fieldId}-hint` : undefined;

  const isActive = currentLength > 0;
  const isOverLimit = currentLength > max;
  const hasError = !!error || (!hardLimit && isOverLimit);
  const hasSuccess = !!success && !hasError;

  const charsRemaining = max - currentLength;
  const statusMessage = isOverLimit
    ? `${Math.abs(charsRemaining)} character${Math.abs(charsRemaining) !== 1 ? 's' : ''} over limit`
    : `${charsRemaining} character${charsRemaining !== 1 ? 's' : ''} left`;

  const describedByParts = [infoId];
  if (hintId) describedByParts.push(hintId);
  if (hasError && typeof error === 'string') describedByParts.push(`${fieldId}-error`);
  if (hasSuccess && typeof success === 'string') describedByParts.push(`${fieldId}-success`);

  const outerClasses = ClassNames('usa-character-count', 'usx-character-count', className);

  const fieldProps = {
    id: fieldId,
    label,
    hint,
    required,
    screenReaderOnlyLabel,
    placeholder,
    disabled,
    error: hasError ? (typeof error === 'string' ? error : true) : null,
    success: hasSuccess ? success : null,
    className: 'usa-character-count__field',
    ...(hardLimit ? { maxLength: max } : {}),
    'aria-describedby': describedByParts.join(' '),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentLength(e.target.value.length),
    ...props,
  };

  return (
    <div className={outerClasses} data-maxlength={max}>
      <FormGroup error={hasError} success={hasSuccess}>
        {textArea ? <TextArea {...fieldProps} /> : <Input {...fieldProps} />}
      </FormGroup>
      <span
        id={infoId}
        className={ClassNames('usa-character-count__status usa-hint', isActive && 'usa-sr-only')}
      >
        You can enter up to {max} characters
      </span>
      {isActive && (
        <div
          className={ClassNames(
            'usa-character-count__status',
            'usa-hint',
            isOverLimit && 'usa-character-count__status--invalid',
          )}
          aria-hidden="true"
        >
          {statusMessage}
        </div>
      )}
      {isActive && (
        <div className="usa-character-count__sr-status usa-sr-only" aria-live="polite">
          {statusMessage}
        </div>
      )}
    </div>
  );
}
