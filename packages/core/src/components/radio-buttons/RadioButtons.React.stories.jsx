import React from 'react';
import RadioButtons from './RadioButtons';
import config from './config.json';

export default {
  title: 'React/RadioButtons',
  component: RadioButtons,
};

const Template = (args) => <RadioButtons {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
