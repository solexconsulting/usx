import React from 'react';
import PropTypes from 'prop-types';
import Required from '../required/Required';

// Enhanced by @uswds/uswds/js/usa-range at runtime (call range.on() in the
// consuming app) — that script builds the value display span and keeps the
// aria-valuetext screen-reader callout in sync, so React doesn't reimplement
// either here. No form-group wrapper — wrap this in FormGroup yourself if
// you want one.
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
  className = '',
  ...props
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <>
      {label && (
        <label className="usa-label usx-label" htmlFor={id}>
          {required && <Required />}
          {label}
        </label>
      )}
      {hint && (
        <span className="usa-hint usx-hint" id={hintId}>
          {hint}
        </span>
      )}
      {error && (
        <span className="usa-error-message usx-error-message" id={errorId} role="alert">
          {error}
        </span>
      )}
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
}

RangeSlider.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  hint: PropTypes.node,
  error: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  textUnit: PropTypes.string,
  textPreposition: PropTypes.string,
  className: PropTypes.string,
};
