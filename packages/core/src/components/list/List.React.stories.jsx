import React from 'react';
import List from './List';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export const storyDefs = {
  Default: config.default || {},
  Ordered: {
    ...(config.default || {}),
    ordered: true,
  },
  Unstyled: {
    ...(config.default || {}),
    unstyled: true,
  },
};

export default {
  title: 'React/List',
  component: List,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = storyDefs.Default;

export const Ordered = Template.bind({});
Ordered.args = storyDefs.Ordered;

export const Unstyled = Template.bind({});
Unstyled.args = storyDefs.Unstyled;
