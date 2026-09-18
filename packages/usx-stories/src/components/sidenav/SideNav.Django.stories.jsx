import config from '../../../../usx-react/src/components/sidenav/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './SideNav.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/SideNav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'sidenav' });

export const Simple = createStory(storyDefs.Simple);
export const WithSublist = createStory(storyDefs.WithSublist);
export const Nested = createStory(storyDefs.Nested);
