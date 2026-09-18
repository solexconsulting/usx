import config from '../../../../usx-react/src/components/error-message/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './ErrorMessage.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/ErrorMessage',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'error-message' });

export const Default = createStory(storyDefs.Default);
export const WithCustomClass = createStory(storyDefs.WithCustomClass);
