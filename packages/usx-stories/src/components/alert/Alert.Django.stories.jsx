// import React from 'react';
import alertConfig from '../../../../core/src/components/alert/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Alert.React.stories.jsx';

export default {
  title: 'Django/USWDS/Alert',
  tags: ['USWDS', 'autodocs'],
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
Emergency.tags = ['USX'];
export const EmergencyList = createStory(storyDefs.EmergencyList);
EmergencyList.tags = ['USX'];
export const NoHeading = createStory(storyDefs.NoHeading);
export const NoText = createStory(storyDefs.NoText);
export const Slim = createStory(storyDefs.Slim);
export const NoIcon = createStory(storyDefs.NoIcon);
export const RegionRoleDefault = { ...createStory(toDjangoArgs(storyDefs.RegionRoleDefault)) };
export const StatusRoleDefault = { ...createStory(toDjangoArgs(storyDefs.StatusRoleDefault)) };
export const AlertRoleDefault = { ...createStory(toDjangoArgs(storyDefs.AlertRoleDefault)) };
export const RegionWithAriaLabel = { ...createStory(toDjangoArgs(storyDefs.RegionWithAriaLabel)) };
export const ExplicitRoleOverride = { ...createStory(toDjangoArgs(storyDefs.ExplicitRoleOverride)) };
export const Dismissible = { ...createStory({
  ...toDjangoArgs(storyDefs.Dismissible),
  onDismiss: "this.closest('.usa-alert').remove();"
}) };