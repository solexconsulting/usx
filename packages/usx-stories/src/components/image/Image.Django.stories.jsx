import config from '../../../../usx-react/src/components/image/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Image.React.stories.jsx';

export default {
  title: 'Django/USX/Image',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'image' });

export const Default = createStory(storyDefs.Default);
export const Rounded = createStory(storyDefs.Rounded);
export const Circular = createStory(storyDefs.Circular);
export const WithCaption = createStory(storyDefs.WithCaption);
export const WithLinkedCaption = createStory(storyDefs.WithLinkedCaption);
export const WithHiddenCaption = createStory(storyDefs.WithHiddenCaption);
export const ObjectFitCover = createStory(storyDefs.ObjectFitCover);
export const ObjectFitContain = createStory(storyDefs.ObjectFitContain);
export const ObjectFitFill = createStory(storyDefs.ObjectFitFill);
export const ObjectFitNone = createStory(storyDefs.ObjectFitNone);
export const ObjectFitScaleDown = createStory(storyDefs.ObjectFitScaleDown);
export const WithMaxWidth = createStory(storyDefs.WithMaxWidth);
export const WithMaxHeight = createStory(storyDefs.WithMaxHeight);
export const LongCaption = createStory(storyDefs.LongCaption);
export const Responsive = createStory(storyDefs.Responsive);
