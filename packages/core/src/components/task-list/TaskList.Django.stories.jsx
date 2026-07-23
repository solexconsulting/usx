import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './TaskList.React.stories.jsx';

export default {
  title: 'Django/TaskList',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'task-list' });

export const Default = createStory(storyDefs.Default);
export const NoStatus = createStory(storyDefs.NoStatus);
export const AllComplete = createStory(storyDefs.AllComplete);
export const AllIncomplete = createStory(storyDefs.AllIncomplete);
export const WithHints = createStory(storyDefs.WithHints);
export const Mixed = createStory(storyDefs.Mixed);
export const SingleItem = createStory(storyDefs.SingleItem);
export const Empty = createStory(storyDefs.Empty);
