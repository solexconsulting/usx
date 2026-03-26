import React from 'react';
import Breadcrumb from './Breadcrumb';
import config from './config.json';

export default {
  title: 'React/Breadcrumb',
  component: Breadcrumb,
};

const Template = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
