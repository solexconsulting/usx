// import React from 'react';
import TextArea from './TextArea';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    label: 'Text area label',
    placeholder: 'Type here',
  },
  WithHint: {
    label: 'Text area with hint',
    hint: 'Enter a detailed description.',
  },
  Required: {
    label: 'Required text area',
    required: true,
  },
  ScreenReaderOnlyLabel: {
    label: 'Visually hidden label',
    screenReaderOnlyLabel: true,
    placeholder: 'Enter your message…',
  },
  ErrorState: {
    label: 'Error state text area',
    error: 'Enter at least 10 characters.',
  },
  ErrorStateNoMessage: {
    label: 'Error state (no message)',
    error: true,
  },
  SuccessState: {
    label: 'Success state text area',
    success: 'Your message has been accepted.',
  },
  SuccessStateNoMessage: {
    label: 'Success state (no message)',
    success: true,
  },
  Disabled: {
    label: 'Disabled text area',
    disabled: true,
  },
};

export const Default = { args: storyDefs.Default };
export const WithHint = { args: storyDefs.WithHint };
export const Required = { args: storyDefs.Required };
export const ScreenReaderOnlyLabel = { args: storyDefs.ScreenReaderOnlyLabel };
export const ErrorState = { args: storyDefs.ErrorState };
export const ErrorStateNoMessage = { args: storyDefs.ErrorStateNoMessage };
export const SuccessState = { args: storyDefs.SuccessState };
export const SuccessStateNoMessage = { args: storyDefs.SuccessStateNoMessage };
export const Disabled = { args: storyDefs.Disabled };
