
import ButtonGroup from './ButtonGroup';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const story0Args = {
  items: [
    { label: 'Map', variant: 'primary' },
    { label: 'Hybrid', variant: 'outline' },
    { label: 'Satellite', variant: 'outline' }
  ]
}

const story1Args = {
  items: [
    { label: '', variant: 'outline', leftIcon: { name: 'navigate_far_before'} },
    { label: '', variant: 'primary', leftIcon: { name: 'navigate_before' } },
    { label: '', variant: 'primary', leftIcon: { name: 'navigate_next' } },
    { label: '', variant: 'outline', leftIcon: { name: 'navigate_far_next'} }
  ]
}

const story2Args = {
  items: [
    { label: '', variant: 'outline', leftIcon: { name: 'navigate_far_before'} },
    { label: '', variant: 'primary', leftIcon: { name: 'navigate_before' } },
    { label: '', variant: 'primary', leftIcon: { name: 'navigate_next' } },
    { label: '', variant: 'outline', leftIcon: { name: 'navigate_far_next'} }
  ],
  segmented: true
}

const story3Args = {
  items: [
    { label: 'Map', variant: 'secondary' },
    { label: 'Hybrid', variant: 'secondary' },
    { label: 'Satellite', variant: 'secondary' }
  ],
  segmented: true,
}

const story4Args = {
  items: [
    { label: 'Map', variant: 'accent-cool' },
    { label: 'Hybrid', variant: 'accent-cool' },
    { label: 'Satellite', variant: 'accent-cool' }
  ],
  segmented: true,
}

const story5Args = {
  items: [
    { label: 'Map', variant: 'accent-warm' },
    { label: 'Hybrid', variant: 'accent-warm' },
    { label: 'Satellite', variant: 'accent-warm' }
  ],
  segmented: true,
}

export const storyDefs = {
  Default: story0Args,
  Icons: story1Args,
  SegmentedIcons: story2Args,
  SegmentedSecondary: story3Args,
  SegmentedAccentCool: story4Args,
  SegmentedAccentWarm: story5Args,
};

export const Default = {
  args: storyDefs.Default
}

export const Icons = {
  args: storyDefs.Icons
};

export const SegmentedIcons = {
  args: storyDefs.SegmentedIcons
};

export const SegmentedSecondary = {
  args: storyDefs.SegmentedSecondary
};

export const SegmentedAccentCool = {
  args: storyDefs.SegmentedAccentCool
};

export const SegmentedAccentWarm = {
  args: storyDefs.SegmentedAccentWarm
};
