import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './EnvBanner.React.stories.jsx';

export default {
  title: 'Django/EnvBanner',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('env-banner');

export const Default = createStory(storyDefs.Default);
