import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const message = { id: 'm', senderId: 'user', text: 'Hello', timeLabel: 'Now' };
const person = { id: 'user', name: ' User Name ' };
const action = { id: 'custom', label: 'Custom action' };
const emoji = { name: 'smile', emoji: '☺', label: 'Smile' };
const conversation = {
  id: 'c',
  title: 'Conversation',
  participantIds: ['user'],
  messages: [message],
};
const contact = { participantId: 'user', description: 'Contact' };
const choice = { label: 'Yes', value: 'yes' };
const attachment = { name: 'Image', url: '/file.png', imageUrl: '/file.png' };

const samples = {
  'chat-directory-item': [
    { id: 'item', title: 'Jordan' },
    {
      id: 'item',
      title: 'Jordan',
      subtitle: 'Books',
      preview: 'Available',
      conversationId: 'books',
      unreadCount: 2,
      actions: [action],
    },
    {
      id: 'item',
      title: 'Jordan',
      subtitle: 'Support',
      participantId: 'jordan',
      selectable: true,
      selected: true,
      formId: 'recipients',
      avatarProps: [{ variant: 'initials', value: 'JL', alt: 'Jordan' }],
    },
  ],
  chat: [
    { id: 'parity', emojiPack: [] },
    {
      id: 'parity',
      emojiPack: [emoji],
      participants: [person],
      messages: [message],
      contacts: [contact],
      conversations: [conversation],
      activeConversationId: 'c',
      view: 'conversation',
      choices: [choice],
      suggestedQuestions: [choice],
    },
  ],
  'chat-window': [
    { id: 'parity' },
    { id: 'parity', conversationActions: [action], showBack: true },
  ],
  'chat-composer': [
    { id: 'parity' },
    { id: 'parity', value: 'Draft', allowAttachments: true, allowFormatting: true },
  ],
  'chat-directory': [
    {},
    { conversations: [conversation], contacts: [contact], participants: [person] },
  ],
  'chat-message': [
    { id: 'parity', message },
    {
      id: 'parity',
      message: { ...message, actions: [action], reactions: [{ ...emoji, count: 1 }] },
      participant: person,
      reactionOptions: [emoji],
    },
  ],
  'chat-bubble': [
    {},
    { text: 'Hello', attachments: [attachment], reactions: [{ ...emoji, count: 0 }] },
  ],
  'chat-message-actions': [
    { id: 'parity', messageId: 'm', senderName: 'User' },
    {
      id: 'parity',
      messageId: 'm',
      senderName: 'User',
      reactionOptions: [emoji],
      actions: [action],
    },
  ],
  'chat-controls': [{}, { choices: [choice], suggestedQuestions: [choice] }],
  'chat-history': [{}, { hasMore: true, error: 'Try again' }],
  'chat-context': [
    { label: 'Context', title: 'Title' },
    { label: 'Context', title: 'Title', imageUrl: '/photo.png', href: '/subject' },
  ],
  'chat-attachment': [{ name: 'File' }, attachment],
  'chat-attachments': [{}, { items: [attachment] }],
};
const edges = {
  'chat-directory-item': [
    {
      id: 'item',
      title: '',
      subtitle: '',
      preview: '',
      href: '',
      conversationId: '',
      participantId: '',
    },
    {
      id: 'item',
      title: 'Team',
      avatarProps: [
        { variant: 'initials', value: 'AB', className: 'usx-chat__avatar custom' },
        { variant: 'icon', value: 'groups' },
      ],
      actions: [action],
      href: '/team',
    },
    {
      id: 'item',
      title: 'Recipient',
      selectable: true,
      formId: '',
      subtitle: 'Description',
      disabled: true,
      actions: [action],
    },
  ],
  chat: [
    ...['𐐀lan Smith', '😀 Support', 'Élodie Martin'].flatMap((name) => [
      { participants: [{ ...person, name }], messages: [message], typingIds: ['user'] },
      { view: 'contacts', participants: [{ ...person, name }], contacts: [contact] },
    ]),
    ...[
      ['2026-01-01T12:00:00', '2026-01-01T12:00:00Z'],
      ['2026-01-01T12:00', '2026-01-01T13:00:00+01:00'],
      ['2026-01-01T12:00:00Z', '2026-01-01T07:00:00-05:00'],
      ['2026-01-01T12:00:00.000100Z', '2026-01-01T12:00:00.000200Z'],
      ['1969-12-31T23:59:59.9991Z', '1969-12-31T23:59:59.9999Z'],
      ['2026-01-01T12:00:00.001Z', '2026-01-01T12:00:00.002Z'],
      ['2026-02-30T12:00:00Z', '2026-03-02T12:00:00Z'],
      ['2026-01-01T24:00:00Z', '2026-01-02T00:00:00Z'],
      ['2026-01-01T12:00:00+01:60', '2026-01-01T10:00:00Z'],
      ['0000-01-01T12:00:00Z', '0000-01-01T12:00:00Z'],
      ['not a timestamp', 'not a timestamp'],
      ['2026-01-01T12:00:00Z\n', '2026-01-01T12:00:00Z'],
    ].map(([first, second]) => ({
      groupWindowMinutes: 0,
      messages: [
        { ...message, sentAt: first },
        { ...message, id: 'next', sentAt: second },
      ],
    })),
    ...[false, true].flatMap((allowThreads) =>
      [undefined, false, true].map((override) => ({
        allowThreads,
        view: 'conversation',
        activeConversationId: 'c',
        conversations: [
          {
            ...conversation,
            allowThreads: override,
            messages: [
              message,
              {
                ...message,
                id: 'other',
                senderId: 'other',
                replies: [{ ...message, id: 'reply' }],
              },
            ],
          },
        ],
      }))
    ),
    {
      view: 'conversation',
      activeConversationId: 'c',
      conversations: [
        { ...conversation, context: { label: 'Subject', title: 'Request', href: '#subject' } },
      ],
    },
    { emojiPack: undefined },
    ...[undefined, [], [message]].map((messages) => ({
      messages: [message],
      conversations: [{ ...conversation, messages }],
      activeConversationId: 'c',
      view: 'conversation',
    })),
    ...['', 'missing', undefined].map((activeConversationId) => ({
      activeConversationId,
      defaultConversationId: 'c',
      conversations: [conversation],
      view: 'conversation',
    })),
    { typingIds: ['missing'], participants: [] },
    ...['', 'bg-base-light text-base-dark'].map((contentClassName) => ({
      typingIds: ['user'],
      participants: [{ ...person, avatarProps: { contentClassName } }],
      messages: [message],
    })),
    { messages: [{ ...message, id: '' }] },
    { recipientIds: ['user'], view: 'contacts', contacts: [contact], participants: [person] },
    {
      allowAttachments: false,
      recipientId: 'user',
      contacts: [{ ...contact, allowAttachments: true }],
      conversations: [conversation],
      activeConversationId: 'c',
      view: 'conversation',
    },
    ...[undefined, -1, 0, 1, 1.5].map((replyCount) => ({
      view: 'thread',
      title: '',
      activeThreadId: 'm',
      messages: [
        {
          ...message,
          text: '',
          exportText: 'Copy',
          replyCount,
          olderReplies: { hasMore: true },
          replies: [{ ...message, id: 'r' }],
        },
      ],
    })),
    ...['', 'missing'].map((activeThreadId) => ({
      view: 'thread',
      activeThreadId,
      messages: [message],
    })),
    { olderHistory: { hasMore: true, cursor: '' } },
    {
      groupWindowMinutes: 0,
      messages: [
        { ...message, sentAt: '2026-01-01T00:00:00Z' },
        { ...message, id: 'next', sentAt: '2026-01-01T00:00:00Z' },
      ],
    },
    {
      activeThreadId: 'm',
      view: 'thread',
      messages: [{ ...message, replies: [{ ...message, id: 'reply', reactionOptions: [] }] }],
    },
    { messageActions: { sent: [action] }, messages: [{ ...message, actions: [] }] },
    {
      messageActions: { sent: [action] },
      participants: [{ ...person, messageActions: [] }],
      messages: [message],
    },
  ],
  'chat-message': [
    ...['', 'bg-base-light text-base-dark'].map((contentClassName) => ({
      participant: { ...person, avatarProps: { contentClassName } },
    })),
    ...['', undefined].map((exportText) => ({ message: { ...message, exportText } })),
    { message: { ...message, text: '', clientMessageId: '', sentAt: '' } },
    ...['', false, 0].map((content) => ({ message: { ...message, content } })),
    ...['sending', 'failed'].map((deliveryState) => ({
      message: { ...message, text: '', deliveryState, attachments: [attachment] },
    })),
    ...['single', 'first', 'middle', 'last'].map((groupPosition) => ({
      message: { ...message, groupPosition, sentAt: '', edited: true },
    })),
    { message: { ...message, replyCount: 0, replies: [message] } },
    {
      message: {
        ...message,
        layout: 'panel',
        actions: [action],
        reactions: [{ ...emoji, count: 1 }],
      },
    },
  ],
  'chat-bubble': [
    ...['', false, 0].map((content) => ({ text: 'Hello', content })),
    ...[
      '```\n  code\n\n```',
      '> First\n>> Nested\n> Last',
      'One\nTwo\n\n**bold** & <script>alert(1)</script>',
      '1. One\n2. Two\n- Three',
      '١. Literal text\n２. Also literal text',
    ].map((text) => ({ text })),
  ],
  'chat-directory': [
    ...[undefined, '', '#conversation'].flatMap((href) =>
      [undefined, '', '#subject'].map((contextHref) => ({
        conversations: [
          {
            ...conversation,
            href,
            context: { label: 'Subject', title: 'Request', href: contextHref },
            actions: [action],
          },
        ],
      }))
    ),
    ...[
      {},
      { className: 'custom' },
      { contentClassName: '' },
      { contentClassName: 'bg-base-light text-base-dark' },
      { variant: 'initials', value: '', alt: '' },
      { variant: 'image', src: '/avatar.png', alt: 'Photo' },
    ].flatMap((avatarProps) => [
      { view: 'contacts', contacts: [contact], participants: [{ ...person, avatarProps }] },
      { conversations: [{ ...conversation, isGroup: true, avatarProps }] },
    ]),
    {
      view: 'contacts',
      selectable: true,
      formId: '',
      recipientIds: ['user'],
      contacts: [contact],
      participants: [person],
    },
    {
      conversations: [{ ...conversation, title: '', unreadCount: 0 }],
      participants: [{ ...person, name: '' }],
    },
  ],
};

function launcherCases(bases) {
  const cases = [];
  const launcher = React.createElement(
    React.Fragment,
    null,
    React.createElement('span', null, 'Ask us'),
    React.createElement('strong', null, ' about an application')
  );
  const children = React.createElement(
    'button',
    { type: 'button', className: 'host-controls' },
    'Get help'
  );
  const props = {
    ...bases[0],
    summaryProps: {
      className: 'host-launcher',
      ariaLabel: 'Contact support',
      title: 'Support',
      children: launcher,
    },
    children,
  };
  cases.push({
    label: 'host launcher props and separate body controls',
    props: {
      ...props,
      summaryProps: { ...props.summaryProps, children: renderToStaticMarkup(launcher) },
      children: renderToStaticMarkup(children),
    },
    reactProps: props,
  });
  for (const summaryProps of [
    {},
    { className: 'custom' },
    { label: '' },
    { children: '' },
    { children: false },
    { children: true },
    { children: 0 },
    { ariaLabel: '', title: '' },
    { className: '', label: 'Help' },
  ]) {
    cases.push({
      label: 'launcher ' + JSON.stringify(summaryProps),
      props: { ...bases[0], summaryProps },
    });
  }
  return cases;
}

export default Object.entries(samples).map(([component, bases]) => ({
  component,
  bases,
  edges: edges[component] || [],
  cases: ['chat', 'chat-window'].includes(component) ? launcherCases(bases) : [],
}));
