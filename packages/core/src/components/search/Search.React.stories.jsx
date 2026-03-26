import React from 'react';
import Search from './Search';
import config from './config.json';

export default {
  title: 'React/Search',
  component: Search,
};

const Template = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
