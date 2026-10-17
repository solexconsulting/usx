import MiscBanner from '../../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import config from '../../../../usx-react/src/components/misc-banner/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Misc: {
    id: 'misc-banner-misc',
    ...(config.default || {}),
    tone: 'base',
    badgeText: 'misc',
    message: 'This is a miscellaneous banner.',
    casualLinkText: 'Casual Link',
    casualLinkHref: 'https://usx.solex.studio/',
    importantLinkText: 'Important Link',
    importantLinkHref: 'https://usx.solex.studio/',
    importantLinkIcon: 'arrow_forward',
    showLearnMore: true,
    showReturnLink: true,
  },
  Primary: {
    id: 'misc-banner-primary',
    ...(config.default || {}),
    tone: 'primary',
    badgeText: 'prime',
    message: 'This is a primary banner.',
    casualLinkText: 'Casual Link',
    casualLinkHref: 'https://usx.solex.studio/',
    importantLinkText: 'Important Link',
    importantLinkHref: 'https://usx.solex.studio/',
    importantLinkIcon: 'arrow_forward',
    showLearnMore: true,
    showReturnLink: true,
  },
  Beta: {
    id: 'misc-banner-beta',
    ...(config.default || {}),
    tone: 'beta',
    badgeText: 'beta',
    message: 'Welcome to the beta website!',
    casualLinkText: 'Learn more',
    casualLinkHref: 'https://usx.solex.studio/',
    importantLinkText: 'Return to Classic Site',
    importantLinkHref: 'https://usx.solex.studio/',
    importantLinkIcon: 'undo',
    showLearnMore: true,
    showReturnLink: true,
  },
  Dev: {
    id: 'misc-banner-dev',
    ...(config.default || {}),
    tone: 'dev',
    badgeText: 'dev',
    message: 'This is a development environment.',
    showLearnMore: false,
    importantLinkText: 'Production Site',
    importantLinkHref: 'https://usx.solex.studio/',
    importantLinkIcon: 'trending_up',
    showReturnLink: true,
  },
  TestStaging: {
    id: 'misc-banner-test-staging',
    ...(config.default || {}),
    tone: 'test',
    badgeText: 'test',
    message: 'This is a test environment.',
    showLearnMore: false,
    importantLinkText: 'Production Site',
    importantLinkHref: 'https://usx.solex.studio/',
    importantLinkIcon: 'trending_up',
    showReturnLink: true,
  },
  NoLinks: {
    id: 'misc-banner-no-links',
    ...(config.default || {}),
    tone: 'error',
    badgeText: 'oops',
    message: 'This banner has no links.',
    showLearnMore: false,
    showReturnLink: false,
  },
};

export default {
  title: 'React/USX/MiscBanner',
  component: MiscBanner,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Misc = { args: storyDefs.Misc };
export const Primary = { args: storyDefs.Primary };
export const Beta = { args: storyDefs.Beta };
export const Dev = { args: storyDefs.Dev };
export const TestStaging = { args: storyDefs.TestStaging };
export const NoLinks = { args: storyDefs.NoLinks };
