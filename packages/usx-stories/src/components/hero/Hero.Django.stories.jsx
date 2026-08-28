import config from '../../../../core/src/components/hero/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Hero.React.stories.jsx';

export default {
  title: 'Django/USX/Hero',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'hero' });

export const Default = createStory(storyDefs.Default);
export const NoBackground = createStory(storyDefs.NoBackground);
export const WithoutCallout = createStory(storyDefs.WithoutCallout);
export const WithoutButton = createStory(storyDefs.WithoutButton);
export const NoOverlay = createStory(storyDefs.NoOverlay);
export const WithSearch = createStory(storyDefs.WithSearch);

