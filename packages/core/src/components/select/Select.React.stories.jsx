import React from 'react';
import Select from './Select';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const sampleOptions = [
  { value: 'option1', label: 'Option A' },
  { value: 'option2', label: 'Option B' },
  { value: 'option3', label: 'Option C' },
];

export default {
  title: 'React/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    label: 'Dropdown label',
    options: sampleOptions,
  },
};

export const ErrorState = {
  args: {
    label: 'Dropdown label',
    options: sampleOptions,
    hint: 'This is a select with an error message.',
    error: 'Selection error message',
  },
};

export const SuccessState = {
  args: {
    label: 'Success state select',
    options: sampleOptions,
    success: 'Success message goes here.',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled select',
    options: sampleOptions,
    disabled: true,
  },
};

export const DisabledWithError = {
  args: {
    label: 'Disabled with error',
    options: sampleOptions,
    disabled: true,
    error: 'This field is disabled due to an error.',
  },
};
