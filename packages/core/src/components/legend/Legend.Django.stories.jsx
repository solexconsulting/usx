import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Legend',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'legend', props: args })
      }
    }
  },
  render: djangoComponent('legend')
});

export const Default = createStory({
  text: 'Legend Text',
});

export const WithAdditionalClasses = createStory({
  text: 'Legend with Additional Classes',
  className: 'text-primary',
});

export const WithRequired = createStory({
  text: 'Legend Text',
  required: true,
});

export const Large = createStory({
  text: 'Large Legend Text',
  large: true,
});