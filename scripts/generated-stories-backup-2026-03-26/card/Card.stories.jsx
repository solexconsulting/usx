import React from 'react';
import Component from './Card.jsx';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../stories/helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Card',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const ReactView = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card', props: config.default || {} })
      }
    }
  },
  render: (args) => React.createElement(Component, args)
};

export const HTMLView = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card', props: config.default || {} })
      }
    }
  },
  render: () => componentTag({ name: 'card', props: config.default || {} })
};

export const DjangoView = {
  args: config.default || {},
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card', props: config.default || {} })
      }
    }
  },
  render: djangoComponent('card')
};
