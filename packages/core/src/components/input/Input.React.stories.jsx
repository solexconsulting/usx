import React from 'react';
import Input from './Input.jsx';
import inputConfig from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(inputConfig.props || {});

export default {
  title: 'React/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    label: 'Text input label',
    placeholder: 'Type here'
  }
};

export const WithHint = {
  args: {
    label: 'Input with hint',
    hint: 'Enter your full legal name.',
  }
};

export const Required = {
  args: {
    label: 'Required input',
    required: true,
  }
};

export const ScreenReaderOnlyLabel = {
  args: {
    label: 'Visually hidden label',
    screenReaderOnlyLabel: true,
    placeholder: 'Search…',
  }
};

export const ErrorState = {
  args: {
    label: 'Error state input',
    error: 'Enter a valid email address.',
  }
};

export const ErrorStateNoMessage = {
  args: {
    label: 'Error state (no message)',
    error: true,
  }
};

export const SuccessState = {
  args: {
    label: 'Success state input',
    success: 'Your email address has been accepted.',
  }
};

export const SuccessStateNoMessage = {
  args: {
    label: 'Success state (no message)',
    success: true,
  }
};

export const Disabled = {
  args: {
    label: 'Disabled input',
    disabled: true,
  }
};