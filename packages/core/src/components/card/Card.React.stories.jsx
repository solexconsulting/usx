import React from 'react';
import Card from './Card';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const footerWithButton = <a href="#" className="usa-button usx-button usa-button--primary">Visit Florida Keys</a>;

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
  title: 'React/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    ...baseArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithMedia = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const FlagLayout = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    flag: true,
    className: 'grid-col-8',
  },
};

export const MediaRight = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    flag: true,
    mediaRight: true,
    className: 'grid-col-8',
  },
};

export const HeaderFirst = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    headerFirst: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const MediaInset = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    mediaInset: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const MediaExdent = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    mediaExdent: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const WithFooter = {
  args: {
    ...baseArgs,
    footer: footerWithButton,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const Minimal = {
  args: {
    heading: 'Simple Card',
    body: 'Just the basics.',
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};

export const FullFeatured = {
  args: {
    ...baseArgs,
    ...mediaArgs,
    flag: true,
    mediaRight: true,
    headerFirst: true,
    mediaInset: true,
    className: 'tablet:grid-col-6 widescreen:grid-col-4',
  },
};
