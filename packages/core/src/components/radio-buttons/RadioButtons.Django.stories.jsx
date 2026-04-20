import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/RadioButtons',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'radio-buttons', props: args })
      }
    }
  },
  render: djangoComponent('radio-buttons')
});

const options = [
  { value: 'sojourner-truth', label: 'Sojourner Truth', checked: true },
  { value: 'frederick-douglass', label: 'Frederick Douglass' },
  { value: 'booker-t-washington', label: 'Booker T. Washington' },
  { value: 'george-washington-carver', label: 'George Washington Carver', disabled: true },
];

const optionsWithDescriptions = [
  { value: 'sojourner-truth', label: 'Sojourner Truth', checked: true, description: 'A prominent abolitionist and women\'s rights activist.' },
  { value: 'frederick-douglass', label: 'Frederick Douglass', description: 'A former enslaved person who became a national leader of the abolitionist movement.' },
  { value: 'booker-t-washington', label: 'Booker T. Washington', description: 'An influential African American educator, author, orator, and advisor to multiple presidents.' },
  { value: 'george-washington-carver', label: 'George Washington Carver', disabled: true, description: 'An American agricultural scientist and inventor.' },
];

export const Default = createStory({
  name: 'historical-options-1',
  legend: 'Select a historical figure',
  options: options
});

export const NoLegend = createStory({
  name: 'historical-options-2',
  options: options
});

export const Required = createStory({
  name: 'historical-options-3',
  legend: 'Select a historical figure',
  required: true,
  options: options
});

export const Tile = createStory({
  name: 'tile-options',
  legend: 'Select a historical figure',
  tile: true,
  options: options
});

export const Small = createStory({
  name: 'small-options',
  legend: 'Select a historical figure',
  small: true,
  options: options
});

export const TileWithDescriptions = createStory({
  name: 'tile-options-with-descriptions',
  legend: 'Select a historical figure',
  tile: true,
  options: optionsWithDescriptions
});

export const SmallTile = createStory({
  name: 'small-tile-options',
  legend: 'Select a historical figure',
  small: true,
  tile: true,
  options
});

export const SmallTileWithDescriptions = createStory({
  name: 'small-tile-options-with-descriptions',
  legend: 'Select a historical figure',
  small: true,
  tile: true,
  options: optionsWithDescriptions
});

export const WithAdditionalClass = createStory({
  name: 'custom-class-options',
  legend: 'Select a historical figure',
  tile: true,
  options: optionsWithDescriptions,
  className: 'maxw-mobile font-heading-xl'
});
