import React from 'react';
import DateRangePicker from '../../../../usx-react/src/components/date-range-picker/DateRangePicker.tsx';
import config from '../../../../usx-react/src/components/date-range-picker/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/DateRangePicker',
  component: DateRangePicker,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()` and `dateRangePicker.init()`')
      }
    }
  },
  decorators: [...componentInit('datePicker', 'dateRangePicker')]
};

export const storyDefs = {
  Default: {
    startId: 'event-date-start',
    endId: 'event-date-end',
    startLabel: 'Event start date',
    endLabel: 'Event end date',
    startHint: 'mm/dd/yyyy',
    endHint: 'mm/dd/yyyy',
  },
  Disabled: {
    startId: 'event-date-disabled-start',
    endId: 'event-date-disabled-end',
    startLabel: 'Event start date',
    endLabel: 'Event end date',
    startHint: 'mm/dd/yyyy',
    endHint: 'mm/dd/yyyy',
    disabled: true,
  },
  Required: {
    startId: 'event-date-required-start',
    endId: 'event-date-required-end',
    startLabel: 'Event start date',
    endLabel: 'Event end date',
    startHint: 'mm/dd/yyyy',
    endHint: 'mm/dd/yyyy',
    required: true,
  },
  WithDefaultValues: {
    startId: 'event-date-default-value-start',
    endId: 'event-date-default-value-end',
    startLabel: 'Event start date',
    endLabel: 'Event end date',
    startHint: 'mm/dd/yyyy',
    endHint: 'mm/dd/yyyy',
    defaultStartDate: '2020-05-22',
    defaultEndDate: '2020-05-29',
  },
  WithError: {
    startId: 'event-date-error-start',
    endId: 'event-date-error-end',
    startLabel: 'Event start date',
    endLabel: 'Event end date',
    startHint: 'mm/dd/yyyy',
    endHint: 'mm/dd/yyyy',
    startError: 'Enter a valid date in mm/dd/yyyy format.',
    endError: 'End date must be after the start date.',
  },
  MinMaxDate: {
    startId: 'event-date-min-max-start',
    endId: 'event-date-min-max-end',
    startLabel: 'Event start date',
    endLabel: 'Event end date',
    startHint: 'mm/dd/yyyy',
    endHint: 'mm/dd/yyyy',
    minDate: '2020-05-22',
    maxDate: '2021-06-20',
  },
};

export const Default = { args: storyDefs.Default };
export const Disabled = { args: storyDefs.Disabled };
export const Required = { args: storyDefs.Required };
export const WithDefaultValues = { args: storyDefs.WithDefaultValues };
export const WithError = { args: storyDefs.WithError };
export const MinMaxDate = { args: storyDefs.MinMaxDate };
