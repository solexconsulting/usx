import React from 'react';
import config from '../../../../core/src/components/in-page-nav/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './InPageNav.React.stories.jsx';
import inPageNavigation from '@uswds/uswds/js/usa-in-page-navigation';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because the Django markup renders asynchronously
        const timeout = setTimeout(() => {
          inPageNavigation.on();
        }, 400);
        return () => {
          clearTimeout(timeout);
          inPageNavigation.off();
        };
      }, []);

      return <Story />;
    },
  ],
};

const createStory = createDjangoStory({ componentName: 'in-page-nav' });

export const Default = createStory(storyDefs.Default);
export const CustomHeadingElements = createStory(storyDefs.CustomHeadingElements);
export const CustomTitle = createStory(storyDefs.CustomTitle);
export const BelowMinimumHeadingCount = createStory(storyDefs.BelowMinimumHeadingCount);
