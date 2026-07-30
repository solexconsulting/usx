import React from 'react';
import html from '../../../../core/src/components/date-picker/date-picker.html?raw';

export default {
  title: 'HTML/USWDS/DatePicker',
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
