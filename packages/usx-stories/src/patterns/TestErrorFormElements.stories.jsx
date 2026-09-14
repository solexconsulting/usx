import React from 'react';
import PropTypes from 'prop-types';
import CharacterCount from '../../../core/src/components/character-count/CharacterCount.tsx';
import CheckboxGroup from '../../../core/src/components/checkbox-group/CheckboxGroup.tsx';
import RadioButtons from '../../../core/src/components/radio-buttons/RadioButtons.tsx';
import Combobox from '../../../core/src/components/combobox/Combobox.tsx';
import DatePicker from '../../../core/src/components/date-picker/DatePicker.jsx';
import FileInput from '../../../core/src/components/file-input/FileInput.jsx';
import Input from '../../../core/src/components/input/Input.tsx';
import MemorableDate from '../../../core/src/components/memorable-date/MemorableDate.jsx';
import RangeSlider from '../../../core/src/components/range-slider/RangeSlider.jsx';
import Select from '../../../core/src/components/select/Select.tsx';
import TextArea from '../../../core/src/components/text-area/TextArea.tsx';
import TimePicker from '../../../core/src/components/time-picker/TimePicker.jsx';
import combobox from "@uswds/uswds/js/usa-combo-box";
import fileInput from "@uswds/uswds/js/usa-file-input";
import timePicker from "@uswds/uswds/js/usa-time-picker";
import datePicker from "@uswds/uswds/js/usa-date-picker";
import { useEffect } from 'react';
import { useDjangoRenderedHtml } from '../utils/djangoComponent.js';

const ERROR_MESSAGE = 'Helpful error message';

const historicalFigures = [
  { value: 'booker-t-washington', label: 'Booker T. Washington' },
  { value: 'george-washington-carver', label: 'George Washington Carver' },
];

const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
];

// Mirrors USWDS's own "Test error form elements" pattern (patterns/forms),
// which shows every form input side by side with a single toggle that puts
// them all into their error state at once.
export default {
  title: 'Examples/Error States',
  parameters: { layout: 'padded' },
  argTypes: {
    error_state: {
      control: 'boolean',
      description: 'Toggle the error state for every field on this page.',
    },
  },
  args: {
    error_state: true,
  },
  decorators: [
    (Story) => {
      React.useEffect(() => {
        fileInput.init();
        timePicker.init();
        datePicker.init();
        combobox.init();
        return () => {
          combobox.off();
          fileInput.off();
          timePicker.off();
          datePicker.off();
        };
      }, []);

      return <Story />;
    }
  ]
};

export const FormComponents = {
  name: 'Form Components (React)',
  render: ({ error_state }) => {
    const error = error_state ? ERROR_MESSAGE : undefined;

    return (
      <form className="usa-form maxw-tablet margin-left-2">
        <CharacterCount
          id="tefe-character-count"
          label="Character count"
          hint="This is an input with a character counter."
          max={25}
          error={error}
        />

        <CheckboxGroup
          legend="Checkbox"
          hint="Select one or more historical figures."
          name="tefe-checkbox-group"
          options={historicalFigures}
          error={error}
        />

        <RadioButtons
          legend="Radio"
          hint="Select one historical figure."
          name="tefe-radio-group"
          options={historicalFigures}
          error={error}
        />

        <Combobox
          id="tefe-combobox"
          name="tefe-combobox"
          label="Combo box"
          hint="Select a color from the list."
          options={colorOptions}
          error={error}
        />

        <DatePicker
          id="tefe-date-picker"
          name="tefe-date-picker"
          label="Date picker"
          hint="mm/dd/yyyy"
          error={error}
        />

        <FileInput
          id="tefe-file-input"
          name="tefe-file-input"
          label="File input"
          hint="Upload a file."
          error={error}
        />

        <Input
          id="tefe-input-mask"
          name="tefe-input-mask"
          label="Input mask"
          hint="Enter your input following the specified mask."
          placeholder="For example, 123 45 6789"
          error={error}
        />

        <MemorableDate
          id="tefe-memorable-date"
          legend="This is a memorable date."
          hint="Enter a memorable date."
          error={error}
        />

        <RangeSlider
          id="tefe-range-slider"
          name="tefe-range-slider"
          label="Range slider"
          hint="Select a value using the range slider."
          error={error}
        />

        <Select
          id="tefe-select"
          name="tefe-select"
          label="Select"
          hint="Select a color from the list."
          options={colorOptions}
          error={error}
        />

        <Input
          id="tefe-text-input"
          name="tefe-text-input"
          label="Text input"
          hint="Enter text into the input field."
          error={error}
        />

        <TextArea
          id="tefe-text-area"
          name="tefe-text-area"
          label="Text area"
          hint="Enter text into the text area."
          error={error}
        />

        <TimePicker
          id="tefe-time-picker"
          name="tefe-time-picker"
          label="Time picker"
          hint="Select a time using the time picker."
          error={error}
        />

        <div className="margin-top-4">
          <button type="submit" className="usa-button">Submit button</button>
          <button type="button" className="usa-button usa-button--outline">Submit button - outline</button>
        </div>
      </form>
    );
  },
};

// Renders one Django component template via the storybook-django render endpoint.
function DjangoField({ componentName, args }) {
  const { html, error } = useDjangoRenderedHtml(componentName, args);

  if (error) {
    return <div style={{ color: 'red' }}>Error rendering component: {error}</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

DjangoField.propTypes = {
  componentName: PropTypes.string.isRequired,
  args: PropTypes.object.isRequired,
};

function DjangoFormComponents({ error_state }) {
  const error = error_state ? ERROR_MESSAGE : undefined;

  return (
    <form className="usa-form maxw-tablet margin-left-2">
      <DjangoField
        componentName="character-count"
        args={{
          id: 'tefe-django-character-count',
          label: 'Character count',
          hint: 'This is an input with a character counter.',
          max: 25,
          error,
        }}
      />

      <DjangoField
        componentName="checkbox-group"
        args={{
          legend: 'Checkbox',
          hint: 'Select one or more historical figures.',
          name: 'tefe-django-checkbox-group',
          options: historicalFigures,
          error,
        }}
      />

      <DjangoField
        componentName="radio-buttons"
        args={{
          legend: 'Radio',
          hint: 'Select one historical figure.',
          name: 'tefe-django-radio-group',
          options: historicalFigures,
          error,
        }}
      />

      <DjangoField
        componentName="combobox"
        args={{
          id: 'tefe-django-combobox',
          name: 'tefe-django-combobox',
          label: 'Combo box',
          hint: 'Select a color from the list.',
          options: colorOptions,
          error,
        }}
      />

      <DjangoField
        componentName="date-picker"
        args={{
          id: 'tefe-django-date-picker',
          name: 'tefe-django-date-picker',
          label: 'Date picker',
          hint: 'mm/dd/yyyy',
          error,
        }}
      />

      <DjangoField
        componentName="file-input"
        args={{
          id: 'tefe-django-file-input',
          name: 'tefe-django-file-input',
          label: 'File input',
          hint: 'Upload a file.',
          error,
        }}
      />

      <DjangoField
        componentName="input"
        args={{
          id: 'tefe-django-input-mask',
          name: 'tefe-django-input-mask',
          label: 'Input mask',
          hint: 'Enter your input following the specified mask.',
          placeholder: 'For example, 123 45 6789',
          error,
        }}
      />

      <DjangoField
        componentName="memorable-date"
        args={{
          id: 'tefe-django-memorable-date',
          legend: 'This is a memorable date.',
          groupHint: 'Enter a memorable date.',
          error,
        }}
      />

      <DjangoField
        componentName="range-slider"
        args={{
          id: 'tefe-django-range-slider',
          name: 'tefe-django-range-slider',
          label: 'Range slider',
          hint: 'Select a value using the range slider.',
          error,
        }}
      />

      <DjangoField
        componentName="select"
        args={{
          id: 'tefe-django-select',
          name: 'tefe-django-select',
          label: 'Select',
          hint: 'Select a color from the list.',
          options: colorOptions,
          error,
        }}
      />

      <DjangoField
        componentName="input"
        args={{
          id: 'tefe-django-text-input',
          name: 'tefe-django-text-input',
          label: 'Text input',
          hint: 'Enter text into the input field.',
          error,
        }}
      />

      <DjangoField
        componentName="text-area"
        args={{
          id: 'tefe-django-text-area',
          name: 'tefe-django-text-area',
          label: 'Text area',
          hint: 'Enter text into the text area.',
          error,
        }}
      />

      <DjangoField
        componentName="time-picker"
        args={{
          id: 'tefe-django-time-picker',
          name: 'tefe-django-time-picker',
          label: 'Time picker',
          hint: 'Select a time using the time picker.',
          error,
        }}
      />

      <div className="margin-top-4">
        <button type="submit" className="usa-button">Submit button</button>
        <button type="button" className="usa-button usa-button--outline">Submit button - outline</button>
      </div>
    </form>
  );
}

DjangoFormComponents.propTypes = {
  error_state: PropTypes.bool,
};

export const FormComponentsDjango = {
  name: 'Form Components (Django)',
  render: ({ error_state }) => <DjangoFormComponents error_state={error_state} />,
};
