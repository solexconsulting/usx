import React from 'react';
import Summary from '../../../../usx-react/src/components/summary/Summary.tsx';
import config from '../../../../usx-react/src/components/summary/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

export const storyDefs = {
  Default: config.default || {},
  ButtonClasses: {
    label: "Click me!",
    className: 'usa-button usx-button usa-button--primary',
    noMarker: true,
    noUnderline: true,
  },
  Colors: {
    label: 'Supporting information',
    markerColor: 'error',
    underlineColor: 'secondary',
  },
  MinimalDecoration: {
    label: 'Minimal decoration',
    noMarker: true,
    noUnderline: true,
  },
  CustomClasses: {
    label: 'Request information',
    className: 'font-family-mono font-mono-sm',
    textClassName: 'text-bold',
  },
};

export default {
  title: 'React/USX/Summary',
  component: Summary,
  tags: ['USX', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component:
          'A native disclosure summary. Use it as a child of a details element; Details composes this component for optional supporting content.',
      },
    },
  },
};

export const Default = { args: storyDefs.Default };
export const ButtonClasses = { args: storyDefs.ButtonClasses };
export const Colors = { args: storyDefs.Colors };
export const MinimalDecoration = { args: storyDefs.MinimalDecoration };
export const CustomClasses = { args: storyDefs.CustomClasses };
