import React from 'react';
import Header from './Header';
import config from './config.json';

export default {
  title: 'React/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
