import React from 'react';
import Carousel, { Slide } from '../../../../usx-react/src/components/carousel/Carousel.tsx';
import config from '../../../../usx-react/src/components/carousel/config.json';
import Image from '../../../../usx-react/src/components/image/Image.tsx';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USX/Carousel',
  component: Carousel,
  tags: ['USX', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

const getSlideContent = (bgColor, textColor, index) => (
  <div className={`width-full height-card bg-${bgColor} text-${textColor} padding-8`}>
    Slide {index + 1}
  </div>
);

const baseArgs = {
  id: "carousel-1",
  slides: [
    { content: getSlideContent('primary-dark', 'white', 0) },
    { content: getSlideContent('primary-light', 'black', 1) },
    { content: getSlideContent('secondary-dark', 'white', 2) }
  ]
};

const imageSlides = [
  { content: <Image src="https://picsum.photos/400/300?random=1" alt="Random image 1" fit={true} /> },
  { content: <Image src="https://picsum.photos/400/300?random=2" alt="Random image 2" fit={true} /> },
  { content: <Image src="https://picsum.photos/400/300?random=3" alt="Random image 3" fit={true} /> }
];

export const storyDefs = {
  Default: baseArgs,
  WithoutDots: { ...baseArgs, showDots: false },
  CustomId: { ...baseArgs, id: 'custom-carousel' },
  WithImages: {
    ...baseArgs,
    id: 'carousel-with-images',
    slides: imageSlides,
  },
  WithSlideChildren: {
    id: 'carousel-children',
    showDots: true,
    slideIds: ['#child-1', '#child-2', '#child-3'],
    children: (
      <>
        <Slide id="child-1">{getSlideContent('primary-dark', 'white', 0)}</Slide>
        <Slide id="child-2">{getSlideContent('primary-light', 'black', 1)}</Slide>
        <Slide id="child-3">{getSlideContent('secondary-dark', 'white', 2)}</Slide>
      </>
    ),
  },
  WithHTMLChildren: {
    id: 'carousel-manual',
    showDots: true,
    slideIds: ['#manual-1', '#manual-2', '#manual-3'],
    children: (
      <>
        <section id="manual-1" className="usx-carousel__slide" tabIndex={0}>{getSlideContent('primary-dark', 'white', 0)}</section>
        <section id="manual-2" className="usx-carousel__slide" tabIndex={0}>{getSlideContent('primary-light', 'black', 1)}</section>
        <section id="manual-3" className="usx-carousel__slide" tabIndex={0}>{getSlideContent('secondary-dark', 'white', 2)}</section>
      </>
    ),
  },
};

export const Default = { args: storyDefs.Default };
export const WithoutDots = { args: storyDefs.WithoutDots };
export const CustomId = { args: storyDefs.CustomId };
export const WithImages = { args: storyDefs.WithImages };
export const WithSlideChildren = { args: storyDefs.WithSlideChildren };
export const WithHTMLChildren = { args: storyDefs.WithHTMLChildren };