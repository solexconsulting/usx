import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';

const storyDefs = {
  Default: {
    ...(config.default || {}),
    content: '<p>This page wrapper provides consistent spacing between a site header and footer.</p><p>Use this region for page-specific content.</p>',
  },
  WithLongContent: {
    ...(config.default || {}),
    title: 'Program overview',
    content: '<p>This section demonstrates how the page component handles longer content while preserving top and bottom spacing.</p><p>Teams can compose this with Header and Footer components to keep page layout and heading semantics consistent.</p><p>Because the title is always rendered as an h1, each page has a clear top-level heading by default.</p>',
  },
  WithEyebrow: {
    ...(config.default || {}),
    title: 'Page Title',
    eyebrow: 'Eyebrow Title',
    content: '<p>This page wrapper provides consistent spacing between a site header and footer.</p><p>Use this region for page-specific content.</p>',
  },
  WithClasses: {
    ...(config.default || {}),
    title: 'Page with extra classes',
    content: '<p>This page has additional classes applied to the root element for testing purposes.</p>',
    className: 'bg-violet text-white padding-2',
  }
};

export default {
  title: 'Django/Page',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('page');

export const Default = createStory(storyDefs.Default);
export const WithLongContent = createStory(storyDefs.WithLongContent);
export const WithEyebrow = createStory(storyDefs.WithEyebrow);
export const WithClasses = createStory(storyDefs.WithClasses);
