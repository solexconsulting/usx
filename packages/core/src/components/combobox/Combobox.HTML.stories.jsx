import React from 'react';
import html from './combobox.html?raw';
import combobox from "@uswds/uswds/js/usa-combo-box";

export default {
  title: 'HTML/Combobox',
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        combobox.init();
        return () => combobox.off();
      }, []);

      return <Story />;
    }
  ]
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
