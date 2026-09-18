import React from 'react';
import html from '../../../../usx-react/src/components/radio-buttons/radio-buttons.html?raw';

export default {
  title: 'HTML/USWDS/RadioButtons',
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
