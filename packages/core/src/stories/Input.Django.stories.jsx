import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import inputConfig from '../components/input/config.json';
import { buildArgTypes, componentTag } from './helper';

const generatedArgTypes = buildArgTypes(inputConfig.props || {});

export default {
  title: 'Django/Input',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
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
