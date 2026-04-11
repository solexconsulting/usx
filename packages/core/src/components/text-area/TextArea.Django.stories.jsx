import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const getArgs = (index) => ({
  id: `example-textarea-${index}`,
  label: `Example TextArea ${index}`,
});

export default {
  title: 'Django/TextArea',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'text-area', props: args })
      }
    }
  },
  render: djangoComponent('text-area')
});

export const Default = createStory({
  ...getArgs(1),
  placeholder: 'Type here',
});

export const WithHint = createStory({
  ...getArgs(2),
  hint: 'Enter a detailed description.',
});

export const Required = createStory({
  ...getArgs(3),
  required: true,
});

export const ScreenReaderOnlyLabel = createStory({
  ...getArgs(4),
  screenReaderOnlyLabel: true,
  placeholder: 'Enter your message…',
});

export const ErrorState = createStory({
  ...getArgs(5),
  error: 'Enter at least 10 characters.',
});

export const SuccessState = createStory({
  ...getArgs(6),
  success: 'Your message has been accepted.',
});

export const Disabled = createStory({
  ...getArgs(7),
  disabled: true,
});
