import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../../helper';
import { storyDefs } from './{{Name}}.React.stories.jsx';

export default {
  title: 'Django/{{Name}}',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('{{kebab}}');

export const Default = createStory(storyDefs.Default);
