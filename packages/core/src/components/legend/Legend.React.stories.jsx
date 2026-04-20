import React from 'react';
import Legend from './Legend';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Legend',
  component: Legend,
  tags: ['autodocs'],
  argTypes: generatedArgTypes
};

export const Default = {
  args: {
    text: 'Legend Text',
  },
};

export const WithAdditionalClasses = {
  args: {
    text: 'Legend with Additional Classes',
    className: 'text-primary',
  },
};

export const WithRequired = {
  args: {
    text: 'Legend Text',
    required: true,
  },
};

export const Large = {
  args: {
    text: 'Large Legend Text',
    large: true
  },
};