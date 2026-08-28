
import config from '../../../../core/src/components/calendar-date/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './CalendarDate.React.stories.jsx';

export default {
  title: 'Django/USWDS/CalendarDate',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'calendar-date' });

export const Default = createStory(storyDefs.Default);
