// import React from 'react';
import Avatar from '../../../../core/src/components/avatar/Avatar.tsx';
import config from '../../../../core/src/components/avatar/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const baseArgs = {
  href: "https://google.com/search?q=Statue+of+Liberty",
  src: "./lady_liberty.png",
  alt: "Statue of Liberty"
};

export const storyDefs = {
  BasicAvatar: {
    ...baseArgs,
  },
  CircleAvatar: {
    ...baseArgs,
    shape: 'circle',
  },
  MediumRoundedAvatar: {
    ...baseArgs,
    shape: 'rounded-md',
  },
  LargeRoundedAvatar: {
    ...baseArgs,
    shape: 'rounded-lg',
  },
  AvatarWithTooltip: {
    ...baseArgs,
    shape: 'rounded-lg',
    tooltip: 'Statue of Liberty',
  },
  InitialsAvatar: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarSmall: {
    href: '#',
    variant: 'initials',
    value: 'GW',
    alt: 'George Washington',
    className: 'usx-avatar--size-sm',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  ImageAvatarMedium: {
    ...baseArgs,
    className: 'usx-avatar--size-md',
  },
  ImageAvatarLarge: {
    ...baseArgs,
    className: 'usx-avatar--size-lg',
  },
  ImageAvatarExtraLarge: {
    ...baseArgs,
    className: 'usx-avatar--size-xl',
  },
  InitialsAvatarMedium: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-md',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarLarge: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-lg',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarExtraLarge: {
    href: '#',
    variant: 'initials',
    value: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-xl',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  IconAvatarPerson: {
    href: '#',
    variant: 'icon',
    value: 'person',
    alt: 'Person',
    contentClassName: 'bg-primary-lighter text-base-darkest',
  },
  IconAvatarSupportAgent: {
    href: '#',
    variant: 'icon',
    value: 'support_agent',
    alt: 'Support Agent',
    contentClassName: 'bg-primary-lighter text-primary-darker',
  },
  IconAvatarSentiment: {
    href: '#',
    variant: 'icon',
    value: 'sentiment_satisfied_alt',
    alt: 'Happy',
    contentClassName: 'bg-primary-lighter text-success-darker',
  },
  IconAvatarLarge: {
    href: '#',
    variant: 'icon',
    value: 'person',
    alt: 'Person',
    className: 'usx-avatar--size-lg',
    contentClassName: 'bg-primary-lighter text-base-darkest',
  },
};

export default {
  title: 'React/USX/Avatar',
  component: Avatar,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const BasicAvatar = { args: storyDefs.BasicAvatar };
export const CircleAvatar = { args: storyDefs.CircleAvatar };
export const MediumRoundedAvatar = { args: storyDefs.MediumRoundedAvatar };
export const LargeRoundedAvatar = { args: storyDefs.LargeRoundedAvatar };
export const AvatarWithTooltip = { args: storyDefs.AvatarWithTooltip };
export const InitialsAvatar = { args: storyDefs.InitialsAvatar };
export const InitialsAvatarSmall = { args: storyDefs.InitialsAvatarSmall };
export const ImageAvatarMedium = { args: storyDefs.ImageAvatarMedium };
export const ImageAvatarLarge = { args: storyDefs.ImageAvatarLarge };
export const ImageAvatarExtraLarge = { args: storyDefs.ImageAvatarExtraLarge };
export const InitialsAvatarMedium = { args: storyDefs.InitialsAvatarMedium };
export const InitialsAvatarLarge = { args: storyDefs.InitialsAvatarLarge };
export const InitialsAvatarExtraLarge = { args: storyDefs.InitialsAvatarExtraLarge };
export const IconAvatarPerson = { args: storyDefs.IconAvatarPerson };
export const IconAvatarSupportAgent = { args: storyDefs.IconAvatarSupportAgent };
export const IconAvatarSentiment = { args: storyDefs.IconAvatarSentiment };
export const IconAvatarLarge = { args: storyDefs.IconAvatarLarge };
