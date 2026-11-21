import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatWindow.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Window',
  decorators: componentInit('popover', 'chat'),
  parameters: {
    docs: {
      description: {
        component:
          'Positioned Chat shell: launcher, heading, left navigation, right actions, required close button, status announcement, and content slot. It does not render a directory, transcript, or composer.',
      },
    },
  },
};
export const Default = djangoPartStory('chat-window', stories.Default);
export const Inbox = djangoPartStory('chat-window', stories.Inbox);
export const Thread = djangoPartStory('chat-window', stories.Thread);
export const Closed = djangoPartStory('chat-window', stories.Closed);
