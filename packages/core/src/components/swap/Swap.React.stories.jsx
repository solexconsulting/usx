import React from 'react';
import Swap from './Swap';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/Swap',
  component: Swap,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
