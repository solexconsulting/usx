import React from 'react';

import Fieldset from '../fieldset/Fieldset';
import FormGroup from '../form-group/FormGroup';
import Hint from '../hint/Hint';
import Select from '../select/Select';
import Input from '../input/Input';

export interface MemorableDateProps {
  id?: string;
  legend?: React.ReactNode;
  groupHint?: React.ReactNode;
  monthLabel?: React.ReactNode;
  dayLabel?: React.ReactNode;
  yearLabel?: React.ReactNode;
  monthHint?: React.ReactNode;
  dayHint?: React.ReactNode;
  yearHint?: React.ReactNode;
  monthName?: string;
  dayName?: string;
  yearName?: string;
  defaultMonth?: string;
  defaultDay?: string;
  defaultYear?: string;
  disabled?: boolean;
  ariaDisabled?: boolean;
  required?: boolean;
  error?: string | null;
  className?: string;
}

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
}: MemorableDateProps) {
  const monthId = `${id}-month`;
  const dayId = `${id}-day`;
  const yearId = `${id}-year`;
  const groupHintId = `${id}-hint`;
  const monthHintId = `${monthId}-hint`;
  const dayHintId = `${dayId}-hint`;
  const yearHintId = `${yearId}-hint`;
  const errorId = error ? `${id}-error` : undefined;
  const hasError = !!error;

  const describedBy = (hintId: string) => [hintId, errorId].filter(Boolean).join(' ') || undefined;

  // Native disabled and aria-disabled are mutually exclusive, matching real USWDS's variants.
  const stateProps: Pick<React.InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'aria-disabled'> = disabled
    ? { disabled: true }
    : ariaDisabled
      ? { 'aria-disabled': 'true' }
      : {};

  return (
    <FormGroup error={hasError}>
      <Fieldset legend={legend} required={required} className={className} error={error} errorId={errorId}>
        {groupHint && (
          <Hint aria-hidden="true" id={groupHintId}>
            {groupHint}
          </Hint>
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
              formGroup={false}
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
              formGroup={false}
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
              formGroup={false}
              {...stateProps}
            />
            {yearHint && (
              <span className="usa-hint usa-sr-only" id={yearHintId}>
                {yearHint}
              </span>
            )}
          </FormGroup>
        </div>
      </Fieldset>
    </FormGroup>
  );
}
