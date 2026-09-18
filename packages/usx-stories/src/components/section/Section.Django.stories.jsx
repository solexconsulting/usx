import config from '../../../../usx-react/src/components/section/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Section.React.stories.jsx';

export default {
  title: 'Django/USX/Section',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'section' });

export const Default = createStory(storyDefs.Default);
export const WithTitle = createStory(storyDefs.WithTitle);
export const WithAdditionalClasses = createStory(storyDefs.WithAdditionalClasses);
