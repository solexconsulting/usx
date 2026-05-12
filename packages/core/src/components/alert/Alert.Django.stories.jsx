import React from 'react';
import alertConfig from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Alert.React.stories.jsx';

export default {
  title: 'Django/Alert',
  tags: ['autodocs'],
  argTypes: buildArgTypes(alertConfig.props || {}),
};

const createStory = createDjangoStory('alert');
const allowedPropNames = new Set(Object.keys(alertConfig.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Info = createStory(toDjangoArgs(storyDefs.Info));
export const Warning = createStory(toDjangoArgs(storyDefs.Warning));
export const Success = createStory(toDjangoArgs(storyDefs.Success));
export const Error = createStory(toDjangoArgs(storyDefs.Error));
export const Emergency = createStory(toDjangoArgs(storyDefs.Emergency));