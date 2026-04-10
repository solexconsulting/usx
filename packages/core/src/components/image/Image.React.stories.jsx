import React from 'react';
import Image from './Image';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const shortCaption = 'This is a caption describing the image above.';
const longCaption = 'This is a longer caption that provides more detailed information about the image above. It can span multiple lines and gives context to the visual content.';

const getArgs = (index) => ({
  src: `https://picsum.photos/600/400?random=${index}`,
  alt: `Example image ${index}`,
});

export const Default = {
  args: getArgs(1)
};

export const Rounded = {
  args: {
    ...getArgs(2),
    rounded: true,
  },
};

export const Circular = {
  args: {
    ...getArgs(3),
    circular: true,
  },
};

export const WithCaption = {
  args: {
    ...getArgs(10),
    caption: 'This is a caption describing the image above.',
  },
};

export const WithHiddenCaption = {
  args: {
    ...getArgs(11),
    caption: 'This caption is visually hidden but accessible to screen readers.',
    hideCaption: true,
  },
};

export const ObjectFitCover = {
  args: {
    ...getArgs(12),
    src: 'https://picsum.photos/400/300?random=12',
    objectFit: 'cover',
    caption: shortCaption,
  }
};

export const ObjectFitContain = {
  args: {
    ...getArgs(13),
    src: 'https://picsum.photos/200/500?random=13',
    objectFit: 'contain',
    caption: shortCaption,
  },
};

export const ObjectFitFill = {
  args: {
    ...getArgs(14),
    src: 'https://picsum.photos/50/30?random=14',
    objectFit: 'fill',
    caption: shortCaption,
  },
};

export const ObjectFitNone = {
  args: {
    ...getArgs(15),
    src: 'https://picsum.photos/400/300?random=15',
    objectFit: 'none',
    caption: shortCaption,
  },
};

export const ObjectFitScaleDown = {
  args: {
    ...getArgs(16),
    src: 'https://picsum.photos/1300/500?random=16',
    objectFit: 'scale-down',
    caption: shortCaption,
  },
};

export const WithMaxWidth = {
  args: {
    ...getArgs(17),
    objectFit: 'fill',
    maxWidth: '200px',
    caption: shortCaption,
  },
};

export const WithMaxHeight = {
  args: {
    ...getArgs(18),
    objectFit: 'fill',
    maxHeight: '150px',
    caption: shortCaption,
  },
};

export const LongCaption = {
  args: {
    ...getArgs(19),
    caption: longCaption,
  },
};

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
