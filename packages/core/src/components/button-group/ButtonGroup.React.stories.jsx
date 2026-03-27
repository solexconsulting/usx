import React from 'react';
import ButtonGroup from './ButtonGroup';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
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

export const Default = {
  args: story0Args
}

export const Icons = {
  args: story1Args
};

export const SegmentedIcons = {
  args: story2Args
};

export const SegmentedSecondary = {
  args: story3Args
};

export const SegmentedAccentCool = {
  args: story4Args
};

export const SegmentedAccentWarm = {
  args: story5Args
};
