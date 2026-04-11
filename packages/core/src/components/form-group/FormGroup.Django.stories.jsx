import React from 'react';
import { djangoComponent } from '../../../djangoComponent.js';
import config from './config.json';
import { buildArgTypes, componentTag } from '../../../helper';

const generatedArgTypes = buildArgTypes(config.props || {});

const sampleChildren = '<label class="usa-label usx-label" for="fg-input">Form group label</label><input class="usa-input usx-input" id="fg-input" placeholder="Type here" />';

export default {
  title: 'Django/FormGroup',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
};

const createStory = (args) => ({
  args,
  parameters: {
    docs: {
      source: {
        code: componentTag({ name: 'form-group', props: args })
      }
    }
  },
  render: djangoComponent('form-group')
});

export const Default = createStory({
  children: sampleChildren,
});

export const ErrorState = createStory({
  error: true,
  children: '<label class="usa-label usx-label" for="fg-error">Error state</label><input class="usa-input usx-input usa-input--error" id="fg-error" aria-invalid="true" />',
});

export const SuccessState = createStory({
  children: '<label class="usa-label usx-label" for="fg-success">Success state</label><input class="usa-input usx-input usa-input--success" id="fg-success" />',
});
