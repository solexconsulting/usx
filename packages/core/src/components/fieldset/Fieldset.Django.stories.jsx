import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Fieldset',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'fieldset', props: args })
      }
    }
  },
  render: djangoComponent('fieldset')
});

export const Default = {
  ...createStory({
    legend: 'Fieldset Legend',
    children: '<label class="usa-checkbox__label">Hello world</label>'
  })
};

export const NoLegend = {
  ...createStory({
    children: '<label class="usa-checkbox__label">Hello world</label>'
  })
};

export const RequiredLegend = {
  ...createStory({
    legend: 'Required Fieldset',
    required: true,
    children: '<label class="usa-checkbox__label">Hello world</label>'
  })
};

export const WithCustomClass = {
  ...createStory({
    legend: 'Custom Class Fieldset',
    className: 'border-1px border-base padding-2',
    children: '<label class="usa-checkbox__label">Hello world</label>'
  })
};

export const LargeLegend = {
  ...createStory({
    legend: 'Large Legend Fieldset',
    largeLegend: true,
    children: '<label class="usa-checkbox__label">Hello world</label>'
  })
};

export const Disabled = {
  ...createStory({
    legend: 'Disabled Fieldset',
    disabled: true,
    children: '<label class="usa-label usx-label" for="lonely-input">Lonely input</label><input class="usa-input usx-input" id="lonely-input" type="text" placeholder="Type here..."></input>'
  })
};