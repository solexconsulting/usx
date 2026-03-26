import React from 'react';
import { Alert } from '../index.js';
import alertConfig from '../components/alert/config.json';
import { buildArgTypes } from '../../helper.jsx';

const generatedArgTypes = buildArgTypes(alertConfig.props || {});

export default {
  title: 'React/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Info = {
  args: {
    heading: 'Informative status',
    text: 'System status and notification updates appear here.',
    slim: false,
    noIcon: false
  }
};

export const Warning = {
  args: {
    variant: 'warning',
    heading: 'Warning status',
    text: 'This is a warning message.',
    slim: false,
    noIcon: false
  }
};

export const Success = {
  args: {
    variant: 'success',
    heading: 'Success status',
    text: 'Operation completed successfully.',
    slim: false,
    noIcon: false
  }
};

export const Error = {
  args: {
    variant: 'error',
    heading: 'Error status',
    text: 'An error occurred.',
    slim: false,
    noIcon: false
  }
};

export const Emergency = {
  args: {
    variant: 'emergency',
    heading: 'Emergency status',
    text: 'This is an emergency alert.',
    slim: false,
    noIcon: false
  }
};