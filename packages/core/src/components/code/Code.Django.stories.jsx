
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Code.React.stories.jsx';

export default {
  title: 'Django/Code',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'code' });

export const Default = createStory(storyDefs.Default);
export const WithLineNumbers = createStory(storyDefs.WithLineNumbers);
export const HighlightedLine = createStory(storyDefs.HighlightedLine);
export const LongLine = createStory(storyDefs.LongLine);
export const WithoutPrefix = createStory(storyDefs.WithoutPrefix);
export const WithColor = createStory(storyDefs.WithColor);
export const WithCopyButton = createStory(storyDefs.WithCopyButton);
