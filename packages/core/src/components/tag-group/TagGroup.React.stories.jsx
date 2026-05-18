import React from 'react';
import TagGroup from './TagGroup';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const defaultTags = [
  { value: 'Primary', color: 'primary' },
  { value: 'Secondary', color: 'secondary' },
  { value: 'Accent Cool', color: 'accent-cool' },
  { value: 'Blue', color: 'blue' },
  { value: 'Base', color: 'base' },
];

const bigTags = defaultTags.map((t) => ({ ...t, big: true }));

export const storyDefs = {
  Default: {
    tags: defaultTags,
  },
  Big: {
    tags: bigTags,
  },
};

export default {
  title: 'React/TagGroup',
  component: TagGroup,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Big = { args: storyDefs.Big };
