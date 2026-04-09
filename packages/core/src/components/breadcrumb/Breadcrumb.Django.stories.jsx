import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Breadcrumb',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'breadcrumb', props: args })
      }
    }
  },
  render: djangoComponent('breadcrumb')
});

export const Default = {
  ...createStory(config.default || {})
};

export const WithRdfa = {
  ...createStory({ ...(config.default || {}), rdfa: true })
};

export const Wrap = {
  ...createStory({ ...(config.default || {}), wrap: true })
};

export const WithClassName = {
  ...createStory({ ...(config.default || {}), className: 'custom-breadcrumb-class' })
};

export const Empty = {
  ...createStory({ items: [] })
};
