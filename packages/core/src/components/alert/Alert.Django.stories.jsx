import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import alertConfig from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(alertConfig.props || {});


export default {
  title: 'Django/Alert',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
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