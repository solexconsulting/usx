import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './List.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/List',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = createDjangoStory({ componentName: 'list' });

export const Default = createStory(storyDefs.Default);
export const Ordered = createStory(storyDefs.Ordered);
export const Unstyled = createStory(storyDefs.Unstyled);
export const Nested = createStory(storyDefs.Nested);
