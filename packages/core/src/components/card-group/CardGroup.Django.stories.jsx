import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const actions = [
  { children: 'Learn More', variant: 'primary' },
  { children: 'View Details', variant: 'secondary' }
];

const baseCardArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  actions,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
};

const images = {
  images: [
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.',
      objectFit: 'cover'
    },
    {
      src: 'https://picsum.photos/800/300?random=1',
      alt: 'Placeholder image for card',
      caption: 'This is another image caption.',
      objectFit: 'cover',
    },
    {
      src: 'https://picsum.photos/800/300?random=2',
      alt: 'Placeholder image for card',
      caption: 'This is yet another image caption.',
      objectFit: 'cover',
    }
  ]
};

export default {
  title: 'Django/CardGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card-group', props: args })
      }
    }
  },
  render: djangoComponent('card-group')
});

export const Default = createStory({
  cards: [
    baseCardArgs,
    { ...baseCardArgs, ...images, title: 'Card with Media' },
    { ...baseCardArgs, ...images, title: 'Media with header first', headerFirst: true },
  ],
});

export const FlagLayout = createStory({
  cards: [
    { ...baseCardArgs, ...images, flag: true, title: 'Default flag', className: 'flex-1' },
    { ...baseCardArgs, ...images, flag: true, mediaRight: true, title: 'Flag media right', className: 'flex-1' },
  ],
});
