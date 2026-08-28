import React from 'react';
import html from '../../../../core/src/components/language-selector/language-selector.html?raw';

export default {
  title: 'HTML/USWDS/LanguageSelector',
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
