import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const getArgs = (index) => ({
  id: `example-cc-${index}`,
  label: `Example CharacterCount ${index}`,
});

export default {
  title: 'Django/CharacterCount',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'character-count', props: args })
      }
    }
  },
  render: djangoComponent('character-count')
});

export const Default = createStory({
  ...getArgs(1),
  max: 25,
});

export const HardLimit = createStory({
  ...getArgs(2),
  max: 25,
  hardLimit: true,
});

export const WithHint = createStory({
  ...getArgs(3),
  max: 25,
  hint: 'You can enter up to 25 characters.',
});

export const WithTextArea = createStory({
  ...getArgs(4),
  max: 50,
  textArea: true,
});

export const WithTextAreaHardLimit = createStory({
  ...getArgs(5),
  max: 50,
  textArea: true,
  hardLimit: true,
});

export const Required = createStory({
  ...getArgs(6),
  max: 25,
  required: true,
});

export const SuccessState = createStory({
  ...getArgs(7),
  max: 25,
  success: 'Looks good!',
});

export const Disabled = createStory({
  ...getArgs(8),
  max: 25,
  disabled: true,
});
