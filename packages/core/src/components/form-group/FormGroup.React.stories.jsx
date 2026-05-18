import React from 'react';
import FormGroup from './FormGroup';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';
import Input from '../input/Input';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const defaultInput = (
  <Input
    label="Form group label"
    placeholder="Type here"
  />
);

const errorInput = (
  <Input
    label="Error state"
    error="This field is required."
  />
);

const successInput = (
  <Input
    label="Success state"
    success="Looks good!"
  />
);

export const storyDefs = {
  Default: {
    children: defaultInput,
  },
  ErrorState: {
    error: true,
    children: errorInput,
  },
  SuccessState: {
    children: successInput,
  },
};

export const Default = { args: storyDefs.Default };
export const ErrorState = { args: storyDefs.ErrorState };
export const SuccessState = { args: storyDefs.SuccessState };