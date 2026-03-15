import React from 'react';
import { createAlert } from '../../../../packages/core/src/components/alert/alert.js';
import { createButton } from '../../../../packages/core/src/components/button/button.js';
import { createInput } from '../../../../packages/core/src/components/input/input.js';

function Markup({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default {
  title: 'Components',
  tags: ['autodocs']
};

export const ButtonFactory = {
  name: 'createButton',
  args: {
    label: 'Continue',
    variant: undefined,
    type: 'button'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'secondary']
    }
  },
  render: (args) => <Markup html={createButton(args).outerHTML} />
};

export const InputFactory = {
  name: 'createInput',
  args: {
    label: 'Email address',
    placeholder: 'name@agency.gov',
    type: 'text'
  },
  render: (args) => <Markup html={createInput(args).outerHTML} />
};

export const AlertFactory = {
  name: 'createAlert',
  args: {
    variant: 'info',
    heading: 'Informative status',
    message: 'System status and notification updates appear here.',
    slim: false,
    noIcon: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'error', 'emergency']
    }
  },
  render: (args) => <Markup html={createAlert(args).outerHTML} />
};