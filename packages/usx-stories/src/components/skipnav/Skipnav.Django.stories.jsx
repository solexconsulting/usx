import config from '../../../../usx-react/src/components/skipnav/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Skipnav.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Skipnav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'skipnav' });

export const Default = createStory(storyDefs.Default);
export const CustomContent = createStory(storyDefs.CustomContent);
export const WithChildren = createStory(storyDefs.WithChildren);
