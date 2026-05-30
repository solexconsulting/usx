
import Checkbox from './Checkbox';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const getArgs = (index) => ({
  id: `example-checkbox-${index}`,
  name: `example-${index}`,
  value: `example-value-${index}`,
  label: `Example Checkbox ${index}`,
});

export const storyDefs = {
  Default: getArgs(1),
  Checked: {
    ...getArgs(2),
    checked: true,
  },
  Tile: {
    ...getArgs(3),
    tile: true,
  },
  Description: {
    ...getArgs(4),
    description: 'This is additional descriptive text for the checkbox.',
  },
  TileWithDescription: {
    ...getArgs(5),
    tile: true,
    description: 'This is additional descriptive text for the checkbox.',
  },
  Disabled: {
    ...getArgs(6),
    disabled: true,
  },
  DisabledChecked: {
    ...getArgs(7),
    checked: true,
    disabled: true,
  },
  DisabledTile: {
    ...getArgs(8),
    tile: true,
    disabled: true,
  },
  DisabledCheckedTile: {
    ...getArgs(9),
    checked: true,
    tile: true,
    disabled: true,
  },
  Small: {
    ...getArgs(10),
    small: true,
  },
  SmallTile: {
    ...getArgs(11),
    small: true,
    tile: true,
  },
  SmallDisabled: {
    ...getArgs(12),
    small: true,
    disabled: true,
  },
  SmallCheckedDisabled: {
    ...getArgs(13),
    small: true,
    checked: true,
    disabled: true,
  },
  SmallTileDisabled: {
    ...getArgs(14),
    small: true,
    tile: true,
    disabled: true,
    description: 'This is additional descriptive text for the checkbox.',
  },
  SmallCheckedTileDisabled: {
    ...getArgs(15),
    small: true,
    checked: true,
    tile: true,
    disabled: true,
    description: 'This is additional descriptive text for the checkbox.',
  },
  WithOnChange: {
    ...getArgs(16),
    onChange: (e) => alert('Checkbox changed:', e.target.checked),
  },
  Required: {
    ...getArgs(17),
    required: true,
    tile: true,
    description: 'This checkbox is required.',
  },
  Error: {
    ...getArgs(18),
    error: 'You\'ve done something wrong, although we don\'t necessarily know what.',
    tile: true,
    description: 'Please check this box to continue.',
  },
  Success: {
    ...getArgs(19),
    success: 'Great! You have successfully seen this message.',
    tile: true,
    description: 'Confirmation received.',
  },
};

export const Default = { args: storyDefs.Default };
export const Checked = { args: storyDefs.Checked };
export const Tile = { args: storyDefs.Tile };
export const Description = { args: storyDefs.Description };
export const TileWithDescription = { args: storyDefs.TileWithDescription };
export const Disabled = { args: storyDefs.Disabled };
export const DisabledChecked = { args: storyDefs.DisabledChecked };
export const DisabledTile = { args: storyDefs.DisabledTile };
export const DisabledCheckedTile = { args: storyDefs.DisabledCheckedTile };
export const Small = { args: storyDefs.Small };
export const SmallTile = { args: storyDefs.SmallTile };
export const SmallDisabled = { args: storyDefs.SmallDisabled };
export const SmallCheckedDisabled = { args: storyDefs.SmallCheckedDisabled };
export const SmallTileDisabled = { args: storyDefs.SmallTileDisabled };
export const SmallCheckedTileDisabled = { args: storyDefs.SmallCheckedTileDisabled };
export const WithOnChange = { args: storyDefs.WithOnChange };
export const Required = { args: storyDefs.Required };
export const Error = { args: storyDefs.Error };
export const Success = { args: storyDefs.Success };

