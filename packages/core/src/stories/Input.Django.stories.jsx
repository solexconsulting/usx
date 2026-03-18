import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import { componentTag } from './helper.jsx';


export default {
  title: 'Django/Input',
  tags: ['autodocs'],
  argTypes: {
    label: {
      "type": "string",
      "default": "Label"
    },
    id: {
      "type": "string",
      "default": null
    },
    placeholder: {
      "type": "string",
      "default": "Placeholder text"
    },
    error: {
      "type": "string",
      "default": null
    },
    success: {
      "type": "string",
      "default": null
    },
    disabled: {
      "type": "boolean",
      "default": false
    },
    characterCount: {
      "type": "object",
      "default": null
    },
    hint: {
      "type": "string",
      "default": null
    },
    textArea: {
      "type": "boolean",
      "default": false
    },
    className: {
      "type": "string",
      "default": ""
    },
    style: {
      "type": "string",
      "default": ""
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
