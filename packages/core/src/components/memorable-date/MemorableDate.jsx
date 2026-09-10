import React from 'react';
import PropTypes from 'prop-types';
import Fieldset from '../fieldset/Fieldset';
import FormGroup from '../form-group/FormGroup';
import Select from '../select/Select';
import Input from '../input/Input';

const MONTH_OPTIONS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export default function MemorableDate({
  id = 'memorable-date',
  legend = 'Date of Birth',
  groupHint = 'Select a month. Enter 1 or 2 digits for the day and 4 digits for the year.',
  monthLabel = 'Month',
  dayLabel = 'Day',
  yearLabel = 'Year',
  monthHint = 'Select a month from the dropdown.',
  dayHint = 'Enter 1 or 2 digits for the day.',
  yearHint = 'Enter 4 digits for the year.',
  monthName,
  dayName,
  yearName,
  defaultMonth,
  defaultDay,
  defaultYear,
  disabled = false,
  ariaDisabled = false,
  required = false,
  error = null,
  className = '',
}) {
  const monthId = `${id}-month`;
  const dayId = `${id}-day`;
  const yearId = `${id}-year`;
  const groupHintId = `${id}-hint`;
  const monthHintId = `${monthId}-hint`;
  const dayHintId = `${dayId}-hint`;
  const yearHintId = `${yearId}-hint`;
  const errorId = error ? `${id}-error` : undefined;
  const hasError = !!error;

  const describedBy = (hintId) => [hintId, errorId].filter(Boolean).join(' ') || undefined;

  // Native disabled and aria-disabled are mutually exclusive, matching real USWDS's variants.
  const stateProps = disabled
    ? { disabled: true }
    : ariaDisabled
      ? { 'aria-disabled': 'true' }
      : {};

  return (
    <FormGroup error={hasError}>
      <Fieldset legend={legend} required={required} className={className}>
        {groupHint && (
          <span className="usa-hint" aria-hidden="true" id={groupHintId}>
            {groupHint}
          </span>
        )}
        <div className="usa-memorable-date usx-memorable-date">
          <FormGroup className="usa-form-group--month usa-form-group--select">
            <Select
              id={monthId}
              name={monthName || monthId}
              label={monthLabel}
              options={MONTH_OPTIONS}
              placeholder="- Select -"
              defaultValue={defaultMonth}
              required={required}
              aria-describedby={describedBy(monthHintId)}
              aria-invalid={hasError || undefined}
              // Bypass Select's own `error` prop here — it wraps its output in an extra
              // usa-form-group when truthy, which would nest inside the FormGroup above.
              className={hasError ? 'usa-input--error' : undefined}
              {...stateProps}
            />
            {monthHint && (
              <span className="usa-hint usa-sr-only" id={monthHintId}>
                {monthHint}
              </span>
            )}
          </FormGroup>
          <FormGroup className="usa-form-group--day">
            <Input
              id={dayId}
              name={dayName || dayId}
              label={dayLabel}
              placeholder=""
              defaultValue={defaultDay}
              maxLength={2}
              pattern="[0-9]*"
              inputMode="numeric"
              required={required}
              error={hasError || undefined}
              aria-describedby={describedBy(dayHintId)}
              {...stateProps}
            />
            {dayHint && (
              <span className="usa-hint usa-sr-only" id={dayHintId}>
                {dayHint}
              </span>
            )}
          </FormGroup>
          <FormGroup className="usa-form-group--year">
            <Input
              id={yearId}
              name={yearName || yearId}
              label={yearLabel}
              placeholder=""
              defaultValue={defaultYear}
              minLength={4}
              maxLength={4}
              pattern="[0-9]*"
              inputMode="numeric"
              required={required}
              error={hasError || undefined}
              aria-describedby={describedBy(yearHintId)}
              {...stateProps}
            />
            {yearHint && (
              <span className="usa-hint usa-sr-only" id={yearHintId}>
                {yearHint}
              </span>
            )}
          </FormGroup>
        </div>
        {hasError && (
          <span className="usa-error-message" id={errorId} role="alert">
            {error}
          </span>
        )}
      </Fieldset>
    </FormGroup>
  );
}

MemorableDate.propTypes = {
  id: PropTypes.string,
  legend: PropTypes.node,
  groupHint: PropTypes.node,
  monthLabel: PropTypes.node,
  dayLabel: PropTypes.node,
  yearLabel: PropTypes.node,
  monthHint: PropTypes.node,
  dayHint: PropTypes.node,
  yearHint: PropTypes.node,
  monthName: PropTypes.string,
  dayName: PropTypes.string,
  yearName: PropTypes.string,
  defaultMonth: PropTypes.string,
  defaultDay: PropTypes.string,
  defaultYear: PropTypes.string,
  disabled: PropTypes.bool,
  ariaDisabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
};