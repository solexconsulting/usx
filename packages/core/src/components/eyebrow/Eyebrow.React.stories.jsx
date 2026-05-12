import React from 'react';
import Eyebrow from './Eyebrow';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/Eyebrow',
  component: Eyebrow,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
