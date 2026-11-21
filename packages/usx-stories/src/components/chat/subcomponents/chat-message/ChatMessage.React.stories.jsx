import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-message/ChatMessage';
import config from '../../../../../../usx-react/src/components/chat-message/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  ShortMessages: {
    allowThreads: true,
    id: 'short-message',
    participant: { id: 'avery', name: 'Avery' },
    message: { id: 'short', senderId: 'avery', text: 'OK' },
    allowForward: true,
    reactionOptions: [{ emoji: '👍', label: 'Helpful' }],
  },
  Default: {
    id: 'message',
    participant: {
      id: 'avery',
      name: 'Avery',
    },
    showCopyMessageAction: false,
    message: {
      id: 'm1',
      senderId: 'avery',
      text: 'Your appointment is confirmed.',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
    },
  },
  Outgoing: {
    id: 'message',
    participant: {
      id: 'avery',
      name: 'Avery',
      avatarProps: { contentClassName: 'bg-base-light text-base-dark' },
    },
    showCopyMessageAction: false,
    own: true,
    message: {
      id: 'm2',
      senderId: 'avery',
      text: 'Thank you!',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
      edited: true,
      deliveryStatus: 'Read',
    },
  },
  WithActions: {
    allowThreads: true,
    id: 'message',
    participant: {
      id: 'avery',
      name: 'Avery',
    },
    showCopyMessageAction: true,
    message: {
      id: 'm1',
      senderId: 'avery',
      text: 'Your appointment is confirmed.',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
      reactions: [
        {
          emoji: '👍',
          label: 'Helpful',
          count: 2,
          selected: true,
        },
      ],
      replyCount: 3,
    },
    allowForward: true,
    reactionOptions: [
      {
        emoji: '👍',
        label: 'Helpful',
      },
      {
        emoji: '❤️',
        label: 'Thanks',
      },
    ],
  },
  Sending: {
    id: 'message',
    participant: {
      id: 'avery',
      name: 'Avery',
    },
    showCopyMessageAction: false,
    own: true,
    message: {
      id: 'm1',
      senderId: 'avery',
      text: 'Your appointment is confirmed.',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
      deliveryState: 'sending',
    },
  },
  Failed: {
    id: 'message',
    participant: {
      id: 'avery',
      name: 'Avery',
    },
    showCopyMessageAction: false,
    own: true,
    message: {
      id: 'm1',
      senderId: 'avery',
      text: 'Your appointment is confirmed.',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
      deliveryState: 'failed',
    },
  },
  UnknownSender: {
    id: 'unknown-message',
    message: {
      id: 'm1',
      senderId: 'Support',
      text: 'Your appointment is confirmed.',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
    },
    showCopyMessageAction: false,
  },
  Grouped: {
    id: 'message',
    participant: {
      id: 'avery',
      name: 'Avery',
    },
    showCopyMessageAction: false,
    message: {
      id: 'm1',
      senderId: 'avery',
      text: 'Your appointment is confirmed.',
      sentAt: '2026-08-21T10:30:00Z',
      timeLabel: '10:30 AM',
    },
  },
};
export default {
  title: 'React/USX/Chat/Message',
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
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
export const Default = partStory(Component, 'chat-message', storyDefs.Default, {
  exampleId: 'message-default',
});
export const Outgoing = partStory(Component, 'chat-message', storyDefs.Outgoing, {
  exampleId: 'message-outgoing',
});
export const WithActions = partStory(Component, 'chat-message', storyDefs.WithActions, {
  exampleId: 'message-withactions',
});
export const Sending = partStory(Component, 'chat-message', storyDefs.Sending, {
  exampleId: 'message-sending',
});
export const Failed = partStory(Component, 'chat-message', storyDefs.Failed, {
  exampleId: 'message-failed',
});
export const UnknownSender = partStory(Component, 'chat-message', storyDefs.UnknownSender, {
  exampleId: 'message-unknownsender',
});
export const Grouped = partStory(Component, 'chat-message', storyDefs.Grouped, {
  exampleId: 'message-grouped',
  messagesFor: (args) =>
    ['first', 'middle', 'last'].map((groupPosition, index) => ({
      ...args.message,
      id: `group-${index}`,
      groupPosition,
      text: ['Your appointment is confirmed.', 'Please bring a photo ID.', 'See you Tuesday!'][
        index
      ],
    })),
});
export const ShortMessages = partStory(Component, 'chat-message', storyDefs.ShortMessages, {
  exampleId: 'message-shortmessages',
  messagesFor: (args) => [args.message, { ...args.message, id: 'short-own', senderId: 'you' }],
});
