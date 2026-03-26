import React from 'react';
import Identifier from './Identifier';
import config from './config.json';

export default {
  title: 'React/Identifier',
  component: Identifier,
};

const Template = (args) => <Identifier {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
