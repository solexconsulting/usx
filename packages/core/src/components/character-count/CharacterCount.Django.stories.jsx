import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './CharacterCount.React.stories.jsx';
import characterCount from "@uswds/uswds/js/usa-character-count";

export default {
  title: 'Django/CharacterCount',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        characterCount.on();
        return () => {
          characterCount.off();
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'character-count' });

export const Default = createStory(storyDefs.Default);
export const HardLimit = createStory(storyDefs.HardLimit);
export const WithHint = createStory(storyDefs.WithHint);
export const WithTextArea = createStory(storyDefs.WithTextArea);
export const WithTextAreaHardLimit = createStory(storyDefs.WithTextAreaHardLimit);
export const Required = createStory(storyDefs.Required);
export const SuccessState = createStory(storyDefs.SuccessState);
export const Disabled = createStory(storyDefs.Disabled);
