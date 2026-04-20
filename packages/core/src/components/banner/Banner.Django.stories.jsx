import React from 'react';
import { djangoComponent } from '../../utils/djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Banner',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const defaultArgs = {
  id: 'default-banner',
};

const milArgs = {
  id: 'mil-banner',
  tld: '.mil'
}

const customArgs = {
    id: 'custom-banner',
    tld: '.space',
    bannerText: 'An unofficial website of the United States Department of Defense',
    bannerActionText: "Here's how you don't know",
}

export const Default = {
  args: defaultArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'banner', props: defaultArgs })
      }
    }
  },
  render: djangoComponent('banner')
};

export const MIL = {
  name: '.mil TLD',
  args: milArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'banner', props: milArgs })
      }
    }
  },
  render: djangoComponent('banner')
};

export const Custom = {
  name: 'Custom text and TLD',
  args: customArgs,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'banner', props: customArgs })
      }
    }
  },
  render: djangoComponent('banner')
};
