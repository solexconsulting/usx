import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Indicator.React.stories.jsx';

export default {
  title: 'Django/Indicator',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'indicator' });

export const StatusIndicator = createStory(storyDefs.StatusIndicator);
export const TagIndicator = createStory(storyDefs.TagIndicator);
export const ForButton = createStory(storyDefs.ForButton);
export const Ping = createStory(storyDefs.Ping);
export const AllPositions = createStory(storyDefs.AllPositions);
