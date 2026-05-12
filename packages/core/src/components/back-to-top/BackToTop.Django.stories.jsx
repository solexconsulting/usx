import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './BackToTop.React.stories.jsx';

export default {
  title: 'Django/BackToTop',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('back-to-top');

export const Default = createStory(storyDefs.Default);
