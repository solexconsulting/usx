import React from 'react';
import config from '../../../../usx-react/src/components/in-page-nav/config.json';
import { buildArgTypes, createDjangoStory, uswdsInitNote } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './InPageNav.React.stories.jsx';
import inPageNavigation from '@uswds/uswds/js/usa-in-page-navigation';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/InPageNav',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  parameters: {
    docs: {
      description: {
        component: uswdsInitNote('`inPageNavigation.init()`')
      },
    }
  },
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because the Django markup renders asynchronously
        const timeout = setTimeout(() => {
          inPageNavigation.init();
        }, 400);
        return () => {
          clearTimeout(timeout);
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
