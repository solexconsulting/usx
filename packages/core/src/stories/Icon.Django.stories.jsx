import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import componentTag from './helper.jsx';

export default {
  title: 'Django/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The icon name from the sprite',
    },
    size: {
      control: 'select',
      options: [null, 3, 4, 5, 6, 7, 8, 9],
      description: 'The size of the icon',
    },
    color: {
        control: 'text',
        description: 'The color of the icon, corresponding to a CSS color or utility class'
    },
    staticUrlPrefix: {
      control: 'text',
      description: 'The prefix for the sprite URL',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the icon',
    },
    style: {
      control: 'object',
      description: 'Inline styles to apply to the icon',
    },
  },
};


export const Icon = {
    args: {
        name: 'accessibility_new',
        size: 2
    },
    parameters: {
        docs: {
            source: {
                code: componentTag({
                    name: 'icon',
                    props: {
                        name: 'accessibility_new',
                        size: 2
                    }
                })
            }
        }
    },
    render: djangoComponent('icon')
}