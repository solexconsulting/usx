// import React from 'react';
import AvatarGroup from './AvatarGroup';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const baseAvatars = (config.default && config.default.avatars) || [];
const roundedAvatars = baseAvatars.map((avatar) => ({ ...avatar, shape: 'rounded-md' }));
const circleAvatars = baseAvatars.map((avatar) => ({ ...avatar, shape: 'circle' }));
const tooltipAvatars = circleAvatars.map((avatar) => ({ ...avatar, tooltip: avatar.alt }));

export const storyDefs = {
  BasicAvatarGroup: {
    avatars: baseAvatars,
  },
  RoundedAvatarGroup: {
    avatars: roundedAvatars,
  },
  CircleAvatarGroup: {
    avatars: circleAvatars,
  },
  OverlappingAvatars: {
    avatars: circleAvatars,
    overlap: true,
  },
  StackedAvatars: {
    avatars: circleAvatars,
    stacked: true,
  },
  OverlappingStackedAvatars: {
    avatars: circleAvatars,
    overlap: true,
    stacked: true,
  },
  OverlappingRoundedAvatars: {
    avatars: roundedAvatars,
    overlap: true,
  },
  AvatarGroupWithTooltips: {
    avatars: tooltipAvatars,
    overlap: true,
  },
};

export default {
  title: 'React/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const BasicAvatarGroup = { args: storyDefs.BasicAvatarGroup };
export const RoundedAvatarGroup = { args: storyDefs.RoundedAvatarGroup };
export const CircleAvatarGroup = { args: storyDefs.CircleAvatarGroup };
export const OverlappingAvatars = { args: storyDefs.OverlappingAvatars };
export const StackedAvatars = { args: storyDefs.StackedAvatars };
export const OverlappingStackedAvatars = { args: storyDefs.OverlappingStackedAvatars };
export const OverlappingRoundedAvatars = { args: storyDefs.OverlappingRoundedAvatars };
export const AvatarGroupWithTooltips = { args: storyDefs.AvatarGroupWithTooltips };
