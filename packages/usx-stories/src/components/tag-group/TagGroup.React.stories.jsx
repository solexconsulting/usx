// import React from 'react';
import TagGroup from '../../../../usx-react/src/components/tag-group/TagGroup.tsx';
import config from '../../../../usx-react/src/components/tag-group/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

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
    tagProps: defaultTags,
  },
  Big: {
    tagProps: bigTags,
  },
};

export default {
  title: 'React/USWDS-Inspired/TagGroup',
  component: TagGroup,
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Big = { args: storyDefs.Big };
