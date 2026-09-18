import React from 'react';
import html from '../../../../usx-react/src/components/character-count/character-count.html?raw';
import characterCount from "@uswds/uswds/js/usa-character-count";
import { uswdsInitNote } from '../../utils/storyHelpers.jsx';

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
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        characterCount.init();
        // USWDS's init() doesn't compute the initial status message/invalid
        // state for a field that already has a value — it only reacts to
        // `input` events, so nudge it once here (see DefaultValueOverLimit).
        document
          .querySelectorAll('.usa-character-count__field')
          .forEach((field) => field.dispatchEvent(new Event('input', { bubbles: true })));
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
