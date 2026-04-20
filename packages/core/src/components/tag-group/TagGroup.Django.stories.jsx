import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/TagGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'tag-group', props: args })
      }
    }
  },
  render: djangoComponent('tag-group')
});

const defaultTags = [
  { value: 'Primary', color: 'primary' },
  { value: 'Secondary', color: 'secondary' },
  { value: 'Accent Cool', color: 'accent-cool' },
  { value: 'Blue', color: 'blue' },
  { value: 'Base', color: 'base' },
];

const bigTags = defaultTags.map((t) => ({ ...t, big: true }));

export const Default = createStory({
  tags: defaultTags,
})

export const Big = createStory({
  tags: bigTags,
})
