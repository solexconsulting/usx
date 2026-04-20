import React from 'react';
import Icon from './Icon.jsx';
import iconConfig from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(iconConfig.props || {});

export default {
  title: 'React/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    name: 'accessibility_new',
    size: 2,
  },
};

export const DifferentSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(size => (
        <Icon key={size} name="accessibility_new" size={size} />
      ))}
    </div>
  ),
};

export const DifferentIcons = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="accessibility_new" size={3} />
      <Icon name="check_circle" size={3} />
      <Icon name="error" size={3} />
    </div>
  ),
};

export const DifferentColors = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Icon name="accessibility_new" size={3} color="primary" />
            <Icon name="check_circle" size={3} color="accent-warm-light" />
            <Icon name="error" size={3} color="accent-neutral-light" />
        </div>
    ),
};