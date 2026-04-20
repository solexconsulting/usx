import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/ButtonGroup',
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
  args: story0Args,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button-group',
          props: story0Args
        })
      }
    }
  },
  render: djangoComponent('button-group')
};

export const Icons = {
  args: story1Args,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button-group',
          props: story2Args
        })
      }
    }
  },
  render: djangoComponent('button-group')
};

export const SegmentedIcons = {
  args: story2Args,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button-group',
          props: story2Args
        })
      }
    }
  },
  render: djangoComponent('button-group')
};

export const SegmentedSecondary = {
  args: story3Args,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button-group',
          props: story3Args
        })
      }
    }
  },
  render: djangoComponent('button-group')
};

export const SegmentedAccentCool = {
  args: story4Args,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button-group',
          props: story4Args
        })
      }
    }
  },
  render: djangoComponent('button-group')
};

export const SegmentedAccentWarm = {
  args: story5Args,
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button-group',
          props: story5Args
        })
      }
    }
  },
  render: djangoComponent('button-group')
};
