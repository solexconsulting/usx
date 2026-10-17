import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/file-input/file-input.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/file-input/file-input.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`fileInput.init()`'),
      },
    },
  },
  decorators: [...componentInit('fileInput')],
};

export const AllVariantsReact = {
  name: 'All Variants (React)',
  tags: ['USX'],
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
  tags: ['USX'],
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
