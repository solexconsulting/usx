import React from 'react';
import config from '../../../../usx-react/src/components/character-count/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CharacterCount.React.stories.jsx';
import Alert from '../../../../usx-react/src/components/alert/Alert';

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
  decorators: [...componentInit('characterCount')]
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
