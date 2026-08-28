import { storyDefs } from './TextArea.React.stories.jsx';
import { createDjangoStory } from '../../utils/storyHelpers.jsx';

export default {
  title: 'Django/USWDS/TextArea',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    renderer: 'django',
    docs: {
      description: {
        component: 'Django TextArea component - consumes React storyDefs',
      },
    },
  },
};

const createStory = createDjangoStory({ componentName: 'text-area' });

export const Default = createStory(storyDefs.Default);
export const WithHint = createStory(storyDefs.WithHint);
export const Required = createStory(storyDefs.Required);
export const ScreenReaderOnlyLabel = createStory(storyDefs.ScreenReaderOnlyLabel);
export const ErrorState = createStory(storyDefs.ErrorState);
export const ErrorStateNoMessage = createStory(storyDefs.ErrorStateNoMessage);
export const SuccessState = createStory(storyDefs.SuccessState);
export const SuccessStateNoMessage = createStory(storyDefs.SuccessStateNoMessage);
export const Disabled = createStory(storyDefs.Disabled);
