import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import buttonConfig from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(buttonConfig.props || {});

export default {
  title: 'Django/Button',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const buttonItems = [
  { label: 'Button 1', variant: 'primary' },
  { label: 'Button 2', variant: 'secondary' },
  { label: 'Button 3', variant: 'accent-cool' }
]


export const Button = {
  args: {
    items: buttonItems
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button',
          props: {
            items: buttonItems
          }
        })
      }
    }
  },
  render: djangoComponent('button')
};
