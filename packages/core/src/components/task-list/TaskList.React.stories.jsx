import TaskList from './TaskList';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const allTasks = [
  { name: 'Review application', href: '#', status: 'complete' },
  { name: 'Submit supporting documents', href: '#', status: 'complete' },
  { name: 'Schedule interview', href: '#', status: 'incomplete', hint: 'Due tomorrow' },
  { name: 'Complete background check', href: '#', status: 'incomplete' },
];

export const storyDefs = {
  Default: config.default || {},
  AllComplete: {
    tasks: [
      { name: 'Step 1', href: '#', status: 'complete' },
      { name: 'Step 2', href: '#', status: 'complete' },
      { name: 'Step 3', href: '#', status: 'complete' },
    ],
  },
  AllIncomplete: {
    tasks: [
      { name: 'Step 1', href: '#', status: 'incomplete' },
      { name: 'Step 2', href: '#', status: 'incomplete' },
      { name: 'Step 3', href: '#', status: 'incomplete' },
    ],
  },
  WithHints: {
    tasks: [
      { name: 'Review application', href: '#', status: 'complete' },
      { name: 'Schedule interview', href: '#', status: 'incomplete', hint: 'Due tomorrow' },
      { name: 'Complete background check', href: '#', status: 'incomplete', hint: 'Due in 3 days' },
    ],
  },
  Mixed: { tasks: allTasks },
  SingleItem: {
    tasks: [{ name: 'Only task', href: '#', status: 'incomplete' }],
  },
  Empty: { tasks: [] },
};

export default {
  title: 'React/TaskList',
  component: TaskList,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const AllComplete = { args: storyDefs.AllComplete };
export const AllIncomplete = { args: storyDefs.AllIncomplete };
export const WithHints = { args: storyDefs.WithHints };
export const Mixed = { args: storyDefs.Mixed };
export const SingleItem = { args: storyDefs.SingleItem };
export const Empty = { args: storyDefs.Empty };
