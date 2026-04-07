import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Image',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'image', props: args })
      }
    }
  },
  render: djangoComponent('image')
});

const shortCaption = 'This is a caption describing the image above.';
const longCaption = 'This is a longer caption that provides more detailed information about the image above. It can span multiple lines and gives context to the visual content.';

const getArgs = (index) => ({
  src: `https://picsum.photos/600/400?random=${index}`,
  alt: `Example image ${index}`,
});

export const Default = createStory(getArgs(1));

export const Rounded = createStory({
  ...getArgs(2),
  rounded: true,
});

export const Circular = createStory({
  ...getArgs(3),
  circular: true,
});

export const WithCaption = createStory({
  ...getArgs(10),
  caption: shortCaption,
});

export const WithHiddenCaption = createStory({
  ...getArgs(11),
  caption: 'This caption is visually hidden but accessible to screen readers.',
  hideCaption: true,
});

export const Fit = createStory({
  ...getArgs(12),
  src: 'https://picsum.photos/400/300?random=12',
  fit: true,
  caption: shortCaption,
});

export const WithMaxWidth = createStory({
  ...getArgs(13),
  fit: true,
  maxWidth: '200px',
  caption: shortCaption,
});

export const WithMaxHeight = createStory({
  ...getArgs(14),
  fit: true,
  maxHeight: '150px',
  caption: shortCaption,
});

export const LongCaption = createStory({
  ...getArgs(15),
  caption: longCaption,
});
