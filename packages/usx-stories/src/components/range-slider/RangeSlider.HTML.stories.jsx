import React from 'react';
import html from '../../../../core/src/components/range-slider/range-slider.html?raw';

export default {
  title: 'HTML/USWDS/RangeSlider',
  tags: ['USWDS', 'autodocs'],
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
