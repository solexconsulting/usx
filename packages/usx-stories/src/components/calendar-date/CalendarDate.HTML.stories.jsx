import React from 'react';
import html from '../../../../core/src/components/calendar-date/calendar-date.html?raw';

export default {
  title: 'HTML/USWDS/CalendarDate',
  tags: ['USWDS', 'autodocs'],
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
