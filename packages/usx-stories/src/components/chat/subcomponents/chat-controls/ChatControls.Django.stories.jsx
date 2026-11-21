import { componentInit } from '../../../../utils/storyHelpers.jsx';
import { djangoPartStory } from '../../ChatPartStory.jsx';
import * as stories from './ChatControls.React.stories.jsx';
export default {
  title: 'Django/USX/Chat/Controls',
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
export const Default = djangoPartStory('chat-controls', stories.Default);
export const CustomControls = djangoPartStory('chat-controls', stories.CustomControls);
export const Choices = djangoPartStory('chat-controls', stories.Choices);
export const Disabled = djangoPartStory('chat-controls', stories.Disabled);
