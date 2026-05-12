import React from 'react';
import EnvBanner from './EnvBanner';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/EnvBanner',
  component: EnvBanner,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
