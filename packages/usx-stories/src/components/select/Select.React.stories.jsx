import Select from '../../../../usx-react/src/components/select/Select.tsx';
import config from '../../../../usx-react/src/components/select/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

const sampleOptions = [
  { value: 'option1', label: 'Option A' },
  { value: 'option2', label: 'Option B' },
  { value: 'option3', label: 'Option C' },
];

export default {
  title: 'React/USWDS/Select',
  component: Select,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'select-default',
    label: 'Dropdown label',
    options: sampleOptions,
  },
  ErrorState: {
    id: 'select-error',
    label: 'Dropdown label',
    options: sampleOptions,
    hint: 'This is a select with an error message.',
    error: 'Selection error message',
  },
  SuccessState: {
    id: 'select-success',
    label: 'Success state select',
    options: sampleOptions,
    success: 'Success message goes here.',
  },
  Disabled: {
    id: 'select-disabled',
    label: 'Disabled select',
    options: sampleOptions,
    disabled: true,
  },
  DisabledWithError: {
    id: 'select-disabled-error',
    label: 'Disabled with error',
    options: sampleOptions,
    disabled: true,
    error: 'This field is disabled due to an error.',
  },
  DefaultValue: {
    id: 'select-default-value',
    label: 'Select with default value',
    options: sampleOptions,
    defaultValue: 'option2',
  },
  WithHint: {
    id: 'select-with-hint',
    label: 'Select with hint',
    options: sampleOptions,
    hint: 'This is a helpful hint for the select.',
  },
};

export const Default = { args: storyDefs.Default };
export const ErrorState = { args: storyDefs.ErrorState };
export const SuccessState = { args: storyDefs.SuccessState };
export const Disabled = { args: storyDefs.Disabled };
export const DisabledWithError = { args: storyDefs.DisabledWithError };
export const DefaultValue = { args: storyDefs.DefaultValue };
export const WithHint = { args: storyDefs.WithHint };
