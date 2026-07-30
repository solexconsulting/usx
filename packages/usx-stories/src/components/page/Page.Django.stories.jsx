import config from '../../../../core/src/components/page/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Page.React.stories.jsx';

export default {
  title: 'Django/USX/Page',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'page' });

export const Default = createStory(storyDefs.Default);
export const WithLongContent = createStory(storyDefs.WithLongContent);
export const WithEyebrow = createStory(storyDefs.WithEyebrow);
export const WithClasses = createStory(storyDefs.WithClasses);
