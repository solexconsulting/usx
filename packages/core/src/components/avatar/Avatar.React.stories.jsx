import React from 'react';
import Avatar from './Avatar';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
