// import React from 'react';
import Toggle from '../../../../core/src/components/toggle/Toggle.tsx';
import config from '../../../../core/src/components/toggle/config.json';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';


export const storyDefs = {
  Default: {
    id: 'alignment',
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' }
    ],
    defaultValue: 'center',
    variant: 'text',
    name: 'toggle-example'
  },
  IconVariant: {
    id: 'transport-mode',
    variant: 'icon',
    options: [
      { value: 'bike', label: 'Bike', icon: 'directions_bike' },
      { value: 'bus', label: 'Bus', icon: 'directions_bus' },
      { value: 'flight', label: 'Flight', icon: 'flight' }
    ],
    defaultValue: 'bus',
    name: 'transport-mode'
  },
  Controlled: {
    id: 'controlled-toggle',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    value: 'option2',
    name: 'controlled-toggle'
  },
  TotallyDisabled: {
    id: 'disabled-toggle',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    disabled: true,
    name: 'disabled-toggle'
  },
  PartiallyDisabled: {
    id: 'partially-disabled-toggle',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' }
    ],
    defaultValue: 'option1',
    name: 'partially-disabled-toggle'
  }
};

export default {
  title: 'React/USWDS-Inspired/Toggle',
  component: Toggle,
  tags: ['USWDS-Inspired', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  excludeStories: ['storyDefs'],
};

export const Default = { args: storyDefs.Default };
export const Icon = { args: storyDefs.IconVariant };
export const Controlled = { args: storyDefs.Controlled };
export const TotallyDisabled = { args: storyDefs.TotallyDisabled };
export const PartiallyDisabled = { args: storyDefs.PartiallyDisabled }; 
