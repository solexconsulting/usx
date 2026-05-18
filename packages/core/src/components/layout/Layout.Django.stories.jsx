import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Layout.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Layout',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'layout' });

export const SingleColumn = createStory(storyDefs.SingleColumn);
export const GridFullContent = createStory(storyDefs.GridFullContent);
export const GridWithLeftSidebar = createStory(storyDefs.GridWithLeftSidebar);
export const GridWithRightSidebar = createStory(storyDefs.GridWithRightSidebar);
