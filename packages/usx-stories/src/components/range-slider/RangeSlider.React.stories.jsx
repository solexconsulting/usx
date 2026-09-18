import React from 'react';
import RangeSlider from '../../../../usx-react/src/components/range-slider/RangeSlider.jsx';
import config from '../../../../usx-react/src/components/range-slider/config.json';
import { buildArgTypes, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import range from '@uswds/uswds/js/usa-range';

const generatedArgTypes = buildArgTypes(config.props || {});

export const storyDefs = {
  Default: {
    id: 'range-slider-default',
    label: 'Range slider',
    hint: 'Move the slider to change the value',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 20,
  },
  WithUnit: {
    id: 'range-slider-unit',
    label: 'Volume',
    hint: 'Adjust the volume level',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    textUnit: 'percent',
  },
  WithPreposition: {
    id: 'range-slider-preposition',
    label: 'Rango deslizante',
    hint: 'Mueva el control deslizante para cambiar el valor',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 20,
    textPreposition: 'de',
  },
  FineStep: {
    id: 'range-slider-fine-step',
    label: 'Fine-grained slider',
    hint: 'Move the slider to change the value by 1',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 20,
  },
  CustomRange: {
    id: 'range-slider-custom-range',
    label: 'Target price',
    hint: 'Move the slider to select a price target between 50 and 150',
    min: 50,
    max: 150,
    step: 10,
    defaultValue: 90,
  },
  WithError: {
    id: 'range-slider-error',
    label: 'Range slider',
    error: 'Select a value within the allowed range',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 20,
  },
  Disabled: {
    id: 'range-slider-disabled',
    label: 'Range slider',
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 20,
    disabled: true,
  },
};

export default {
  title: 'React/USWDS/RangeSlider',
  component: RangeSlider,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`range.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        range.init();
      }, []);

      return <Story />;
    }
  ]
};

export const Default = { args: storyDefs.Default };
export const WithUnit = { args: storyDefs.WithUnit };
export const WithPreposition = { args: storyDefs.WithPreposition };
export const FineStep = { args: storyDefs.FineStep };
export const CustomRange = { args: storyDefs.CustomRange };
export const WithError = { args: storyDefs.WithError };
export const Disabled = { args: storyDefs.Disabled };
