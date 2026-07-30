import React from 'react';
import Page from '../../../../core/src/components/page/Page.jsx';
import config from '../../../../core/src/components/page/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    ...(config.default || {}),
    content: undefined,
    children: (
      <>
        <p>This page wrapper provides consistent spacing between a site header and footer.</p>
        <p>Use this region for page-specific content.</p>
      </>
    ),
  },
  WithLongContent: {
    ...(config.default || {}),
    title: 'Program overview',
    content: undefined,
    children: (
      <>
        <p>This section demonstrates how the page component handles longer content while preserving top and bottom spacing.</p>
        <p>Teams can compose this with Header and Footer components to keep page layout and heading semantics consistent.</p>
        <p>Because the title is always rendered as an h1, each page has a clear top-level heading by default.</p>
      </>
    ),
  },
  WithEyebrow: {
    ...(config.default || {}),
    title: 'Page Title',
    eyebrow: 'Eyebrow Title',
    content: undefined,
    children: (
      <>
        <p>This page wrapper provides consistent spacing between a site header and footer.</p>
        <p>Use this region for page-specific content.</p>
      </>
    ),
  },
  WithClasses: {
    ...(config.default || {}),
    title: 'Page with extra classes',
    content: undefined,
    className: 'bg-violet text-white padding-2',
    children: (
      <>
        <p>This page has additional classes applied to the root element for testing purposes.</p>
      </>
    ),
  }
};

export default {
  title: 'React/USX/Page',
  component: Page,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithLongContent = { args: storyDefs.WithLongContent };
export const WithEyebrow = { args: storyDefs.WithEyebrow };
export const WithClasses = { args: storyDefs.WithClasses };
