import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Page.React.stories.jsx';

export default {
  title: 'Django/Page',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('page');

export const Default = createStory(storyDefs.Default);
