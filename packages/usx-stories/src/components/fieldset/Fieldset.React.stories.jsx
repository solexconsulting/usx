import React from 'react';
import Fieldset from '../../../../usx-react/src/components/fieldset/Fieldset.tsx';
import config from '../../../../usx-react/src/components/fieldset/config.json';
import Input from '../../../../usx-react/src/components/input/Input.tsx';
import { buildArgTypes } from '../../utils/storyHelpers.jsx';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/USWDS/Fieldset',
  component: Fieldset,
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    legend: 'Fieldset Legend',
    children: <label className="usa-checkbox__label">Hello world</label>,
  },
  NoLegend: {
    children: <label className="usa-checkbox__label">Hello world</label>,
  },
  RequiredLegend: {
    legend: 'Required Fieldset',
    required: true,
    children: <label className="usa-checkbox__label">Hello world</label>,
  },
  WithCustomClass: {
    legend: 'Custom Class Fieldset',
    className: 'border-1px border-base padding-2',
    children: <label className="usa-checkbox__label">Hello world</label>,
  },
  LargeLegend: {
    legend: 'Large Legend Fieldset',
    largeLegend: true,
    children: <label className="usa-checkbox__label">Hello world</label>,
  },
  Disabled: {
    legend: 'Disabled Fieldset',
    disabled: true,
    children: <Input id="lonely-input" label="Lonely input" placeholder="Type here..." />,
  },
};

export const Default = { args: storyDefs.Default };
export const NoLegend = { args: storyDefs.NoLegend };
export const RequiredLegend = { args: storyDefs.RequiredLegend };
export const WithCustomClass = { args: storyDefs.WithCustomClass };
export const LargeLegend = { args: storyDefs.LargeLegend };
export const Disabled = { args: storyDefs.Disabled };
