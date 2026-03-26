import React from 'react';
import {{Name}} from '../components/{{kebab}}';
import config from '../components/{{kebab}}/config.json';

export default {
  title: 'Components/{{Name}}',
  component: {{Name}},
};

const Template = (args) => <{{Name}} {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};
