import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './CalendarDate.React.stories.jsx';

export default {
  title: 'Django/CalendarDate',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('calendar-date');

export const Default = createStory(storyDefs.Default);
