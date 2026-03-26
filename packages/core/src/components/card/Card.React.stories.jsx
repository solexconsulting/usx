import React from 'react';
import Card from './Card';
import config from './config.json';

export default {
  title: 'React/Card',
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
