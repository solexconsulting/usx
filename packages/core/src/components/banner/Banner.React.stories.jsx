import React from 'react';
import Banner from './Banner';
import config from './config.json';

export default {
  title: 'React/Banner',
  component: Banner,
};

const Template = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
