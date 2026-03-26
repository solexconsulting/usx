import React from 'react';
import List from './List';
import config from './config.json';

export default {
  title: 'React/List',
  component: List,
};

const Template = (args) => <List {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
