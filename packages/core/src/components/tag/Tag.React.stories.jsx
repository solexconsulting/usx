import React from 'react';
import Tag from './Tag';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    children: 'Info',
  },
};

export const Big = {
  name: 'Big tag',
  args: {
    children: 'Big',
    big: true,
  },
};

export const Primary = {
  name: 'Primary color',
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

export const Secondary = {
  name: 'Secondary color',
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
};

export const AccentCool = {
  name: 'Accent Cool color',
  args: {
    children: 'Accent Cool',
    color: 'accent-cool',
  },
};

export const Blue = {
  name: 'Blue color',
  args: {
    children: 'Blue',
    color: 'blue',
  },
};

export const Base = {
  name: 'Base color',
  args: {
    children: 'Base',
    color: 'base',
  },
};
