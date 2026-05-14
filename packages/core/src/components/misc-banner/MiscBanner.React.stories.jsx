import React from 'react';
import MiscBanner from './MiscBanner';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Misc: {
    ...(config.default || {}),
    tone: 'base',
    badgeText: 'misc',
    message: 'This is a miscellaneous banner.',
    learnMoreText: 'Casual Link',
    learnMoreHref: 'https://usx.solex.studio/',
    returnText: 'Important Link',
    returnHref: 'https://usx.solex.studio/',
    returnIcon: 'arrow_forward',
    showLearnMore: true,
    showReturnLink: true,
  },
  Primary: {
    ...(config.default || {}),
    tone: 'primary',
    badgeText: 'prime',
    message: 'This is a primary banner.',
    learnMoreText: 'Casual Link',
    learnMoreHref: 'https://usx.solex.studio/',
    returnText: 'Important Link',
    returnHref: 'https://usx.solex.studio/',
    returnIcon: 'arrow_forward',
    showLearnMore: true,
    showReturnLink: true,
  },
  Beta: {
    ...(config.default || {}),
    tone: 'beta',
    badgeText: 'beta',
    message: 'Welcome to the beta website!',
    learnMoreText: 'Learn more',
    learnMoreHref: 'https://usx.solex.studio/',
    returnText: 'Return to Classic Site',
    returnHref: 'https://usx.solex.studio/',
    returnIcon: 'undo',
    showLearnMore: true,
    showReturnLink: true,
  },
  Dev: {
    ...(config.default || {}),
    tone: 'dev',
    badgeText: 'dev',
    message: 'This is a development environment.',
    showLearnMore: false,
    returnText: 'Production Site',
    returnHref: 'https://usx.solex.studio/',
    returnIcon: 'trending_up',
    showReturnLink: true,
  },
  TestStaging: {
    ...(config.default || {}),
    tone: 'test',
    badgeText: 'test',
    message: 'This is a test environment.',
    showLearnMore: false,
    returnText: 'Production Site',
    returnHref: 'https://usx.solex.studio/',
    returnIcon: 'trending_up',
    showReturnLink: true,
  },
};

export default {
  title: 'React/MiscBanner',
  component: MiscBanner,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Misc = { args: storyDefs.Misc };
export const Primary = { args: storyDefs.Primary };
export const Beta = { args: storyDefs.Beta };
export const Dev = { args: storyDefs.Dev };
export const TestStaging = { args: storyDefs.TestStaging };
