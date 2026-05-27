import React from 'react';
import ClassNames from 'classnames';
import './calendar-date.scss';

export interface CalendarDateProps {
  datetime: string;
  underCollection?: boolean;
}

export default function CalendarDate({
  datetime,
  underCollection = false,
}: CalendarDateProps) {
  const date = new Date(datetime);
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const day = date.toLocaleString('en-US', { day: 'numeric', timeZone: 'UTC' });

  const dateClasses = ClassNames(
    { 'usa-collection__calendar-date': underCollection },
    'usx-calendar-date',
  );

  const monthClasses = ClassNames(
    { 'usa-collection__calendar-date-month': underCollection },
    'usx-calendar-date-month',
  );

  const dayClasses = ClassNames(
    { 'usa-collection__calendar-date-day': underCollection },
    'usx-calendar-date-day',
  );

  return (
    <div className={dateClasses}>
      <time dateTime={datetime}>
        <span className={monthClasses}>{month}</span>
        <span className={dayClasses}>{day}</span>
      </time>
    </div>
  );
}
