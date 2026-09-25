import React from 'react';

import Label from '../label/Label';
import FormGroup from '../form-group/FormGroup';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';

export interface RangeSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  value?: number | string;
  defaultValue?: number | string;
  textUnit?: string | null;
  textPreposition?: string | null;
  formGroup?: boolean;
}

// Enhanced by @uswds/uswds/js/usa-range at runtime (call ONLY range.init() in
// the consuming app, never .on()/.off() — see Combobox.tsx for why) — that
// script builds the value display span and keeps the aria-valuetext
// screen-reader callout in sync, so React doesn't reimplement either here.
export default function RangeSlider({
  id = 'range-slider',
  name,
  label = null,
  hint = null,
  error = null,
  disabled = false,
  required = false,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  textUnit = null,
  textPreposition = null,
  formGroup = true,
  className = '',
  ...props
}: RangeSliderProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const content = (
    <>
      {label && (
        <Label htmlFor={id} required={required} error={!!error}>
          {label}
        </Label>
      )}
      {hint && <Hint id={hintId}>{hint}</Hint>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      <input
        className={['usa-range', 'usx-range-slider', className].filter(Boolean).join(' ')}
        id={id}
        type="range"
        name={name || id}
        min={min}
        max={max}
        step={step}
        value={typeof value !== 'undefined' ? value : undefined}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        aria-describedby={describedBy}
        {...(textUnit ? { 'data-text-unit': textUnit } : {})}
        {...(textPreposition ? { 'data-text-preposition': textPreposition } : {})}
        {...props}
      />
    </>
  );

  return formGroup ? <FormGroup error={!!error}>{content}</FormGroup> : content;
}
