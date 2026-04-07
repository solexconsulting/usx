import React from 'react';
import Card from './Card';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const actions = [
  { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More clicked') },
  { children: 'View Details', variant: 'secondary', onClick: () => alert('View Details clicked') }
];

const baseArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  actions: actions,
};

const imageArgs = {
  images: [{
    src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
    alt: 'Placeholder image for card',
    caption: 'This is an image caption.'
  }],
};

const tagsArgs = {
  tags: [
    { value: 'Primary', color: 'primary' },
    { value: 'Success', color: 'success' },
    { value: 'Warning', color: 'warning' }
  ],
};

export default {
  title: 'React/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    ...baseArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithImage = {
  args: {
    ...baseArgs,
    ...imageArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithTags = {
  args: {
    ...baseArgs,
    ...tagsArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithImageAndTags = {
  args: {
    ...baseArgs,
    ...imageArgs,
    ...tagsArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const FlagLayout = {
  args: {
    ...baseArgs,
    ...imageArgs,
    flag: true,
    className: 'grid-col-8',
  },
};

export const MediaRight = {
  args: {
    ...baseArgs,
    ...imageArgs,
    flag: true,
    mediaRight: true,
    className: 'grid-col-8',
  },
};

export const HeaderFirst = {
  args: {
    ...baseArgs,
    ...imageArgs,
    headerFirst: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const MediaInset = {
  args: {
    ...baseArgs,
    ...imageArgs,
    mediaInset: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const MediaExdent = {
  args: {
    ...baseArgs,
    ...imageArgs,
    mediaExdent: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const Minimal = {
  args: {
    title: 'Simple Card',
    description: 'Just the basics.',
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const FullFeatured = {
  args: {
    ...baseArgs,
    ...imageArgs,
    ...tagsArgs,
    flag: true,
    mediaRight: true,
    headerFirst: true,
    mediaInset: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};
