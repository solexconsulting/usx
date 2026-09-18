import iconConfig from '../../../../usx-react/src/components/icon/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Icon.React.stories.jsx';

const generatedArgTypes = buildArgTypes(iconConfig.props || {});

export default {
  title: 'Django/USWDS/Icon',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'icon' });

export const Default = createStory(storyDefs.Default);