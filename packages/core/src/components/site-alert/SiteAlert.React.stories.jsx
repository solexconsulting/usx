import React from 'react';
import SiteAlert from './SiteAlert';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/SiteAlert',
  component: SiteAlert,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  StandardInfo: {
    variant: 'info',
    alertHeading: 'Short alert message',
    alertText: 'Additional context and followup information including a link.',
  },
  DismissibleInfo: {
    variant: 'info',
    alertHeading: 'Short alert message',
    alertText: 'Additional context and followup information including a link.',
    dismissible: true,
  },
  StandardEmergency: {
    variant: 'emergency',
    alertHeading: 'Emergency alert message',
    alertText: 'Additional context and followup information including a link.',
  },
  DismissibleEmergency: {
    variant: 'emergency',
    alertHeading: 'Emergency alert message',
    alertText: 'Additional context and followup information including a link.',
    dismissible: true,
  },
  NoHeader: {
    variant: 'emergency',
    alertHeading: '',
    alertText: 'Short alert message. Additional context and followup information including a link.',
  },
  DismissibleNoHeader: {
    variant: 'emergency',
    alertHeading: '',
    alertText: 'Short alert message. Additional context and followup information including a link.',
    dismissible: true,
  },
  List: {
    variant: 'emergency',
    alertHeading: 'Emergency alert message',
    alertContent: (
      <ul className="usa-list">
        <li>The primary emergency message and a link for supporting context.</li>
        <li>Another message, and another link.</li>
        <li>A final emergency message.</li>
      </ul>
    ),
  },
  DismissibleList: {
    variant: 'emergency',
    alertHeading: 'Emergency alert message',
    alertContent: (
      <ul className="usa-list">
        <li>The primary emergency message and a link for supporting context.</li>
        <li>Another message, and another link.</li>
        <li>A final emergency message.</li>
      </ul>
    ),
    dismissible: true,
  },
  Slim: {
    variant: 'emergency',
    alertText: 'Short alert message. Additional context and followup information including a link.',
    slim: true,
  },
  DismissibleSlim: {
    variant: 'emergency',
    alertText: 'Short alert message. Additional context and followup information including a link.',
    slim: true,
    dismissible: true,
  },
  NoIcon: {
    variant: 'emergency',
    alertText: 'Short alert message. Additional context and followup information including a link.',
    noIcon: true,
  },
  DismissibleNoIcon: {
    variant: 'emergency',
    alertText: 'Short alert message. Additional context and followup information including a link.',
    noIcon: true,
    dismissible: true,
  },
  Maintenance: {
    variant: 'maintenance',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <>
        The site is currently undergoing maintenance. If you have trouble signing in or using tools, check back after
        we&apos;re finished. Thank you for your patience.
        <br />
        <strong>Date:</strong> Sunday, June 21, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 4 hours 30 minutes
      </>
    ),
  },
  DismissibleMaintenance: {
    variant: 'maintenance',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <>
        The site is currently undergoing maintenance. If you have trouble signing in or using tools, check back after
        we&apos;re finished. Thank you for your patience.
        <br />
        <strong>Date:</strong> Sunday, June 21, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 4 hours 30 minutes
      </>
    ),
    dismissible: true,
  },
  MaintenanceWarning: {
    variant: 'maintenance-warning',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <>
        This site is scheduled for maintenance. The work is expected to last 2 hours. During that time, you won&apos;t
        be able to sign in or use tools.
        <br />
        <strong>Date:</strong> Monday, June 22, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 2 hours
      </>
    ),
  },
  DismissibleMaintenanceWarning: {
    variant: 'maintenance-warning',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <>
        This site is scheduled for maintenance. The work is expected to last 2 hours. During that time, you won&apos;t
        be able to sign in or use tools.
        <br />
        <strong>Date:</strong> Monday, June 22, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 2 hours
      </>
    ),
    dismissible: true,
  },
};

export const StandardInfo = { args: storyDefs.StandardInfo };
export const DismissibleInfo = { args: storyDefs.DismissibleInfo };
export const StandardEmergency = { args: storyDefs.StandardEmergency };
export const DismissibleEmergency = { args: storyDefs.DismissibleEmergency };
export const NoHeader = { args: storyDefs.NoHeader };
export const DismissibleNoHeader = { args: storyDefs.DismissibleNoHeader };
export const List = { args: storyDefs.List };
export const DismissibleList = { args: storyDefs.DismissibleList };
export const Slim = { args: storyDefs.Slim };
export const DismissibleSlim = { args: storyDefs.DismissibleSlim };
export const NoIcon = { args: storyDefs.NoIcon };
export const DismissibleNoIcon = { args: storyDefs.DismissibleNoIcon };
export const Maintenance = { args: storyDefs.Maintenance };
export const DismissibleMaintenance = { args: storyDefs.DismissibleMaintenance };
export const MaintenanceWarning = { args: storyDefs.MaintenanceWarning };
export const DismissibleMaintenanceWarning = { args: storyDefs.DismissibleMaintenanceWarning };
