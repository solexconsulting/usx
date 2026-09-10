import React from 'react';
import TimePicker from '../../../../core/src/components/time-picker/TimePicker.jsx';
import config from '../../../../core/src/components/time-picker/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import timePicker from "@uswds/uswds/js/usa-time-picker";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/TimePicker',
  component: TimePicker,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        timePicker.init();
        return () => timePicker.off();
      }, []);

      return <Story />;
    }
  ]
};

export const storyDefs = {
  Default: {
    id: 'appointment-time',
    name: 'appointment-time',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
  },
  Disabled: {
    id: 'appointment-time-disabled',
    name: 'appointment-time-disabled',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
    disabled: true,
  },
  AriaDisabled: {
    id: 'appointment-time-aria-disabled',
    name: 'appointment-time-aria-disabled',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
    ariaDisabled: true,
  },
  Required: {
    id: 'appointment-time-required',
    name: 'appointment-time-required',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
    required: true,
  },
  WithDefaultValue: {
    id: 'appointment-time-default-value',
    name: 'appointment-time-default-value',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
    defaultValue: '1:00pm',
  },
  WithError: {
    id: 'appointment-time-error',
    name: 'appointment-time-error',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
    error: 'Select a valid appointment time.',
  },
  MinMaxStep: {
    id: 'appointment-time-min-max-step',
    name: 'appointment-time-min-max-step',
    label: 'Appointment time',
    hint: 'Select a time from the dropdown. Type into the input to filter options.',
    minTime: '09:00',
    maxTime: '17:00',
    step: '15',
  },
};

export const Default = { args: storyDefs.Default };
export const Disabled = { args: storyDefs.Disabled };
export const AriaDisabled = { args: storyDefs.AriaDisabled };
export const Required = { args: storyDefs.Required };
export const WithDefaultValue = { args: storyDefs.WithDefaultValue };
export const WithError = { args: storyDefs.WithError };
export const MinMaxStep = { args: storyDefs.MinMaxStep };
