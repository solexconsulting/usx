import { storyDefaultArgs } from '../../utils/storyHelpers.jsx';
import React from 'react';
import FormGroup from '../../../../usx-react/src/components/form-group/FormGroup.tsx';
import config from '../../../../usx-react/src/components/form-group/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import Input from '../../../../usx-react/src/components/input/Input.tsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/FormGroup',
  component: FormGroup,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const errorInput = (
  <Input id="form-group-error-input" label="Error state" error="This field is required." />
);

const successInput = (
  <Input id="form-group-success-input" label="Success state" success="Looks good!" />
);

export const storyDefs = {
  Default: storyDefaultArgs(config.default),
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
