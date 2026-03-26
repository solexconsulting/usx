import React from 'react';
import SiteAlert from './SiteAlert';
import config from './config.json';

export default {
  title: 'React/SiteAlert',
  component: SiteAlert,
};

const Template = (args) => <SiteAlert {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
