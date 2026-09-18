import config from '../../../../usx-react/src/components/label/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Label.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Label',
  tags: ['USWDS', 'autodocs'],
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
export const Error = createStory(storyDefs.Error);