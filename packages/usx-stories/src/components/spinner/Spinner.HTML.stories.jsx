import React from 'react';
import html from '../../../../core/src/components/spinner/spinner.html?raw';

export default {
  title: 'HTML/USX/Spinner',
  tags: ['USX', 'autodocs'],
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
