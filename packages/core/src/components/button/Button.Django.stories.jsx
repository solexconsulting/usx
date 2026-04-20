import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import buttonConfig from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

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
    className: '',
    style: '',
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'button',
          props: {
            label: 'Continue',
            variant: 'primary',
          },
        }),
      },
    },
  },
  render: djangoComponent('button'),
};
