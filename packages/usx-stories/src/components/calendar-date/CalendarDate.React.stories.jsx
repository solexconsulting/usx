
import CalendarDate from '../../../../core/src/components/calendar-date/CalendarDate.tsx';
import config from '../../../../core/src/components/calendar-date/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    datetime: '2020-09-30T12:00:00+01:00',
  },
};

export default {
  title: 'React/USWDS/CalendarDate',
  component: CalendarDate,
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
