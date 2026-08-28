import React from 'react';
import config from '../../../../core/src/components/character-count/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CharacterCount.React.stories.jsx';
import characterCount from "@uswds/uswds/js/usa-character-count";
import Alert from '../../../../core/src/components/alert/Alert.tsx';

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

      return <>
        <Alert
          role="status"
          heading="Known Issue"
          text={
            <>
              There is a known issue with the Character Count component.<br />
              See <a href="https://github.com/uswds/uswds/issues/6663" target="_blank" rel="noopener noreferrer">USWDS GitHub Issue #6663</a> for details.
              A Pull Request (PR) is active <a href="https://github.com/uswds/uswds/pull/6664" target="_blank" rel="noopener noreferrer">here</a>.
            </>
          }
          variant="warning"
        />
        <Story />
      </>;
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
