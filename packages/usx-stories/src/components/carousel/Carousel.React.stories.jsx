import React from 'react';
import Carousel from '../../../../usx-react/src/components/carousel/Carousel.tsx';
import config from '../../../../usx-react/src/components/carousel/config.json';
import Card from '../../../../usx-react/src/components/card/Card.tsx';
import Image from '../../../../usx-react/src/components/image/Image.tsx';
import { buildArgTypes, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'React/USX/Carousel',
  component: Carousel,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  decorators: [...componentInit('carousel')],
};

const panel = (color, text, number) => (
  <div className={`width-full height-card bg-${color} text-${text} padding-8`}>Slide {number}</div>
);

const baseSlides = [
  { content: panel('primary-dark', 'white', 1) },
  { content: panel('primary-light', 'black', 2) },
  { content: panel('secondary-dark', 'white', 3) },
];

export const storyDefs = {
  Default: { ariaLabel: 'Featured content', slides: baseSlides },
  Unenhanced: { ariaLabel: 'Carousel without JS enhancement', slides: baseSlides, 'data-enhanced': 'true' },
  WithoutDots: { ariaLabel: 'Featured content', slides: baseSlides, showDots: false },
  HiddenStatus: { ariaLabel: 'Featured content', slides: baseSlides, statusClassName: 'display-none' },
  CustomId: { id: 'custom-carousel', ariaLabel: 'Featured content', slides: baseSlides },
  WithImages: {
    ariaLabel: 'Photo gallery',
    slides: [1, 2, 3].map((number) => ({
      content: (
        <Image
          src={`https://picsum.photos/400/300?random=${number}`}
          alt={`Random image ${number}`}
          fit
        />
      ),
      label: `Photo ${number} of 3`,
    })),
  },
  CardCarousel: {
    ariaLabel: 'Featured services',
    slides: [
      {
        content: (
          <Card
            id="card-1"
            title="Find a program"
            description="Explore programs and services available in your community."
            tagProps={[{ value: 'Programs', color: 'primary' }]}
            buttonProps={[{ href: '#programs', children: 'Explore programs' }]}
            containerClassName="radius-bottom-0"
          />
        ),
      },
      {
        content: (
          <Card
            id="card-2"
            title="Prepare your application"
            description="Learn what you need before applying and gather your documents."
            tagProps={[{ value: 'Getting started', color: 'info' }]}
            buttonProps={[{ href: '#application', children: 'Review requirements' }]}
            containerClassName="radius-bottom-0"
          />
        ),
      },
      {
        content: (
          <Card
            id="card-3"
            title="Get support"
            description="Connect with a specialist for help with your next step."
            tagProps={[{ value: 'Support', color: 'secondary' }]}
            buttonProps={[{ href: '#support', children: 'Contact support' }]}
            containerClassName="radius-bottom-0"
          />
        ),
      },
    ],
  },
  ManyCards: {
    ariaLabel: 'Service directory',
    slides: Array.from({ length: 20 }, (_, index) => {
      const number = index + 1;
      return {
        content: (
          <Card
            id={`many-card-${number}`}
            title={`Service ${number}`}
            description={`Explore service ${number} of 20.`}
            containerClassName="radius-bottom-0"
          />
        ),
        label: `Card ${number} of 20`,
      };
    }),
  },
  NestedCarousels: {
    ariaLabel: 'Cards with photo galleries',
    statusClassName: 'display-none',
    slides: [1, 2].map((number) => ({
      content: (
        <Card
          title={`Gallery ${number}`}
          description={`Photos in gallery ${number}.`}
          imageProps={[1, 2].map((photo) => ({
            src: `https://picsum.photos/800/450?random=${number * 10 + photo}`,
            alt: `Gallery ${number} photo ${photo}`,
          }))}
        />
      ),
    })),
  },
  WithSlideChildren: {
    ariaLabel: 'Child content',
    children: baseSlides.map(({ content }) => content),
  },
  SingleSlide: { ariaLabel: 'Single item', slides: [baseSlides[0]] },
  Empty: { ariaLabel: 'Empty carousel' },
};

export const Default = { args: storyDefs.Default };
export const Unenhanced = { args: storyDefs.Unenhanced };
export const WithoutDots = { args: storyDefs.WithoutDots };
export const HiddenStatus = { args: storyDefs.HiddenStatus };
export const CustomId = { args: storyDefs.CustomId };
export const WithImages = { args: storyDefs.WithImages };
export const CardCarousel = { args: storyDefs.CardCarousel };
export const ManyCards = { args: storyDefs.ManyCards };
export const NestedCarousels = { args: storyDefs.NestedCarousels };
export const WithSlideChildren = { args: storyDefs.WithSlideChildren };
export const SingleSlide = { args: storyDefs.SingleSlide };
export const Empty = { args: storyDefs.Empty };
