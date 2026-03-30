import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const sampleOptions = [
  { value: 'option1', label: 'Option A' },
  { value: 'option2', label: 'Option B' },
  { value: 'option3', label: 'Option C' },
];

export default {
  title: 'Django/Select',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'select', props: args })
      }
    }
  },
  render: djangoComponent('select')
});

export const Default = createStory({
  id: 'select-default',
  label: 'Dropdown label',
  options: sampleOptions,
});

export const ErrorState = createStory({
  id: 'select-error',
  label: 'Dropdown label',
  options: sampleOptions,
  hint: 'This is a select with an error message.',
  error: 'Selection error message',
});

export const SuccessState = createStory({
  id: 'select-success',
  label: 'Success state select',
  options: sampleOptions,
  success: 'Success message goes here.',
});

export const Disabled = createStory({
  id: 'select-disabled',
  label: 'Disabled select',
  options: sampleOptions,
  disabled: true,
});

export const DisabledWithError = createStory({
  id: 'select-disabled-error',
  label: 'Disabled with error',
  options: sampleOptions,
  disabled: true,
  error: 'This field is disabled due to an error.',
});
