import React from 'react';
import config from '../../../../core/src/components/range-slider/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './RangeSlider.React.stories.jsx';
import range from '@uswds/uswds/js/usa-range';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/RangeSlider',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`range.init()`')
      }
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because the Django HTML fetch is async
        const timeout = setTimeout(() => {
          range.init();
        }, 400);
        return () => {
          clearTimeout(timeout);
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'range-slider' });

export const Default = createStory(storyDefs.Default);
export const WithUnit = createStory(storyDefs.WithUnit);
export const WithPreposition = createStory(storyDefs.WithPreposition);
export const FineStep = createStory(storyDefs.FineStep);
export const CustomRange = createStory(storyDefs.CustomRange);
export const WithError = createStory(storyDefs.WithError);
export const Disabled = createStory(storyDefs.Disabled);
