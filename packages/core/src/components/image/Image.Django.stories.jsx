import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './Image.React.stories.jsx';

export default {
  title: 'Django/Image',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('image');

// Responsive story is excluded — object-shaped src is not supported by the Django render endpoint
export const Default = createStory(storyDefs.Default);
export const Rounded = createStory(storyDefs.Rounded);
export const Circular = createStory(storyDefs.Circular);
export const WithCaption = createStory(storyDefs.WithCaption);
export const WithHiddenCaption = createStory(storyDefs.WithHiddenCaption);
export const ObjectFitCover = createStory(storyDefs.ObjectFitCover);
export const ObjectFitContain = createStory(storyDefs.ObjectFitContain);
export const ObjectFitFill = createStory(storyDefs.ObjectFitFill);
export const ObjectFitNone = createStory(storyDefs.ObjectFitNone);
export const ObjectFitScaleDown = createStory(storyDefs.ObjectFitScaleDown);
export const WithMaxWidth = createStory(storyDefs.WithMaxWidth);
export const WithMaxHeight = createStory(storyDefs.WithMaxHeight);
export const LongCaption = createStory(storyDefs.LongCaption);
export const Responsive = createStory(storyDefs.Responsive);
