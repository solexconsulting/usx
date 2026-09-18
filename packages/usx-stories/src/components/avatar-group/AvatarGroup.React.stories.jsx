// import React from 'react';
import AvatarGroup from '../../../../usx-react/src/components/avatar-group/AvatarGroup.tsx';
import config from '../../../../usx-react/src/components/avatar-group/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const baseAvatars = (config.default && config.default.avatarProps) || [];
const roundedAvatars = baseAvatars.map((avatar) => ({ ...avatar, shape: 'rounded-md' }));
const circleAvatars = baseAvatars.map((avatar) => ({ ...avatar, shape: 'circle' }));
const tooltipAvatars = circleAvatars.map((avatar) => ({ ...avatar, tooltip: avatar.alt }));

export const storyDefs = {
  BasicAvatarGroup: {
    avatarProps: baseAvatars,
  },
  RoundedAvatarGroup: {
    avatarProps: roundedAvatars,
  },
  CircleAvatarGroup: {
    avatarProps: circleAvatars,
  },
  OverlappingAvatars: {
    avatarProps: circleAvatars,
    overlap: true,
  },
  StackedAvatars: {
    avatarProps: circleAvatars,
    stacked: true,
  },
  OverlappingStackedAvatars: {
    avatarProps: circleAvatars,
    overlap: true,
    stacked: true,
  },
  OverlappingRoundedAvatars: {
    avatarProps: roundedAvatars,
    overlap: true,
  },
  AvatarGroupWithTooltips: {
    avatarProps: tooltipAvatars,
    overlap: true,
  },
};

export default {
  title: 'React/USX/AvatarGroup',
  component: AvatarGroup,
  tags: ['USX', 'autodocs'],
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
