import React from 'react';
import Switch from './Switch';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
