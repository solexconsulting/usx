import config from '../../../../usx-react/src/components/button-group/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './ButtonGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/ButtonGroup',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory({ componentName: 'button-group' });

export const Default = createStory(storyDefs.Default);
export const Icons = createStory(storyDefs.Icons);
export const SegmentedIcons = createStory(storyDefs.SegmentedIcons);
export const SegmentedSecondary = createStory(storyDefs.SegmentedSecondary);
export const SegmentedAccentCool = createStory(storyDefs.SegmentedAccentCool);
export const SegmentedAccentWarm = createStory(storyDefs.SegmentedAccentWarm);
