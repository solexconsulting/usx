import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-window/ChatWindow';
import config from '../../../../../../usx-react/src/components/chat-window/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  Default: {
    id: 'window-default',
    title: 'Support',
    defaultOpen: true,
    status: 'Usually replies within a day.',
    children: 'Conversation content goes here.',
  },
  Inbox: {
    id: 'window-inbox',
    title: 'Messages',
    view: 'inbox',
    defaultOpen: true,
    showNewMessage: true,
    children: 'Your conversations go here.',
  },
  Thread: {
    id: 'window-thread',
    title: 'Thread',
    view: 'thread',
    defaultOpen: true,
    showBack: true,
    showCopyAction: true,
    status: 'In Application support',
    conversationId: 'support',
    conversationActions: [
      { id: 'leave-group', label: 'Leave group' },
      { id: 'delete-history', label: 'Delete chat history', disabled: true },
    ],
    children: 'Thread messages go here.',
  },
  Closed: {
    id: 'window-closed',
    summaryProps: { className: 'host-window-launcher', children: <span>Contact support</span> },
    title: 'Support',
    defaultOpen: false,
    children: 'Open the launcher to see this content.',
  },
};
export default {
  title: 'React/USX/Chat/Window',
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
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
export const Default = partStory(Component, 'chat-window', storyDefs.Default, {
  exampleId: 'window-default',
});
export const Inbox = partStory(Component, 'chat-window', storyDefs.Inbox, {
  exampleId: 'window-inbox',
});
export const Thread = partStory(Component, 'chat-window', storyDefs.Thread, {
  exampleId: 'window-thread',
});
export const Closed = partStory(Component, 'chat-window', storyDefs.Closed, {
  exampleId: 'window-closed',
});
