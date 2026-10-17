import React from 'react';
import config from '../../../../usx-react/src/components/carousel/config.json';
import { buildArgTypes, createDjangoStory, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Carousel.React.stories.jsx';

export default {
  title: 'Django/USX/Carousel',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [...componentInit('carousel')],
};

const createStory = createDjangoStory({ componentName: 'carousel' });

export const Default = createStory(storyDefs.Default);
export const Unenhanced = createStory(storyDefs.Unenhanced);
export const WithoutDots = createStory(storyDefs.WithoutDots);
export const HiddenStatus = createStory(storyDefs.HiddenStatus);
export const CustomId = createStory(storyDefs.CustomId);
export const WithImages = createStory(storyDefs.WithImages);
export const CardCarousel = createStory(storyDefs.CardCarousel);
export const ManyCards = createStory(storyDefs.ManyCards);
export const NestedCarousels = createStory(storyDefs.NestedCarousels);
export const WithSlideChildren = createStory(storyDefs.WithSlideChildren);
export const SingleSlide = createStory(storyDefs.SingleSlide);
export const Empty = createStory(storyDefs.Empty);
