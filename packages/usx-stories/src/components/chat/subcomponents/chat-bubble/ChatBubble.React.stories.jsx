import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-bubble/ChatBubble';
import ButtonGroup from '../../../../../../usx-react/src/components/button-group/ButtonGroup';
import config from '../../../../../../usx-react/src/components/chat-bubble/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  Default: {
    text: 'Your appointment is confirmed.',
  },
  Formatted: {
    text: '**Bring with you:**\n- Photo identification\n- Your appointment letter\n\n> Arrive ten minutes early.',
  },
  Attachments: {
    text: 'Here are your notes.',
    attachments: [
      {
        name: 'Appointment notes.txt',
        url: '/liberty-island-notes.txt',
      },
    ],
  },
  Reactions: {
    text: 'Thank you for the update.',
    reactions: [
      {
        emoji: '👍',
        label: 'Helpful',
        count: 2,
        selected: true,
      },
    ],
  },
  RichContent: {
    content: (
      <>
        <p>Review package: application_AR2048_supporting_documents_2026_11_18_final.pdf</p>
        <ButtonGroup
          buttonProps={[
            { href: '#review', label: 'Review', variant: 'primary' },
            {
              href: '/liberty-island-notes.txt',
              download: true,
              label: 'Download',
              variant: 'outline',
            },
          ]}
        />
      </>
    ),
  },
};
export default {
  title: 'React/USX/Chat/Bubble',
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
  decorators: componentInit('popover', 'chat'),
  parameters: {
    docs: {
      description: {
        component:
          'Message content, safe text formatting, attachments, and existing reaction counts. Compose inside ChatMessage for identity, alignment, and actions.',
      },
    },
  },
};
export const Default = partStory(Component, 'chat-bubble', storyDefs.Default, {
  exampleId: 'bubble-default',
});
export const Formatted = partStory(Component, 'chat-bubble', storyDefs.Formatted, {
  exampleId: 'bubble-formatted',
});
export const Attachments = partStory(Component, 'chat-bubble', storyDefs.Attachments, {
  exampleId: 'bubble-attachments',
});
export const Reactions = partStory(Component, 'chat-bubble', storyDefs.Reactions, {
  exampleId: 'bubble-reactions',
});
export const RichContent = partStory(Component, 'chat-bubble', storyDefs.RichContent, {
  exampleId: 'bubble-richcontent',
});
