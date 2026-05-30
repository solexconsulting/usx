// import React from 'react';
import Villain from './Villain';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

const defaultButton = { href: '#', text: 'Call to action' };
const defaultParagraph = 'A short description of the hero section that provides context for the call to action.';

export const storyDefs = {
  Default: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
    button: defaultButton,
  },
  WithoutCallout: {
    title: 'The hero heading',
    paragraph: defaultParagraph,
    button: defaultButton,
  },
  WithoutButton: {
    title: 'The hero heading',
    callout: 'A callout heading',
    paragraph: defaultParagraph,
  },
};

export default {
  title: 'React/Villain',
  component: Villain,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const WithoutCallout = { name: 'Without callout', args: storyDefs.WithoutCallout };
export const WithoutButton = { name: 'Without button', args: storyDefs.WithoutButton };
