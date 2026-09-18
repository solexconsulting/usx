import React from 'react';
import config from '../../../../core/src/components/banner/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './Banner.React.stories.jsx';
import accordion from "@uswds/uswds/js/usa-accordion";

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/Banner',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  excludeStories: [],
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`accordion.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure the banner component is initialized for Django stories
      React.useEffect(() => {
        const timeout = setTimeout(() => {
          accordion.init();
        }, 200);

        return () => {
          clearTimeout(timeout);
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
