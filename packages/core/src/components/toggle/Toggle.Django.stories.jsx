import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './Toggle.React.stories.jsx';

export default {
  title: 'Django/Toggle',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('toggle');

export const Default = createStory(storyDefs.Default);
