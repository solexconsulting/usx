import React from 'react';
import config from '../../../../core/src/components/character-count/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CharacterCount.React.stories.jsx';
import characterCount from "@uswds/uswds/js/usa-character-count";
import Alert from '../../../../core/src/components/alert/Alert';

export default {
  title: 'Django/USWDS/CharacterCount',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
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
        const timeout = setTimeout(() => {
          characterCount.init();
        }, 200);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'character-count' });

export const Default = createStory(storyDefs.Default);
export const TextArea = createStory(storyDefs.TextArea);
export const WithPlaceholder = createStory(storyDefs.WithPlaceholder);
export const TextAreaWithPlaceholder = createStory(storyDefs.TextAreaWithPlaceholder);
export const WithHint = createStory(storyDefs.WithHint);
export const TextAreaWithHint = createStory(storyDefs.TextAreaWithHint);
export const Required = createStory(storyDefs.Required);
export const TextAreaRequired = createStory(storyDefs.TextAreaRequired);
export const SuccessState = createStory(storyDefs.SuccessState);
export const TextAreaSuccessState = createStory(storyDefs.TextAreaSuccessState);
export const ErrorState = createStory(storyDefs.ErrorState);
export const TextAreaErrorState = createStory(storyDefs.TextAreaErrorState);
export const Disabled = createStory(storyDefs.Disabled);
export const TextAreaDisabled = createStory(storyDefs.TextAreaDisabled);
export const DefaultValue = createStory(storyDefs.DefaultValue);
export const TextAreaDefaultValue = createStory(storyDefs.TextAreaDefaultValue);

// Override render to add Alert
const defaultValueOverLimitStory = createStory(storyDefs.DefaultValueOverLimit);
export const DefaultValueOverLimit = {
  ...defaultValueOverLimitStory,
  render: (args) => {
    return (
      <>
        <Alert
          variant="warning"
          heading="Known Issue"
        >
          USWDS does not currently handle the case where a default value exceeds the character limit.<br/>An issue has been filed to address this.
        </Alert>
        {defaultValueOverLimitStory.render(args)}
      </>
    );
  }
};

const textAreaDefaultValueOverLimitStory = createStory(storyDefs.TextAreaDefaultValueOverLimit);
export const TextAreaDefaultValueOverLimit = {
  ...textAreaDefaultValueOverLimitStory,
  render: (args) => {
    return (
      <>
        <Alert
          variant="warning"
          heading="Known Issue"
        >
          USWDS does not currently handle the case where a default value exceeds the character limit.<br/>An issue has been filed to address this.
        </Alert>
        {textAreaDefaultValueOverLimitStory.render(args)}
      </>
    );
  }
};
