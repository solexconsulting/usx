import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/SiteAlert',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['djangoStoryDefs'],
};

const createStory = createDjangoStory('site-alert');

// Django-specific story definitions that pass alert props instead of React components
export const djangoStoryDefs = {
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
    alertContent: '<ul class="usa-list"><li>The primary emergency message and a link for supporting context.</li><li>Another message, and another link.</li><li>A final emergency message.</li></ul>',
  },
  DismissibleList: {
    variant: 'emergency',
    alertHeading: 'Emergency alert message',
    alertContent: '<ul class="usa-list"><li>The primary emergency message and a link for supporting context.</li><li>Another message, and another link.</li><li>A final emergency message.</li></ul>',
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
    alertContent: '<p>The site is currently undergoing maintenance. If you have trouble signing in or using tools, check back after we&apos;re finished. Thank you for your patience.<br/><strong>Date:</strong>&nbsp;Sunday, June 21, 2099<br/><strong>Time:</strong> 1:00 AM EST<br/><strong>Expected duration:</strong> 4 hours 30 minutes</p>',
  },
  DismissibleMaintenance: {
    variant: 'maintenance',
    alertHeading: 'Site Maintenance',
    alertContent: '<p>The site is currently undergoing maintenance. If you have trouble signing in or using tools, check back after we&apos;re finished. Thank you for your patience.<br/><strong>Date:</strong>&nbsp;Sunday, June 21, 2099<br/><strong>Time:</strong> 1:00 AM EST<br/><strong>Expected duration:</strong> 4 hours 30 minutes</p>',
    dismissible: true,
  },
  MaintenanceWarning: {
    variant: 'maintenance-warning',
    alertHeading: 'Site Maintenance',
    alertContent: '<p>This site is scheduled for maintenance. The work is expected to last 2 hours. During that time, you won&apos;t be able to sign in or use tools.<br/><strong>Date:</strong>&nbsp;Monday, June 22, 2099<br/><strong>Time:</strong> 1:00 AM EST<br/><strong>Expected duration:</strong> 2 hours</p>',
  },
  DismissibleMaintenanceWarning: {
    variant: 'maintenance-warning',
    alertHeading: 'Site Maintenance',
    alertContent: '<p>This site is scheduled for maintenance. The work is expected to last 2 hours. During that time, you won&apos;t be able to sign in or use tools.<br/><strong>Date:</strong>&nbsp;Monday, June 22, 2099<br/><strong>Time:</strong> 1:00 AM EST<br/><strong>Expected duration:</strong> 2 hours</p>',
    dismissible: true,
  },
};

export const StandardInfo = createStory(djangoStoryDefs.StandardInfo);
export const DismissibleInfo = createStory(djangoStoryDefs.DismissibleInfo);
export const StandardEmergency = createStory(djangoStoryDefs.StandardEmergency);
export const DismissibleEmergency = createStory(djangoStoryDefs.DismissibleEmergency);
export const NoHeader = createStory(djangoStoryDefs.NoHeader);
export const DismissibleNoHeader = createStory(djangoStoryDefs.DismissibleNoHeader);
export const List = createStory(djangoStoryDefs.List);
export const DismissibleList = createStory(djangoStoryDefs.DismissibleList);
export const Slim = createStory(djangoStoryDefs.Slim);
export const DismissibleSlim = createStory(djangoStoryDefs.DismissibleSlim);
export const NoIcon = createStory(djangoStoryDefs.NoIcon);
export const DismissibleNoIcon = createStory(djangoStoryDefs.DismissibleNoIcon);
export const Maintenance = createStory(djangoStoryDefs.Maintenance);
export const DismissibleMaintenance = createStory(djangoStoryDefs.DismissibleMaintenance);
export const MaintenanceWarning = createStory(djangoStoryDefs.MaintenanceWarning);
export const DismissibleMaintenanceWarning = createStory(djangoStoryDefs.DismissibleMaintenanceWarning);
