import React from 'react';
import BackToTop from './BackToTop';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/BackToTop',
  component: BackToTop,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
