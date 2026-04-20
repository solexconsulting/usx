import React from 'react';
import Breadcrumb from './Breadcrumb';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const Template = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = config.default || {};

export const WithRdfa = Template.bind({});
WithRdfa.args = { ...(config.default || {}), rdfa: true };

export const Wrap = Template.bind({});
Wrap.args = { ...(config.default || {}), wrap: true };

export const WithClassName = Template.bind({});
WithClassName.args = { ...(config.default || {}), className: 'custom-breadcrumb-class' };

export const Empty = Template.bind({});
Empty.args = { items: [] };
