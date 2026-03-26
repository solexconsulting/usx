import React from 'react';
import {{Name}} from './{{Name}}';
import config from './config.json';

export default {
  title: 'React/{{Name}}',
  component: {{Name}},
};

const Template = (args) => <{{Name}} {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
