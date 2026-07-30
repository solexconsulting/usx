import config from '../../../../core/src/components/card-group/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CardGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/CardGroup',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'card-group' });

export const Default = createStory(storyDefs.Default);
export const FlagLayout = createStory(storyDefs.FlagLayout);
export const WithTags = createStory(storyDefs.WithTags);
