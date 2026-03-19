import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import buttonConfig from '../components/button/button_config.json';
import { buildArgTypes, componentTag } from './helper';

const generatedArgTypes = buildArgTypes(buttonConfig.props || {});

export default {
  title: 'Django/Button',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
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
