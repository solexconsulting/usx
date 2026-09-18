import React from 'react';
import html from '../../../../usx-react/src/components/eyebrow/eyebrow.html?raw';

export default {
  title: 'HTML/USX/Eyebrow',
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
