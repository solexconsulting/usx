import React from 'react';
import Hero from './Hero';
import config from './config.json';

export default {
  title: 'React/Hero',
  component: Hero,
};

const Template = (args) => <Hero {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
