import config from '../../../../usx-react/src/components/attribution/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Attribution.React.stories.jsx';

export default {
  title: 'Django/USX/Attribution',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'attribution' });

export const Default = createStory(storyDefs.Default);
export const WithAvatar = createStory(storyDefs.WithAvatar);
export const WithInitials = createStory(storyDefs.WithInitials);
export const WithPersonIcon = createStory(storyDefs.WithPersonIcon);
