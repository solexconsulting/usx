import React from 'react';
import Toggle from './Toggle';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
