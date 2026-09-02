import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Required from '../required/Required';

export default function DateRangePicker({
  startId = 'event-date-start',
  endId = 'event-date-end',
  startName,
  endName,
  startLabel = 'Event start date',
  endLabel = 'Event end date',
  startHint = 'mm/dd/yyyy',
  endHint = 'mm/dd/yyyy',
  startError = null,
  endError = null,
  disabled = false,
  required = false,
  defaultStartDate = null,
  defaultEndDate = null,
  minDate = null,
  maxDate = null,
  className = '',
}) {
  const startLabelId = `${startId}-label`;
  const startHintId = startHint ? `${startId}-hint` : undefined;
  const startErrorId = startError ? `${startId}-error` : undefined;
  const startDescribedBy = [startHintId, startErrorId].filter(Boolean).join(' ') || undefined;

  const endLabelId = `${endId}-label`;
  const endHintId = endHint ? `${endId}-hint` : undefined;
  const endErrorId = endError ? `${endId}-error` : undefined;
  const endDescribedBy = [endHintId, endErrorId].filter(Boolean).join(' ') || undefined;

  return (
    <div
      className={classNames('usa-date-range-picker', 'usx-date-range-picker', className)}
      {...(minDate ? { 'data-min-date': minDate } : {})}
      {...(maxDate ? { 'data-max-date': maxDate } : {})}
    >
      <div className={classNames('usa-form-group', 'usx-form-group', { 'usa-form-group--error': !!startError })}>
        {startLabel && (
          <label className="usa-label usx-label" id={startLabelId} htmlFor={startId}>
            {required && <Required />}
            {startLabel}
          </label>
        )}
        {startHint && (
          <div className="usa-hint usx-hint" id={startHintId}>
            {startHint}
          </div>
        )}
        {startError && (
          <span className="usa-error-message usx-error-message" id={startErrorId} role="alert">
            {startError}
          </span>
        )}
        <div
          className="usa-date-picker usx-date-picker"
          {...(defaultStartDate ? { 'data-default-value': defaultStartDate } : {})}
        >
          <input
            className="usa-input usx-input"
            id={startId}
            name={startName || startId}
            aria-labelledby={startLabel ? startLabelId : undefined}
            aria-describedby={startDescribedBy}
            disabled={disabled}
            required={required}
          />
        </div>
      </div>

      <div className={classNames('usa-form-group', 'usx-form-group', { 'usa-form-group--error': !!endError })}>
        {endLabel && (
          <label className="usa-label usx-label" id={endLabelId} htmlFor={endId}>
            {required && <Required />}
            {endLabel}
          </label>
        )}
        {endHint && (
          <div className="usa-hint usx-hint" id={endHintId}>
            {endHint}
          </div>
        )}
        {endError && (
          <span className="usa-error-message usx-error-message" id={endErrorId} role="alert">
            {endError}
          </span>
        )}
        <div
          className="usa-date-picker usx-date-picker"
          {...(defaultEndDate ? { 'data-default-value': defaultEndDate } : {})}
        >
          <input
            className="usa-input usx-input"
            id={endId}
            name={endName || endId}
            aria-labelledby={endLabel ? endLabelId : undefined}
            aria-describedby={endDescribedBy}
            disabled={disabled}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}

DateRangePicker.propTypes = {
  startId: PropTypes.string,
  endId: PropTypes.string,
  startName: PropTypes.string,
  endName: PropTypes.string,
  startLabel: PropTypes.node,
  endLabel: PropTypes.node,
  startHint: PropTypes.node,
  endHint: PropTypes.node,
  startError: PropTypes.node,
  endError: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  defaultStartDate: PropTypes.string,
  defaultEndDate: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  className: PropTypes.string,
};
