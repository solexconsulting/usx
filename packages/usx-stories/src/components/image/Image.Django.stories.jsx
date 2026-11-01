import React from 'react';
import config from '../../../../usx-react/src/components/image/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Image.React.stories.jsx';

export default {
  title: 'Django/USX/Image',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'image' });

export const Default = createStory(storyDefs.Default);
export const Rounded = createStory(storyDefs.Rounded);
export const Circular = createStory(storyDefs.Circular);
export const WithCaption = createStory(storyDefs.WithCaption);
export const WithLinkedCaption = createStory(storyDefs.WithLinkedCaption);
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

const createContainedStory = createDjangoStory({
  componentName: 'image',
  wrapper: (payload, args, { mode }) => {
    const style = { width: '100%', height: '200px', border: '2px solid blue' };
    if (mode === 'source') return `<div style="width: 100%; height: 200px; border: 2px solid blue;">${payload}</div>`;
    return <div style={style} dangerouslySetInnerHTML={{ __html: payload }} />;
  },
});
const tallImage = { src: 'https://picsum.photos/200/500?random=14' };
export const ShortAndWideContainerWithObjectFitContain = createContainedStory({
  ...tallImage,
  alt: 'Example of object-fit contain with a tall image',
  objectFit: 'contain',
  caption: "This container is wider than the image, and the image is taller than the container. With 'contain', the image will scale to fit within the container while maintaining its aspect ratio, which may result in empty space on the sides or top/bottom of the image.",
});
export const ShortAndWideContainerWithObjectFitFill = createContainedStory({
  ...tallImage,
  alt: 'Example of object-fit fill with a tall image',
  objectFit: 'fill',
  caption: "This container is wider than the image, and the image is taller than the container. With 'fill', the image will stretch to fill the entire container, which may distort the aspect ratio of the image.",
});
export const ShortAndWideContainerWithObjectFitCover = createContainedStory({
  ...tallImage,
  alt: 'Example of object-fit cover with a tall image',
  objectFit: 'cover',
  caption: "This container is wider than the image, and the image is taller than the container. With 'cover', the image will scale to cover the entire container while maintaining its aspect ratio, which may result in some cropping of the image.",
});
