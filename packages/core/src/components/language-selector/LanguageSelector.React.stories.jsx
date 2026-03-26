import React from 'react';
import LanguageSelector from './LanguageSelector';
import config from './config.json';

export default {
  title: 'React/LanguageSelector',
  component: LanguageSelector,
};

const Template = (args) => <LanguageSelector {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
