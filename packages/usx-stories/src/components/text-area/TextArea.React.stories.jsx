// import React from 'react';
import TextArea from '../../../../usx-react/src/components/text-area/TextArea.tsx';
import config from '../../../../usx-react/src/components/text-area/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/TextArea',
  component: TextArea,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'text-area-default',
    label: 'Text area label',
    placeholder: 'Type here',
  },
  WithHint: {
    id: 'text-area-with-hint',
    label: 'Text area with hint',
    hint: 'Enter a detailed description.',
  },
  Required: {
    id: 'text-area-required',
    label: 'Required text area',
    required: true,
  },
  ScreenReaderOnlyLabel: {
    id: 'text-area-screen-reader-only-label',
    label: 'Visually hidden label',
    screenReaderOnlyLabel: true,
    placeholder: 'Enter your message…',
  },
  ErrorState: {
    id: 'text-area-error-state',
    label: 'Error state text area',
    error: 'Enter at least 10 characters.',
  },
  ErrorStateNoMessage: {
    id: 'text-area-error-state-no-message',
    label: 'Error state (no message)',
    error: true,
  },
  SuccessState: {
    id: 'text-area-success-state',
    label: 'Success state text area',
    success: 'Your message has been accepted.',
  },
  SuccessStateNoMessage: {
    id: 'text-area-success-state-no-message',
    label: 'Success state (no message)',
    success: true,
  },
  Disabled: {
    id: 'text-area-disabled',
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
