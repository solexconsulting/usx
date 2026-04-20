import React from 'react';
import Carousel, { Slide } from './Carousel';
import config from './config.json';
import Image from '../image/Image';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
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

export const Default = {
  args: baseArgs
};



export const WithoutDots = {
  args: { ...baseArgs, showDots: false }
}

export const CustomId = {
  args: { ...baseArgs, id: 'custom-carousel' }
}


export const WithImages = {
  args: {
    ...baseArgs,
    id: 'carousel-with-images',
    slides: imageSlides
  }
};

export const WithSlideChildren = () => (
  <Carousel id="carousel-children" showDots slideIds={["#child-1", "#child-2", "#child-3"]}>
    <Slide id="child-1">{getSlideContent('primary-dark', 'white', 0)}</Slide>
    <Slide id="child-2">{getSlideContent('primary-light', 'black', 1)}</Slide>
    <Slide id="child-3">{getSlideContent('secondary-dark', 'white', 2)}</Slide>
  </Carousel>
);

export const WithHTMLChildren = () => (
  <Carousel id="carousel-manual" showDots slideIds={["#manual-1", "#manual-2", "#manual-3"]}>
    <section id="manual-1" className="usx-carousel__slide" tabIndex={0}>{getSlideContent('primary-dark', 'white', 0)}</section>
    <section id="manual-2" className="usx-carousel__slide" tabIndex={0}>{getSlideContent('primary-light', 'black', 1)}</section>
    <section id="manual-3" className="usx-carousel__slide" tabIndex={0}>{getSlideContent('secondary-dark', 'white', 2)}</section>
  </Carousel>
);