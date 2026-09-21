import iconConfig from '../../../../usx-react/src/components/icon/config.json';
import { buildArgTypes, createDjangoStory, createBulkDjangoStory } from '../../utils/storyHelpers.jsx';
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
export const UsxSource = {
  ...createStory(storyDefs.UsxSource),
  name: 'USX Source',
};

export const DifferentSizes = createBulkDjangoStory('icon', [
  { storyName: 'size 1', props: { name: 'accessibility_new', size: 1 } },
  { storyName: 'size 2', props: { name: 'accessibility_new', size: 2 } },
  { storyName: 'size 3', props: { name: 'accessibility_new', size: 3 } },
  { storyName: 'size 4', props: { name: 'accessibility_new', size: 4 } },
  { storyName: 'size 5', props: { name: 'accessibility_new', size: 5 } },
  { storyName: 'size 6', props: { name: 'accessibility_new', size: 6 } },
  { storyName: 'size 7', props: { name: 'accessibility_new', size: 7 } },
  { storyName: 'size 8', props: { name: 'accessibility_new', size: 8 } },
  { storyName: 'size 9', props: { name: 'accessibility_new', size: 9 } },
]);

export const DifferentIcons = createBulkDjangoStory('icon', [
  { props: { name: 'accessibility_new', size: 3 } },
  { props: { name: 'check_circle', size: 3 } },
  { props: { name: 'error', size: 3 } },
]);

export const DifferentColors = createBulkDjangoStory('icon', [
  { props: { name: 'accessibility_new', size: 3, color: 'primary' } },
  { props: { name: 'check_circle', size: 3, color: 'accent-warm-light' } },
  { props: { name: 'error', size: 3, color: 'accent-neutral-light' } },
]);
