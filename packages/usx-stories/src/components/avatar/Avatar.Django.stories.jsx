// import React from 'react';
import config from '../../../../core/src/components/avatar/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Avatar.React.stories.jsx';

export default {
  title: 'Django/USX/Avatar',
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory({ componentName: 'avatar' });
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
export const IconAvatarPerson = createStory(toDjangoArgs(storyDefs.IconAvatarPerson));
export const IconAvatarSupportAgent = createStory(toDjangoArgs(storyDefs.IconAvatarSupportAgent));
export const IconAvatarSentiment = createStory(toDjangoArgs(storyDefs.IconAvatarSentiment));
export const IconAvatarLarge = createStory(toDjangoArgs(storyDefs.IconAvatarLarge));
