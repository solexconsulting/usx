import React from 'react';
import html from '../../../../usx-react/src/components/character-count/character-count.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/CharacterCount',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`characterCount.init()`')
      }
    }
  },
  decorators: [...componentInit('characterCount', {
    onReady: () => {
      // USWDS only computes a prefilled field's status after an input event.
      document.querySelectorAll('.usa-character-count__field')
        .forEach((field) => field.dispatchEvent(new Event('input', { bubbles: true })));
    },
  })]
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
