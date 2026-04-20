import React from 'react';
import Spinner from './Spinner';
import config from './config.json';
import Tooltip from '../tooltip/Tooltip';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: { size: 3, label: 'Loading...', omitLabel: false },
  OmitLabel: { size: 3, label: 'Loading...', omitLabel: true },
  Small: { size: 1, label: 'Loading...' },
  Large: { size: 6, label: 'Loading...' },
  WithColor: { size: 3, color: 'primary', label: 'Loading...' },
};

export default {
  title: 'React/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };

export const DifferentSizes = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(size => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};

export const DifferentColors = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Spinner size={4} color="primary" />
      <Spinner size={4} color="secondary" />
      <Spinner size={4} color="accent-cool" />
      <Spinner size={4} color="error" />
      <Spinner size={4} color="success" />
    </div>
  ),
};

export const DifferentSizesOnDarkBackground = {
  render: () => (
    <div className="bg-ink padding-3 display-inline-flex gap-4 flex-align-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(size => (
        <Spinner key={size} size={size} color="white" />
      ))}
    </div>
  ),
};

export const DifferentColorsOnDarkBackground = {
  render: () => (
    <div className="bg-ink padding-3 display-inline-flex gap-4 flex-align-center">
      <Spinner size={4} color="base-lightest" />
      <Spinner size={4} color="primary-light" />
      <Spinner size={4} color="secondary-light" />
      <Spinner size={4} color="accent-cool-light" />
    </div>
  ),
};

export const WithTooltip = {
  render: () => (
    <Tooltip label="Loading...">
      <Spinner size={4} omitLabel />
    </Tooltip>
  ),
};
