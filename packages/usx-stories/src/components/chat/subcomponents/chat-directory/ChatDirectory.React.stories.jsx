import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-directory/ChatDirectory';
import config from '../../../../../../usx-react/src/components/chat-directory/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  ContextualInbox: {
    id: 'directory-contextual',
    view: 'inbox',
    conversations: [
      {
        id: 'request',
        title: 'Support',
        context: { label: 'Request', title: 'Access request', href: '#access-request' },
        preview: 'Your request is ready.',
        actions: [{ id: 'delete-history', label: 'Delete history' }],
      },
      {
        id: 'listing',
        title: 'Jordan',
        href: '#conversation-listing',
        context: { label: 'Listing', title: 'Blue commuter bicycle', href: '#listing-bicycle' },
        preview: 'Available this weekend.',
      },
      { id: 'note', title: 'Updates', context: { label: 'Topic', title: 'General questions' } },
    ],
  },
  WithActions: {
    id: 'directory-actions',
    view: 'inbox',
    participants: [
      { id: 'agent', name: 'Morgan' },
      { id: 'specialist', name: 'Taylor' },
      { id: 'visitor', name: 'You' },
    ],
    conversations: [
      {
        id: 'review-team',
        title: 'Application review team',
        isGroup: true,
        participantIds: ['agent', 'specialist'],
        preview: 'Ready for the review?',
        actions: [
          { id: 'leave-group', label: 'Leave group' },
          { id: 'delete-history', label: 'Delete chat history' },
        ],
      },
      {
        id: 'support',
        title: 'Support',
        href: '#support',
        participantIds: ['agent'],
        actions: [{ id: 'delete-history', label: 'Delete chat history', disabled: true }],
      },
      { id: 'announcements', title: 'Announcements', participantIds: ['agent'] },
    ],
  },
  ContactActions: {
    id: 'directory-contact-actions',
    view: 'contacts',
    participants: [
      { id: 'agent', name: 'Morgan' },
      { id: 'specialist', name: 'Taylor' },
      { id: 'visitor', name: 'You' },
    ],
    contacts: [
      {
        participantId: 'agent',
        conversationId: 'support',
        actions: [{ id: 'delete-history', label: 'Delete chat history' }],
      },
    ],
  },
  RecipientPicker: {
    id: 'directory-recipients',
    view: 'contacts',
    selectable: true,
    recipientIds: ['agent'],
    participants: [
      { id: 'agent', name: 'Morgan' },
      { id: 'specialist', name: 'Taylor' },
      { id: 'visitor', name: 'You' },
    ],
    contacts: [
      { participantId: 'agent', description: 'Application support' },
      { participantId: 'specialist', description: 'Eligibility specialist' },
    ],
  },
  Default: { view: 'inbox', conversations: [] },
  People: {
    view: 'contacts',
    participants: [{ id: 'a', name: 'Avery' }],
    contacts: [{ participantId: 'a', description: 'Support' }],
  },
  Inbox: {
    view: 'inbox',
    participants: [{ id: 'a', name: 'Avery' }],
    conversations: [
      { id: 'c', title: 'Support', participantIds: ['a'], preview: 'Hello', unreadCount: 2 },
    ],
  },
};
export default {
  title: 'React/USX/Chat/Directory',
  component: Component,
  decorators: componentInit('popover', 'chat'),
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
};
export const Default = partStory(Component, 'chat-directory', storyDefs.Default, {
  exampleId: 'directory-default',
});
export const People = partStory(Component, 'chat-directory', storyDefs.People, {
  exampleId: 'directory-people',
});
export const Inbox = partStory(Component, 'chat-directory', storyDefs.Inbox, {
  exampleId: 'directory-inbox',
});
export const WithActions = partStory(Component, 'chat-directory', storyDefs.WithActions, {
  exampleId: 'directory-withactions',
});
export const ContactActions = partStory(Component, 'chat-directory', storyDefs.ContactActions, {
  exampleId: 'directory-contactactions',
});
export const RecipientPicker = partStory(Component, 'chat-directory', storyDefs.RecipientPicker, {
  exampleId: 'directory-recipientpicker',
});
export const ContextualInbox = partStory(Component, 'chat-directory', storyDefs.ContextualInbox, {
  exampleId: 'directory-contextualinbox',
});
