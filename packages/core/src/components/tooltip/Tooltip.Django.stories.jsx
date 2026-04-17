import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});
const TooltipDjango = djangoComponent('tooltip');

export default {
  title: 'Django/Tooltip',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: { code: componentTag({ name: 'tooltip', props: args }) }
    }
  },
  render: (args) => <TooltipDjango {...args} />
});

export const OnButton = createStory({
  label: 'Helpful info',
  position: 'top',
  children: '<button type="button" class="usa-button usx-button usa-button--primary">Hover me</button>',
});

export const Bottom = createStory({
  label: 'Bottom tooltip',
  position: 'bottom',
  children: '<button type="button" class="usa-button usx-button usa-button--primary">Bottom</button>',
});

export const Left = createStory({
  label: 'Left tooltip',
  position: 'left',
  children: '<button type="button" class="usa-button usx-button usa-button--primary">Left</button>',
});

export const Right = createStory({
  label: 'Right tooltip',
  position: 'right',
  children: '<button type="button" class="usa-button usx-button usa-button--primary">Right</button>',
});

export const OnLink = createStory({
  label: 'Helpful info',
  position: 'right',
  children: '<a href="#" class="usa-link usx-link">Hover over this link</a>',
});

export const OnAbbreviation = createStory({
  label: 'Social Security Number',
  position: 'right',
  children: '<abbr title="" tabindex="0">SSN</abbr>',
});
