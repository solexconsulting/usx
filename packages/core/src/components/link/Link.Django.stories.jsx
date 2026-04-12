import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './Link.React.stories.jsx';

export default {
  title: 'Django/Link',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('link');

export const Default = createStory(storyDefs.Default);
