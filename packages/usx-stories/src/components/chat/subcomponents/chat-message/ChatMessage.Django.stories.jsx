import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatMessage.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Message',
  decorators: componentInit('popover', 'chat'),
  parameters: {
    docs: {
      description: {
        component:
          'One transcript list item: identity, ChatBubble, delivery state, timestamp, thread link, and ChatMessageActions. A group is consecutive messages with first/middle/last groupPosition values, not another wrapper. Chat derives these positions from sender and time.',
      },
    },
  },
};
export const Default = djangoPartStory('chat-message', stories.Default);
export const Outgoing = djangoPartStory('chat-message', stories.Outgoing);
export const WithActions = djangoPartStory('chat-message', stories.WithActions);
export const Sending = djangoPartStory('chat-message', stories.Sending);
export const Failed = djangoPartStory('chat-message', stories.Failed);
export const UnknownSender = djangoPartStory('chat-message', stories.UnknownSender);
export const Grouped = djangoPartStory('chat-message', stories.Grouped);
export const ShortMessages = djangoPartStory('chat-message', stories.ShortMessages);
