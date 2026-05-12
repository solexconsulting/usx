import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Eyebrow.React.stories.jsx';

export default {
  title: 'Django/Eyebrow',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('eyebrow');

export const Default = createStory(storyDefs.Default);
