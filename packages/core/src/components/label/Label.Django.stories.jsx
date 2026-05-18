import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Label.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Label',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'label' });

export const Default = createStory(storyDefs.Default);
export const WithRequired = createStory(storyDefs.WithRequired);
export const ScreenReaderOnly = createStory(storyDefs.ScreenReaderOnly);
export const WithCustomClass = createStory(storyDefs.WithCustomClass);
export const WithClassOverride1 = { name: 'With Class Override (radio button)', ...createStory(storyDefs.WithClassOverride1) };
export const WithClassOverride2 = { name: 'With Class Override (checkbox)', ...createStory(storyDefs.WithClassOverride2) };