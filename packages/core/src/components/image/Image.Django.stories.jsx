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

export const ObjectFitCover = createStory({
  ...getArgs(12),
  src: 'https://picsum.photos/400/300?random=12',
  objectFit: 'cover',
  caption: shortCaption,
});

export const ObjectFitContain = createStory({
  ...getArgs(13),
  src: 'https://picsum.photos/200/500?random=13',
  objectFit: 'contain',
  caption: shortCaption,
});

export const ObjectFitFill = createStory({
  ...getArgs(14),
  src: 'https://picsum.photos/50/30?random=14',
  objectFit: 'fill',
  caption: shortCaption,
});

export const ObjectFitNone = createStory({
  ...getArgs(15),
  src: 'https://picsum.photos/400/300?random=15',
  objectFit: 'none',
  caption: shortCaption,
});

export const ObjectFitScaleDown = createStory({
  ...getArgs(16),
  src: 'https://picsum.photos/1300/500?random=16',
  objectFit: 'scale-down',
  caption: shortCaption,
});

export const WithMaxWidth = createStory({
  ...getArgs(17),
  objectFit: 'fill',
  maxWidth: '200px',
  caption: shortCaption,
});

export const WithMaxHeight = createStory({
  ...getArgs(18),
  objectFit: 'fill',
  maxHeight: '150px',
  caption: shortCaption,
});

export const LongCaption = createStory({
  ...getArgs(19),
  caption: longCaption,
});
