import React from 'react';
import alertConfig from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Alert.React.stories.jsx';

export default {
  title: 'Django/Alert',
  tags: ['autodocs'],
  argTypes: buildArgTypes(alertConfig.props || {}),
};

const createStory = createDjangoStory({ componentName: 'alert' });
const allowedPropNames = new Set(Object.keys(alertConfig.props || {}));
const toDjangoArgs = (args) => Object.fromEntries(
  Object.entries(args).filter(([key]) => allowedPropNames.has(key))
);

export const Info = createStory(toDjangoArgs(storyDefs.Info));
export const Warning = createStory(toDjangoArgs(storyDefs.Warning));
export const Success = createStory(toDjangoArgs(storyDefs.Success));
export const Error = createStory(toDjangoArgs(storyDefs.Error));
export const Emergency = createStory(toDjangoArgs(storyDefs.Emergency));
export const RegionRoleDefault = { name: 'Default: region', ...createStory(toDjangoArgs(storyDefs.RegionRoleDefault)) };
export const StatusRoleDefault = { name: 'Default: status', ...createStory(toDjangoArgs(storyDefs.StatusRoleDefault)) };
export const AlertRoleDefault = { name: 'Default: alert', ...createStory(toDjangoArgs(storyDefs.AlertRoleDefault)) };
export const RegionWithAriaLabel = { name: 'Region with aria-label', ...createStory(toDjangoArgs(storyDefs.RegionWithAriaLabel)) };
export const ExplicitRoleOverride = { name: 'Role override', ...createStory(toDjangoArgs(storyDefs.ExplicitRoleOverride)) };