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

const imageCoverArgs = {
  images: [
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.',
      objectFit: 'cover',
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
  ],
};

const imageContainArgs = {
  images: [
    {
      src: 'https://picsum.photos/800/300?random=1',
      alt: 'Placeholder image for card',
      caption: 'This is another image caption.',
      objectFit: 'contain',
    },
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.',
      objectFit: 'contain',
    },
    {
      src: 'https://picsum.photos/800/300?random=2',
      alt: 'Placeholder image for card',
      caption: 'This is yet another image caption.',
      objectFit: 'contain',
    }
  ],
};

const imageFillArgs = {
  images: [
    {
      src: 'https://picsum.photos/800/300?random=1',
      alt: 'Placeholder image for card',
      caption: 'This is another image caption.',
      objectFit: 'fill',
    },
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.',
      objectFit: 'fill',
    },
    {
      src: 'https://picsum.photos/800/300?random=2',
      alt: 'Placeholder image for card',
      caption: 'This is yet another image caption.',
      objectFit: 'fill',
    }
  ],
};

const singleImageArgs = {
  images: [
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.'
    }
  ],
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
    ...singleImageArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithTags = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithImageAndTags = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    ...tagsArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const FlagLayout = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    flag: true,
    className: 'grid-col-8',
  },
};

export const MediaRight = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    flag: true,
    mediaRight: true,
    className: 'grid-col-8',
  },
};

export const HeaderFirst = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    headerFirst: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const MediaInset = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    mediaInset: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const MediaExdent = {
  args: {
    ...baseArgs,
    ...singleImageArgs,
    mediaExdent: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithCarousel = {
  args: {
    ...baseArgs,
    ...imageCoverArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithCarouselNoDots = {
  args: {
    ...baseArgs,
    ...imageCoverArgs,
    showCarouselDots: false,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithCarouselAndTags = {
  args: {
    ...baseArgs,
    ...imageCoverArgs,
    ...tagsArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithCarouselFlagLayout = {
  args: {
    ...baseArgs,
    ...imageCoverArgs,
    flag: true,
    className: 'grid-col-8',
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
    ...imageCoverArgs,
    ...tagsArgs,
    flag: true,
    mediaRight: true,
    headerFirst: true,
    mediaInset: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const ImagesWithObjectFitContain = {
  args: {
    ...baseArgs,
    ...imageContainArgs,
    className: 'tablet:grid-col-4',
  },
};

export const ImagesWithObjectFitFill = {
  args: {
    ...baseArgs,
    ...imageFillArgs,
    className: 'tablet:grid-col-4',
  },
};
