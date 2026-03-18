import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import { componentTag } from './helper.jsx';


export default {
  title: 'Django/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text to display on the button'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent-cool', 'accent-warm', 'base', 'outline', 'unstyled']
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset']
    },
    disabled: {
      control: 'boolean'
    },
    onClick: {
      action: 'clicked',
      description: 'Function to call when the button is clicked'
    },
    href: {
      control: 'text',
      description: 'If provided, the button will be rendered as a link'
    },
    isExternal: {
      control: 'boolean',
      description: 'If true and href is provided, the link will open in a new tab'
    },
    big: {
      control: 'boolean',
      description: 'If true, applies big styling to the button'
    },
    inverse: {
      control: 'boolean',
      description: 'If true, applies inverse styling to the button'
    },
    leftIcon: {
      control: 'object',
      description: 'An object specifying the name, size, and color of an icon to display on the left side of the button'
    },
    rightIcon: {
      control: 'object',
      description: 'An object specifying the name, size, and color of an icon to display on the right side of the button'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the button'
    },
    style: {
      control: 'text',
      description: 'Inline styles to apply to the button'
    }
  },
};


export const Button = {
  args: {
    label: 'Continue',
    variant: 'primary',
    disabled: false,
    className: '',
    style: ''
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button',
          props: {
            label: 'Continue',
            variant: 'primary',
            disabled: false
          }
        })
      }
    }
  },
  render: djangoComponent('button')
};
