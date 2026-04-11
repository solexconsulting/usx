import React from 'react';
import CalendarDate from './CalendarDate';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

export const storyDefs = {
  Default: {
    datetime: '2020-09-30T12:00:00+01:00',
  },
};

export default {
  title: 'React/CalendarDate',
  component: CalendarDate,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
