
import CharacterCount from './CharacterCount';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: { id: 'cc-1', label: 'Text input (soft limit)', max: 25 },
  HardLimit: { id: 'cc-2', label: 'Text input (hard limit)', max: 25, hardLimit: true },
  WithHint: { id: 'cc-3', label: 'Text input with hint', max: 25, hint: 'You can enter up to 25 characters.' },
  WithTextArea: { id: 'cc-4', label: 'Text area (soft limit)', max: 50, textArea: true },
  WithTextAreaHardLimit: { id: 'cc-5', label: 'Text area (hard limit)', max: 50, textArea: true, hardLimit: true },
  Required: { id: 'cc-6', label: 'Required field', max: 25, required: true },
  SuccessState: { id: 'cc-7', label: 'Success state', max: 25, success: 'Looks good!' },
  Disabled: { id: 'cc-8', label: 'Disabled field', max: 25, disabled: true },
};

export default {
  title: 'React/CharacterCount',
  component: CharacterCount,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const HardLimit = { args: storyDefs.HardLimit };
export const WithHint = { args: storyDefs.WithHint };
export const WithTextArea = { args: storyDefs.WithTextArea };
export const WithTextAreaHardLimit = { args: storyDefs.WithTextAreaHardLimit };
export const Required = { args: storyDefs.Required };
export const SuccessState = { args: storyDefs.SuccessState };
export const Disabled = { args: storyDefs.Disabled };
