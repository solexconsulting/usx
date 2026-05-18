import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Breadcrumb.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Breadcrumb',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('breadcrumb');

export const Default = createStory(storyDefs.Default);
export const WithRdfa = createStory(storyDefs.WithRdfa);
export const Wrap = createStory(storyDefs.Wrap);
export const WithClassName = createStory(storyDefs.WithClassName);
export const Empty = createStory(storyDefs.Empty);
