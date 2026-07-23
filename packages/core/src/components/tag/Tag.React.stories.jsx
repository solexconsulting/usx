// import React from 'react';
import Tag from './Tag';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    children: 'message',
  },
  WithIcon: {
    children: 'Success',
    icon: 'campaign',
  },
  Big: {
    children: 'Big',
    big: true,
  },
  Dismissible: {
    children: 'Dismissible',
    dismissible: true,
  },
  DismissibleWithCallback: {
    children: 'Dismissible',
    dismissible: true,
    onDismiss: () => alert('Dismissed!'),
  },
  Primary: {
    children: 'Primary',
    color: 'primary',
  },
  Secondary: {
    children: 'Secondary',
    color: 'secondary',
  },
  AccentCool: {
    children: 'Accent Cool',
    color: 'accent-cool',
  },
  Blue: {
    children: 'Blue',
    color: 'blue',
  },
  Base: {
    children: 'Base',
    color: 'base',
  },
  OutlinePrimary: {
    children: 'Primary',
    color: 'primary',
    outline: true,
  },
  OutlineSecondary: {
    children: 'Secondary',
    color: 'secondary',
    outline: true,
  },
  OutlineAccentCool: {
    children: 'Accent Cool',
    color: 'accent-cool',
    outline: true,
  },
  OutlineBlue: {
    children: 'Blue',
    color: 'blue',
    outline: true,
  },
  OutlineBase: {
    children: 'Base',
    color: 'base',
    outline: true,
  },
  Info: {
    children: 'Info',
    color: 'info',
    icon: 'info_outline',
  },
  Success: {
    children: 'Success',
    color: 'success',
    icon: 'check',
  },
  Warning: {
    children: 'Warning',
    color: 'warning',
    icon: 'warning',
  },
  Error: {
    children: 'Error',
    color: 'error',
    icon: 'error_outline',
  },
};

export const Default = {
  args: storyDefs.Default,
};

export const WithIcon = {
  name: 'With icon',
  args: storyDefs.WithIcon,
};

export const Big = {
  name: 'Big tag',
  args: storyDefs.Big,
};

export const Dismissible = {
  args: storyDefs.Dismissible,
};

export const DismissibleWithCallback = {
  args: storyDefs.DismissibleWithCallback,
};

export const Primary = {
  name: 'Primary color',
  args: storyDefs.Primary,
};

export const Secondary = {
  name: 'Secondary color',
  args: storyDefs.Secondary,
};

export const AccentCool = {
  name: 'Accent Cool color',
  args: storyDefs.AccentCool,
};

export const Blue = {
  name: 'Blue color',
  args: storyDefs.Blue,
};

export const Base = {
  name: 'Base color',
  args: storyDefs.Base,
};

export const OutlinePrimary = {
  name: 'Outline style: Primary',
  args: storyDefs.OutlinePrimary,
};

export const OutlineSecondary = {
  name: 'Outline style: Secondary',
  args: storyDefs.OutlineSecondary,
};

export const OutlineAccentCool = {
  name: 'Outline style: Accent Cool',
  args: storyDefs.OutlineAccentCool,
};

export const OutlineBlue = {
  name: 'Outline style: Blue',
  args: storyDefs.OutlineBlue,
};

export const OutlineBase = {
  name: 'Outline style: Base',
  args: storyDefs.OutlineBase,
};

export const Info = {
  args: storyDefs.Info,
};

export const Success = {
  args: storyDefs.Success,
};

export const Warning = {
  args: storyDefs.Warning,
};

export const Error = {
  args: storyDefs.Error,
};
