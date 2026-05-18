import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Section.React.stories.jsx';

export default {
  title: 'Django/Section',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'section' });

export const Default = createStory(storyDefs.Default);
export const WithTitle = createStory(storyDefs.WithTitle);
export const WithAdditionalClasses = createStory(storyDefs.WithAdditionalClasses);
