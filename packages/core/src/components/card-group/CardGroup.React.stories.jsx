import React from 'react';
import CardGroup from './CardGroup';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const actions = [
  { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More clicked') },
  { children: 'View Details', variant: 'secondary', onClick: () => alert('View Details clicked') }
];

const baseCardArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  actions: actions,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
};

const images = {
  images: [
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.',
      objectFit: 'cover',
    },
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is another image caption.',
      objectFit: 'cover',
    }
  ]
}

const tagsArgs = {
  tags: [
    { value: 'Primary', color: 'primary' },
    { value: 'Success', color: 'success' },
    { value: 'Warning', color: 'warning' }
  ],
};

export default {
  title: 'React/CardGroup',
  component: CardGroup,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    cards: [
      baseCardArgs,
      { ...baseCardArgs, ...images, title: 'Card with Media' },
      { ...baseCardArgs, ...images, title: 'Media with header first', headerFirst: true },
    ],
  },
  FlagLayout: {
    cards: [
      { ...baseCardArgs, ...images, flag: true, title: 'Default flag', className: 'flex-1' },
      { ...baseCardArgs, ...images, flag: true, mediaRight: true, title: 'Flag media right', className: 'flex-1' },
    ],
  },
  WithTags: {
    cards: [
      { ...baseCardArgs, ...images, ...tagsArgs, className: 'tablet:grid-col-6 widescreen:grid-col-4' },
      { ...baseCardArgs, ...images, ...tagsArgs, className: 'tablet:grid-col-6 widescreen:grid-col-4' },
    ],
  },
};

export const Default = { args: storyDefs.Default };
export const FlagLayout = { args: storyDefs.FlagLayout };
export const WithTags = { args: storyDefs.WithTags };
