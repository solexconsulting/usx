import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './Clickable.React.stories.jsx';

export default {
  title: 'Django/Clickable',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('clickable');

export const Default = createStory(storyDefs.Default);
