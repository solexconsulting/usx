import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import { componentTag } from './helper.jsx';


export default {
  title: 'Django/Input',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the input field'
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input field'
    }
  }
};

export const Input = {
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov'
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'input',
          props: {
            label: 'Email address',
            placeholder: 'name@agency.gov'
          }
        })
      }
    }
  },
  render: djangoComponent('input')
};
