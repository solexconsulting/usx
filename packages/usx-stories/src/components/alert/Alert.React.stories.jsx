import React from 'react';
import Alert from '../../../../usx-react/src/components/alert/Alert.tsx';
import alertConfig from '../../../../usx-react/src/components/alert/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(alertConfig.props || {});

export default {
  title: 'React/USWDS/Alert',
  component: Alert,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  args: { onDismiss: null },
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    heading: 'Default alert',
    text: 'System status and notification updates appear here.',
  },
  Info: {
    variant: 'info',
    heading: 'Informative status',
    text: 'This is an informational message.',
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
  EmergencyList: {
    variant: 'emergency',
    heading: 'Emergency status',
    children: (
      <ul className="usa-list">
        <li>The primary emergency message and a link for supporting context.</li>
        <li>Another message, and another link.</li>
        <li>A final emergency message.</li>
      </ul>
    ),
  },
  NoHeading: {
    variant: 'info',
    text: 'This alert has no heading.',
  },
  NoText: {
    variant: 'success',
    heading: 'No text alert',
    slim: false,
    noIcon: false
  },
  Slim: {
    variant: 'info',
    heading: 'Slim alert',
    text: 'This is a slim variant of the alert.',
    slim: true,
    noIcon: false
  },
  NoIcon: {
    variant: 'warning',
    heading: 'No icon alert',
    text: 'This alert does not have an icon.',
    slim: false,
    noIcon: true
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
  Dismissible: {
    variant: 'info',
    heading: 'Dismissible alert',
    text: 'This alert can be dismissed.',
    onDismiss: (e) => e.currentTarget.closest('.usa-alert').remove(),
  },
};

export const Default = { args: storyDefs.Default };
export const Info = { args: storyDefs.Info };
export const Warning = { args: storyDefs.Warning };
export const Success = { args: storyDefs.Success };
export const Error = { args: storyDefs.Error };
export const Emergency = { args: storyDefs.Emergency, tags: ['USX'] };
export const EmergencyList = { args: storyDefs.EmergencyList, tags: ['USX'] };
export const NoHeading = { args: storyDefs.NoHeading };
export const NoText = { args: storyDefs.NoText };
export const Slim = { args: storyDefs.Slim };
export const NoIcon = { args: storyDefs.NoIcon };
export const RegionRoleDefault = { args: storyDefs.RegionRoleDefault };
export const StatusRoleDefault = { args: storyDefs.StatusRoleDefault };
export const AlertRoleDefault = { args: storyDefs.AlertRoleDefault };
export const RegionWithAriaLabel = { args: storyDefs.RegionWithAriaLabel };
export const ExplicitRoleOverride = { args: storyDefs.ExplicitRoleOverride };
export const Dismissible = { args: storyDefs.Dismissible };