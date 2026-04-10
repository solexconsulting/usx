import React from 'react';
import CardGroup from './CardGroup';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const actions = [
  { children: 'Learn More', variant: 'primary', onClick: () => alert('Learn More clicked') },
  { children: 'View Details', variant: 'secondary', onClick: () => alert('View Details clicked') }
];

const baseCardArgs = {
  title: 'Card Title',
  description: 'This is the main content of the card. It can contain text, links, or other elements.',
  actions: actions,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
};

const images = {
  images: [
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is an image caption.',
      objectFit: 'cover',
    },
    {
      src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
      alt: 'Placeholder image for card',
      caption: 'This is another image caption.',
      objectFit: 'cover',
    }
  ]
}

const tagsArgs = {
  tags: [
    { value: 'Primary', color: 'primary' },
    { value: 'Success', color: 'success' },
    { value: 'Warning', color: 'warning' }
  ],
};

export default {
  title: 'React/CardGroup',
  component: CardGroup,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const Template = (args) => <CardGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  cards: [
    baseCardArgs,
    { ...baseCardArgs, ...images, heading: 'Card with Media' },
    { ...baseCardArgs, ...images, heading: 'Media with header first', headerFirst: true },
  ],
};

export const FlagLayout = Template.bind({});
FlagLayout.args = {
  cards: [
    { ...baseCardArgs, ...images, flag: true, heading: 'Default flag', className: 'flex-1' },
    { ...baseCardArgs, ...images, flag: true, mediaRight: true, heading: 'Flag media right', className: 'flex-1' },
  ],
};

export const WithTags = {
  args: {
    cards: [
      { ...baseCardArgs, ...images, ...tagsArgs, className: 'tablet:grid-col-6 widescreen:grid-col-4'},
      { ...baseCardArgs, ...images, ...tagsArgs, className: 'tablet:grid-col-6 widescreen:grid-col-4'},
    ]
  }
}
