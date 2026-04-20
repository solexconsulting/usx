import React from 'react';
import Image from './Image';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const shortCaption = 'This is a caption describing the image above.';
const longCaption = 'This is a longer caption that provides more detailed information about the image above. It can span multiple lines and gives context to the visual content.';

const getArgs = (index) => ({
  src: `https://picsum.photos/600/400?random=${index}`,
  alt: `Example image ${index}`,
});

export const storyDefs = {
  Default: getArgs(1),
  Rounded: { ...getArgs(2), rounded: true },
  Circular: { ...getArgs(3), circular: true },
  WithCaption: { ...getArgs(10), caption: shortCaption },
  WithHiddenCaption: { ...getArgs(11), caption: 'This caption is visually hidden but accessible to screen readers.', hideCaption: true },
  ObjectFitCover: { ...getArgs(12), src: 'https://picsum.photos/400/300?random=12', objectFit: 'cover', caption: shortCaption },
  ObjectFitContain: { ...getArgs(13), src: 'https://picsum.photos/200/500?random=13', objectFit: 'contain', caption: shortCaption },
  ObjectFitFill: { ...getArgs(14), src: 'https://picsum.photos/50/30?random=14', objectFit: 'fill', caption: shortCaption },
  ObjectFitNone: { ...getArgs(15), src: 'https://picsum.photos/400/300?random=15', objectFit: 'none', caption: shortCaption },
  ObjectFitScaleDown: { ...getArgs(16), src: 'https://picsum.photos/1300/500?random=16', objectFit: 'scale-down', caption: shortCaption },
  WithMaxWidth: { ...getArgs(17), objectFit: 'fill', maxWidth: '200px', caption: shortCaption },
  WithMaxHeight: { ...getArgs(18), objectFit: 'fill', maxHeight: '150px', caption: shortCaption },
  LongCaption: { ...getArgs(19), caption: longCaption },
  Responsive: {
    alt: 'SOLEX',
    src: {
      fallback: '/symbol-only.svg',
      sources: [
        { media: '(min-width: 64em)', srcSet: '/linear-w-symbol_left.svg' },
        { media: '(min-width: 40em)', srcSet: '/linear.svg' },
        { media: '(min-width: 20em)', srcSet: '/solex-only.svg' },
      ],
    },
  },
};

export default {
  title: 'React/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Rounded = { args: storyDefs.Rounded };
export const Circular = { args: storyDefs.Circular };
export const WithCaption = { args: storyDefs.WithCaption };
export const WithHiddenCaption = { args: storyDefs.WithHiddenCaption };
export const ObjectFitCover = { args: storyDefs.ObjectFitCover };
export const ObjectFitContain = { args: storyDefs.ObjectFitContain };
export const ObjectFitFill = { args: storyDefs.ObjectFitFill };
export const ObjectFitNone = { args: storyDefs.ObjectFitNone };
export const ObjectFitScaleDown = { args: storyDefs.ObjectFitScaleDown };
export const WithMaxWidth = { args: storyDefs.WithMaxWidth };
export const WithMaxHeight = { args: storyDefs.WithMaxHeight };
export const LongCaption = { args: storyDefs.LongCaption };
export const Responsive = { args: storyDefs.Responsive };

export const ShortAndWideContainerWithObjectFitContain = () => (
  <div style={{ width: '100%', height: '200px', border: '2px solid blue' }}>
    <Image
      src="https://picsum.photos/200/500?random=14"
      alt="Example of object-fit contain with a tall image"
      objectFit="contain"
      caption="This container is wider than the image, and the image is taller
      than the container. With 'contain', the image will scale to fit
      within the container while maintaining its aspect ratio, which
      may result in empty space on the sides or top/bottom of the image."
    />
  </div>
);

export const ShortAndWideContainerWithObjectFitFill = () => (
  <div style={{ width: '100%', height: '200px', border: '2px solid blue' }}>
    <Image
      src="https://picsum.photos/200/500?random=14"
      alt="Example of object-fit fill with a tall image"
      objectFit="fill"
      caption="This container is wider than the image, and the image is taller
      than the container. With 'fill', the image will stretch to fill
      the entire container, which may distort the aspect ratio of the
      image."
    />
  </div>
);

export const ShortAndWideContainerWithObjectFitCover = () => (
  <div style={{ width: '100%', height: '200px', border: '2px solid blue' }}>
    <Image
      src="https://picsum.photos/200/500?random=14"
      alt="Example of object-fit cover with a tall image"
      objectFit="cover"
      caption="This container is wider than the image, and the image is taller
      than the container. With 'cover', the image will scale to cover
      the entire container while maintaining its aspect ratio, which
      may result in some cropping of the image."
    />
  </div>
);
