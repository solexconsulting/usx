import React from 'react';
import ChatAttachments from '../../../../../../usx-react/src/components/chat-attachments/ChatAttachments';
import config from '../../../../../../usx-react/src/components/chat-attachments/config.json';
import { buildArgTypes } from '../../../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    items: [
      { name: 'Notes.txt', url: '/liberty-island-notes.txt' },
      {
        name: 'Bicycle.svg',
        url: '/marketplace-bicycle.svg',
        imageUrl: '/marketplace-bicycle.svg',
        alt: 'Blue bicycle offered for sale',
      },
      { name: 'Document awaiting upload.pdf' },
      {
        name: 'Bicycle thumbnail.svg',
        url: '/marketplace-bicycle.svg',
        imageUrl: '/marketplace-bicycle.svg',
        alt: '',
      },
    ],
  },
};

export default {
  title: 'React/USX/Chat/Attachments',
  component: ChatAttachments,
  tags: ['USX', 'autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
  parameters: {
    docs: {
      description: {
        component:
          'ChatAttachments renders ul.usx-chat__attachments and composes one ChatAttachment li per item. Items may contain a download link, an image preview, or only a file name. ChatBubble uses this list for message attachments. Empty items render nothing. Both renderers provide markup only.',
      },
    },
  },
};

export const Default = {
  name: 'Attachments',
  args: storyDefs.Default,
  render: (args) => <ChatAttachments {...args} />,
};
