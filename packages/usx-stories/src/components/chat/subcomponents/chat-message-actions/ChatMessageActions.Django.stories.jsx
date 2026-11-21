import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatMessageActions.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Message Actions',
  decorators: componentInit('popover', 'chat'),
  parameters: {
    docs: {
      description: {
        component:
          'Message action bar with reaction, thread, forward, and host action controls. It stays visible on its own; ChatMessage reveals it on hover, keyboard focus, or touch. Initialize Chat for events and Popover for menus.',
      },
    },
  },
};
export const Default = djangoPartStory('chat-message-actions', stories.Default);
export const HostActions = djangoPartStory('chat-message-actions', stories.HostActions);
export const ReactionsOnly = djangoPartStory('chat-message-actions', stories.ReactionsOnly);
