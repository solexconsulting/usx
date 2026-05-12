import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './AvatarGroup.React.stories.jsx';

export default {
  title: 'Django/AvatarGroup',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('avatar-group');
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const BasicAvatarGroup = createStory(toDjangoArgs(storyDefs.BasicAvatarGroup));
export const RoundedAvatarGroup = createStory(toDjangoArgs(storyDefs.RoundedAvatarGroup));
export const CircleAvatarGroup = createStory(toDjangoArgs(storyDefs.CircleAvatarGroup));
export const OverlappingAvatars = createStory(toDjangoArgs(storyDefs.OverlappingAvatars));
export const StackedAvatars = createStory(toDjangoArgs(storyDefs.StackedAvatars));
export const OverlappingStackedAvatars = createStory(toDjangoArgs(storyDefs.OverlappingStackedAvatars));
export const OverlappingRoundedAvatars = createStory(toDjangoArgs(storyDefs.OverlappingRoundedAvatars));
export const AvatarGroupWithTooltips = createStory(toDjangoArgs(storyDefs.AvatarGroupWithTooltips));
