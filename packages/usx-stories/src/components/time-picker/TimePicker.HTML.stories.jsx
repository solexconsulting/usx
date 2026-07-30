import React from 'react';
import html from '../../../../core/src/components/time-picker/time-picker.html?raw';

export default {
  title: 'HTML/USWDS/TimePicker',
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
