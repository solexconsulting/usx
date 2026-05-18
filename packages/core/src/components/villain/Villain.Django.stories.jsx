import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Villain.React.stories.jsx';

export default {
  title: 'Django/Villain',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'villain' });

export const Default = createStory(storyDefs.Default);
export const WithoutCallout = createStory(storyDefs.WithoutCallout);
export const WithoutButton = createStory(storyDefs.WithoutButton);
