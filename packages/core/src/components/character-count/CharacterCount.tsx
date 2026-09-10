import React from 'react';
import ClassNames from 'classnames';
import FormGroup from '../form-group/FormGroup';
import Input from '../input/Input';
import TextArea from '../text-area/TextArea';

export interface CharacterCountProps {
  id?: string;
  label?: React.ReactNode;
  max: number;
  hint?: string;
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

// Enhanced by @uswds/uswds/js/usa-character-count at runtime (call
// characterCount.on()/.off() in the consuming app/story). That script moves
// the field's `maxlength` attribute to `data-maxlength`, hides this fallback
// message, and creates/updates the live status text and error state itself —
// React only renders the pre-enhancement markup the twig contract expects.
export default function CharacterCount({
  id,
  label = null,
  max,
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
  const fieldId = id || `character-count-${Math.random().toString(36).substr(2, 9)}`;
  const infoId = `${fieldId}-info`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const successId = !error && success ? `${fieldId}-success` : undefined;

  const outerClasses = ClassNames('usa-character-count', 'usx-character-count', className);

  const fieldProps = {
    id: fieldId,
    label,
    hint: hint ?? undefined,
    required,
    screenReaderOnlyLabel,
    placeholder,
    disabled,
    error: error ?? undefined,
    success: error ? undefined : (success ?? undefined),
    maxLength: max,
    className: 'usa-character-count__field',
    'aria-describedby': [infoId, hintId, errorId, successId].filter(Boolean).join(' '),
    ...props,
  };

  return (
    <div className={outerClasses}>
      <FormGroup error={!!error}>
        {textArea ? <TextArea {...fieldProps} /> : <Input {...fieldProps} />}
      </FormGroup>
      <span id={infoId} className="usa-character-count__message">
        You can enter up to {max} characters
      </span>
    </div>
  );
}
