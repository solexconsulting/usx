import React from 'react';
import buttonHtml from '../components/button/button.html?raw';

export default {
  title: 'HTML/Button',
  tags: ['autodocs']
};

export const AllVariants = {
  parameters: {
    docs: {
      source: {
        code: buttonHtml
      }
    }
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: buttonHtml }} />;
  }
}
