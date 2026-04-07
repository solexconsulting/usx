import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const actionsWithButtons = [
  { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More clicked') },
  { children: 'View Details', variant: 'secondary', onClick: () => alert('View Details clicked') }
];

const baseArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  actions: actionsWithButtons,
};

const imageArgs = {
  images: [{
    src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
    alt: 'Placeholder image for card',
    caption: 'This is an image caption.'
  }],
};

const tagsArgs = {
  tags: [
    { value: 'Primary', color: 'primary' },
    { value: 'Success', color: 'success' },
    { value: 'Warning', color: 'warning' }
  ],
};

export default {
  title: 'Django/Card',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card', props: args })
      }
    }
  },
  render: djangoComponent('card')
});

export const Default = createStory({
  ...baseArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithImage = createStory({
  ...baseArgs,
  ...imageArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithTags = createStory({
  ...baseArgs,
  ...tagsArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithImageAndTags = createStory({
  ...baseArgs,
  ...imageArgs,
  ...tagsArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const FlagLayout = createStory({
  ...baseArgs,
  ...imageArgs,
  flag: true,
  className: 'grid-col-8',
});

export const MediaRight = createStory({
  ...baseArgs,
  ...imageArgs,
  flag: true,
  mediaRight: true,
  className: 'grid-col-8',
});

export const HeaderFirst = createStory({
  ...baseArgs,
  ...imageArgs,
  headerFirst: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const MediaInset = createStory({
  ...baseArgs,
  ...imageArgs,
  mediaInset: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const MediaExdent = createStory({
  ...baseArgs,
  ...imageArgs,
  mediaExdent: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const Minimal = createStory({
  title: 'Simple Card',
  description: 'Just the basics.',
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const FullFeatured = createStory({
  ...baseArgs,
  ...imageArgs,
  ...tagsArgs,
  flag: true,
  mediaRight: true,
  headerFirst: true,
  mediaInset: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});
