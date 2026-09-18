import config from '../../../../usx-react/src/components/combobox/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Combobox.React.stories.jsx';
import React from 'react';
import combobox from "@uswds/uswds/js/usa-combo-box";

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
  decorators: [
    (Story) => {
      // The preview's globally-loaded USWDS bundle already attaches the real
      // delegated listeners to document.body on page load, so we only need
      // combobox.init() here to enhance the markup this story just rendered.
      React.useEffect(() => {
        const timeout = setTimeout(() => {
          combobox.init();
        }, 100);
        return () => {
          clearTimeout(timeout);
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
