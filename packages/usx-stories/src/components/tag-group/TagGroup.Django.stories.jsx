import config from '../../../../usx-react/src/components/tag-group/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './TagGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS-Inspired/TagGroup',
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'tag-group' });

export const Default = createStory(storyDefs.Default);
export const Big = createStory(storyDefs.Big);
