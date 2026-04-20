import React from 'react';
import Checkbox from './Checkbox';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const getArgs = (index) => ({
  id: `example-checkbox-${index}`,
  name: `example-${index}`,
  value: `example-value-${index}`,
  label: `Example Checkbox ${index}`,
});

export const Default = {
  args: getArgs(1)
}

export const Checked = {
  args: {
    ...getArgs(2),
    checked: true,
  },
}

export const Tile = {
  args: {
    ...getArgs(3),
    tile: true,
  },
}

export const Description = {
  args: {
    ...getArgs(4),
    description: 'This is additional descriptive text for the checkbox.',
  },
}

export const TileWithDescription = {
  args: {
    ...getArgs(5),
    tile: true,
    description: 'This is additional descriptive text for the checkbox.',
  },
}

export const Disabled = {
  args: {
    ...getArgs(6),
    disabled: true,
  },
}

export const DisabledChecked = {
  args: {
    ...getArgs(7),
    checked: true,
    disabled: true,
  },
}

export const DisabledTile = {
  args: {
    ...getArgs(8),
    tile: true,
    disabled: true,
  },
}

export const DisabledCheckedTile = {
  args: {
    ...getArgs(9),
    checked: true,
    tile: true,
    disabled: true,
  },
}

export const Small = {
  args: {
    ...getArgs(10),
    small: true,
  },
}

export const SmallTile = {
  args: {
    ...getArgs(11),
    small: true,
    tile: true,
  },
}

export const SmallDisabled = {
  args: {
    ...getArgs(12),
    small: true,
    disabled: true,
  },
}

export const SmallCheckedDisabled = {
  args: {
    ...getArgs(13),
    small: true,
    checked: true,
    disabled: true,
  },
}

export const SmallTileDisabled = {
  args: {
    ...getArgs(14),
    small: true,
    tile: true,
    disabled: true,
    description: 'This is additional descriptive text for the checkbox.',
  },
}

export const SmallCheckedTileDisabled = {
  args: {
    ...getArgs(15),
    small: true,
    checked: true,
    tile: true,
    disabled: true,
    description: 'This is additional descriptive text for the checkbox.',
  },
}

export const WithOnChange = {
  args: {
    ...getArgs(16),
    onChange: (e) => alert('Checkbox changed:', e.target.checked),
  },
}

export const Required = {
  args: {
    ...getArgs(17),
    required: true,
    tile: true,
    description: 'This checkbox is required.',
  },
}

export const Error = {
  args: {
    ...getArgs(18),
    error: 'You\'ve done something wrong, although we don\'t necessarily know what.',
    tile: true,
    description: 'Please check this box to continue.',
  },
}

export const Success = {
  args: {
    ...getArgs(19),
    success: 'Great! You have successfully seen this message.',
    tile: true,
    description: 'Confirmation received.',
  },
}

