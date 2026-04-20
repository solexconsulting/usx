import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Header.React.stories.jsx';

export default {
  title: 'Django/Header',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
};

const createStory = createDjangoStory('header');

export const Default = createStory(storyDefs.Default);
export const Basic = createStory(storyDefs.Basic);
export const BasicWithMegamenu = createStory(storyDefs.BasicWithMegamenu);
export const Extended = createStory(storyDefs.Extended);
export const ExtendedWithMegamenu = createStory(storyDefs.ExtendedWithMegamenu);
export const WithMenuIcon = createStory(storyDefs.WithMenuIcon);
export const Minimal = createStory(storyDefs.Minimal);
export const Maximal = createStory(storyDefs.Maximal);
export const TextOnly = createStory(storyDefs.TextOnly);
export const SymbolAndText = createStory(storyDefs.SymbolAndText);
export const SingleLogo = createStory(storyDefs.SingleLogo);
export const ResponsiveLogo = createStory(storyDefs.ResponsiveLogo);
