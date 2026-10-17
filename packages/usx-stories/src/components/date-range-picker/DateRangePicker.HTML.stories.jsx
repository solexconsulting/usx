import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/date-range-picker/date-range-picker.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/date-range-picker/date-range-picker.django-snapshot.html?raw';
import { uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

export default {
  title: 'HTML/USWDS/DateRangePicker',
  tags: ['USWDS', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`datePicker.init()` and `dateRangePicker.init()`'),
      },
    },
  },
  decorators: [...componentInit('datePicker', 'dateRangePicker')],
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
