import config from '../../../../usx-react/src/components/hint/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Hint.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Hint',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'hint' });

export const Default = createStory(storyDefs.Default);
export const WithCustomClass = createStory(storyDefs.WithCustomClass);
