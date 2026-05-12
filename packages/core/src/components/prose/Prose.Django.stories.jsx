import React from 'react';
import proseConfig from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Prose.React.stories.jsx';

export default {
  title: 'Django/Prose',
  tags: ['autodocs'],
  argTypes: buildArgTypes(proseConfig.props || {}),
};

const createStory = createDjangoStory('prose');
const allowedPropNames = new Set(Object.keys(proseConfig.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Default = createStory(toDjangoArgs(storyDefs.Default));
export const ProseWithDiv = createStory(toDjangoArgs(storyDefs.ProseWithDiv));
export const ProseWithArticle = createStory(toDjangoArgs(storyDefs.ProseWithArticle));
export const ProseWithSection = createStory(toDjangoArgs(storyDefs.ProseWithSection));
export const ProseWithMain = createStory(toDjangoArgs(storyDefs.ProseWithMain));
