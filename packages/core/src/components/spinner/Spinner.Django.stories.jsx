import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './Spinner.React.stories.jsx';

export default {
  title: 'Django/Spinner',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('spinner');

export const Default = createStory(storyDefs.Default);
export const OmitLabel = createStory(storyDefs.OmitLabel);
export const Small = createStory(storyDefs.Small);
export const Large = createStory(storyDefs.Large);
export const WithColor = createStory(storyDefs.WithColor);

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
