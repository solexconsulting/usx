import React from 'react';
import { djangoComponent } from '../../../../apps/storybook/.storybook/djangoComponent.js';
import config from '../components/accordion/config.json';
import { buildArgTypes, componentTag } from './helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Accordion',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const items1 = [
    {
        title: 'Accordion Item 1',
        id: 'item1',
        content: 'Content for accordion item 1.',
    },
    {
        title: 'Accordion Item 2',
        id: 'item2',
        content: 'Content for accordion item 2.',
    },
    {
        title: 'Accordion Item 3',
        id: 'item3',
        content: 'Content for accordion item 3.'
    }
]

export const Accordion = {
  args: {
    items: items1
  },
  parameters: {
    docs: {
      source: {
        code: componentTag({
          name: 'accordion',
          props: {
            items: items1
          }
        })
      }
    }
  },
  render: djangoComponent('accordion')
};
