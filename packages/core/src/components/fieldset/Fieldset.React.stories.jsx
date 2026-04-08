import React from 'react';
import Fieldset from './Fieldset';
import config from './config.json';
import Input from '../input/Input';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
  argTypes: generatedArgTypes
};

export const Default = {
  args: {
    legend: 'Fieldset Legend',
    children: <label className="usa-checkbox__label">Hello world</label>
  }
};

export const NoLegend = {
  args: {
    children: <label className="usa-checkbox__label">Hello world</label>
  }
};

export const RequiredLegend = {
  args: {
    legend: 'Required Fieldset',
    required: true,
    children: <label className="usa-checkbox__label">Hello world</label>
  }
};

export const WithCustomClass = {
  args: {
    legend: 'Custom Class Fieldset',
    className: 'border-1px border-base padding-2',
    children: <label className="usa-checkbox__label">Hello world</label>
  }
};

export const LargeLegend = {
  args: {
    legend: 'Large Legend Fieldset',
    largeLegend: true,
    children: <label className="usa-checkbox__label">Hello world</label>
  }
};

export const Disabled = {
  args: {
    legend: 'Disabled Fieldset',
    disabled: true,
    children: <Input id="lonely-input" label="Lonely input" placeholder="Type here..." />
  }
};
