import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Skipnav.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Skipnav',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('skipnav');

export const Default = createStory(storyDefs.Default);
export const CustomContent = createStory(storyDefs.CustomContent);
export const WithChildren = createStory(storyDefs.WithChildren);
