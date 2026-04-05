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

export const Fit = {
  args: {
    ...getArgs(12),
    src: 'https://picsum.photos/400/300?random=12',
    fit: true,
    caption: shortCaption,
  }
};

export const WithMaxWidth = {
  args: {
    ...getArgs(13),
    fit: true,
    maxWidth: '200px',
    caption: shortCaption,
  },
};

export const WithMaxHeight = {
  args: {
    ...getArgs(14),
    fit: true,
    maxHeight: '150px',
    caption: shortCaption,
  },
};

export const LongCaption = {
  args: {
    ...getArgs(15),
    caption: longCaption,
  },
};
