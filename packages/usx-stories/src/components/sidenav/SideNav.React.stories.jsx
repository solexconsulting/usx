// import React from 'react';
import SideNav from '../../../../usx-react/src/components/sidenav/SideNav.tsx';

export default {
  title: 'React/USWDS/SideNav',
  component: SideNav,
  argTypes: {
    items: { control: 'object' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
  },
  tags: ['USWDS', 'autodocs'],
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Simple: {
    items: [
      { text: 'Current page', href: 'javascript:void(0);', current: true },
      { text: 'Parent link', href: 'javascript:void(0);' },
      { text: 'Parent link', href: 'javascript:void(0);' },
    ],
  },
  WithSublist: {
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
  },
  Nested: {
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
  },
};

export const Simple = { args: storyDefs.Simple };
export const WithSublist = { args: storyDefs.WithSublist };
export const Nested = { args: storyDefs.Nested };
