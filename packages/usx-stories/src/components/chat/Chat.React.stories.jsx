import React from 'react';
import Chat from '../../../../usx-react/src/components/chat/Chat.tsx';
import ChatStoryHost from './ChatStoryHost.jsx';
import Link from '../../../../usx-react/src/components/link/Link';
import config from '../../../../usx-react/src/components/chat/config.json';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';

const exampleDefaults = {
  ...config.default,
  summaryProps: { label: 'Chat with us', className: 'usa-button usx-button usa-button--primary' },
};

const participants = [
  { id: 'visitor', name: 'You', avatarProps: { variant: 'initials', value: 'YO', alt: 'You' } },
  {
    id: 'agent',
    name: 'Morgan',
    presence: 'online',
    avatarProps: {
      variant: 'image',
      src: '/chat-avatar-morgan.webp',
      alt: 'Morgan',
      shape: 'circle',
    },
  },
  {
    id: 'specialist',
    name: 'Taylor',
    presence: 'away',
    avatarProps: { variant: 'initials', value: 'TA', alt: 'Taylor' },
  },
  {
    id: 'bot',
    name: 'Guide bot',
    avatarProps: {
      variant: 'icon',
      value: 'support',
      alt: 'Guide bot',
      statusRingColor: 'info',
      statusLabel: 'Automated assistant',
    },
  },
];

const conversation = [
  {
    id: 'a1',
    senderId: 'agent',
    text: 'Welcome! I can help with your application.',
    sentAt: '2026-01-01T12:00:00Z',
    timeLabel: '12:00 PM',
  },
  {
    id: 'a2',
    senderId: 'agent',
    text: 'What would you like to know?',
    sentAt: '2026-01-01T12:01:00Z',
    timeLabel: '12:01 PM',
  },
  {
    id: 'u1',
    senderId: 'visitor',
    text: 'Can I save my progress?',
    sentAt: '2026-01-01T12:02:00Z',
    timeLabel: '12:02 PM',
  },
  {
    id: 'u2',
    senderId: 'visitor',
    text: 'I may need to finish tomorrow.',
    sentAt: '2026-01-01T12:03:00Z',
    timeLabel: '12:03 PM',
  },
  {
    id: 'a3',
    senderId: 'agent',
    text: 'Yes. Your draft is saved as you work.',
    sentAt: '2026-01-01T12:04:00Z',
    timeLabel: '12:04 PM',
  },
  {
    id: 'a4',
    senderId: 'agent',
    text: 'Return before the deadline to submit it.',
    sentAt: '2026-01-01T12:05:00Z',
    timeLabel: '12:05 PM',
  },
];

const longHistoryMessages = Array.from({ length: 24 }, (_, index) => ({
  id: `history-${index + 1}`,
  senderId: index % 2 ? 'visitor' : 'agent',
  text:
    index === 23
      ? 'Thanks, I have everything I need to continue.'
      : `Message ${index + 1}: Here is the information we discussed about your application and its next steps.`,
  sentAt: `2026-01-01T12:${String(index).padStart(2, '0')}:00Z`,
  timeLabel: `12:${String(index).padStart(2, '0')} PM`,
}));

const threadHistoryReplies = Array.from({ length: 12 }, (_, index) => ({
  id: `thread-history-${index + 1}`,
  senderId: index % 2 ? 'agent' : 'visitor',
  text: `Thread reply ${index + 1}: Here is another detail about the request.`,
  sentAt: `2026-01-01T13:${String(index).padStart(2, '0')}:00Z`,
  timeLabel: `1:${String(index).padStart(2, '0')} PM`,
}));

const inboxConversations = [
  {
    id: 'morgan',
    title: 'Morgan',
    participantIds: ['agent'],
    preview: 'Your draft is saved as you work.',
    timeLabel: '12:05 PM',
    unreadCount: 2,
    firstUnreadMessageId: 'a3',
    allowAttachments: true,
    messages: conversation,
  },
  {
    id: 'taylor',
    title: 'Taylor',
    participantIds: ['specialist'],
    preview: 'I can clarify eligibility.',
    timeLabel: 'Yesterday',
    unreadCount: 1,
    firstUnreadMessageId: 't1',
    allowAttachments: false,
    messages: [
      {
        id: 't1',
        senderId: 'specialist',
        text: 'I can clarify eligibility.',
        sentAt: '2026-01-01T10:00:00Z',
        timeLabel: '10:00 AM',
      },
    ],
  },
];

const chatContacts = [
  { participantId: 'agent', description: 'Application support', conversationId: 'morgan' },
  { participantId: 'specialist', description: 'Eligibility specialist', conversationId: 'taylor' },
  { participantId: 'bot', description: 'Automated help', allowAttachments: true },
];

export const storyDefs = {
  ConversationActions: {
    id: 'chat-conversation-actions',
    title: 'Messages',
    currentUserId: 'visitor',
    participants: [
      { id: 'agent', name: 'Morgan' },
      { id: 'specialist', name: 'Taylor' },
      { id: 'visitor', name: 'You' },
    ],
    defaultOpen: true,
    view: 'conversation',
    activeConversationId: 'review-team',
    conversations: [
      {
        id: 'review-team',
        title: 'Application review team',
        isGroup: true,
        participantIds: ['agent', 'specialist'],
        preview: 'Ready for the review?',
        messages: [
          {
            id: 'review-1',
            senderId: 'agent',
            text: 'The application documents are ready.',
            timeLabel: '9:00 AM',
          },
          {
            id: 'review-2',
            senderId: 'specialist',
            text: 'Ready for the review?',
            timeLabel: '9:05 AM',
          },
        ],
        actions: [
          { id: 'leave-group', label: 'Leave group' },
          { id: 'delete-history', label: 'Delete chat history' },
        ],
      },
      {
        id: 'support',
        title: 'Support',
        participantIds: ['agent'],
        actions: [{ id: 'delete-history', label: 'Delete chat history', disabled: true }],
      },
      { id: 'announcements', title: 'Announcements', participantIds: ['agent'] },
    ],
    contacts: [
      { participantId: 'agent', description: 'Application support' },
      { participantId: 'specialist', description: 'Eligibility specialist' },
    ],
  },
  NewGroupMessage: {
    id: 'chat-new-group',
    title: 'Messages',
    currentUserId: 'visitor',
    participants: [
      { id: 'agent', name: 'Morgan' },
      { id: 'specialist', name: 'Taylor' },
      { id: 'visitor', name: 'You' },
    ],
    defaultOpen: true,
    view: 'contacts',
    contacts: [
      { participantId: 'agent', description: 'Application support' },
      { participantId: 'specialist', description: 'Eligibility specialist' },
    ],
    emojiPack: [],
  },
  Default: {
    ...exampleDefaults,
    defaultOpen: true,
    emojiPack: config.props.emojiPack.default,
    reactionOptions: [
      { emoji: '👍', label: 'Thumbs up' },
      { emoji: '❤️', label: 'Heart' },
      { emoji: '🎉', label: 'Celebrate' },
    ],
  },
  LongHistory: {
    ...exampleDefaults,
    id: 'chat-long-history',
    defaultOpen: true,
    messages: longHistoryMessages.slice(-8),
    olderHistory: { hasMore: true, cursor: '16' },
  },
  MultipleParticipants: {
    ...exampleDefaults,
    id: 'chat-group',
    defaultOpen: true,
    participants,
    context: {
      label: 'Access request',
      title: 'AR-2048 · Study data access',
      description: 'Awaiting applicant response',
      href: '#access-request-details',
    },
    typingIds: ['agent', 'specialist'],
    reactionOptions: [
      { emoji: '👍', label: 'Thumbs up' },
      { emoji: '❤️', label: 'Heart' },
      { emoji: '🎉', label: 'Celebrate' },
    ],
    messages: [
      {
        ...conversation[0],
        reactions: [{ emoji: '👍', label: 'Thumbs up', count: 2, selected: true }],
      },
      ...conversation.slice(1, 2),
      {
        id: 's1',
        senderId: 'specialist',
        text: 'I can clarify the eligibility requirements.',
        sentAt: '2026-01-01T12:08:00Z',
        timeLabel: '12:08 PM',
      },
      {
        id: 'u3',
        senderId: 'visitor',
        text: 'Thank you, Taylor.',
        sentAt: '2026-01-01T12:09:00Z',
        timeLabel: '12:09 PM',
      },
    ],
  },
  BotControlsWithHistory: {
    ...exampleDefaults,
    id: 'chat-bot-history',
    title: 'Guide bot',
    defaultOpen: true,
    participants,
    messages: Array.from({ length: 16 }, (_, index) => ({
      id: `bot-history-${index + 1}`,
      senderId: index % 2 ? 'visitor' : 'bot',
      text:
        index % 2
          ? `Thanks. I have another question about step ${index + 1}.`
          : `Here is the guidance for step ${index + 1} of your application.`,
      sentAt: `2026-01-01T12:${String(index).padStart(2, '0')}:00Z`,
      timeLabel: `12:${String(index).padStart(2, '0')} PM`,
    })),
    suggestedQuestions: Array.from({ length: 8 }, (_, index) => ({
      label: `How does step ${index + 1} work?`,
      value: `step-${index + 1}`,
    })),
    choicePrompt: 'Choose a topic',
    choices: [
      { label: 'Eligibility', value: 'eligibility' },
      { label: 'Documents', value: 'documents' },
      { label: 'Deadlines', value: 'deadlines' },
      { label: 'Account help', value: 'account' },
    ],
  },
  Attachments: {
    ...exampleDefaults,
    id: 'chat-attachments',
    title: 'Visitor help',
    defaultOpen: true,
    allowAttachments: true,
    messages: [
      {
        id: 'f1',
        senderId: 'visitor',
        text: 'Is this the Statue of Liberty? My notes are attached.',
        sentAt: '2026-01-01T12:00:00Z',
        timeLabel: '12:00 PM',
        attachments: [
          {
            name: 'Liberty Island photo.png',
            url: '/lady_liberty.png',
            imageUrl: '/lady_liberty.png',
            alt: 'Close-up of the Statue of Liberty against the sky',
          },
          { name: 'Liberty Island notes.txt', url: '/liberty-island-notes.txt' },
        ],
      },
    ],
  },
  ActionsAndRichContent: {
    ...exampleDefaults,
    id: 'chat-actions',
    defaultOpen: true,
    showCopyAction: true,
    actions: (
      <Link href="/iframe.html?id=react-usx-chat--default&viewMode=story">
        Open example conversation
      </Link>
    ),
    messages: [
      {
        id: 'r1',
        senderId: 'visitor',
        text: 'Where can I learn more?',
        sentAt: '2026-01-01T12:00:00Z',
        timeLabel: '12:00 PM',
      },
      {
        id: 'r2',
        senderId: 'agent',
        content: (
          <>
            <p>Start with these resources:</p>
            <ul>
              <li>
                <Link href="#application-guide">Application guide</Link>
              </li>
              <li>
                <Link href="#help-center">Help center</Link>
              </li>
            </ul>
          </>
        ),
        exportText: 'Start with these resources:\n- Application guide\n- Help center',
        sentAt: '2026-01-01T12:01:00Z',
        timeLabel: '12:01 PM',
      },
      {
        id: 'r3',
        senderId: 'agent',
        content: 'Your reference number is AR-2048.',
        sentAt: '2026-01-01T12:02:00Z',
        timeLabel: '12:02 PM',
      },
    ],
  },
  FloatingLauncher: {
    ...exampleDefaults,
    id: 'chat-floating',
    side: 'top',
    align: 'end',
  },
  TextLauncher: {
    ...exampleDefaults,
    id: 'chat-text-launcher',
    summaryProps: {
      className: 'my-custom-launcher usa-button usx-button usa-button--unstyled',
      ariaLabel: 'Questions? Chat with us',
      title: 'Contact support',
      children: (
        <>
          <span>Questions?</span> <strong>Chat with us</strong>
        </>
      ),
    },
  },
  InboxJourney: {
    ...exampleDefaults,
    id: 'chat-inbox-journey',
    title: 'Messages',
    defaultOpen: true,
    participants,
    conversations: inboxConversations,
    contacts: chatContacts,
    defaultView: 'inbox',
  },
  EmptyInbox: {
    ...exampleDefaults,
    id: 'chat-empty-inbox',
    title: 'Messages',
    defaultOpen: true,
    participants,
    conversations: [],
    contacts: chatContacts,
    defaultView: 'inbox',
  },
  GroupInbox: {
    ...exampleDefaults,
    id: 'chat-group-inbox',
    title: 'Messages',
    defaultOpen: true,
    defaultView: 'inbox',
    participants: [
      ...participants,
      {
        id: 'jordan',
        name: 'Jordan',
        avatarProps: {
          variant: 'image',
          src: '/chat-avatar-jordan.webp',
          alt: 'Jordan',
          shape: 'circle',
        },
      },
      {
        id: 'avery',
        name: 'Avery',
        avatarProps: {
          variant: 'image',
          src: '/chat-avatar-avery.webp',
          alt: 'Avery',
          shape: 'circle',
        },
      },
    ],
    conversations: [
      {
        id: 'review-team',
        title: 'Access review team',
        participantIds: ['visitor', 'agent', 'specialist', 'jordan', 'avery'],
        preview: 'I uploaded the revised approval letter.',
        previewSenderId: 'avery',
        timeLabel: '9:42 AM',
        unreadCount: 2,
        firstUnreadMessageId: 'group-3',
        messages: [
          {
            id: 'group-1',
            senderId: 'agent',
            text: 'The request is ready for review.',
            sentAt: '2026-01-01T09:30:00Z',
            timeLabel: '9:30 AM',
          },
          {
            id: 'group-2',
            senderId: 'visitor',
            text: 'Thank you. I will send the letter.',
            sentAt: '2026-01-01T09:32:00Z',
            timeLabel: '9:32 AM',
          },
          {
            id: 'group-3',
            senderId: 'specialist',
            text: 'I can check the approval language.',
            sentAt: '2026-01-01T09:40:00Z',
            timeLabel: '9:40 AM',
          },
          {
            id: 'group-4',
            senderId: 'avery',
            text: 'I uploaded the revised approval letter.',
            sentAt: '2026-01-01T09:42:00Z',
            timeLabel: '9:42 AM',
          },
        ],
      },
      {
        id: 'project-updates',
        title: 'Project updates',
        participantIds: ['agent'],
        isGroup: true,
        avatarProps: { variant: 'icon', value: 'people', alt: 'Project updates group' },
        preview: 'The schedule is confirmed.',
        previewSenderId: 'agent',
        timeLabel: 'Yesterday',
        messages: [
          {
            id: 'project-1',
            senderId: 'agent',
            text: 'The schedule is confirmed.',
            sentAt: '2026-01-01T08:00:00Z',
            timeLabel: '8:00 AM',
          },
        ],
      },
      {
        id: 'former-team',
        title: 'Former review team',
        participantIds: ['specialist'],
        isGroup: true,
        preview: 'The handoff is complete.',
        previewSenderId: 'specialist',
        timeLabel: 'Monday',
        messages: [
          {
            id: 'former-1',
            senderId: 'specialist',
            text: 'The handoff is complete.',
            sentAt: '2026-01-01T07:00:00Z',
            timeLabel: '7:00 AM',
          },
        ],
      },
      inboxConversations[0],
    ],
  },
  LinkedNavigation: {
    ...exampleDefaults,
    id: 'chat-linked-navigation',
    title: 'Messages',
    defaultOpen: true,
    participants,
    conversations: inboxConversations.map((item) => ({
      ...item,
      href:
        item.id === 'morgan'
          ? '/iframe.html?id=react-usx-chat--message-actions&viewMode=story'
          : '/iframe.html?id=react-usx-chat--bot-controls-with-history&viewMode=story',
    })),
    contacts: chatContacts.map((item) => ({
      ...item,
      href: '/iframe.html?id=react-usx-chat--default&viewMode=story',
    })),
    defaultView: 'inbox',
  },
  ContextualInbox: {
    ...exampleDefaults,
    id: 'chat-contextual-inbox',
    title: 'Messages',
    defaultOpen: true,
    participants: [
      participants[0],
      {
        id: 'seller',
        name: 'Jordan Lee',
        avatarProps: {
          variant: 'image',
          src: '/chat-avatar-jordan.webp',
          alt: 'Jordan Lee',
          shape: 'circle',
        },
      },
    ],
    conversations: [
      {
        id: 'bicycle',
        title: 'Jordan Lee',
        participantIds: ['seller'],
        context: {
          label: 'Marketplace listing',
          title: 'Blue commuter bicycle',
          description: '$120',
          imageUrl: '/marketplace-bicycle.svg',
          imageAlt: 'Blue commuter bicycle illustration',
          href: '#listing-bicycle',
        },
        preview: 'You can pick it up this weekend.',
        timeLabel: '12:02 PM',
        messages: [
          {
            id: 'bike-1',
            senderId: 'seller',
            text: 'You can pick it up this weekend.',
            sentAt: '2026-01-01T12:02:00Z',
            timeLabel: '12:02 PM',
          },
        ],
      },
      {
        id: 'books',
        title: 'Jordan Lee',
        participantIds: ['seller'],
        context: {
          label: 'Marketplace listing',
          title: 'Three design books',
          description: '$25',
          href: '#listing-books',
        },
        preview: 'I can bundle all three.',
        timeLabel: 'Yesterday',
        messages: [
          {
            id: 'books-1',
            senderId: 'seller',
            text: 'I can bundle all three.',
            sentAt: '2026-01-01T10:00:00Z',
            timeLabel: '10:00 AM',
          },
        ],
      },
    ],
    defaultView: 'inbox',
  },
  MixedUnread: {
    ...exampleDefaults,
    id: 'chat-mixed-unread',
    defaultOpen: true,
    participants,
    conversations: inboxConversations,
    defaultView: 'conversation',
    defaultConversationId: 'morgan',
  },
  ThreadHistory: {
    ...exampleDefaults,
    id: 'chat-thread-history',
    allowThreads: true,
    defaultOpen: true,
    defaultView: 'thread',
    activeThreadId: 'thread-history-root',
    context: {
      label: 'Access request',
      title: 'AR-2048 · Study data access',
      href: '#access-request-details',
    },
    messages: [
      {
        id: 'thread-history-root',
        senderId: 'agent',
        text: 'Can we review this detail in a thread?',
        sentAt: '2026-01-01T13:00:00Z',
        timeLabel: '1:00 PM',

        replies: threadHistoryReplies.slice(-4),
        olderReplies: { hasMore: true, cursor: '8' },
      },
    ],
  },
  MessageActions: {
    ...exampleDefaults,
    id: 'chat-message-actions',
    messageActions: {
      sent: [
        { id: 'edit', label: 'Edit message' },
        { id: 'delete', label: 'Delete message' },
      ],
      received: [
        { id: 'mark-unread', label: 'Mark unread' },
        { id: 'delete-message', label: 'Delete message' },
      ],
    },
    defaultOpen: true,
    participants,
    contacts: chatContacts,
    view: 'conversation',
    activeConversationId: 'support',
    reactionOptions: [
      { emoji: '👍', label: 'Thumbs up' },
      { emoji: '❤️', label: 'Heart' },
      { emoji: '🎉', label: 'Celebrate' },
    ],
    conversations: [
      {
        id: 'support',
        allowThreads: true,
        title: 'Support',
        participantIds: ['agent'],
        messages: [
          {
            id: 'expired',
            sentAt: '2025-12-31T10:00:00Z',
            senderId: 'visitor',
            text: 'This earlier message is outside the host recall window.',
            timeLabel: 'Yesterday',
            actions: [{ id: 'delete-message', label: 'Delete message' }],
          },
          { ...conversation[0], id: 'new-thread' },
          {
            id: 'action-1',
            senderId: 'visitor',
            text: 'I can update this message.',
            sentAt: '2026-01-01T12:01:00Z',
            timeLabel: '12:01 PM',
            edited: true,
            deliveryStatus: 'Read',

            replyCount: 2,
            replies: [
              {
                id: 'action-reply-1',
                senderId: 'agent',
                text: 'I can help with that.',
                sentAt: '2026-01-01T12:01:00Z',
                timeLabel: '12:01 PM',
              },
              {
                id: 'action-reply-2',
                senderId: 'visitor',
                text: 'Thanks!',
                sentAt: '2026-01-01T12:02:00Z',
                timeLabel: '12:02 PM',
              },
            ],
            actions: [
              { id: 'edit', label: 'Edit message' },
              { id: 'delete', label: 'Delete message' },
            ],
            reactions: [
              { emoji: '👍', label: 'Thumbs up', count: 2, selected: true },
              { emoji: '❤️', label: 'Heart', count: 1 },
            ],
          },
          {
            id: 'received',
            sentAt: '2026-01-01T12:02:00Z',
            senderId: 'agent',
            text: 'Your appointment is at 10 AM.',
            timeLabel: '12:02 PM',
          },
          {
            id: 'recent',
            sentAt: '2026-01-01T12:03:00Z',
            senderId: 'visitor',
            text: 'I sent the wrong appointment time.',
            timeLabel: 'Just now',
            actions: [
              { id: 'delete-message', label: 'Delete message' },
              { id: 'recall', label: 'Recall message' },
            ],
          },
        ],
      },
    ],
  },
  UnavailableThread: {
    ...exampleDefaults,
    id: 'chat-unavailable-thread',
    defaultOpen: true,
    defaultView: 'thread',
    activeThreadId: 'missing-root',
    messages: [conversation[0]],
  },
  FailedSend: {
    ...exampleDefaults,
    id: 'chat-failed-send',
    defaultOpen: true,
    allowAttachments: true,
    messages: [
      {
        id: 'previous-failed',
        senderId: 'visitor',
        text: 'Did you receive my document?',
        sentAt: '2026-01-01T11:59:00Z',
        timeLabel: '11:59 AM',
        deliveryState: 'failed',
      },
    ],
  },
  CustomEmojiPack: {
    ...exampleDefaults,
    id: 'chat-custom-emoji-pack',
    defaultOpen: true,
    emojiPack: [
      { emoji: '🧪', name: 'test_tube', label: 'Test tube', aliases: ['lab'] },
      { emoji: '🔬', name: 'microscope', label: 'Microscope' },
      { emoji: '🧬', name: 'dna', label: 'DNA' },
    ],
    reactionOptions: undefined,
    messages: [
      { ...conversation[0], id: 'custom-emoji-message', text: 'Which lab tool do you need?' },
    ],
  },
  Formatting: {
    ...exampleDefaults,
    id: 'chat-formatting',
    defaultOpen: true,
    allowAttachments: true,
    allowFormatting: true,
    emojiPack: config.props.emojiPack.default,
    reactionOptions: undefined,
    messages: [
      {
        id: 'format-inline',
        senderId: 'agent',
        text: '**Bold** and *italic*, <u>underlined</u>, and ~~struck out~~ text.',
        timeLabel: '12:00 PM',
      },
      {
        id: 'format-blocks',
        senderId: 'agent',
        text: 'A short checklist:\n1. Read the guide\n2. Reply here\n\n- Attach a file if needed\n- Send your answer\n\n> Keep a copy for your records.\n\n```\nconst ready = true;\n```',
        timeLabel: '12:01 PM',
      },
      {
        id: 'format-nested',
        senderId: 'agent',
        text: '> Outer quote\n> > hello world\n> > > Deep quote\n> > > > > Five levels deep\n> Back at the outer level\n> hello > world',
        timeLabel: '12:02 PM',
      },
      {
        id: 'format-forward',
        senderId: 'visitor',
        text: 'Forwarded from Morgan (12:01 PM):\n> Keep a copy for your records.',
        timeLabel: '12:03 PM',
      },
    ],
  },
};

const stagedAttachments = [
  { name: 'Liberty Island photo.png', url: '/lady_liberty.png' },
  { name: 'Liberty Island notes.txt', url: '/liberty-island-notes.txt' },
];

storyDefs.ActionsAndRichContent.view = 'conversation';
storyDefs.ActionsAndRichContent.activeConversationId = 'resources';
storyDefs.ActionsAndRichContent.conversations = [
  {
    id: 'resources',
    title: 'Application support',
    participantIds: ['agent'],
    messages: storyDefs.ActionsAndRichContent.messages,
    actions: [
      { id: 'mute', label: 'Mute notifications' },
      { id: 'pin', label: 'Pin conversation' },
      { id: 'mark-unread', label: 'Mark unread' },
      { id: 'delete-history', label: 'Delete chat history' },
    ],
  },
];
delete storyDefs.ActionsAndRichContent.messages;
storyDefs.MessageActionDefaults = {
  ...exampleDefaults,
  id: 'chat-action-defaults',
  defaultOpen: true,
  defaultView: 'conversation',
  activeConversationId: 'coworker',
  participants: [
    ...participants.filter((person) => person.id !== 'bot'),
    { id: 'bot', name: 'Guide bot', messageActions: [] },
  ],
  messageActions: {
    sent: [
      { id: 'edit', label: 'Edit message' },
      { id: 'delete', label: 'Delete message' },
    ],
    received: [{ id: 'mark-unread', label: 'Mark unread' }],
  },
  conversations: [
    {
      id: 'coworker',
      title: 'Coworker',
      participantIds: ['agent'],
      messages: [
        { id: 'coworker-1', senderId: 'agent', text: 'Could you review the draft?' },
        { id: 'coworker-2', senderId: 'visitor', text: 'I will review it today.' },
        {
          id: 'locked',
          senderId: 'visitor',
          text: 'This archived message has no host actions.',
          actions: [],
        },
      ],
    },
    {
      id: 'customer',
      title: 'Customer',
      participantIds: ['specialist'],
      messageActions: {
        sent: [],
        received: [
          { id: 'mark-unread', label: 'Mark unread' },
          { id: 'delete-message', label: 'Delete message' },
        ],
      },
      messages: [
        { id: 'customer-1', senderId: 'specialist', text: 'Thank you for your help.' },
        { id: 'customer-2', senderId: 'visitor', text: 'Your request is complete.' },
      ],
    },
    {
      id: 'bot',
      title: 'Guide bot',
      participantIds: ['bot'],
      messageActions: { sent: [{ id: 'delete-message', label: 'Delete message' }] },
      messages: [
        { id: 'bot-1', senderId: 'bot', text: 'How can I help?' },
        { id: 'bot-2', senderId: 'visitor', text: 'Show me the guide.' },
      ],
    },
  ],
};

const imageAttachment = {
  name: 'Liberty Island photo.png',
  url: '/lady_liberty.png',
  imageUrl: '/lady_liberty.png',
  alt: 'Statue of Liberty',
};
storyDefs.FailedSend.messages.push(
  {
    id: 'failed-image',
    senderId: 'visitor',
    attachments: [imageAttachment],
    deliveryState: 'failed',
  },
  { id: 'sent-image', senderId: 'visitor', attachments: [imageAttachment], deliveryStatus: 'Sent' }
);

export default {
  decorators: componentInit('popover', 'chat'),
  title: 'React/USX/Chat',
  component: Chat,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component:
          'Chat renders contract data as markup. Include the optional Chat styles and initialize @solexllc/usx/js/chat and @solexllc/usx/js/popover for shared interactions in React or Django. The host responds to usx:chat-* events and supplies the next view, message data, delivery state, and history. The examples use an application host outside the component library. Chat composes Window, Directory, Context, Message, Bubble, Message Actions, History, Controls, Attachments, and Composer. Each has a matching React/Django contract and nested stories. Message/Grouped demonstrates consecutive bubbles sharing an identity and final timestamp.',
      },
    },
  },
};

const example = (args) => <ChatStoryHost {...args} />;

export const Default = {
  args: storyDefs.Default,
  render: example,
  parameters: {
    docs: { description: { story: 'A simple conversation with sending and reactions.' } },
  },
};
export const InboxJourney = {
  args: storyDefs.InboxJourney,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'Open read and unread conversations, keep separate drafts, forward a message, and start a new conversation. Morgan accepts uploads; Taylor is text-only.',
      },
    },
  },
};
export const EmptyInbox = {
  args: storyDefs.EmptyInbox,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'A first-time inbox shows its empty state. Select New message, choose a recipient, and send to create the first conversation.',
      },
    },
  },
};
export const GroupInbox = {
  args: storyDefs.GroupInbox,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'Group rows show member avatars with overflow, optional group artwork, and the sender of the latest preview. Open a group or direct message and send a reply.',
      },
    },
  },
};
export const MultipleParticipants = {
  args: storyDefs.MultipleParticipants,
  render: (args) => (
    <ChatStoryHost
      {...args}
      detailSections={[
        {
          id: 'access-request-details',
          title: 'Access request AR-2048',
          description: 'Study data access is awaiting an applicant response.',
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A contextual team conversation with three senders, grouped bubbles, reactions, and simultaneous typing.',
      },
    },
  },
};
export const BotControlsWithHistory = {
  args: storyDefs.BotControlsWithHistory,
  render: (args) => <ChatStoryHost {...args} botMode />,
  parameters: {
    docs: {
      description: {
        story:
          'Suggestions and answer choices scroll with the history. Choose one to see a new question and bot response.',
      },
    },
  },
};
export const Attachments = {
  args: storyDefs.Attachments,
  render: (args) => <ChatStoryHost {...args} stagedAttachments={stagedAttachments} />,
  parameters: {
    docs: {
      description: {
        story:
          'Existing attachments plus an image and text file preloaded in the composer file list. Send them without entering text, or remove a staged file first.',
      },
    },
  },
};
export const ActionsAndRichContent = {
  args: storyDefs.ActionsAndRichContent,
  render: (args) => (
    <ChatStoryHost
      {...args}
      detailSections={[
        {
          id: 'application-guide',
          title: 'Application guide',
          description: 'Prepare your information, save your draft, and submit before the deadline.',
        },
        {
          id: 'help-center',
          title: 'Help center',
          description: 'Find answers about accounts, drafts, and submissions.',
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Rich links and plain-text export, with Copy conversation, mute/unmute, pin/unpin, read/unread, delete history, and an additional navigation link. The example host applies each action.',
      },
    },
  },
};
export const MessageActions = {
  args: storyDefs.MessageActions,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'React, edit, delete, recall, mark unread, start or continue a thread, and forward to a selected contact. The host updates the message and inbox state; recall is offered only while the host allows it.',
      },
    },
  },
};
export const Formatting = {
  args: storyDefs.Formatting,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'Reveal the formatting toolbar, use a button or keyboard shortcut, and send a message. Existing messages demonstrate inline styles, lists, nested quotes, code, and forwarded attribution. The built-in emoji pack supports reactions, composer insertion, and :name: shortcodes beside the formatting controls.',
      },
    },
  },
};
export const CustomEmojiPack = {
  args: storyDefs.CustomEmojiPack,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'A host-supplied three-emoji pack replaces the built-in choices in both pickers. Try :lab: in the composer to use an alias.',
      },
    },
  },
};
export const ThreadHistory = {
  args: storyDefs.ThreadHistory,
  render: (args) => <ChatStoryHost {...args} threadHistorySource={threadHistoryReplies} />,
  parameters: {
    docs: {
      description: {
        story:
          'Scroll up to load earlier replies across several pages while keeping your reading position. The original message remains above the reply history. New replies can be sent in the same thread.',
      },
    },
  },
};
export const LongHistory = {
  args: storyDefs.LongHistory,
  render: (args) => (
    <ChatStoryHost {...args} historySource={longHistoryMessages} failFirstLoad simulateIncoming />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The first history request fails; retry loads pages until the beginning. Simulate an incoming update to see scroll following.',
      },
    },
  },
};
export const ContextualInbox = {
  args: storyDefs.ContextualInbox,
  render: (args) => (
    <ChatStoryHost
      {...args}
      detailSections={[
        {
          id: 'listing-bicycle',
          title: 'Blue commuter bicycle',
          description: '$120 · Pickup in Arlington',
        },
        {
          id: 'listing-books',
          title: 'Three design books',
          description: '$25 · All three books available together',
        },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Two different listings discussed with the same person remain distinct conversations and accept replies.',
      },
    },
  },
};
export const MixedUnread = {
  args: storyDefs.MixedUnread,
  render: example,
  parameters: {
    docs: {
      description: {
        story: 'Read messages precede the first unread message; the divider marks the boundary.',
      },
    },
  },
};
export const LinkedNavigation = {
  args: storyDefs.LinkedNavigation,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'Conversation links navigate to host-owned routes. New message opens recipient selection rather than following a contact link.',
      },
    },
  },
};
export const FailedSend = {
  args: storyDefs.FailedSend,
  render: (args) => <ChatStoryHost {...args} failFirstSend />,
  parameters: {
    docs: {
      description: {
        story:
          'Send a new message: it appears immediately, then becomes a failed bubble with Retry. The earlier failed message also has a working retry control.',
      },
    },
  },
};
export const FloatingLauncher = {
  args: storyDefs.FloatingLauncher,
  render: (args) => (
    <div style={{ position: 'fixed', insetInlineEnd: '1rem', bottom: '1rem', zIndex: 1000 }}>
      <ChatStoryHost {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The host positions the launcher in a fixed wrapper. Popover side and align place the panel relative to it.',
      },
    },
  },
};
export const TextLauncher = {
  args: storyDefs.TextLauncher,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'The host configures summaryProps with nested content, classes, an accessible label, and a title. Chat adds no launcher styling.',
      },
    },
  },
};
export const UnavailableThread = {
  args: storyDefs.UnavailableThread,
  render: example,
  parameters: {
    docs: {
      description: {
        story: 'An invalid thread root shows an unavailable state and a working way back.',
      },
    },
  },
};

export const NewGroupMessage = {
  args: storyDefs.NewGroupMessage,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'Select recipients, then send. The example host reuses a matching conversation or creates an in-memory group; the component only renders markup and emits events.',
      },
    },
  },
};

export const ConversationActions = {
  args: storyDefs.ConversationActions,
  render: (args) => <ChatStoryHost {...args} resettable />,
  parameters: {
    docs: {
      description: {
        story:
          'Delete history or leave the group from the conversation header. Back opens the inbox, where the same actions appear on the conversation row. Both menus update this working example; Reset example restores its data.',
      },
    },
  },
};

export const MessageActionDefaults = {
  args: storyDefs.MessageActionDefaults,
  render: example,
  parameters: {
    docs: {
      description: {
        story:
          'Sent/received defaults are shared across messages. Open Coworker, Customer, or Guide bot to compare conversation and sender overrides. An archived message opts out with actions: [].',
      },
    },
  },
};
