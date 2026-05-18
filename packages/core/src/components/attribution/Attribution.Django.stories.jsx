import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Attribution.React.stories.jsx';

export default {
  title: 'Django/Attribution',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('attribution');

export const Default = createStory(storyDefs.Default);
export const WithAvatar = createStory(storyDefs.WithAvatar);
export const WithInitials = createStory(storyDefs.WithInitials);
export const WithPersonIcon = createStory(storyDefs.WithPersonIcon);
