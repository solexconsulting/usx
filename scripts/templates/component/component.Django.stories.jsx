import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: `Django/{{Name}}`,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: '{{kebab}}', props: config.default || {} })
      }
    }
  },
  render: djangoComponent('{{kebab}}')
};
