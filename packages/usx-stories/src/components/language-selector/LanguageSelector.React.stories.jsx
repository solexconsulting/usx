import React from 'react';
import LanguageSelector from '../../../../core/src/components/language-selector/LanguageSelector.jsx';
import config from '../../../../core/src/components/language-selector/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/LanguageSelector',
  component: LanguageSelector,
};

const Template = (args) => <LanguageSelector {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
