import React from 'react';
import Hero from './Hero';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const defaultButton = { href: '#', text: 'Call to action' };
const defaultParagraph = 'A short description of the hero section that provides context for the call to action.';
const defaultImage = 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg';

export const storyDefs = {
  Default: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    button: defaultButton,
    backgroundImage: defaultImage,
    overlay: true,
  },
  NoBackground: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    button: defaultButton,
    overlay: true,
  },
  WithoutCallout: {
    title: 'The hero heading',
    paragraph: defaultParagraph,
    button: defaultButton,
    backgroundImage: defaultImage,
    overlay: true,
  },
  WithoutButton: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    backgroundImage: defaultImage,
    overlay: true,
  },
  NoOverlay: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    button: defaultButton,
    backgroundImage: defaultImage,
    overlay: false,
  },
  WithSearch: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    backgroundImage: defaultImage,
    overlay: true,
    search: {
      id: 'hero-search',
      label: 'Search',
      placeholder: 'Search...',
      big: true,
    },
  },
};

export default {
  title: 'React/Hero',
  component: Hero,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const NoBackground = { name: 'No background image', args: storyDefs.NoBackground };
export const WithoutCallout = { name: 'Without callout', args: storyDefs.WithoutCallout };
export const WithoutButton = { name: 'Without button', args: storyDefs.WithoutButton };
export const NoOverlay = { name: 'No overlay', args: storyDefs.NoOverlay };
export const WithSearch = { name: 'With search', args: storyDefs.WithSearch };

