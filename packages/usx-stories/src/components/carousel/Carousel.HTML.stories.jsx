import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/carousel/carousel.react-snapshot.html?raw';
import { componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USX/Carousel',
  tags: ['USX', 'autodocs'],
  decorators: [...componentInit('carousel')],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
};
