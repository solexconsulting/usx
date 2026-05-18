import React from 'react';
import Avatar from './Avatar';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  BasicAvatar: {
    ...(config.default || {}),
  },
  CircleAvatar: {
    ...(config.default || {}),
    shape: 'circle',
  },
  MediumRoundedAvatar: {
    ...(config.default || {}),
    shape: 'rounded-md',
  },
  LargeRoundedAvatar: {
    ...(config.default || {}),
    shape: 'rounded-lg',
  },
  AvatarWithTooltip: {
    ...(config.default || {}),
    shape: 'rounded-lg',
    tooltip: 'Statue of Liberty',
  },
  InitialsAvatar: {
    href: '#',
    initials: 'AB',
    alt: 'Alex Brown',
    initialsClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarSmall: {
    href: '#',
    initials: 'GW',
    alt: 'George Washington',
    className: 'usx-avatar--size-sm',
    initialsClassName: 'bg-primary-lighter text-primary-darker',
  },
  ImageAvatarMedium: {
    ...(config.default || {}),
    className: 'usx-avatar--size-md',
  },
  ImageAvatarLarge: {
    ...(config.default || {}),
    className: 'usx-avatar--size-lg',
  },
  ImageAvatarExtraLarge: {
    ...(config.default || {}),
    className: 'usx-avatar--size-xl',
  },
  InitialsAvatarMedium: {
    href: '#',
    initials: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-md',
    initialsClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarLarge: {
    href: '#',
    initials: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-lg',
    initialsClassName: 'bg-primary-lighter text-primary-darker',
  },
  InitialsAvatarExtraLarge: {
    href: '#',
    initials: 'AB',
    alt: 'Alex Brown',
    className: 'usx-avatar--size-xl',
    initialsClassName: 'bg-primary-lighter text-primary-darker',
  },
};

export default {
  title: 'React/Avatar',
  component: Avatar,
  tags: ['autodocs'],
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
