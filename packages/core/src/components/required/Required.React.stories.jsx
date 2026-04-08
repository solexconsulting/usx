import React from 'react';
import Required from './Required';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Required',
  component: Required,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    children: 'This field is required',
  }
};

export const WithCustomTitle = {
  args: {
    children: 'Hover over the asterisk',
    title: 'Custom Title Example'
  }
};