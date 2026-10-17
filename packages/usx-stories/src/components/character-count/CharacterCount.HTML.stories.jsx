import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/character-count/character-count.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/character-count/character-count.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/CharacterCount',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`characterCount.init()`'),
      },
    },
  },
  decorators: [
    ...componentInit('characterCount', {
      onReady: () => {
        // USWDS only computes a prefilled field's status after an input event.
        document
          .querySelectorAll('.usa-character-count__field')
          .forEach((field) => field.dispatchEvent(new Event('input', { bubbles: true })));
      },
    }),
  ],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: {
        code: reactSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />;
  },
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: {
        code: djangoSnapshot,
      },
    },
  },
  render: () => {
    return <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />;
  },
};
