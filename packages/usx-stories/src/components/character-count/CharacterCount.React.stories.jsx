
import React from 'react';
import CharacterCount from '../../../../usx-react/src/components/character-count/CharacterCount.tsx';
import config from '../../../../usx-react/src/components/character-count/config.json';
import { buildArgTypes, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import characterCount from "@uswds/uswds/js/usa-character-count";
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';

export const storyDefs = {
  Default: { id: 'cc-1', label: 'Text input', max: 25 },
  TextArea: { id: 'cc-4', label: 'Text area', max: 50, textArea: true },
  WithPlaceholder: { id: 'cc-17', label: 'Text input with placeholder', max: 25, placeholder: 'Enter text here' },
  TextAreaWithPlaceholder: { id: 'cc-18', label: 'Text area with placeholder', max: 50, textArea: true, placeholder: 'Enter text here' },
  WithHint: { id: 'cc-3', label: 'Text input with hint', max: 25, hint: 'You can enter up to 25 characters.' },
  TextAreaWithHint: { id: 'cc-2', label: 'Text area with hint', max: 50, textArea: true, hint: 'You can enter up to 50 characters.' },
  Required: { id: 'cc-6', label: 'Required field', max: 25, required: true },
  TextAreaRequired: { id: 'cc-5', label: 'Text area required field', max: 50, textArea: true, required: true },
  SuccessState: { id: 'cc-7', label: 'Success state', max: 25, success: 'Looks good!' },
  TextAreaSuccessState: { id: 'cc-8', label: 'Text area success state', max: 50, textArea: true, success: 'Looks good!' },
  ErrorState: { id: 'cc-9', label: 'Error state', max: 25, error: 'This field has an error.' },
  TextAreaErrorState: { id: 'cc-10', label: 'Text area error state', max: 50, textArea: true, error: 'This field has an error.' },

  Disabled: { id: 'cc-12', label: 'Disabled field', max: 25, disabled: true },
  TextAreaDisabled: { id: 'cc-14', label: 'Text area disabled field', max: 50, textArea: true, disabled: true },
  DefaultValue: { id: 'cc-11', label: 'Pre-filled with default value', max: 25, defaultValue: 'Default value' },
  TextAreaDefaultValue: { id: 'cc-15', label: 'Text area pre-filled with default value', max: 50, textArea: true, defaultValue: 'Default value' },
  DefaultValueOverLimit: {
    id: 'cc-13',
    label: 'Pre-filled, already over the limit',
    max: 25,
    defaultValue: 'This default value is already way too long for the limit.',
  },
  TextAreaDefaultValueOverLimit: {
    id: 'cc-16',
    label: 'Text area pre-filled, already over the limit',
    max: 50,
    textArea: true,
    defaultValue: 'Despite the text area providing more space, this default value is already way too long for the limit.',
  },
};

export default {
  title: 'React/USWDS/CharacterCount',
  component: CharacterCount,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`characterCount.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        characterCount.init();
      }, []);

      return <Story />;
    }
  ]
};

export const Default = { args: storyDefs.Default };
export const TextArea = { args: storyDefs.TextArea };
export const WithPlaceholder = { args: storyDefs.WithPlaceholder };
export const TextAreaWithPlaceholder = { args: storyDefs.TextAreaWithPlaceholder };
export const WithHint = { args: storyDefs.WithHint };
export const TextAreaWithHint = { args: storyDefs.TextAreaWithHint };
export const Required = { args: storyDefs.Required };
export const TextAreaRequired = { args: storyDefs.TextAreaRequired };
export const SuccessState = { args: storyDefs.SuccessState };
export const TextAreaSuccessState = { args: storyDefs.TextAreaSuccessState };
export const ErrorState = { args: storyDefs.ErrorState };
export const TextAreaErrorState = { args: storyDefs.TextAreaErrorState };
export const Disabled = { args: storyDefs.Disabled };
export const TextAreaDisabled = { args: storyDefs.TextAreaDisabled };
export const DefaultValue = { args: storyDefs.DefaultValue };
export const TextAreaDefaultValue = { args: storyDefs.TextAreaDefaultValue };
export const DefaultValueOverLimit = {
  args: storyDefs.DefaultValueOverLimit,
  render: (args) => (
    <>
      <Alert
        variant="warning"
        heading="Known Issue"
      >
        USWDS does not currently handle the case where a default value exceeds the character limit.<br/>An issue has been filed to address this.
      </Alert>
      <CharacterCount {...args} />
    </>
  ),
};

export const TextAreaDefaultValueOverLimit = {
  args: storyDefs.TextAreaDefaultValueOverLimit,
  render: (args) => (
    <>
      <Alert
        variant="warning"
        heading="Known Issue"
      >
        USWDS does not currently handle the case where a default value exceeds the character limit.<br/>An issue has been filed to address this.
      </Alert>
      <CharacterCount {...args} />
    </>
  ),
};

