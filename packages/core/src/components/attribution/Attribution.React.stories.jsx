import React from 'react';
import Attribution from './Attribution';
import Icon from '../icon/Icon';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: {
    primary: 'George Washington',
    secondary: 'First President of the United States',
  },
  WithAvatar: {
    avatar: {
      href: '#',
      src: './george_washington.png',
      alt: 'George Washington',
      shape: 'circle',
    },
    primary: 'George Washington',
    secondary: 'First President of the United States',
  },
  WithInitials: {
    avatar: {
      href: '#',
      variant: 'initials',
      value: 'AB',
      alt: 'Alex Brown',
      contentClassName: 'bg-primary-lighter text-primary-darker',
    },
    primary: 'Alex Brown',
    secondary: 'Case manager',
  },
  WithPersonIcon: {
    avatar: {
      href: '#',
      variant: 'icon',
      value: 'person',
      alt: 'Person',
      contentClassName: 'bg-primary-lighter text-base-darkest',
    },
    primary: 'Support Team',
    secondary: 'Customer Success',
  },
};

export default {
  title: 'React/Attribution',
  component: Attribution,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithAvatar = { args: storyDefs.WithAvatar };
export const WithInitials = { args: storyDefs.WithInitials };
export const WithPersonIcon = { args: storyDefs.WithPersonIcon };
