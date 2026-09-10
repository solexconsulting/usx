import React from 'react';
import html from '../../../../core/src/components/range-slider/range-slider.html?raw';
import range from '@uswds/uswds/js/usa-range';

export default {
  title: 'HTML/USWDS/RangeSlider',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        range.on();
        return () => range.off();
      }, []);

      return <Story />;
    }
  ]
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
