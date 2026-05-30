import React from 'react';
import Clickable from './Clickable';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/Clickable',
  component: Clickable,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
