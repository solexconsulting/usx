import config from '../../../../usx-react/src/components/layout/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Layout.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USX/Layout',
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'layout' });

export const SingleColumn = createStory(storyDefs.SingleColumn);
export const GridFullContent = createStory(storyDefs.GridFullContent);
export const GridWithLeftSidebar = createStory(storyDefs.GridWithLeftSidebar);
export const GridWithRightSidebar = createStory(storyDefs.GridWithRightSidebar);
