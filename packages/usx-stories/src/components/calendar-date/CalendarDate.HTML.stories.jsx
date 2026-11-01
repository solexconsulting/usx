import React from 'react';
import reactSnapshot from '../../../../usx-react/src/components/calendar-date/calendar-date.react-snapshot.html?raw';
import djangoSnapshot from '../../../../usx-react/src/components/calendar-date/calendar-date.django-snapshot.html?raw';
import { expect } from 'storybook/test';
import { storyDefs } from './CalendarDate.React.stories.jsx';
import { createAllVariantsPlay, sectionTitle } from '../../utils/playHelpers.js';

export default {
  title: 'HTML/USWDS/CalendarDate',
  tags: ['USWDS', 'autodocs'],
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// The month and day show the date as written in `datetime`, whatever the viewer's time zone.
const checkDate = (def) => async (calendar) => {
  const [, , month, day] = def.datetime.match(/^(\d{4})-(\d{2})-(\d{2})/);
  await expect(calendar).toHaveClass('usx-calendar-date');
  await expect(calendar.querySelector('time')).toHaveAttribute('datetime', def.datetime);
  await expect(calendar.querySelector('.usx-calendar-date-month')).toHaveTextContent(
    MONTHS[Number(month) - 1]
  );
  await expect(calendar.querySelector('.usx-calendar-date-day')).toHaveTextContent(
    String(Number(day))
  );
};

const play = createAllVariantsPlay(
  Object.fromEntries(
    Object.entries(storyDefs).map(([key, def]) => [sectionTitle(key), checkDate(def)])
  )
);

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
  play,
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
  play,
};
