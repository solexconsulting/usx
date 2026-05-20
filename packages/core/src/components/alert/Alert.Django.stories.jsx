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

export const Default = createStory(storyDefs.Default);
export const Warning = createStory(storyDefs.Warning);
export const Success = createStory(storyDefs.Success);
export const Error = createStory(storyDefs.Error);
export const Emergency = createStory(storyDefs.Emergency);
export const EmergencyList = createStory(storyDefs.EmergencyList);
export const NoHeading = createStory(storyDefs.NoHeading);
export const NoText = createStory(storyDefs.NoText);
export const Slim = createStory(storyDefs.Slim);
export const NoIcon = createStory(storyDefs.NoIcon);
export const RegionRoleDefault = { name: 'Default: region', ...createStory(toDjangoArgs(storyDefs.RegionRoleDefault)) };
export const StatusRoleDefault = { name: 'Default: status', ...createStory(toDjangoArgs(storyDefs.StatusRoleDefault)) };
export const AlertRoleDefault = { name: 'Default: alert', ...createStory(toDjangoArgs(storyDefs.AlertRoleDefault)) };
export const RegionWithAriaLabel = { name: 'Region with aria-label', ...createStory(toDjangoArgs(storyDefs.RegionWithAriaLabel)) };
export const ExplicitRoleOverride = { name: 'Role override', ...createStory(toDjangoArgs(storyDefs.ExplicitRoleOverride)) };
export const Dismissible = { name: 'Dismissible', ...createStory({
  ...toDjangoArgs(storyDefs.Dismissible),
  onDismiss: "this.closest('.usa-alert').remove();"
}) };