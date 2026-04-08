import React from 'react';
import Label from './Label';
import config from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: generatedArgTypes
};

export const Default = {
  args: {
    children: 'Label Text',
  }
};

export const WithRequired = {
  args: {
    children: 'Label Text',
    required: true,
  }
};

export const ScreenReaderOnly = {
  args: {
    children: 'Label Text',
    screenReaderOnly: true,
  }
};

export const WithCustomClass = {
  args: {
    children: 'Label Text',
    className: 'text-primary',
  }
};

export const WithClassOverride1 = {
  name: 'With Class Override (radio button)',
  args: {
    children: 'Label Text',
    className: 'usa-radio__label',
    classOverride: true,
  }
}

export const WithClassOverride2 = {
  name: 'With Class Override (checkbox)',
  args: {
    children: 'Label Text',
    className: 'usa-checkbox__label',
    classOverride: true,
  }
}
