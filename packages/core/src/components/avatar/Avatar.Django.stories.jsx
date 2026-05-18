import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Avatar.React.stories.jsx';

export default {
  title: 'Django/Avatar',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('avatar');
const allowedPropNames = new Set(Object.keys(config.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const BasicAvatar = createStory(toDjangoArgs(storyDefs.BasicAvatar));
export const CircleAvatar = createStory(toDjangoArgs(storyDefs.CircleAvatar));
export const MediumRoundedAvatar = createStory(toDjangoArgs(storyDefs.MediumRoundedAvatar));
export const LargeRoundedAvatar = createStory(toDjangoArgs(storyDefs.LargeRoundedAvatar));
export const AvatarWithTooltip = createStory(toDjangoArgs(storyDefs.AvatarWithTooltip));
export const InitialsAvatar = createStory(toDjangoArgs(storyDefs.InitialsAvatar));
export const InitialsAvatarSmall = createStory(toDjangoArgs(storyDefs.InitialsAvatarSmall));
export const ImageAvatarMedium = createStory(toDjangoArgs(storyDefs.ImageAvatarMedium));
export const ImageAvatarLarge = createStory(toDjangoArgs(storyDefs.ImageAvatarLarge));
export const ImageAvatarExtraLarge = createStory(toDjangoArgs(storyDefs.ImageAvatarExtraLarge));
export const InitialsAvatarMedium = createStory(toDjangoArgs(storyDefs.InitialsAvatarMedium));
export const InitialsAvatarLarge = createStory(toDjangoArgs(storyDefs.InitialsAvatarLarge));
export const InitialsAvatarExtraLarge = createStory(toDjangoArgs(storyDefs.InitialsAvatarExtraLarge));
