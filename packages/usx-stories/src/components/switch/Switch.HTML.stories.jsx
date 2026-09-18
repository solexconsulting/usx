import React from 'react';
import html from '../../../../usx-react/src/components/switch/switch.html?raw';

export default {
  title: 'HTML/USX/Switch',
  tags: ['USX', 'autodocs'],
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
