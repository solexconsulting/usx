import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/switch/switch.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/switch/switch.django-snapshot.html?raw';

export default {
  title: 'HTML/USX/Switch',
  tags: ['USX', 'autodocs'],
  // Add indeterminate to checkbox on mount for demo purposes
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.querySelectorAll('[id$="indeterminate-switch"]').forEach((checkbox) => {
          checkbox.indeterminate = true;
        });
      }, []);
      return <Story />;
    },
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
