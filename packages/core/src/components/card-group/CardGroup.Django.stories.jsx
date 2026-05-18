import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './CardGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/CardGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('card-group');

export const Default = createStory(storyDefs.Default);
export const FlagLayout = createStory(storyDefs.FlagLayout);
export const WithTags = createStory(storyDefs.WithTags);
