import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Select.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Select',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'select' });

export const Default = createStory(storyDefs.Default);
export const ErrorState = createStory(storyDefs.ErrorState);
export const SuccessState = createStory(storyDefs.SuccessState);
export const Disabled = createStory(storyDefs.Disabled);
export const DisabledWithError = createStory(storyDefs.DisabledWithError);
export const DefaultValue = createStory(storyDefs.DefaultValue);
export const WithHint = createStory(storyDefs.WithHint);