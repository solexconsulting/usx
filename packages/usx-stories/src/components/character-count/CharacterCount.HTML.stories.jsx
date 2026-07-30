import React from 'react';
import html from '../../../../core/src/components/character-count/character-count.html?raw';
import characterCount from "@uswds/uswds/js/usa-character-count";


export default {
  title: 'HTML/USWDS/CharacterCount',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        characterCount.on();
        return () => {
          characterCount.off();
        };
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
