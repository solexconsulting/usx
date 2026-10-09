import React from 'react';
import Section from '../../../../usx-react/src/components/section/Section.tsx';
import config from '../../../../usx-react/src/components/section/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: {
    ...(config.default || {}),
    content: undefined,
    children: (
      <p>Use section to group related page content with consistent spacing.</p>
    ),
  },
  WithTitle: {
    ...(config.default || {}),
    title: 'Program details',
    content: undefined,
    children: (
      <p>Optional section titles help organize long pages into meaningful chunks.</p>
    ),
  },
  WithHeadingLevel: {
    title: 'Nested program details',
    headingLevel: 'h3',
    children: <p>Choose a heading level that fits the surrounding page structure.</p>,
  },
  HeadingH1: {
    title: 'Heading level 1',
    headingLevel: 'h1',
    children: <p>This section uses an h1 heading. Choose the level that fits the page hierarchy.</p>,
  },
  HeadingH2: {
    title: 'Heading level 2',
    headingLevel: 'h2',
    children: <p>This section uses an h2 heading. Choose the level that fits the page hierarchy.</p>,
  },
  HeadingH3: {
    title: 'Heading level 3',
    headingLevel: 'h3',
    children: <p>This section uses an h3 heading. Choose the level that fits the page hierarchy.</p>,
  },
  HeadingH4: {
    title: 'Heading level 4',
    headingLevel: 'h4',
    children: <p>This section uses an h4 heading. Choose the level that fits the page hierarchy.</p>,
  },
  HeadingH5: {
    title: 'Heading level 5',
    headingLevel: 'h5',
    children: <p>This section uses an h5 heading. Choose the level that fits the page hierarchy.</p>,
  },
  HeadingH6: {
    title: 'Heading level 6',
    headingLevel: 'h6',
    children: <p>This section uses an h6 heading. Choose the level that fits the page hierarchy.</p>,
  },
  WithAdditionalClasses: {
    ...(config.default || {}),
    title: 'Highlighted section',
    className: 'bg-primary-darker text-inverse padding-3',
    content: undefined,
    children: (
      <p>This variant demonstrates adding utility classes directly on the section component.</p>
    ),
  },
};

export default {
  title: 'React/USX/Section',
  component: Section,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithTitle = { args: storyDefs.WithTitle };
export const WithAdditionalClasses = { args: storyDefs.WithAdditionalClasses };

export const WithHeadingLevel = { args: storyDefs.WithHeadingLevel };

export const HeadingH1 = { name: 'Heading H1', args: storyDefs.HeadingH1 };
export const HeadingH2 = { name: 'Heading H2', args: storyDefs.HeadingH2 };
export const HeadingH3 = { name: 'Heading H3', args: storyDefs.HeadingH3 };
export const HeadingH4 = { name: 'Heading H4', args: storyDefs.HeadingH4 };
export const HeadingH5 = { name: 'Heading H5', args: storyDefs.HeadingH5 };
export const HeadingH6 = { name: 'Heading H6', args: storyDefs.HeadingH6 };
