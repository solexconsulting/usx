import MiscBanner from '../../../../usx-react/src/components/misc-banner/MiscBanner.tsx';
import config from '../../../../usx-react/src/components/misc-banner/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default,
  Primary: {
    id: 'misc-banner-primary',
    ...(config.default || {}),
    color: 'primary',
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
    color: 'beta',
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
    color: 'dev',
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
    color: 'test',
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
    color: 'error',
    badgeText: 'oops',
    message: 'This banner has no links.',
    showLearnMore: false,
    showReturnLink: false,
  },
  Badgeless: {
    id: 'misc-banner-no-badge',
    color: 'accent-cool',
    message: 'This banner does not need a badge.',
    casualLinkText: 'Learn more',
    casualLinkHref: 'https://usx.solex.studio/',
    importantLinkText: 'Return to the main site',
    importantLinkHref: 'https://usx.solex.studio/',
    importantLinkIcon: 'arrow_forward',
    showLearnMore: true,
    showReturnLink: true,
  },
};

export default {
  title: 'React/USX/MiscBanner',
  component: MiscBanner,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Primary = { args: storyDefs.Primary };
export const Beta = { args: storyDefs.Beta };
export const Dev = { args: storyDefs.Dev };
export const TestStaging = { args: storyDefs.TestStaging };
export const NoLinks = { args: storyDefs.NoLinks };
export const Badgeless = { args: storyDefs.Badgeless };
