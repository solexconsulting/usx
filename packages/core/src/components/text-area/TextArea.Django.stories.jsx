import { storyDefs } from './TextArea.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers';

export default {
  title: 'Django/TextArea',
  tags: ['autodocs'],
  parameters: {
    renderer: 'django',
    docs: {
      description: {
        component: 'Django TextArea component - consumes React storyDefs',
      },
    },
  },
};

const createStory = createDjangoStory('text-area');

export const Default = createStory(storyDefs.Default);
export const WithHint = createStory(storyDefs.WithHint);
export const Required = createStory(storyDefs.Required);
export const ScreenReaderOnlyLabel = createStory(storyDefs.ScreenReaderOnlyLabel);
export const ErrorState = createStory(storyDefs.ErrorState);
export const ErrorStateNoMessage = createStory(storyDefs.ErrorStateNoMessage);
export const SuccessState = createStory(storyDefs.SuccessState);
export const SuccessStateNoMessage = createStory(storyDefs.SuccessStateNoMessage);
export const Disabled = createStory(storyDefs.Disabled);
