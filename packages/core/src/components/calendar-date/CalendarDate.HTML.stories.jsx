import React from 'react';
import html from './calendar-date.html?raw';

export default {
  title: 'HTML/CalendarDate',
  tags: ['autodocs'],
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
