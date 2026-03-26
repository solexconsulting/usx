import React from 'react';
import html from './step-indicator.html?raw';

export default {
  title: 'HTML/StepIndicator',
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
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}
