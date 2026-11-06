import React from 'react';
import MemorableDate from '../../../../usx-react/src/components/memorable-date/MemorableDate.tsx';
import config from '../../../../usx-react/src/components/memorable-date/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/MemorableDate',
  component: MemorableDate,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: config.default,
  WithValues: { id: 'memorable-date-values', month: '6', day: '20', year: '1990', defaultMonth: '5', defaultDay: '19', defaultYear: '1989' },
  Disabled: {
    id: 'memorable-date-disabled',
    disabled: true,
  },
  AriaDisabled: {
    id: 'memorable-date-aria-disabled',
    ariaDisabled: true,
  },
  Required: {
    id: 'memorable-date-required',
    required: true,
  },
  WithDefaultValues: {
    id: 'memorable-date-default-value',
    defaultMonth: '5',
    defaultDay: '22',
    defaultYear: '1990',
  },
  WithError: {
    id: 'memorable-date-error',
    defaultDay: '32',
    defaultYear: '1990',
    error: 'Enter a valid date of birth.',
  },
};

export const Default = { args: storyDefs.Default };
export const Disabled = { args: storyDefs.Disabled };
export const AriaDisabled = { args: storyDefs.AriaDisabled };
export const Required = { args: storyDefs.Required };
export const WithDefaultValues = { args: storyDefs.WithDefaultValues };
export const WithError = { args: storyDefs.WithError };

export const WithValues = {
  args: storyDefs.WithValues,
  render: (args) => <CurrentDate {...args} />,
};

function CurrentDate(args) {
  const [month, setMonth] = React.useState(args.month);
  const [day, setDay] = React.useState(args.day);
  const [year, setYear] = React.useState(args.year);
  return (
    <MemorableDate
      {...args}
      month={month}
      day={day}
      year={year}
      onMonthChange={(event) => setMonth(event.target.value)}
      onDayChange={(event) => setDay(event.target.value)}
      onYearChange={(event) => setYear(event.target.value)}
    />
  );
}
