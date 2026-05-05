import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/SideNav',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Simple = {
  args: {
    items: [
      { text: 'Current page', href: 'javascript:void(0);', current: true },
      { text: 'Parent link', href: 'javascript:void(0);' },
      { text: 'Parent link', href: 'javascript:void(0);' },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'sidenav', props: {
          items: [
            { text: 'Current page', href: 'javascript:void(0);', current: true },
            { text: 'Parent link', href: 'javascript:void(0);' },
            { text: 'Parent link', href: 'javascript:void(0);' },
          ],
        } })
      }
    }
  },
  render: djangoComponent('sidenav')
};

export const WithSublist = {
  args: {
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
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'sidenav', props: {
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
        } })
      }
    }
  },
  render: djangoComponent('sidenav')
};

export const Nested = {
  args: {
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
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'sidenav', props: {
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
        } })
      }
    }
  },
  render: djangoComponent('sidenav')
};
