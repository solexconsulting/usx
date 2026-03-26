import React from 'react';
import html from './range-slider.html?raw';

export default {
  title: 'HTML/RangeSlider',
  tags: ['autodocs'],
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
