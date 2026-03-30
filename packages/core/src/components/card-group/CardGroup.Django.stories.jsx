import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const footerWithButton = '<button onClick="alert(\'Button clicked\')" class="usa-button usx-button usa-button--primary">Visit Florida Keys</button>';

const baseCardArgs = {
  heading: 'Card Title',
  body: 'This is the main content of the card. It can contain text, links, or other elements.',
  footer: footerWithButton,
  className: 'tablet:grid-col-6 widescreen:grid-col-4',
};

const mediaArgs = {
  media: {
    src: 'https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg',
    alt: 'Placeholder image for card',
  },
};

export default {
  title: 'Django/CardGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'card-group', props: args })
      }
    }
  },
  render: djangoComponent('card-group')
});

export const Default = createStory({
  cards: [
    baseCardArgs,
    { ...baseCardArgs, ...mediaArgs, heading: 'Card with Media' },
    { ...baseCardArgs, ...mediaArgs, heading: 'Media with header first', headerFirst: true },
  ],
});

export const FlagLayout = createStory({
  cards: [
    { ...baseCardArgs, ...mediaArgs, flag: true, heading: 'Default flag', className: 'flex-1' },
    { ...baseCardArgs, ...mediaArgs, flag: true, mediaRight: true, heading: 'Flag media right', className: 'flex-1' },
  ],
});
