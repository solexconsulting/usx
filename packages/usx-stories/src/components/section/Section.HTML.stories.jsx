import React from 'react';
import html from '../../../../core/src/components/section/section.html?raw';

export default {
  title: 'HTML/USX/Section',
  tags: ['USX', 'autodocs'],
};

export const Default = {
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
