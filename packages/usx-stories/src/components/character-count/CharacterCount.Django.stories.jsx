import React from 'react';
import config from '../../../../core/src/components/character-count/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CharacterCount.React.stories.jsx';
import characterCount from "@uswds/uswds/js/usa-character-count";

export default {
  title: 'Django/USWDS/CharacterCount',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        characterCount.off();
        setTimeout(() => {
          characterCount.on();
        }, 200);
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
export const WithHint = createStory(storyDefs.WithHint);
export const WithTextArea = createStory(storyDefs.WithTextArea);
export const Required = createStory(storyDefs.Required);
export const SuccessState = createStory(storyDefs.SuccessState);
export const Disabled = createStory(storyDefs.Disabled);

