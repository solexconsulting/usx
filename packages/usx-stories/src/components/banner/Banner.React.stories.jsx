import React from 'react';
import Banner from '../../../../usx-react/src/components/banner/Banner.tsx';
import config from '../../../../usx-react/src/components/banner/config.json';
import { buildArgTypes, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Banner',
  component: Banner,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`banner.init()`'),
      },
    },
  },
  decorators: [...componentInit('banner')],
};

export const storyDefs = {
  Default: { id: 'gov-banner-default' },
  Mil: {
    id: 'gov-banner-mil',
    tld: '.mil',
  },
  Custom: {
    id: 'gov-banner-custom',
    tld: '.NaN',
    bannerText: 'An unofficial website of the Not A Number organization',
    bannerActionText: "Here's how you don't know",
  },
  CustomFlag: {
    id: 'gov-banner-custom-flag',
    tld: '.studio',
    bannerText: 'An official website of SOLEX Consulting',
    bannerActionText: 'Just so you know...',
    domainHeading: `This is not a .gov website`,
    domainText: `This website does not belong to a United States government organization.`,
    flagSrc: 'white_symbol-only.png',
  },
};

export const Default = {
  args: storyDefs.Default,
};

export const Mil = { name: '.mil TLD', args: storyDefs.Mil };
export const Custom = { name: 'Custom text and TLD', args: storyDefs.Custom };
export const CustomFlag = {
  args: storyDefs.CustomFlag,
};
