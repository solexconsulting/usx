import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Footer.React.stories.jsx';

export default {
  title: 'Django/Footer',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'footer' });

export const Big      = createStory(storyDefs.Big);
export const Medium   = createStory(storyDefs.Medium);
export const Slim     = createStory(storyDefs.Slim);
export const LogoOnly = createStory(storyDefs.LogoOnly);
export const NoNav    = createStory(storyDefs.NoNav);
export const Minimal  = createStory(storyDefs.Minimal);

