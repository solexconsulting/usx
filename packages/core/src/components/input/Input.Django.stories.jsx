import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const getArgs = (index) => ({
  id: `example-input-${index}`,
  label: `Example Input ${index}`,
});

export default {
  title: 'Django/Input',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'input', props: args })
      }
    }
  },
  render: djangoComponent('input')
});

export const Default = createStory({
  ...getArgs(1),
  placeholder: 'Type here',
});

export const WithHint = createStory({
  ...getArgs(2),
  hint: 'Enter your full legal name.',
});

export const Required = createStory({
  ...getArgs(3),
  required: true,
});

export const ScreenReaderOnlyLabel = createStory({
  ...getArgs(4),
  screenReaderOnlyLabel: true,
  placeholder: 'Search…',
});

export const ErrorState = createStory({
  ...getArgs(5),
  error: 'Enter a valid email address.',
});

export const SuccessState = createStory({
  ...getArgs(6),
  success: 'Your email address has been accepted.',
});

export const Disabled = createStory({
  ...getArgs(7),
  disabled: true,
});
