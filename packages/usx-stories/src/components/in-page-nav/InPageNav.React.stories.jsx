import React from 'react';
import InPageNav from '../../../../core/src/components/in-page-nav/InPageNav.jsx';
import config from '../../../../core/src/components/in-page-nav/config.json';

export default {
  tags: ['USWDS'],
  title: 'React/USWDS/InPageNav',
  component: InPageNav,
};

const Template = (args) => <InPageNav {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
