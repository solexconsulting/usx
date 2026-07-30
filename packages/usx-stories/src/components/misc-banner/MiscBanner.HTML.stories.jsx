import React from 'react';
import html from '../../../../core/src/components/misc-banner/misc-banner.html?raw';

export default {
  title: 'HTML/USX/MiscBanner',
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
