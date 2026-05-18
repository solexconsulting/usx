import React from 'react';
import Breadcrumb from './Breadcrumb';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: config.default || {},
  WithRdfa: { ...(config.default || {}), rdfa: true },
  Wrap: { ...(config.default || {}), wrap: true },
  WithClassName: { ...(config.default || {}), className: 'custom-breadcrumb-class' },
  Empty: { items: [] },
};

export const Default = { args: storyDefs.Default };
export const WithRdfa = { args: storyDefs.WithRdfa };
export const Wrap = { args: storyDefs.Wrap };
export const WithClassName = { args: storyDefs.WithClassName };
export const Empty = { args: storyDefs.Empty };
