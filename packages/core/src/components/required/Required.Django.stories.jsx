import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Required',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'required', props: args })
      }
    }
  },
  render: djangoComponent('required')
});

export const Default = {
  ...createStory({
    children: 'This field is required',
  }),
}

export const WithCustomTitle = {
  ...createStory({
    children: 'Hover over the asterisk',
    title: 'Custom Title Example'
  }),
}
