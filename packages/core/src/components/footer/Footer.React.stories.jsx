import React from 'react';
import Footer from './Footer';
import config from './config.json';

export default {
  title: 'React/Footer',
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
