import React from 'react';
import SideNav from './SideNav';
import config from './config.json';

export default {
  title: 'React/SideNav',
  component: SideNav,
};

const Template = (args) => <SideNav {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
