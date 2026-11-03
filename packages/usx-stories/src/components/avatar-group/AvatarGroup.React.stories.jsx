// import React from 'react';
import AvatarGroup from '../../../../usx-react/src/components/avatar-group/AvatarGroup.tsx';
import config from '../../../../usx-react/src/components/avatar-group/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const baseAvatars = (config.default && config.default.avatarProps) || [];
const roundedAvatars = baseAvatars.map((avatar) => ({ ...avatar, shape: 'rounded-md' }));
const circleAvatars = baseAvatars.map((avatar) => ({ ...avatar, shape: 'circle' }));
const tooltipAvatars = circleAvatars.map((avatar) => ({ ...avatar, tooltipProps: { label: avatar.alt, position: 'right' } }));

export const storyDefs = {
  Default: config.default,
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
  WithTooltips: {
    avatarProps: tooltipAvatars,
    overlap: true,
  },
  StackedWithTooltips: {
    avatarProps: tooltipAvatars,
    stacked: true,
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

export const Default = { args: storyDefs.Default };
export const RoundedAvatarGroup = { args: storyDefs.RoundedAvatarGroup };
export const CircleAvatarGroup = { args: storyDefs.CircleAvatarGroup };
export const OverlappingAvatars = { args: storyDefs.OverlappingAvatars };
export const StackedAvatars = { args: storyDefs.StackedAvatars };
export const OverlappingStackedAvatars = { args: storyDefs.OverlappingStackedAvatars };
export const OverlappingRoundedAvatars = { args: storyDefs.OverlappingRoundedAvatars };
export const WithTooltips = { args: storyDefs.WithTooltips };
export const StackedWithTooltips = { args: storyDefs.StackedWithTooltips };
