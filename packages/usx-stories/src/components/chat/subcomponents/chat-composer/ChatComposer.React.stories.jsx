import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import ChatComposer from '../../../../../../usx-react/src/components/chat-composer/ChatComposer.tsx';
import config from '../../../../../../usx-react/src/components/chat-composer/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';

export const storyDefs = {
  GroupMessage: {
    id: 'composer-group',
    recipientIds: ['agent', 'specialist'],
    requireRecipients: true,
    value: 'Can we review the application together?',
    emojiPack: [],
  },
  Default: { id: 'composer-default', emojiPack: config.default.emojiPack },
  WithFormatting: {
    id: 'composer-formatting',
    allowFormatting: true,
    emojiPack: config.default.emojiPack,
  },
  WithAttachmentsAndEmoji: {
    id: 'composer-attachments',
    allowAttachments: true,
    accept: 'image/*,.pdf',
    emojiPack: config.default.emojiPack,
  },
  ThreadReply: {
    id: 'composer-thread',
    isThread: true,
    conversationId: 'conversation-42',
    threadRootId: 'message-7',
    emojiPack: [],
  },
};

const widthDecorator = (Story) => (
  <div style={{ maxWidth: '26rem' }}>
    <Story />
  </div>
);

export default {
  title: 'React/USX/Chat/Composer',
  component: ChatComposer,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs'],
  decorators: [widthDecorator, ...componentInit('popover', 'chat')],
  argTypes: buildArgTypes(config.props),
  parameters: {
    docs: {
      description: {
        component:
          'Markup for a chat message form. Initialize the parent Chat enhancement for formatting, emoji, file selection and submission events.',
      },
    },
  },
};

export const Default = partStory(ChatComposer, 'chat-composer', storyDefs.Default, {
  exampleId: 'composer-default',
});
export const WithFormatting = partStory(ChatComposer, 'chat-composer', storyDefs.WithFormatting, {
  exampleId: 'composer-withformatting',
});
export const WithAttachmentsAndEmoji = partStory(
  ChatComposer,
  'chat-composer',
  storyDefs.WithAttachmentsAndEmoji,
  { exampleId: 'composer-withattachmentsandemoji' }
);
export const ThreadReply = partStory(ChatComposer, 'chat-composer', storyDefs.ThreadReply, {
  exampleId: 'composer-threadreply',
});
export const GroupMessage = partStory(ChatComposer, 'chat-composer', storyDefs.GroupMessage, {
  exampleId: 'composer-groupmessage',
});
