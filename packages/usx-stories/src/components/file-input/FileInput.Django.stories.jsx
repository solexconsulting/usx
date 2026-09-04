import React from 'react';
import config from '../../../../core/src/components/file-input/config.json';
import { buildArgTypes, createDjangoStory } from '../../utils/storyHelpers.jsx';
import { storyDefs } from './FileInput.React.stories.jsx';
import fileInput from '@uswds/uswds/js/usa-file-input';

const generatedArgTypes = buildArgTypes(config.props || {});

export default {
  title: 'Django/USWDS/FileInput',
  tags: ['USWDS', 'autodocs'],
  argTypes: generatedArgTypes,
  decorators: [
    (Story) => {
      // Ensure USWDS JS is initialized for the story
      React.useEffect(() => {
        // Set a delay because it's struggling
        const timeout = setTimeout(() => {
          fileInput.on();
        }, 400);
        return () => {
          clearTimeout(timeout);
          fileInput.off();
        };
      }, []);

      return <Story />;
    }
  ]
};

const createStory = createDjangoStory({ componentName: 'file-input' });

export const Default = createStory(storyDefs.Default);
export const AcceptSpecificTypes = createStory(storyDefs.AcceptSpecificTypes);
export const AcceptImages = createStory(storyDefs.AcceptImages);
export const Multiple = createStory(storyDefs.Multiple);
export const WithError = createStory(storyDefs.WithError);
export const Disabled = createStory(storyDefs.Disabled);
