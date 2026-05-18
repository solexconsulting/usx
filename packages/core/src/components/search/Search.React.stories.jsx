import React from 'react';
import Search from './Search';
import config from './config.json';
import { buildArgTypes } from '../../utils/storyHelpers';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'React/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: ['storyDefs'],
};

export const storyDefs = {
  Default: {
    id: 'search-default',
  },
  CustomPlaceholder: {
    id: 'search-custom-placeholder',
    placeholder: 'Custom placeholder...',
  },
  WithDefaultValue: {
    id: 'search-default-value',
    defaultValue: 'Default search value',
  },
  Big: {
    id: 'search-big',
    big: true,
  },
  IconOnly: {
    id: 'search-icon-only',
    iconOnly: true,
  },
  BigIconOnly: {
    id: 'search-big-icon-only',
    big: true,
    iconOnly: true,
  },
  NonStandardIcon: {
    id: 'search-non-standard-icon',
    icon: 'star',
    iconOnly: true,
  },
  WithCustomButtonVariant: {
    id: 'search-custom-variant',
    buttonVariant: 'accent-cool',
  },
  GoogleAction: {
    id: 'search-google-action',
    action: 'https://www.google.com/search',
    placeholder: 'Search Google...',
  },
  PathAction: {
    id: 'search-path-action',
    action: '/searching-with-an-action/',
    placeholder: 'Search the site...',
  },
  WithOnSubmit: {
    id: 'search-with-onsubmit',
    placeholder: 'Type something and submit...',
    onSubmit: '(query) => alert("Search submitted: " + query)',
  },
};

export const Default = { args: storyDefs.Default };
export const CustomPlaceholder = { args: storyDefs.CustomPlaceholder };
export const WithDefaultValue = { args: storyDefs.WithDefaultValue };
export const Big = { args: storyDefs.Big };
export const IconOnly = { args: storyDefs.IconOnly };
export const BigIconOnly = { args: storyDefs.BigIconOnly };
export const NonStandardIcon = { args: storyDefs.NonStandardIcon };
export const WithCustomButtonVariant = { args: storyDefs.WithCustomButtonVariant };
export const GoogleAction = { args: storyDefs.GoogleAction };
export const PathAction = { args: storyDefs.PathAction };
export const WithOnSubmit = {
  args: storyDefs.WithOnSubmit,
  render: (args) => {
    const onSubmit = typeof args.onSubmit === 'string' ? eval(args.onSubmit) : args.onSubmit;
    return <Search {...args} onSubmit={onSubmit} />;
  },
};