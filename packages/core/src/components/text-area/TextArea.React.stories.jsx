import React from 'react';
import TextArea from './TextArea';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    label: 'Text area label',
    placeholder: 'Type here',
  }
};

export const WithHint = {
  args: {
    label: 'Text area with hint',
    hint: 'Enter a detailed description.',
  }
};

export const Required = {
  args: {
    label: 'Required text area',
    required: true,
  }
};

export const ScreenReaderOnlyLabel = {
  args: {
    label: 'Visually hidden label',
    screenReaderOnlyLabel: true,
    placeholder: 'Enter your message…',
  }
};

export const ErrorState = {
  args: {
    label: 'Error state text area',
    error: 'Enter at least 10 characters.',
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
    label: 'Success state text area',
    success: 'Your message has been accepted.',
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
    label: 'Disabled text area',
    disabled: true,
  }
};
