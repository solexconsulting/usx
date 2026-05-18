import React from 'react';
import html from './switch.html?raw';

export default {
  title: 'HTML/Switch',
  tags: ['autodocs'],
  // Add indeterminate to checkbox on mount for demo purposes
  decorators: [
    (Story) => {
      React.useEffect(() => {
        const checkbox = document.getElementById('indeterminate-switch');
        if (checkbox) {
          checkbox.indeterminate = true;
        }
      }, []);
      return <Story />;
    },
  ],
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
