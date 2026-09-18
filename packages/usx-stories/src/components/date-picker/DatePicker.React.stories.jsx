import React from 'react';
import DatePicker from '../../../../usx-react/src/components/date-picker/DatePicker.jsx';
import config from '../../../../usx-react/src/components/date-picker/config.json';
import { buildArgTypes, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import datePicker from "@uswds/uswds/js/usa-date-picker";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/DatePicker',
  component: DatePicker,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        datePicker.init();
      }, []);

      return <Story />;
    }
  ]
};

export const storyDefs = {
  Default: {
    id: 'appointment-date',
    name: 'appointment-date',
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
  },
  Disabled: {
    id: 'appointment-date-disabled',
    name: 'appointment-date-disabled',
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
    disabled: true,
  },
  Required: {
    id: 'appointment-date-required',
    name: 'appointment-date-required',
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
    required: true,
  },
  WithDefaultValue: {
    id: 'appointment-date-default-value',
    name: 'appointment-date-default-value',
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
    defaultValue: '2020-05-22',
  },
  WithError: {
    id: 'appointment-date-error',
    name: 'appointment-date-error',
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
    error: 'Enter a valid date in mm/dd/yyyy format.',
  },
  MinMaxDate: {
    id: 'appointment-date-min-max',
    name: 'appointment-date-min-max',
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
    minDate: '2020-05-22',
    maxDate: '2021-06-20',
  },
};

export const Default = { args: storyDefs.Default };
export const Disabled = { args: storyDefs.Disabled };
export const Required = { args: storyDefs.Required };
export const WithDefaultValue = { args: storyDefs.WithDefaultValue };
export const WithError = { args: storyDefs.WithError };
export const MinMaxDate = { args: storyDefs.MinMaxDate };
