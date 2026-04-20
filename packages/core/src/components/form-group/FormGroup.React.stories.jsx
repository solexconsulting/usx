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

export const Default = () => (
  <FormGroup>
    {defaultInput}
  </FormGroup>
)

export const ErrorState = () => (
  <FormGroup error>
    {errorInput}
  </FormGroup>
)

export const SuccessState = () => (
  <FormGroup>
    {successInput}
  </FormGroup>
)