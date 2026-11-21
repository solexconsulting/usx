import { partStory } from '../../ChatPartStory.jsx';
import React from 'react';
import Component from '../../../../../../usx-react/src/components/chat-controls/ChatControls';
import config from '../../../../../../usx-react/src/components/chat-controls/config.json';
import { buildArgTypes, componentInit } from '../../../../utils/storyHelpers.jsx';
export const storyDefs = {
  CustomControls: {
    children: (
      <a className="usa-link usx-link" href="/liberty-island-notes.txt" download>
        Download example notes
      </a>
    ),
  },
  Default: {
    suggestedQuestions: [
      {
        label: 'What happens next?',
        value: 'next',
      },
      {
        label: 'Which documents do I need?',
        value: 'documents',
      },
    ],
  },
  Choices: {
    choicePrompt: 'Which appointment works for you?',
    choices: [
      {
        label: 'Tuesday morning',
        value: 'tuesday',
      },
      {
        label: 'Thursday afternoon',
        value: 'thursday',
      },
    ],
  },
  Disabled: {
    disabled: true,
    choices: [
      {
        label: 'Confirm appointment',
        value: 'confirm',
      },
    ],
  },
};
export default {
  title: 'React/USX/Chat/Controls',
  component: Component,
  excludeStories: ['storyDefs'],
  argTypes: buildArgTypes(config.props),
  decorators: componentInit('popover', 'chat'),
  parameters: {
    docs: {
      description: {
        component:
          'Suggested questions, choice buttons, and a custom controls slot. Place this list item inside the transcript. Interaction is owned by the parent Chat enhancement.',
      },
    },
  },
};
export const Default = partStory(Component, 'chat-controls', storyDefs.Default, {
  exampleId: 'controls-default',
});
export const CustomControls = partStory(Component, 'chat-controls', storyDefs.CustomControls, {
  exampleId: 'controls-custom',
});
export const Choices = partStory(Component, 'chat-controls', storyDefs.Choices, {
  exampleId: 'controls-choices',
});
export const Disabled = partStory(Component, 'chat-controls', storyDefs.Disabled, {
  exampleId: 'controls-disabled',
});
