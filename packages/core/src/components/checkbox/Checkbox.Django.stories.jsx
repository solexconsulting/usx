import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const getArgs = (index) => ({
  id: `example-checkbox-${index}`,
  name: `example-${index}`,
  value: `example-value-${index}`,
  label: `Example Checkbox ${index}`,
});

export default {
  title: 'Django/Checkbox',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'checkbox', props: args })
      }
    }
  },
  render: djangoComponent('checkbox')
});

export const Default = createStory({
  ...getArgs(1),
});

export const WithDescription = createStory({
  ...getArgs(2),
  description: 'This is additional descriptive text for the checkbox.',
});

export const Tile = createStory({
  ...getArgs(3),
  tile: true,
});

export const TileWithDescription = createStory({
  ...getArgs(4),
  tile: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const Disabled = createStory({
  ...getArgs(5),
  disabled: true,
});

export const Small = createStory({
  ...getArgs(6),
  small: true,
});

export const SmallTile = createStory({
  ...getArgs(7),
  small: true,
  tile: true,
});

export const SmallTileWithDescription = createStory({
  ...getArgs(8),
  small: true,
  tile: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const WithError = createStory({
  ...getArgs(9),
  error: 'This is an error message.',
});

export const WithSuccess = createStory({
  ...getArgs(10),
  success: 'This is a success message.',
});

export const Required = createStory({
  ...getArgs(11),
  required: true,
});

export const RequiredWithDescription = createStory({
  ...getArgs(12),
  required: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const RequiredTile = createStory({
  ...getArgs(13),
  required: true,
  tile: true,
});

export const RequiredTileWithDescription = createStory({
  ...getArgs(14),
  required: true,
  tile: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const DisabledWithDescription = createStory({
  ...getArgs(15),
  disabled: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const DisabledTileWithDescription = createStory({
  ...getArgs(16),
  disabled: true,
  tile: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const SmallDisabled = createStory({
  ...getArgs(17),
  small: true,
  disabled: true,
});

export const SmallTileDisabled = createStory({
  ...getArgs(18),
  small: true,
  tile: true,
  disabled: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const WithOnChange = createStory({
  ...getArgs(19),
  onChange: "alert('Checkbox changed')",
});

export const RequiredSmallTileDisabled = createStory({
  ...getArgs(20),
  required: true,
  small: true,
  tile: true,
  disabled: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const RequiredSmallTile = createStory({
  ...getArgs(21),
  required: true,
  small: true,
  tile: true,
  description: 'This is additional descriptive text for the checkbox.',
});

export const RequiredSmall = createStory({
  ...getArgs(22),
  required: true,
  small: true,
  description: 'This is additional descriptive text for the checkbox.',
});