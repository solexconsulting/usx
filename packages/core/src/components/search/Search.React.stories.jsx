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
};

export const Default = {
  args: {},
};

export const CustomPlaceholder = {
  args: {
    placeholder: 'Custom placeholder...',
  },
};

export const WithDefaultValue = {
  args: {
    defaultValue: 'Default search value',
  },
};

export const Big = {
  args: {
    big: true,
  },
};

export const IconOnly = {
  args: {
    iconOnly: true,
  },
};

export const BigIconOnly = {
  args: {
    big: true,
    iconOnly: true,
  },
};

export const NonStandardIcon = {
  args: {
    icon: 'star',
    iconOnly: true,
  },
}

export const WithCustomButtonVariant = {
  args: {
    buttonVariant: 'accent-cool',
  },
};

export const GoogleAction = {
  args: {
    action: 'https://www.google.com/search',
    placeholder: 'Search Google...',
  },
}

export const PathAction = {
  args: {
    action: '/searching-with-an-action/',
    placeholder: 'Search the site...',
  },
}

export const WithOnSubmit = {
  args: {
    onSubmit: (query) => alert(`Search submitted: ${query}`),
  },
}