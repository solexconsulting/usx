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
