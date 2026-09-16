import TaskList from '../../../../core/src/components/task-list/TaskList.tsx';
import config from '../../../../core/src/components/task-list/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const taskTags = {
  todo: { value: 'Not started', color: 'primary-lightest', outline: false },
  doing: { value: 'In progress', color: 'primary-light', outline: false },
  done: { value: 'Completed', color: 'success-light', outline: false, icon: "check" },
  blocked: { value: 'Blocked', color: 'base-light', outline: false },
};

const allTasks = [
  { name: 'Review application', href: '#', tagProps: taskTags.done },
  { name: 'Submit supporting documents', href: '#', tagProps: taskTags.done },
  { name: 'Schedule interview', href: '#', tagProps: taskTags.done, hint: 'Due tomorrow' },
  { name: 'Complete background check', href: '#', tagProps: taskTags.done },
];

export const storyDefs = {
  Default: {
    tasks: [
      { name: 'Task 1', href: '#', tagProps: taskTags.done },
      { name: 'Task 2', href: '#', tagProps: taskTags.doing },
      { name: 'Task 3', href: '#', tagProps: taskTags.todo, hint: 'Due tomorrow' },
    ]
  },
  NoStatus: {
    tasks: [
      { name: 'Task 1', href: '#' },
      { name: 'Task 2', href: '#' },
      { name: 'Task 3', href: '#', hint: 'Due tomorrow' },
    ]
  },
  AllComplete: {
    tasks: [
      { name: 'Step 1', href: '#', tagProps: taskTags.done },
      { name: 'Step 2', href: '#', tagProps: taskTags.done },
      { name: 'Step 3', href: '#', tagProps: taskTags.done },
    ],
  },
  AllIncomplete: {
    tasks: [
      { name: 'Step 1', href: '#', tagProps: taskTags.todo },
      { name: 'Step 2', href: '#', tagProps: taskTags.todo },
      { name: 'Step 3', href: '#', tagProps: taskTags.todo },
    ],
  },
  WithHints: {
    tasks: [
      { name: 'Review application', href: '#', tagProps: taskTags.done },
      { name: 'Schedule interview', href: '#', tagProps: taskTags.todo, hint: 'Due tomorrow' },
      { name: 'Complete background check', href: '#', tagProps: taskTags.todo, hint: 'Due in 3 days' },
    ],
  },
  Mixed: { tasks: allTasks },
  SingleItem: {
    tasks: [{ name: 'Only task', href: '#', tagProps: taskTags.todo }],
  },
  Empty: { tasks: [] },
};

export default {
  title: 'React/USX/TaskList',
  component: TaskList,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const NoStatus = { args: storyDefs.NoStatus };
export const AllComplete = { args: storyDefs.AllComplete };
export const AllIncomplete = { args: storyDefs.AllIncomplete };
export const WithHints = { args: storyDefs.WithHints };
export const Mixed = { args: storyDefs.Mixed };
export const SingleItem = { args: storyDefs.SingleItem };
export const Empty = { args: storyDefs.Empty };
