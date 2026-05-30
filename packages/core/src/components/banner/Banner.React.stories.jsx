// import React from 'react';
import Banner from './Banner';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {},
  Mil: {
    tld: '.mil',
  },
  Custom: {
    tld: '.space',
    bannerText: 'An unofficial website of the United States Department of Defense',
    bannerActionText: "Here's how you don't know",
  },
};

export const Default = { args: storyDefs.Default };

export const Mil = { name: '.mil TLD', args: storyDefs.Mil };
export const Custom = { name: 'Custom text and TLD', args: storyDefs.Custom };
