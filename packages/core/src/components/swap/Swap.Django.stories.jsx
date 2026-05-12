import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Swap.React.stories.jsx';

export default {
  title: 'Django/Swap',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('swap');

export const Default = createStory(storyDefs.Default);
