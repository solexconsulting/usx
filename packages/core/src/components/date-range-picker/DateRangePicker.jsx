import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '../label/Label';
import Hint from '../hint/Hint';
import ErrorMessage from '../error-message/ErrorMessage';
import FormGroup from '../form-group/FormGroup';

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
      <FormGroup error={!!startError}>
        {startLabel && (
          <Label id={startLabelId} htmlFor={startId} required={required}>
            {startLabel}
          </Label>
        )}
        {startHint && <Hint id={startHintId}>{startHint}</Hint>}
        {startError && <ErrorMessage id={startErrorId}>{startError}</ErrorMessage>}
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
      </FormGroup>

      <FormGroup error={!!endError}>
        {endLabel && (
          <Label id={endLabelId} htmlFor={endId} required={required}>
            {endLabel}
          </Label>
        )}
        {endHint && <Hint id={endHintId}>{endHint}</Hint>}
        {endError && <ErrorMessage id={endErrorId}>{endError}</ErrorMessage>}
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
      </FormGroup>
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
