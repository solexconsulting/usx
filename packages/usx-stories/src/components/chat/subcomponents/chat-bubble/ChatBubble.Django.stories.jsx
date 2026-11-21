import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatBubble.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Bubble',
  decorators: componentInit('popover', 'chat'),
  parameters: {
    docs: {
      description: {
        component:
          'Message content, safe text formatting, attachments, and existing reaction counts. Compose inside ChatMessage for identity, alignment, and actions.',
      },
    },
  },
};
export const Default = djangoPartStory('chat-bubble', stories.Default);
export const Formatted = djangoPartStory('chat-bubble', stories.Formatted);
export const Attachments = djangoPartStory('chat-bubble', stories.Attachments);
export const Reactions = djangoPartStory('chat-bubble', stories.Reactions);
export const RichContent = djangoPartStory('chat-bubble', stories.RichContent);
