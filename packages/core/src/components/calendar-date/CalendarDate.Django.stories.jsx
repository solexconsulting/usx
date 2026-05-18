import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './CalendarDate.React.stories.jsx';

export default {
  title: 'Django/CalendarDate',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'calendar-date' });

export const Default = createStory(storyDefs.Default);
