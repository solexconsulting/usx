import React from 'react';
import config from './config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers';
import { storyDefs } from './Banner.React.stories.jsx';
import accordion from "@uswds/uswds/js/usa-accordion";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/Banner',
  tags: ['autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
  decorators: [
    (Story) => {
      // Ensure the banner component is initialized for Django stories
      React.useEffect(() => {
        accordion.on();

        return () => {
          accordion.off();
        }
      }, []);
      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'banner' });

export const Default = createStory(storyDefs.Default);
export const Mil = { name: '.mil TLD', ...createStory(storyDefs.Mil) };
export const Custom = { name: 'Custom text and TLD', ...createStory(storyDefs.Custom) };
