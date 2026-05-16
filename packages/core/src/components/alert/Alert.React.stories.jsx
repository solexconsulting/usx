import React from 'react';
import Alert from './Alert.jsx';
import alertConfig from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(alertConfig.props || {});

export default {
  title: 'React/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Info: {
    heading: 'Informative status',
    text: 'System status and notification updates appear here.',
    slim: false,
    noIcon: false
  },
  Warning: {
    variant: 'warning',
    heading: 'Warning status',
    text: 'This is a warning message.',
    slim: false,
    noIcon: false
  },
  Success: {
    variant: 'success',
    heading: 'Success status',
    text: 'Operation completed successfully.',
    slim: false,
    noIcon: false
  },
  Error: {
    variant: 'error',
    heading: 'Error status',
    text: 'An error occurred.',
    slim: false,
    noIcon: false
  },
  Emergency: {
    variant: 'emergency',
    heading: 'Emergency status',
    text: 'This is an emergency alert.',
    slim: false,
    noIcon: false
  },
  RegionRoleDefault: {
    variant: 'info',
    heading: 'Informative region',
    text: 'Info and warning alerts default to role="region".',
  },
  StatusRoleDefault: {
    variant: 'success',
    heading: 'Success status',
    text: 'Success alerts default to role="status".',
  },
  AlertRoleDefault: {
    variant: 'error',
    heading: 'Error alert',
    text: 'Error and emergency alerts default to role="alert".',
  },
  RegionWithAriaLabel: {
    variant: 'warning',
    heading: 'Warning region with label',
    text: 'Region role with explicit aria-label.',
    ariaLabel: 'Warning notification',
  },
  ExplicitRoleOverride: {
    variant: 'warning',
    heading: 'Warning as status',
    text: 'Role can still be overridden when needed.',
    role: 'status',
  },
};

export const Info = { args: storyDefs.Info };
export const Warning = { args: storyDefs.Warning };
export const Success = { args: storyDefs.Success };
export const Error = { args: storyDefs.Error };
export const Emergency = { args: storyDefs.Emergency };
export const RegionRoleDefault = { name: 'Default: region', args: storyDefs.RegionRoleDefault };
export const StatusRoleDefault = { name: 'Default: status', args: storyDefs.StatusRoleDefault };
export const AlertRoleDefault = { name: 'Default: alert', args: storyDefs.AlertRoleDefault };
export const RegionWithAriaLabel = { name: 'Region with aria-label', args: storyDefs.RegionWithAriaLabel };
export const ExplicitRoleOverride = { name: 'Role override', args: storyDefs.ExplicitRoleOverride };