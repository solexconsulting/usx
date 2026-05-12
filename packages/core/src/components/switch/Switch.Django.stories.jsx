import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Switch.React.stories.jsx';

export default {
  title: 'Django/Switch',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('switch');

export const Default = createStory(storyDefs.Default);
