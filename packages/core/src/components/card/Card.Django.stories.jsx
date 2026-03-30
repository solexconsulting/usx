import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const footerWithButton = '<a href="#" class="usa-button usx-button usa-button--primary">Visit Florida Keys</a>';

const baseArgs = {
  heading: 'Card Title',
  body: 'This is the main content of the card. It can contain text, links, or other elements.',
  footer: footerWithButton,
};

const mediaArgs = {
  media: {
    src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
    alt: 'Placeholder image for card',
  },
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

export const WithMedia = createStory({
  ...baseArgs,
  ...mediaArgs,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const FlagLayout = createStory({
  ...baseArgs,
  ...mediaArgs,
  flag: true,
  className: 'grid-col-8',
});

export const MediaRight = createStory({
  ...baseArgs,
  ...mediaArgs,
  flag: true,
  mediaRight: true,
  className: 'grid-col-8',
});

export const HeaderFirst = createStory({
  ...baseArgs,
  ...mediaArgs,
  headerFirst: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const MediaInset = createStory({
  ...baseArgs,
  ...mediaArgs,
  mediaInset: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const MediaExdent = createStory({
  ...baseArgs,
  ...mediaArgs,
  mediaExdent: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const WithFooter = createStory({
  ...baseArgs,
  footer: footerWithButton,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const Minimal = createStory({
  heading: 'Simple Card',
  body: 'Just the basics.',
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});

export const FullFeatured = createStory({
  ...baseArgs,
  ...mediaArgs,
  flag: true,
  mediaRight: true,
  headerFirst: true,
  mediaInset: true,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
});
