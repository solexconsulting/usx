import React from 'react';
import html from '../../../../core/src/components/clickable/clickable.html?raw';

export default {
  title: 'HTML/USX/Clickable',
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
