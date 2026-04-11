import React from 'react';
import {{Name}} from './{{Name}}';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

export const storyDefs = {
  Default: config.default || {},
};

export default {
  title: 'React/{{Name}}',
  component: {{Name}},
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
