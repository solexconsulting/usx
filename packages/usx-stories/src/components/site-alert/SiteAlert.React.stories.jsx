import React from 'react';
import SiteAlert from '../../../../core/src/components/site-alert/SiteAlert.tsx';
import config from '../../../../core/src/components/site-alert/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/SiteAlert',
  component: SiteAlert,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  args: { onDismiss: null },
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
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
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
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
  },
  NoHeader: {
    variant: 'emergency',
    alertHeading: '',
    alertText: 'This is not recommended. Use `slim` variant when no header is present.',
  },
  DismissibleNoHeader: {
    variant: 'emergency',
    alertHeading: '',
    alertText: 'This is not recommended. Use `slim` variant when no header is present.',
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
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
      <>
        <ul className="usa-list">
          <li>The primary emergency message and a link for supporting context.</li>
          <li>Another message, and another link.</li>
          <li>A final emergency message.</li>
        </ul>
      </>
    ),
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
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
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
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
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
  },
  Maintenance: {
    variant: 'maintenance',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <p>
        The site is currently undergoing maintenance. If you have trouble signing in or using tools, check back after
        we&apos;re finished. Thank you for your patience.
        <br />
        <strong>Date:</strong> Sunday, June 21, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 4 hours 30 minutes
      </p>
    ),
  },
  DismissibleMaintenance: {
    variant: 'maintenance',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <p>
        The site is currently undergoing maintenance. If you have trouble signing in or using tools, check back after
        we&apos;re finished. Thank you for your patience.
        <br />
        <strong>Date:</strong> Sunday, June 21, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 4 hours 30 minutes
      </p>
    ),
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
  },
  MaintenanceWarning: {
    variant: 'maintenance-warning',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <p>
        This site is scheduled for maintenance. The work is expected to last 2 hours. During that time, you won&apos;t
        be able to sign in or use tools.
        <br />
        <strong>Date:</strong> Monday, June 22, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 2 hours
      </p>
    ),
  },
  DismissibleMaintenanceWarning: {
    variant: 'maintenance-warning',
    alertHeading: 'Site Maintenance',
    alertContent: (
      <p>
        This site is scheduled for maintenance. The work is expected to last 2 hours. During that time, you won&apos;t
        be able to sign in or use tools.
        <br />
        <strong>Date:</strong> Monday, June 22, 2099
        <br />
        <strong>Time:</strong> 1:00 AM EST
        <br />
        <strong>Expected duration:</strong> 2 hours
      </p>
    ),
    onDismiss: (e) => e.currentTarget.closest('.usa-site-alert').remove(),
  },
};

export const StandardInfo = { args: storyDefs.StandardInfo };
export const StandardEmergency = { args: storyDefs.StandardEmergency };
export const NoHeader = { args: storyDefs.NoHeader };
export const List = { args: storyDefs.List };
export const Slim = { args: storyDefs.Slim };
export const NoIcon = { args: storyDefs.NoIcon };
export const Maintenance = { args: storyDefs.Maintenance, tags: ['USX'] };
export const MaintenanceWarning = { args: storyDefs.MaintenanceWarning, tags: ['USX'] };
export const DismissibleInfo = { args: storyDefs.DismissibleInfo };
export const DismissibleEmergency = { args: storyDefs.DismissibleEmergency };
export const DismissibleNoHeader = { args: storyDefs.DismissibleNoHeader };
export const DismissibleList = { args: storyDefs.DismissibleList };
export const DismissibleSlim = { args: storyDefs.DismissibleSlim };
export const DismissibleNoIcon = { args: storyDefs.DismissibleNoIcon };
export const DismissibleMaintenance = { args: storyDefs.DismissibleMaintenance, tags: ['USX'] };
export const DismissibleMaintenanceWarning = { args: storyDefs.DismissibleMaintenanceWarning, tags: ['USX'] };
