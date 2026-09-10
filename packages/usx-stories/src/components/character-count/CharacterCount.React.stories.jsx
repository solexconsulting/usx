
import React from 'react';
import CharacterCount from '../../../../core/src/components/character-count/CharacterCount.tsx';
import config from '../../../../core/src/components/character-count/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import characterCount from "@uswds/uswds/js/usa-character-count";

export const storyDefs = {
  Default: { id: 'cc-1', label: 'Text input', max: 25 },
  WithHint: { id: 'cc-3', label: 'Text input with hint', max: 25, hint: 'You can enter up to 25 characters.' },
  WithTextArea: { id: 'cc-4', label: 'Text area', max: 50, textArea: true },
  Required: { id: 'cc-6', label: 'Required field', max: 25, required: true },
  SuccessState: { id: 'cc-7', label: 'Success state', max: 25, success: 'Looks good!' },
  Disabled: { id: 'cc-8', label: 'Disabled field', max: 25, disabled: true },
};

export default {
  title: 'React/USWDS/CharacterCount',
  component: CharacterCount,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        characterCount.off();
        characterCount.on();
        return () => characterCount.off();
      }, []);

      return <Story />;
    }
  ]
};

export const Default = { args: storyDefs.Default };
export const WithHint = { args: storyDefs.WithHint };
export const WithTextArea = { args: storyDefs.WithTextArea };
export const Required = { args: storyDefs.Required };
export const SuccessState = { args: storyDefs.SuccessState };
export const Disabled = { args: storyDefs.Disabled };

