import config from '../../../../usx-react/src/components/hero/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Hero.React.stories.jsx';

export default {
  title: 'Django/USX/Hero',
  tags: ['USX', 'autodocs'],
  argTypes: {
    ...buildArgTypes(config.props || {}),
    overlayOpacity: { description: config.props.overlayOpacity.description, type: { name: 'number' }, control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'hero' });

export const Default = createStory(storyDefs.Default);
export const NoBackground = { ...createStory(storyDefs.NoBackground), name: 'No background image' };
export const WithoutCallout = { ...createStory(storyDefs.WithoutCallout), name: 'Without callout' };
export const WithoutButton = { ...createStory(storyDefs.WithoutButton), name: 'Without button' };
export const NoOverlay = { ...createStory(storyDefs.NoOverlay), name: 'No overlay' };
export const WithSearch = { ...createStory(storyDefs.WithSearch), name: 'With search' };
export const RightAligned = createStory(storyDefs.RightAligned);
export const NarrowCallout = createStory(storyDefs.NarrowCallout);
export const Centered = createStory(storyDefs.Centered);
export const Unboxed = createStory(storyDefs.Unboxed);
export const SplitContent = createStory(storyDefs.SplitContent);
export const SplitContentRight = createStory(storyDefs.SplitContentRight);
export const LongContent = createStory(storyDefs.LongContent);
export const SectionHeading = createStory(storyDefs.SectionHeading);

