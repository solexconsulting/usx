import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Banner.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Banner',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('banner');

export const Default = createStory(storyDefs.Default);
export const Mil = { name: '.mil TLD', ...createStory(storyDefs.Mil) };
export const Custom = { name: 'Custom text and TLD', ...createStory(storyDefs.Custom) };
