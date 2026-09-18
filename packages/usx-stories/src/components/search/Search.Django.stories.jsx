import config from '../../../../usx-react/src/components/search/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Search.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Search',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'search' });

export const Default = createStory(storyDefs.Default);
export const CustomPlaceholder = createStory(storyDefs.CustomPlaceholder);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const Big = createStory(storyDefs.Big);
export const IconOnly = createStory(storyDefs.IconOnly);
export const BigIconOnly = createStory(storyDefs.BigIconOnly);
export const NonStandardIcon = createStory(storyDefs.NonStandardIcon);
export const WithCustomButtonVariant = createStory(storyDefs.WithCustomButtonVariant);
export const GoogleAction = createStory(storyDefs.GoogleAction);
export const PathAction = createStory(storyDefs.PathAction);
export const WithOnSubmit = createStory(storyDefs.WithOnSubmit);
