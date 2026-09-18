import config from '../../../../usx-react/src/components/villain/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Villain.React.stories.jsx';

export default {
  title: 'Django/USWDS/Villain',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'villain' });

export const Default = createStory(storyDefs.Default);
export const WithoutCallout = createStory(storyDefs.WithoutCallout);
export const WithoutButton = createStory(storyDefs.WithoutButton);
