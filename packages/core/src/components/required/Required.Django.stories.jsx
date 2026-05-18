import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Required.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Required',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('required');

export const Default = createStory(storyDefs.Default);
export const WithCustomTitle = createStory(storyDefs.WithCustomTitle);
