import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Carousel',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'carousel', props: args })
      }
    }
  },
  render: djangoComponent('carousel')
});
const getSlideHtml = (bgColor, textColor, index) =>
  `<div class="width-full height-card bg-${bgColor} text-${textColor} padding-8">Slide ${index + 1}</div>`;

const baseArgs = {
  id: 'carousel-1',
  slides: [
    { content: getSlideHtml('primary-dark', 'white', 0) },
    { content: getSlideHtml('primary-light', 'black', 1) },
    { content: getSlideHtml('secondary-dark', 'white', 2) }
  ]
};

const imageSlides = [
  { content: '<img src="https://picsum.photos/400/300?random=1" alt="Random image 1" />' },
  { content: '<img src="https://picsum.photos/400/300?random=2" alt="Random image 2" />' },
  { content: '<img src="https://picsum.photos/400/300?random=3" alt="Random image 3" />' }
];

export const Default = createStory(baseArgs);

export const WithoutDots = createStory({ ...baseArgs, showDots: false });

export const CustomId = createStory({ ...baseArgs, id: 'custom-carousel' });

export const WithImages = createStory({
  ...baseArgs,
  id: 'carousel-with-images',
  slides: [
    { content: '<div class="usx-image usx-object-fit-cover"><img src="https://picsum.photos/400/300?random=1" alt="Random image 1" /></div>' },
    { content: '<div class="usx-image usx-object-fit-cover"><img src="https://picsum.photos/400/300?random=2" alt="Random image 2" /></div>' },
    { content: '<div class="usx-image usx-object-fit-cover"><img src="https://picsum.photos/400/300?random=3" alt="Random image 3" /></div>' }
  ]
});

export const WithSlideChildren = createStory({ ...baseArgs, id: 'carousel-children' });

export const WithHTMLChildren = createStory({
  ...baseArgs,
  id: 'carousel-manual',
  slides: [
    { content: '<section id="manual-1" class="usx-carousel__slide" tabindex="0">' + getSlideHtml('primary-dark', 'white', 0) + '</section>' },
    { content: '<section id="manual-2" class="usx-carousel__slide" tabindex="0">' + getSlideHtml('primary-light', 'black', 1) + '</section>' },
    { content: '<section id="manual-3" class="usx-carousel__slide" tabindex="0">' + getSlideHtml('secondary-dark', 'white', 2) + '</section>' }
  ]
});
