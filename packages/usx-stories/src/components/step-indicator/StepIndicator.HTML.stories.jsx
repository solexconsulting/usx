import React from 'react';
import html from '../../../../core/src/components/step-indicator/step-indicator.html?raw';

export default {
  title: 'HTML/USWDS/StepIndicator',
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
