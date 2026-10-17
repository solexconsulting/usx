import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/callout/callout.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/callout/callout.django-snapshot.html?raw';

export default {
  title: 'HTML/USX/Callout',
  tags: ['USX', 'autodocs'],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  parameters: {
    docs: {
      source: { code: reactSnapshot },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: reactSnapshot }} />,
};

export const AllVariantsDjango = {
  name: 'All Variants (Django)',
  parameters: {
    docs: {
      source: { code: djangoSnapshot },
    },
  },
  render: () => <div dangerouslySetInnerHTML={{ __html: djangoSnapshot }} />,
};
