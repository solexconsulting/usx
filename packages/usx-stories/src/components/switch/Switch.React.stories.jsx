import { controlledStory } from '../../utils/storyHelpers.jsx';
import React from 'react';
import Switch from '../../../../usx-react/src/components/switch/Switch.tsx';
import config from '../../../../usx-react/src/components/switch/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';
import IndeterminateHost from './IndeterminateHost.jsx';

export default {
  title: 'React/USX/Switch',
  component: Switch,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

const getArgs = (index) => ({
  id: `example-switch-${index}`,
  name: `example-${index}`,
  value: `example-value-${index}`,
  label: `Example Switch ${index}`,
});

export const storyDefs = {
  Default: config.default,
  DefaultChecked: { ...getArgs(31), defaultChecked: true },
  Checked: { ...getArgs(2), checked: true },
  Tile: { ...getArgs(3), tile: true },
  Description: { ...getArgs(4), description: 'Additional details about this setting.' },
  TileWithDescription: {
    ...getArgs(5),
    tile: true,
    description: 'Additional details about this setting.',
  },
  Disabled: { ...getArgs(6), disabled: true },
  DisabledChecked: { ...getArgs(7), checked: true, disabled: true },
  DisabledTile: { ...getArgs(8), tile: true, disabled: true },
  DisabledCheckedTile: { ...getArgs(9), checked: true, tile: true, disabled: true },
  Small: { ...getArgs(10), small: true },
  SmallTile: { ...getArgs(11), small: true, tile: true },
  SmallDisabled: { ...getArgs(12), small: true, disabled: true },
  SmallCheckedDisabled: { ...getArgs(13), small: true, checked: true, disabled: true },
  SmallTileDisabled: {
    ...getArgs(14),
    small: true,
    tile: true,
    disabled: true,
    description: 'Additional details about this setting.',
  },
  SmallCheckedTileDisabled: {
    ...getArgs(15),
    small: true,
    checked: true,
    tile: true,
    disabled: true,
    description: 'Additional details about this setting.',
  },
  WithOnChange: { ...getArgs(16), onChange: () => {} },
  Required: {
    ...getArgs(17),
    required: true,
    tile: true,
    description: 'This setting is required.',
  },
  Error: {
    ...getArgs(18),
    error: 'Choose a setting before continuing.',
    tile: true,
    description: 'Please review this setting.',
  },
  ErrorWithoutFormGroup: {
    ...getArgs(19),
    error: 'Choose a setting before continuing.',
    tile: true,
    formGroup: false,
    description: 'Please review this setting.',
  },
  Success: {
    ...getArgs(20),
    success: 'Setting saved.',
    tile: true,
    description: 'Your choice has been recorded.',
  },
  AriaLabel: { ...getArgs(21), label: '', ariaLabel: 'Email notifications' },
  CustomClass: { ...getArgs(22), className: 'custom-switch' },
  Indeterminate: getArgs(23),
  ColorSuccess: { ...getArgs(24), checked: true, color: 'success' },
  ColorWarning: { ...getArgs(25), checked: true, color: 'warning' },
  ColorError: { ...getArgs(26), checked: true, color: 'error' },
  ColorSecondaryTile: {
    ...getArgs(27),
    checked: true,
    tile: true,
    color: 'secondary',
  },
  ColorAccentCool: { ...getArgs(28), checked: true, color: 'accent-cool' },
  ColorDisabledChecked: {
    ...getArgs(30),
    checked: true,
    disabled: true,
    color: 'error',
  },
};

export const Default = { args: storyDefs.Default };
export const Checked = controlledStory(Switch, storyDefs.Checked, { prop: 'checked', read: (event) => event.target.checked });
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
export const ErrorWithoutFormGroup = { args: storyDefs.ErrorWithoutFormGroup };
export const Success = { args: storyDefs.Success };
export const AriaLabel = { args: storyDefs.AriaLabel };
export const CustomClass = { args: storyDefs.CustomClass };
export const Indeterminate = {
  args: storyDefs.Indeterminate,
  render: (args) => (
    <IndeterminateHost idSuffix={args.id}>
      <Switch {...args} />
    </IndeterminateHost>
  ),
};
export const ColorSuccess = { args: storyDefs.ColorSuccess };
export const ColorWarning = { args: storyDefs.ColorWarning };
export const ColorError = { args: storyDefs.ColorError };
export const ColorSecondaryTile = { args: storyDefs.ColorSecondaryTile };
export const ColorAccentCool = { args: storyDefs.ColorAccentCool };
export const ColorDisabledChecked = { args: storyDefs.ColorDisabledChecked };

export const DefaultChecked = { args: storyDefs.DefaultChecked };
