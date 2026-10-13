import React from 'react';
import html from '../../../../usx-react/src/components/carousel/carousel.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USX/Carousel',
  tags: ['USX', 'autodocs'],
  decorators: [...componentInit('carousel')],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
