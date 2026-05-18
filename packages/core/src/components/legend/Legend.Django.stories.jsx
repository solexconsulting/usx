import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Legend.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Legend',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('legend');

export const Default = createStory(storyDefs.Default);
export const WithAdditionalClasses = createStory(storyDefs.WithAdditionalClasses);
export const WithRequired = createStory(storyDefs.WithRequired);
export const Large = createStory(storyDefs.Large);