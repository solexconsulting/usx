import React from 'react';
import Link from './Link';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

export const storyDefs = {
  Default: {
    href: 'https://google.com/',
    children: 'Google'
  },
  Visited: {
    href: 'javascript:void(0);',
    children: 'a visited link',
    visited: true,
  },
  ExternalCurrentTab: {
    href: 'https://i.giphy.com/media/WPzQF6ruiIIVzHNlwX/source.gif',
    children: 'external website',
    external: true,
  },
  ExternalNewTab: {
    href: 'https://i.giphy.com/media/WPzQF6ruiIIVzHNlwX/source.gif',
    children: 'external website',
    external: true,
    newTab: true,
  },
  DarkBackground: {
    href: 'javascript:void(0);',
    children: 'a text link on a dark background',
  },
  DarkBackgroundAlternateExternal: {
    href: 'https://i.giphy.com/media/WPzQF6ruiIIVzHNlwX/source.gif',
    children: 'This',
    external: true,
    alt: true,
  },
};

export default {
  title: 'React/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Visited = { args: storyDefs.Visited };
export const ExternalCurrentTab = { args: storyDefs.ExternalCurrentTab };
export const ExternalNewTab = { args: storyDefs.ExternalNewTab };

export const DarkBackground = {
  args: storyDefs.DarkBackground,
  render: (args) => (
    <div className="usa-dark-background padding-1 display-inline-block">
      <p>
        This is <Link {...args} />.
      </p>
    </div>
  ),
};

export const DarkBackgroundAlternateExternal = {
  args: storyDefs.DarkBackgroundAlternateExternal,
  render: (args) => (
    <div className="usa-dark-background padding-1 display-inline-block">
      <p>
        <Link {...args} /> is an alternate external text link on a dark background.
      </p>
    </div>
  ),
};
