
import config from '../../../../usx-react/src/components/code/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Code.React.stories.jsx';

export default {
  title: 'Django/USX/Code',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'code' });

export const Default = createStory(storyDefs.Default);
export const WithLineNumbers = createStory(storyDefs.WithLineNumbers);
export const HighlightedLine = createStory(storyDefs.HighlightedLine);
export const LongLine = createStory(storyDefs.LongLine);
export const WithHTMLFragment = createStory(storyDefs.WithHTMLFragment);
export const WithoutPrefix = createStory(storyDefs.WithoutPrefix);
export const WithColor = createStory(storyDefs.WithColor);
export const WithCopyButton = createStory(storyDefs.WithCopyButton);
