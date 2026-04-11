import React from 'react';
import CharacterCount from './CharacterCount';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/CharacterCount',
  component: CharacterCount,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    id: 'cc-1',
    label: 'Text input (soft limit)',
    max: 25,
  }
};

export const HardLimit = {
  args: {
    id: 'cc-2',
    label: 'Text input (hard limit)',
    max: 25,
    hardLimit: true,
  }
};

export const WithHint = {
  args: {
    id: 'cc-3',
    label: 'Text input with hint',
    max: 25,
    hint: 'You can enter up to 25 characters.',
  }
};

export const WithTextArea = {
  args: {
    id: 'cc-4',
    label: 'Text area (soft limit)',
    max: 50,
    textArea: true,
  }
};

export const WithTextAreaHardLimit = {
  args: {
    id: 'cc-5',
    label: 'Text area (hard limit)',
    max: 50,
    textArea: true,
    hardLimit: true,
  }
};

export const Required = {
  args: {
    id: 'cc-6',
    label: 'Required field',
    max: 25,
    required: true,
  }
};

export const SuccessState = {
  args: {
    id: 'cc-7',
    label: 'Success state',
    max: 25,
    success: 'Looks good!',
  }
};

export const Disabled = {
  args: {
    id: 'cc-8',
    label: 'Disabled field',
    max: 25,
    disabled: true,
  }
};
