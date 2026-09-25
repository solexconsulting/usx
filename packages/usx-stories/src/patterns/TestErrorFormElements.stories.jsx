import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../usx-react/src/components/button/Button.tsx';
import CharacterCount from '../../../usx-react/src/components/character-count/CharacterCount.tsx';
import CheckboxGroup from '../../../usx-react/src/components/checkbox-group/CheckboxGroup.tsx';
import RadioButtons from '../../../usx-react/src/components/radio-buttons/RadioButtons.tsx';
import Combobox from '../../../usx-react/src/components/combobox/Combobox.tsx';
import DatePicker from '../../../usx-react/src/components/date-picker/DatePicker.tsx';
import FileInput from '../../../usx-react/src/components/file-input/FileInput.tsx';
import Input from '../../../usx-react/src/components/input/Input.tsx';
import MemorableDate from '../../../usx-react/src/components/memorable-date/MemorableDate.tsx';
import RangeSlider from '../../../usx-react/src/components/range-slider/RangeSlider.tsx';
import Select from '../../../usx-react/src/components/select/Select.tsx';
import TextArea from '../../../usx-react/src/components/text-area/TextArea.tsx';
import TimePicker from '../../../usx-react/src/components/time-picker/TimePicker.tsx';
import combobox from "@uswds/uswds/js/usa-combo-box";
import fileInput from "@uswds/uswds/js/usa-file-input";
import timePicker from "@uswds/uswds/js/usa-time-picker";
import datePicker from "@uswds/uswds/js/usa-date-picker";
import characterCount from "@uswds/uswds/js/usa-character-count";
import { useDjangoRenderedFields } from '../utils/djangoComponent.js';

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
        characterCount.init();
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
          <Button
            type="submit"
            label="Submit button"
            variant="primary"
          />
          <Button
            type="button"
            label="Submit button - outline"
            variant="outline"
          />
        </div>
      </form>
    );
  },
};

function DjangoFormComponents({ error_state }) {
  const error = error_state ? ERROR_MESSAGE : undefined;

  const fields = [
    {
      componentName: 'character-count',
      args: {
        id: 'tefe-django-character-count',
        label: 'Character count',
        hint: 'This is an input with a character counter.',
        max: 25,
        error,
      },
    },
    {
      componentName: 'checkbox-group',
      args: {
        legend: 'Checkbox',
        hint: 'Select one or more historical figures.',
        name: 'tefe-django-checkbox-group',
        options: historicalFigures,
        error,
      },
    },
    {
      componentName: 'radio-buttons',
      args: {
        legend: 'Radio',
        hint: 'Select one historical figure.',
        name: 'tefe-django-radio-group',
        options: historicalFigures,
        error,
      },
    },
    {
      componentName: 'combobox',
      args: {
        id: 'tefe-django-combobox',
        name: 'tefe-django-combobox',
        label: 'Combo box',
        hint: 'Select a color from the list.',
        options: colorOptions,
        error,
      },
    },
    {
      componentName: 'date-picker',
      args: {
        id: 'tefe-django-date-picker',
        name: 'tefe-django-date-picker',
        label: 'Date picker',
        hint: 'mm/dd/yyyy',
        error,
      },
    },
    {
      componentName: 'file-input',
      args: {
        id: 'tefe-django-file-input',
        name: 'tefe-django-file-input',
        label: 'File input',
        hint: 'Upload a file.',
        error,
      },
    },
    {
      componentName: 'input',
      args: {
        id: 'tefe-django-input-mask',
        name: 'tefe-django-input-mask',
        label: 'Input mask',
        hint: 'Enter your input following the specified mask.',
        placeholder: 'For example, 123 45 6789',
        error,
      },
    },
    {
      componentName: 'memorable-date',
      args: {
        id: 'tefe-django-memorable-date',
        legend: 'This is a memorable date.',
        groupHint: 'Enter a memorable date.',
        error,
      },
    },
    {
      componentName: 'range-slider',
      args: {
        id: 'tefe-django-range-slider',
        name: 'tefe-django-range-slider',
        label: 'Range slider',
        hint: 'Select a value using the range slider.',
        error,
      },
    },
    {
      componentName: 'select',
      args: {
        id: 'tefe-django-select',
        name: 'tefe-django-select',
        label: 'Select',
        hint: 'Select a color from the list.',
        options: colorOptions,
        error,
      },
    },
    {
      componentName: 'input',
      args: {
        id: 'tefe-django-text-input',
        name: 'tefe-django-text-input',
        label: 'Text input',
        hint: 'Enter text into the input field.',
        error,
      },
    },
    {
      componentName: 'text-area',
      args: {
        id: 'tefe-django-text-area',
        name: 'tefe-django-text-area',
        label: 'Text area',
        hint: 'Enter text into the text area.',
        error,
      },
    },
    {
      componentName: 'time-picker',
      args: {
        id: 'tefe-django-time-picker',
        name: 'tefe-django-time-picker',
        label: 'Time picker',
        hint: 'Select a time using the time picker.',
        error,
      },
    },
  ];

  const buttonFields = [
    { componentName: 'button', args: { type: 'submit', variant: 'primary', label: 'Submit button' } },
    { componentName: 'button', args: { type: 'button', variant: 'outline', label: 'Submit button - outline' } },
  ];

  const { html, errors } = useDjangoRenderedFields(fields);
  const { html: buttonsHtml, errors: buttonErrors } = useDjangoRenderedFields(buttonFields);
  const allErrors = [...errors, ...buttonErrors];

  // All fields' HTML lands in the DOM together (one dangerouslySetInnerHTML per
  // group below), so enhancement only needs to run once per html change.
  React.useEffect(() => {
    if (!html) return;
    fileInput.init();
    timePicker.init();
    datePicker.init();
    combobox.init();
    characterCount.init();
  }, [html]);

  return (
    <>
      {allErrors.map(({ componentName, error: fieldError }, index) => (
        <div key={`${componentName}-${index}`} style={{ color: 'red' }}>
          Error rendering {componentName}: {fieldError}
        </div>
      ))}
      <form className="usa-form maxw-tablet margin-left-2">
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div className="margin-top-4" dangerouslySetInnerHTML={{ __html: buttonsHtml }} />
      </form>
    </>
  );
}

DjangoFormComponents.propTypes = {
  error_state: PropTypes.bool,
};

export const FormComponentsDjango = {
  name: 'Form Components (Django)',
  render: ({ error_state }) => <DjangoFormComponents error_state={error_state} />,
};
