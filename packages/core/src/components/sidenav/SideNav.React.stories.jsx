import React from 'react';
import SideNav from './SideNav';

export default {
  title: 'React/SideNav',
  component: SideNav,
  argTypes: {
    items: { control: 'object' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
  },
};

const Template = (args) => <SideNav {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  items: [
    { text: 'Current page', href: 'javascript:void(0);', current: true },
    { text: 'Parent link', href: 'javascript:void(0);' },
    { text: 'Parent link', href: 'javascript:void(0);' },
  ],
};

export const WithSublist = Template.bind({});
WithSublist.args = {
  items: [
    { text: 'Parent link', href: 'javascript:void(0);' },
    {
      text: 'Current page',
      href: 'javascript:void(0);',
      current: true,
      children: [
        { text: 'Child link', href: 'javascript:void(0);' },
        { text: 'Child link', href: 'javascript:void(0);' },
        { text: 'Child link', href: 'javascript:void(0);', current: true },
      ],
    },
    { text: 'Parent link', href: 'javascript:void(0);' },
  ],
};

export const Nested = Template.bind({});
Nested.args = {
  items: [
    { text: 'Parent link', href: 'javascript:void(0);' },
    {
      text: 'Current page',
      href: 'javascript:void(0);',
      current: true,
      children: [
        { text: 'Child link', href: 'javascript:void(0);' },
        {
          text: 'Child link',
          href: 'javascript:void(0);',
          children: [
            { text: 'Grandchild link', href: 'javascript:void(0);' },
            { text: 'Grandchild link', href: 'javascript:void(0);', current: true },
            { text: 'Grandchild link', href: 'javascript:void(0);' },
          ],
        },
        { text: 'Child link', href: 'javascript:void(0);' },
      ],
    },
    { text: 'Parent link', href: 'javascript:void(0);' },
  ],
};
