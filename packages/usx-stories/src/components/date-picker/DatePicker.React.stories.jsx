import React from 'react';
import DatePicker from '../../../../usx-react/src/components/date-picker/DatePicker.tsx';
import config from '../../../../usx-react/src/components/date-picker/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/DatePicker',
  component: DatePicker,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs', 'Unenhanced'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()`')
      }
    }
  },
  decorators: [...componentInit('datePicker')]
};

export const storyDefs = {
  Default: config.default,
  WithValue: { ...config.default, id: 'date-picker-value', name: 'date-picker-value', label: 'Current date', value: '2021-06-20', defaultValue: '2020-05-22' },
  Unenhanced: { ...config.default, id: 'appointment-date-unenhanced', name: 'appointment-date-unenhanced', extraAttributes: { 'data-enhanced': 'true' } },
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
export const Unenhanced = { args: storyDefs.Unenhanced, parameters: { docs: { description: { story: 'The date remains a plain text field. The calendar button, date validation, and formatted input require USWDS JavaScript.' } } } };
export const Disabled = { args: storyDefs.Disabled };
export const Required = { args: storyDefs.Required };
export const WithDefaultValue = { args: storyDefs.WithDefaultValue };
export const WithError = { args: storyDefs.WithError };
export const MinMaxDate = { args: storyDefs.MinMaxDate };

export const WithValue = { args: storyDefs.WithValue };
