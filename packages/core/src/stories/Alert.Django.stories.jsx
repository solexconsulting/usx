import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import { componentTag } from './helper.jsx';


export default {
  title: 'Django/Alert',
  tags: ['autodocs'],
  argTypes: {
    heading: {
      control: 'text',
      description: 'The heading text of the alert'
    },
    text: {
      control: 'text',
      description: 'The body text of the alert'
    },
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'emergency'],
      description: 'The visual style of the alert'
    },
    slim: {
      control: 'boolean',
      description: 'If true, applies slim styling to the alert'
    },
    noIcon: {
      control: 'boolean',
      description: 'If true, hides the icon from the alert'
    }
  }
};

export const Alert = {
  args: {
    heading: 'Informative status',
    text: 'System status and notification updates appear here.',
    variant: 'info',
    slim: false,
    noIcon: false
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'alert',
          props: {
            heading: 'Informative status',
            text: 'System status and notification updates appear here.',
            variant: 'info',
            slim: false,
            noIcon: false
          }
        })
      }
    }
  },
  render: djangoComponent('alert')
};