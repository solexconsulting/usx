import React from 'react';
import PropTypes from 'prop-types';
import './calendar-date.scss';

export default function CalendarDate({ datetime }) {
  const date = new Date(datetime);
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const day = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'UTC' });

  return (
    <div className="usa-collection__calendar-date">
      <time dateTime={datetime}>
        <span className="usa-collection__calendar-date-month">{month}</span>
        <span className="usa-collection__calendar-date-day">{day}</span>
      </time>
    </div>
  );
}

CalendarDate.propTypes = {
  datetime: PropTypes.string.isRequired,
};

