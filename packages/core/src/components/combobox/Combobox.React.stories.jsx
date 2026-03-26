import React from 'react';
import Combobox from './Combobox';
import config from './config.json';

export default {
  title: 'React/Combobox',
  component: Combobox,
};

const Template = (args) => <Combobox {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
