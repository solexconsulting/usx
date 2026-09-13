import React from 'react';
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
  title: 'Patterns/Forms/Test Error Form Elements',
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
};

export const TestErrorFormElements = {
  render: ({ error_state }) => {
    const error = error_state ? ERROR_MESSAGE : undefined;

    return (
      <form className="usa-form maxw-tablet">
        <CharacterCount
          id="tefe-character-count"
          label="Character count"
          hint="This is an input with a character counter."
          max={25}
          error={error}
        />

        <CheckboxGroup
          legend="Checkbox"
          name="tefe-checkbox-group"
          options={historicalFigures}
          error={error}
        />

        <RadioButtons
          legend="Radio"
          name="tefe-radio-group"
          options={historicalFigures}
          error={error}
        />

        <Combobox
          id="tefe-combobox"
          name="tefe-combobox"
          label="Combo box"
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
          error={error}
        />

        <Input
          id="tefe-input-mask"
          name="tefe-input-mask"
          label="Input mask"
          placeholder="For example, 123 45 6789"
          error={error}
        />

        <MemorableDate
          id="tefe-memorable-date"
          legend="Memorable date"
          error={error}
        />

        <RangeSlider
          id="tefe-range-slider"
          name="tefe-range-slider"
          label="Range slider"
          error={error}
        />

        <Select
          id="tefe-select"
          name="tefe-select"
          label="Select"
          options={colorOptions}
          error={error}
        />

        <Input
          id="tefe-text-input"
          name="tefe-text-input"
          label="Text input"
          error={error}
        />

        <TextArea
          id="tefe-text-area"
          name="tefe-text-area"
          label="Text area"
          error={error}
        />

        <TimePicker
          id="tefe-time-picker"
          name="tefe-time-picker"
          label="Time picker"
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
