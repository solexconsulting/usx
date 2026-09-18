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
  WithAdditionalClasses: {
    ...(config.default || {}),
    title: 'Highlighted section',
    className: 'bg-primary-darkest text-white padding-3',
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
