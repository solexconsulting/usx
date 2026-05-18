import iconConfig from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Icon.React.stories.jsx';

const generatedArgTypes = buildArgTypes(iconConfig.props || {});

export default {
  title: 'Django/Icon',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('icon');

export const Default = createStory(storyDefs.Default);