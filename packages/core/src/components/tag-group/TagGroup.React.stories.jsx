import React from 'react';
import TagGroup from './TagGroup';
import Tag from '../tag/Tag';
import config from './config.json';

export default {
  title: 'React/TagGroup',
  component: TagGroup,
  tags: ['autodocs'],
};

const Template = (args) => <TagGroup {...args} />;

const defaultTags = [
  { value: 'Primary', color: 'primary' },
  { value: 'Secondary', color: 'secondary' },
  { value: 'Accent Cool', color: 'accent-cool' },
  { value: 'Blue', color: 'blue' },
  { value: 'Base', color: 'base' },
];

const bigTags = defaultTags.map((t) => ({ ...t, big: true }));

export const Default = {
  args: { tags: defaultTags }
};

export const Big = {
  args: { tags: bigTags }
};
