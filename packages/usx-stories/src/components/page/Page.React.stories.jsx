import { storyDefaultArgs } from '../../utils/storyHelpers.jsx';
import React from 'react';
import Page from '../../../../usx-react/src/components/page/Page.tsx';
import config from '../../../../usx-react/src/components/page/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const defaultArgs = storyDefaultArgs(config.default);

export const storyDefs = {
  Default: defaultArgs,
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
  WithSubtitle: {
    ...defaultArgs,
    title: 'Benefits and services',
    subtitle: 'Find support for every stage of life',
  },
  WithDescription: {
    ...defaultArgs,
    title: 'Program overview',
    description: 'Explore available services, eligibility, and the steps to apply.',
  },
  WithTags: {
    ...defaultArgs,
    title: 'Program updates',
    tagProps: [{ value: 'New', color: 'accent-cool' }, { value: 'Public notice', color: 'accent-warm' }],
  },
  WithSummary: {
    ...defaultArgs,
    title: 'Community grants',
    eyebrow: 'Funding opportunities',
    subtitle: 'Support for local projects',
    tagProps: [{ value: 'Open', color: 'success' }, { value: 'Applications close June 30', color: 'cyan' }],
    description: 'Find grants that help communities plan, build, and grow.',
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
export const WithSubtitle = { args: storyDefs.WithSubtitle };
export const WithDescription = { args: storyDefs.WithDescription };
export const WithTags = { args: storyDefs.WithTags };
export const WithSummary = { args: storyDefs.WithSummary };
export const WithClasses = { args: storyDefs.WithClasses };
