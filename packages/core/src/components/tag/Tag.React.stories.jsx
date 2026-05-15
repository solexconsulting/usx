import React from 'react';
import Tag from './Tag';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';
import Icon from '../icon/Icon';

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
