import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatHistory.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/History',
  decorators: componentInit('popover', 'chat'),
};
export const Default = djangoPartStory('chat-history', stories.Default);
export const Loading = djangoPartStory('chat-history', stories.Loading);
export const Error = djangoPartStory('chat-history', stories.Error);
export const Beginning = djangoPartStory('chat-history', stories.Beginning);
