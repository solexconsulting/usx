import Input from './Input';
import inputConfig from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(inputConfig.props || {});

export default {
  title: 'React/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'example-input-1',
    label: 'Text input label',
    placeholder: 'Type here',
  },
  WithHint: {
    id: 'example-input-2',
    label: 'Input with hint',
    hint: 'Enter your full legal name.',
  },
  Required: {
    id: 'example-input-3',
    label: 'Required input',
    required: true,
  },
  ScreenReaderOnlyLabel: {
    id: 'example-input-4',
    label: 'Visually hidden label',
    screenReaderOnlyLabel: true,
    placeholder: 'Search…',
  },
  ErrorState: {
    id: 'example-input-5',
    label: 'Error state input',
    error: 'Enter a valid email address.',
  },
  ErrorStateNoMessage: {
    id: 'example-input-6',
    label: 'Error state (no message)',
    error: true,
  },
  SuccessState: {
    id: 'example-input-7',
    label: 'Success state input',
    success: 'Your email address has been accepted.',
  },
  SuccessStateNoMessage: {
    id: 'example-input-8',
    label: 'Success state (no message)',
    success: true,
  },
  Disabled: {
    id: 'example-input-9',
    label: 'Disabled input',
    disabled: true,
  },
};

export const Default = { args: storyDefs.Default };
export const WithHint = { args: storyDefs.WithHint };
export const Required = { args: storyDefs.Required };
export const ScreenReaderOnlyLabel = { args: storyDefs.ScreenReaderOnlyLabel };
export const ErrorState = { args: storyDefs.ErrorState };
export const ErrorStateNoMessage = { args: storyDefs.ErrorStateNoMessage };
export const SuccessState = { args: storyDefs.SuccessState };
export const SuccessStateNoMessage = { args: storyDefs.SuccessStateNoMessage };
export const Disabled = { args: storyDefs.Disabled };
