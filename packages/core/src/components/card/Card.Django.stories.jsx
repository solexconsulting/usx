import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const actionsWithButtons = [
  { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More clicked') },
  { children: 'View Details', variant: 'secondary', onClick: () => alert('View Details clicked') }
];

const baseArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  actions: actionsWithButtons,
};

const imageArgs = {
  images: [{
    src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
    alt: 'Placeholder image for card',
    caption: 'This is an image caption.'
  }],
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
  title: 'Django/Card',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card', props: args })
      }
    }
  },
  render: djangoComponent('card')
});

export const Default = createStory({
  ...baseArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithImage = createStory({
  ...baseArgs,
  ...imageArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithTags = createStory({
  ...baseArgs,
  ...tagsArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithImageAndTags = createStory({
  ...baseArgs,
  ...imageArgs,
  ...tagsArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const FlagLayout = createStory({
  ...baseArgs,
  ...imageArgs,
  flag: true,
  className: 'grid-col-8',
});

export const MediaRight = createStory({
  ...baseArgs,
  ...imageArgs,
  flag: true,
  mediaRight: true,
  className: 'grid-col-8',
});

export const HeaderFirst = createStory({
  ...baseArgs,
  ...imageArgs,
  headerFirst: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const MediaInset = createStory({
  ...baseArgs,
  ...imageArgs,
  mediaInset: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const MediaExdent = createStory({
  ...baseArgs,
  ...imageArgs,
  mediaExdent: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const Minimal = createStory({
  title: 'Simple Card',
  description: 'Just the basics.',
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const FullFeatured = createStory({
  ...baseArgs,
  ...imageArgs,
  ...tagsArgs,
  flag: true,
  mediaRight: true,
  headerFirst: true,
  mediaInset: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithCarousel = createStory({
  ...baseArgs,
  ...imageCoverArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithCarouselNoDots = createStory({
  ...baseArgs,
  ...imageCoverArgs,
  showCarouselDots: false,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithCarouselAndTags = createStory({
  ...baseArgs,
  ...imageCoverArgs,
  ...tagsArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithCarouselFlagLayout = createStory({
  ...baseArgs,
  ...imageCoverArgs,
  flag: true,
  className: 'grid-col-8',
});

export const ImagesWithObjectFitContain = createStory({
  ...baseArgs,
  ...imageContainArgs,
  className: 'tablet:grid-col-4',
});

export const ImagesWithObjectFitFill = createStory({
  ...baseArgs,
  ...imageFillArgs,
  className: 'tablet:grid-col-4',
});
