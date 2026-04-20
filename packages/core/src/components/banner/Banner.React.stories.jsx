import React from 'react';
import Banner from './Banner';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {},
};

export const Mil = {
  name: '.mil TLD',
  args: {
    tld: '.mil'
  }
}

export const Custom = {
  name: 'Custom text and TLD',
  args: {
    tld: '.space',
    bannerText: 'An unofficial website of the United States Department of Defense',
    bannerActionText: "Here's how you don't know",
  }
}
