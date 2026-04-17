import React from 'react';
import html from './tooltip.html?raw';

export default {
  title: 'HTML/Tooltip (CSS-only)',
  tags: ['autodocs'],
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: html
      }
    }
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: html }} />
}
