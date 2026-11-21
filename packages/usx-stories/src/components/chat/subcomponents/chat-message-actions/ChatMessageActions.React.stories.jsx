import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-message-actions/ChatMessageActions';
import config from '../../../../../../usx-react/src/components/chat-message-actions/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  Default: {
    id: 'tools-default',
    messageId: 'm1',
    senderName: 'Avery',
    canCopy: true,
    canReply: true,
    canForward: true,
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
    reactions: [
      {
        emoji: '👍',
        label: 'Helpful',
        count: 2,
        selected: true,
      },
    ],
    actions: [
      {
        id: 'report',
        label: 'Report message',
      },
    ],
  },
  HostActions: {
    id: 'tools-host',
    messageId: 'm2',
    senderName: 'You',
    actions: [
      { id: 'recall', label: 'Recall message' },
      { id: 'mark-unread', label: 'Mark unread' },
      {
        id: 'edit',
        label: 'Edit message',
      },
      {
        id: 'delete',
        label: 'Delete message',
        disabled: true,
      },
    ],
  },
  ReactionsOnly: {
    id: 'tools-reactions',
    messageId: 'm3',
    senderName: 'Jordan',
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
};
export default {
  title: 'React/USX/Chat/Message Actions',
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
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
export const Default = partStory(Component, 'chat-message-actions', storyDefs.Default, {
  exampleId: 'message-actions-default',
});
export const HostActions = partStory(Component, 'chat-message-actions', storyDefs.HostActions, {
  exampleId: 'message-actions-hostactions',
});
export const ReactionsOnly = partStory(Component, 'chat-message-actions', storyDefs.ReactionsOnly, {
  exampleId: 'message-actions-reactionsonly',
});
