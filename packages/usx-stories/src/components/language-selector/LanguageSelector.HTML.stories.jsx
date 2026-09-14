import React from 'react';
import html from '../../../../core/src/components/language-selector/language-selector.html?raw';
import Alert from '../../../../core/src/components/alert/Alert.jsx';
import languageSelector from '@uswds/uswds/js/usa-language-selector';

export default {
  title: 'HTML/USWDS/LanguageSelector',
  tags: ['USWDS', 'autodocs'],
  decorators: [
    (Story) => {
      // The usa-language__primary menu reuses accordion show/hide behavior;
      // initialize the real USWDS JS for the story, same as the HTML story.
      React.useEffect(() => {
        languageSelector.on();
        return () => languageSelector.off();
      }, []);

      return <Story />;
    }
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
