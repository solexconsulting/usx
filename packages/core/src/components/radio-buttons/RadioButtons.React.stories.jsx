import React from 'react';
import RadioButtons from './RadioButtons';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/RadioButtons',
  component: RadioButtons,
  tags: ['autodocs'],
  excludeStories: ['storyDefs'],
  argTypes: generatedArgTypes,
};

const options = [
  { value: 'sojourner-truth', label: 'Sojourner Truth' },
  { value: 'frederick-douglass', label: 'Frederick Douglass' },
  { value: 'booker-t-washington', label: 'Booker T. Washington' },
  { value: 'george-washington-carver', label: 'George Washington Carver', disabled: true },
];

const optionsWithDescriptions = [
  {
    value: 'sojourner-truth',
    label: 'Sojourner Truth',
    description: 'A prominent abolitionist and women\'s rights activist.',
  },
  {
    value: 'frederick-douglass',
    label: 'Frederick Douglass',
    description: 'A former enslaved person who became a national leader of the abolitionist movement.'
  },
  {
    value: 'booker-t-washington',
    label: 'Booker T. Washington',
    description: 'An influential African American educator, author, orator, and advisor to multiple presidents of the United States.'
  },
  {
    value: 'george-washington-carver',
    label: 'George Washington Carver',
    disabled: true,
    description: 'An American agricultural scientist and inventor who promoted alternative crops to cotton and methods to prevent soil depletion.'
  },
];

export const storyDefs = {
  Default: {
    id: 'historical-figures',
    name: 'historical-figures',
    options,
  },
  WithDescriptions: {
    id: 'historical-figures-with-descriptions',
    name: 'historical-figures-with-descriptions',
    options: optionsWithDescriptions,
  },
  WithDefaultValue: {
    id: 'historical-figures-with-default',
    name: 'historical-figures-with-default',
    defaultValue: 'frederick-douglass',
    options,
  },
  Tile: {
    id: 'tile-options',
    name: 'tile-options',
    tile: true,
    options,
  },
  TileWithDescriptions: {
    id: 'tile-options-with-descriptions',
    name: 'tile-options-with-descriptions',
    tile: true,
    options: optionsWithDescriptions,
  },
  Small: {
    id: 'small-options',
    name: 'small-options',
    small: true,
    options,
  },
  SmallTile: {
    id: 'small-tile-options',
    name: 'small-tile-options',
    small: true,
    tile: true,
    options,
  },
  SmallTileWithDescriptions: {
    id: 'small-tile-options-with-descriptions',
    name: 'small-tile-options-with-descriptions',
    small: true,
    tile: true,
    options: optionsWithDescriptions,
  },
  WithAdditionalClass: {
    id: 'custom-class-options',
    name: 'custom-class-options',
    options: optionsWithDescriptions,
    tile: true,
    className: 'maxw-mobile font-heading-xl',
  },
};


export const Default = {
  args: storyDefs.Default,
};

export const WithDefaultValue = {
  args: storyDefs.WithDefaultValue,
};

export const WithDescriptions = {
  args: storyDefs.WithDescriptions,
};

export const Tile = {
  args: storyDefs.Tile,
};

export const TileWithDescriptions = {
  args: storyDefs.TileWithDescriptions,
};

export const Small = {
  args: storyDefs.Small,
};

export const SmallTile = {
  args: storyDefs.SmallTile,
};

export const SmallTileWithDescriptions = {
  args: storyDefs.SmallTileWithDescriptions,
};

export const WithAdditionalClass = {
  args: storyDefs.WithAdditionalClass,
};