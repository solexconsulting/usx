import React from 'react';
import Input from './Input.jsx';
import inputConfig from './config.json';
import { buildArgTypes } from '../../../helper';

const generatedArgTypes = buildArgTypes(inputConfig.props || {});

export default {
  title: 'React/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

export const Default = {
  args: {
    label: 'Text input label',
    placeholder: 'Type here'
  }
};

export const Textarea = {
  args: {
    label: 'Text area label',
    type: 'textarea'
  }
};

export const ErrorState = {
  args: {
    label: 'Error state input',
    error: true
  }
};

export const SuccessState = {
  args: {
    label: 'Success state input',
    success: true
  }
};

export const SuccessStateTextArea = {
  args: {
    label: 'Success state text area',
    type: 'textarea',
    success: true
  }
};

export const Disabled = {
  args: {
    label: 'Disabled input',
    disabled: true
  }
};

export const DisabledTextArea = {
  args: {
    label: 'Disabled text area',
    type: 'textarea',
    disabled: true
  }
};


export const WithCharacterCount = {
  args: {
    label: 'Input with character count',
    hint: 'This is an input with a character count.',
    characterCount: {
      max: 25,
      message: 'You can enter up to 25 characters'
    }
  }
};

export const ErrorWithCharacterCount = {
  args: {
    label: 'Input with invalid character count',
    hint: 'This is an input with a character count.',
    error: 'Character count exceeded',
    characterCount: {
      max: 25,
      message: 'Character count exceeded'
    }
  }
};


export const TextAreaWithCharacterCount = {
  args: {
    label: 'Text area with character count',
    type: 'textarea',
    hint: 'This is a text area with a character count.',
    characterCount: {
      max: 25,
      message: 'You can enter up to 25 characters'
    }
  }
};

export const TextAreaErrorWithCharacterCount = {
  args: {
    label: 'Text area with invalid character count',
    type: 'textarea',
    hint: 'This is a text area with a character count.',
    error: 'Character count exceeded',
    characterCount: {
      max: 25,
      message: 'Character count exceeded'
    }
  }
};