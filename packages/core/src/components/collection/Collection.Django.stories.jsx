import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Collection.React.stories.jsx';

export default {
  title: 'Django/Collection',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'collection' });

export const Default = createStory(storyDefs.Default);
export const WithThumbnail = createStory(storyDefs.WithThumbnail);
export const Calendar = createStory(storyDefs.Calendar);
export const Condensed = createStory(storyDefs.Condensed);
