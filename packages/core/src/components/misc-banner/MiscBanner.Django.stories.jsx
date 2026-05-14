import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';

export default {
  title: 'Django/MiscBanner',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('misc-banner');

export const Misc = createStory({
  ...(config.default || {}),
  tone: 'base',
  badgeText: 'misc',
  message: 'This is a miscellaneous banner.',
  learnMoreText: 'Casual Link',
  learnMoreHref: 'https://usx.solex.studio/',
  returnText: 'Important Link',
  returnHref: 'https://usx.solex.studio/',
  returnIcon: 'arrow_forward',
});

export const Primary = createStory({
  ...(config.default || {}),
  tone: 'primary',
  badgeText: 'prime',
  message: 'This is a primary banner.',
  learnMoreText: 'Casual Link',
  learnMoreHref: 'https://usx.solex.studio/',
  returnText: 'Important Link',
  returnHref: 'https://usx.solex.studio/',
  returnIcon: 'arrow_forward',
});

export const Beta = createStory({
  ...(config.default || {}),
  tone: 'beta',
  badgeText: 'beta',
  message: 'Welcome to the beta website!',
  learnMoreText: 'Learn more',
  learnMoreHref: 'https://usx.solex.studio/',
  returnText: 'Return to Classic Site',
  returnHref: 'https://usx.solex.studio/',
  returnIcon: 'undo',
});

export const Dev = createStory({
  ...(config.default || {}),
  tone: 'dev',
  badgeText: 'dev',
  message: 'This is a development environment.',
  returnText: 'Production Site',
  returnHref: 'https://usx.solex.studio/',
  returnIcon: 'trending_up',
});

export const TestStaging = createStory({
  ...(config.default || {}),
  tone: 'test',
  badgeText: 'test',
  message: 'This is a test environment.',
  returnText: 'Production Site',
  returnHref: 'https://usx.solex.studio/',
  returnIcon: 'trending_up',
});
