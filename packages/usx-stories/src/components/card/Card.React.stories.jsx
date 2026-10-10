
import Card from '../../../../usx-react/src/components/card/Card.tsx';
import config from '../../../../usx-react/src/components/card/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

const actions = [
  { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More clicked') },
  { children: 'View Details', variant: 'secondary', onClick: () => alert('View Details clicked') }
];

const baseArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  buttonProps: actions,
};

const imageCoverArgs = {
  imageProps: [
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
  imageProps: [
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
  imageProps: [
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
  imageProps: [
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.'
    }
  ],
};

const tagsArgs = {
  tagProps: [
    { value: 'Primary', color: 'primary' },
    { value: 'Success', color: 'success' },
    { value: 'Warning', color: 'warning' }
  ],
};

export default {
  title: 'React/USWDS/Card',
  component: Card,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    ...baseArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithImage: {
    ...baseArgs,
    ...singleImageArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithTags: {
    ...baseArgs,
    ...singleImageArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithImageAndTags: {
    ...baseArgs,
    ...singleImageArgs,
    ...tagsArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  FlagLayout: {
    ...baseArgs,
    ...singleImageArgs,
    flag: true,
    className: 'grid-col-8',
  },
  MediaRight: {
    ...baseArgs,
    ...singleImageArgs,
    flag: true,
    mediaRight: true,
    className: 'grid-col-8',
  },
  HeaderFirst: {
    ...baseArgs,
    ...singleImageArgs,
    headerFirst: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  MediaInset: {
    ...baseArgs,
    ...singleImageArgs,
    mediaInset: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  MediaInsetRight: {
    ...baseArgs,
    ...singleImageArgs,
    flag: true,
    mediaInset: true,
    mediaRight: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  MediaExdent: {
    ...baseArgs,
    ...singleImageArgs,
    mediaExdent: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithCarousel: {
    ...baseArgs,
    ...imageCoverArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithCarouselInset: {
    ...baseArgs,
    ...imageCoverArgs,
    mediaInset: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithCarouselNoDots: {
    ...baseArgs,
    ...imageCoverArgs,
    showCarouselDots: false,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithCarouselAndTags: {
    ...baseArgs,
    ...imageCoverArgs,
    ...tagsArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  WithCarouselFlagLayout: {
    ...baseArgs,
    ...imageCoverArgs,
    flag: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  Minimal: {
    title: 'Simple Card',
    description: 'Just the basics.',
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  FullFeatured: {
    ...baseArgs,
    ...imageCoverArgs,
    ...tagsArgs,
    flag: true,
    mediaRight: true,
    headerFirst: true,
    mediaInset: true,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  ImagesWithObjectFitContain: {
    ...baseArgs,
    ...imageContainArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
  ImagesWithObjectFitFill: {
    ...baseArgs,
    ...imageFillArgs,
    className: 'tablet:grid-col-8 widescreen:grid-col-6',
  },
};

export const Default = { args: storyDefs.Default };
export const WithImage = { args: storyDefs.WithImage };
export const WithTags = { args: storyDefs.WithTags };
export const WithImageAndTags = { args: storyDefs.WithImageAndTags };
export const FlagLayout = { args: storyDefs.FlagLayout };
export const MediaRight = { args: storyDefs.MediaRight };
export const HeaderFirst = { args: storyDefs.HeaderFirst };
export const MediaInset = { args: storyDefs.MediaInset };
export const MediaInsetRight = { args: storyDefs.MediaInsetRight };
export const MediaExdent = { args: storyDefs.MediaExdent };
export const WithCarousel = { args: storyDefs.WithCarousel };
export const WithCarouselInset = { args: storyDefs.WithCarouselInset };
export const WithCarouselNoDots = { args: storyDefs.WithCarouselNoDots };
export const WithCarouselAndTags = { args: storyDefs.WithCarouselAndTags };
export const WithCarouselFlagLayout = { args: storyDefs.WithCarouselFlagLayout };
export const Minimal = { args: storyDefs.Minimal };
export const FullFeatured = { args: storyDefs.FullFeatured };
export const ImagesWithObjectFitContain = { args: storyDefs.ImagesWithObjectFitContain };
export const ImagesWithObjectFitFill = { args: storyDefs.ImagesWithObjectFitFill };
