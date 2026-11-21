import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-directory-item/ChatDirectoryItem';
import config from '../../../../../../usx-react/src/components/chat-directory-item/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    ...config.default,
    avatarProps: [{ variant: 'initials', value: 'JL', alt: 'Jordan Lee' }],
    timeLabel: 'Yesterday',
    unreadCount: 2,
    actions: [{ id: 'delete-history', label: 'Delete chat history' }],
  },
  Contact: {
    id: 'contact-avery',
    title: 'Avery Patel',
    subtitle: 'Application support',
    participantId: 'avery',
    avatarProps: [{ variant: 'initials', value: 'AP', alt: 'Avery Patel' }],
  },
  LinkedContact: {
    id: 'contact-morgan',
    title: 'Morgan Chen',
    subtitle: 'Eligibility specialist',
    href: '#morgan',
  },
  Recipient: {
    id: 'recipient-avery',
    title: 'Avery Patel',
    subtitle: 'Application support',
    participantId: 'avery',
    selectable: true,
    selected: true,
    avatarProps: [{ variant: 'initials', value: 'AP', alt: 'Avery Patel' }],
  },
  Group: {
    id: 'group-review',
    title: 'Review team',
    conversationId: 'review',
    preview: 'Morgan: Ready for review.',
    avatarProps: [
      { variant: 'initials', value: 'AP', alt: 'Avery Patel' },
      { variant: 'initials', value: 'MC', alt: 'Morgan Chen' },
    ],
  },
  LongText: {
    id: 'long-directory-item',
    title: 'Neighborhood accessibility improvement working group',
    subtitle: 'The application for accessible entrances at the community center',
    preview:
      'We have finished reviewing the plans and are ready to discuss the next steps together.',
    conversationId: 'accessibility',
  },
};

export default {
  title: 'React/USX/Chat/Directory Item',
  component: Component,
  decorators: componentInit('popover', 'chat'),
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
  parameters: {
    docs: {
      description: {
        component:
          'One shared list item for conversations, contacts, and selectable recipients. Title and subtitle wrap; only the message preview truncates. Actions remain sibling controls. Place items in a Directory list and initialize Chat for its events.',
      },
    },
  },
};
export const Default = partStory(Component, 'chat-directory-item', storyDefs.Default, {
  exampleId: 'directory-item-default',
});
export const Contact = partStory(Component, 'chat-directory-item', storyDefs.Contact, {
  exampleId: 'directory-item-contact',
});
export const LinkedContact = partStory(Component, 'chat-directory-item', storyDefs.LinkedContact, {
  exampleId: 'directory-item-linkedcontact',
});
export const Recipient = partStory(Component, 'chat-directory-item', storyDefs.Recipient, {
  exampleId: 'directory-item-recipient',
});
export const Group = partStory(Component, 'chat-directory-item', storyDefs.Group, {
  exampleId: 'directory-item-group',
});
export const LongText = partStory(Component, 'chat-directory-item', storyDefs.LongText, {
  exampleId: 'directory-item-longtext',
});
