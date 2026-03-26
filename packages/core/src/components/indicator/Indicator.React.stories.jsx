import React from 'react';
import Indicator from './Indicator';
import config from './config.json';

export default {
  title: 'React/Indicator',
  component: Indicator,
};

const Template = (args) => <Indicator {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
