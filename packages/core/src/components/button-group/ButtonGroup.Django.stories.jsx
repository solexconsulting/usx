import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './ButtonGroup.React.stories.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/ButtonGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
};

const createStory = createDjangoStory('button-group');

export const Default = createStory(storyDefs.Default);
export const Icons = createStory(storyDefs.Icons);
export const SegmentedIcons = createStory(storyDefs.SegmentedIcons);
export const SegmentedSecondary = createStory(storyDefs.SegmentedSecondary);
export const SegmentedAccentCool = createStory(storyDefs.SegmentedAccentCool);
export const SegmentedAccentWarm = createStory(storyDefs.SegmentedAccentWarm);
