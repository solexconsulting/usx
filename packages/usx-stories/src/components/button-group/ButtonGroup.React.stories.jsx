
import ButtonGroup from '../../../../core/src/components/button-group/ButtonGroup.tsx';
import config from '../../../../core/src/components/button-group/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/ButtonGroup',
  component: ButtonGroup,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const story0Args = {
  buttonProps: [
    { label: 'Map', variant: 'primary' },
    { label: 'Hybrid', variant: 'outline' },
    { label: 'Satellite', variant: 'outline' }
  ]
}

const story1Args = {
  buttonProps: [
    { label: '', variant: 'outline', iconProps: [{ name: 'navigate_far_before'}] },
    { label: '', variant: 'primary', iconProps: [{ name: 'navigate_before' }] },
    { label: '', variant: 'primary', iconProps: [{ name: 'navigate_next' }] },
    { label: '', variant: 'outline', iconProps: [{ name: 'navigate_far_next'}] }
  ]
}

const story2Args = {
  buttonProps: [
    { label: '', variant: 'outline', iconProps: [{ name: 'navigate_far_before'}] },
    { label: '', variant: 'primary', iconProps: [{ name: 'navigate_before' }] },
    { label: '', variant: 'primary', iconProps: [{ name: 'navigate_next' }] },
    { label: '', variant: 'outline', iconProps: [{ name: 'navigate_far_next'}] }
  ],
  segmented: true
}

const story3Args = {
  buttonProps: [
    { label: 'Map', variant: 'secondary' },
    { label: 'Hybrid', variant: 'secondary' },
    { label: 'Satellite', variant: 'secondary' }
  ],
  segmented: true,
}

const story4Args = {
  buttonProps: [
    { label: 'Map', variant: 'accent-cool' },
    { label: 'Hybrid', variant: 'accent-cool' },
    { label: 'Satellite', variant: 'accent-cool' }
  ],
  segmented: true,
}

const story5Args = {
  buttonProps: [
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
