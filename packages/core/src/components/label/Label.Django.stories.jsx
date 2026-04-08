import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Label',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};


const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'label', props: args })
      }
    }
  },
  render: djangoComponent('label')
});

export const Default = {
  ...createStory({
    children: 'This is a label',
  })
}

export const WithRequired = {
  ...createStory({
    children: 'This is a label for a required field',
    required: true,
  })
}

export const ScreenReaderOnly = {
  ...createStory({
    children: 'This label is only visible to screen readers',
    screenReaderOnly: true,
  })
}

export const WithCustomClass = {
  ...createStory({
    children: 'This label has a custom class',
    className: 'text-primary',
  })
}

export const WithClassOverride1 = {
  name: 'With Class Override (radio button)',
  ...createStory({
    children: 'This label overrides default classes with radio button class',
    className: 'usa-radio__label',
    classOverride: true,
  })
}

export const WithClassOverride2 = {
  name: 'With Class Override (checkbox)',
  ...createStory({
    children: 'This label overrides default classes with checkbox class',
    className: 'usa-checkbox__label',
    classOverride: true,
  })
}