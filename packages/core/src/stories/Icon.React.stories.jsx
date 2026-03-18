import React from 'react';
import Icon from '../components/icon/icon.jsx';

export default {
  title: 'React/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The icon name from the sprite',
    },
    size: {
      control: 'select',
      options: [null, 3, 4, 5, 6, 7, 8, 9],
      description: 'The size of the icon',
    },
    staticUrlPrefix: {
      control: 'text',
      description: 'The prefix for the sprite URL',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the icon',
    },
    style: {
      control: 'object',
      description: 'Inline styles to apply to the icon',
    },
  },
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
      {[3, 4, 5, 6, 7, 8, 9].map(size => (
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