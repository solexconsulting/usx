import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/header/header.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/header/header.django-snapshot.html?raw';

export default {
  title: 'HTML/USWDS/Header',
  tags: ['USWDS', 'autodocs'],
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
