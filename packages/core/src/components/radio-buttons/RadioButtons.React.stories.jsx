import React from 'react';
import RadioButtons from './RadioButtons';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/RadioButtons',
  component: RadioButtons,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const options = [
  { value: 'sojourner-truth', label: 'Sojourner Truth', checked: true },
  { value: 'frederick-douglass', label: 'Frederick Douglass' },
  { value: 'booker-t-washington', label: 'Booker T. Washington' },
  { value: 'george-washington-carver', label: 'George Washington Carver', disabled: true },
];

const optionsWithDescriptions = [
  {
    value: 'sojourner-truth',
    label: 'Sojourner Truth',
    checked: true,
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


export const Default = {
  args: {
    name: 'historical-figures',
    options,
  },
};

export const WithDescriptions = {
  args: {
    name: 'historical-figures-with-descriptions',
    options: optionsWithDescriptions,
  },
};

export const Tile = {
  args: {
    name: 'tile-options',
    tile: true,
    options,
  },
};

export const TileWithDescriptions = {
  args: {
    name: 'tile-options-with-descriptions',
    tile: true,
    options: optionsWithDescriptions,
  },
};

export const Small = {
  args: {
    name: 'small-options',
    small: true,
    options,
  },
};

export const SmallTile = {
  args: {
    name: 'small-tile-options',
    small: true,
    tile: true,
    options,
  },
};

export const SmallTileWithDescriptions = {
  args: {
    name: 'small-tile-options',
    small: true,
    tile: true,
    options: optionsWithDescriptions,
  },
};

export const WithAdditionalClass = {
  args: {
    name: 'custom-class-options',
    options: optionsWithDescriptions,
    tile: true,
    className: 'maxw-mobile font-heading-xl',
  },
};