import React from 'react';
import RangeSlider from './RangeSlider';
import config from './config.json';

export default {
  title: 'React/RangeSlider',
  component: RangeSlider,
};

const Template = (args) => <RangeSlider {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
