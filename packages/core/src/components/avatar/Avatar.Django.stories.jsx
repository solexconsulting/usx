import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './Avatar.React.stories.jsx';

export default {
  title: 'Django/Avatar',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('avatar');

export const Default = createStory(storyDefs.Default);
