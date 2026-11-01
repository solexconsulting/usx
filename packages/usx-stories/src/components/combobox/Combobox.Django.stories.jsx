import config from '../../../../usx-react/src/components/combobox/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote, componentInit } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Combobox.React.stories.jsx';
import React from 'react';
import { waitFor } from 'storybook/test';

export default {
  title: 'Django/USWDS/Combobox',
  tags: ['USWDS', 'autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`combobox.init()`')
      }
    }
  },
  decorators: [...componentInit('combobox')]
};

const createStory = createDjangoStory({ componentName: 'combobox' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const Required = createStory(storyDefs.Required);
export const WithHint = createStory(storyDefs.WithHint);
export const WithPlaceholder = createStory(storyDefs.WithPlaceholder);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const WithError = createStory(storyDefs.WithError);
const connected = new WeakSet();
const withConsumerCallback = (story, eventName, message) => ({
  ...story,
  play: async ({ canvasElement }) => {
    const box = await waitFor(() => {
      const node = canvasElement.querySelector('.usa-combo-box[data-enhanced="true"]');
      if (!node) throw new Error('Combo box has not been enhanced');
      return node;
    });
    if (connected.has(box)) return;
    connected.add(box);
    box.addEventListener(eventName, (event) => {
      if (eventName === 'input' && !event.target.matches('.usa-combo-box__input')) return;
      if (eventName === 'change' && !event.target.matches('select')) return;
      window.alert(`${message}: ${event.target.value}`);
    });
  },
});

export const WithOnSearch = withConsumerCallback(createStory({ ...storyDefs.WithOnSearch, onSearch: 'consumer' }), 'input', 'Your search');
export const WithOnSelect = withConsumerCallback(createStory({ ...storyDefs.WithOnSelect, onSelect: 'consumer' }), 'change', 'You selected');
