import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';

const storyDefs = {
  Default: {
    ...(config.default || {}),
    content: '<p>Use section to group related page content with consistent spacing.</p>',
  },
  WithTitle: {
    ...(config.default || {}),
    title: 'Program details',
    content: '<p>Optional section titles help organize long pages into meaningful chunks.</p>',
  },
  WithAdditionalClasses: {
    ...(config.default || {}),
    title: 'Highlighted section',
    className: 'bg-primary-darkest text-white padding-3',
    content: '<p>This variant demonstrates adding utility classes directly on the section component.</p>',
  },
};

export default {
  title: 'Django/Section',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('section');

export const Default = createStory(storyDefs.Default);
export const WithTitle = createStory(storyDefs.WithTitle);
export const WithAdditionalClasses = createStory(storyDefs.WithAdditionalClasses);
