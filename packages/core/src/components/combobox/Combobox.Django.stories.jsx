import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Combobox.React.stories.jsx';
import React from 'react';
import combobox from "@uswds/uswds/js/usa-combo-box";

export default {
  title: 'Django/Combobox',
  tags: ['autodocs'],
  argTypes: buildArgTypes(config.props || {}),
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because it's struggling
        const timeout = setTimeout(() => {
          combobox.init();
        }, 100);
        return () => {
          clearTimeout(timeout);
          combobox.off();
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'combobox' });

export const Default = createStory(storyDefs.Default);
export const Disabled = createStory(storyDefs.Disabled);
export const Required = createStory(storyDefs.Required);
export const WithHint = createStory(storyDefs.WithHint);
export const WithPlaceholder = createStory(storyDefs.WithPlaceholder);
export const WithDefaultValue = createStory(storyDefs.WithDefaultValue);
export const WithError = createStory(storyDefs.WithError);
export const WithOnSelect = createStory({
  ...storyDefs.WithOnSelect,
  onSelect: "alert(`You selected: ${value}`)"
});
