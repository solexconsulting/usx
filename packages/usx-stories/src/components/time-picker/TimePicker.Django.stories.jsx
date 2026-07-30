// import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from '../../../../core/src/components/time-picker/config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/TimePicker',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'time-picker', props: config.default || {} })
      }
    }
  },
  render: djangoComponent({ componentName: 'time-picker' })
};
